
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase/client";
import Swal from 'sweetalert2'; 
import "../cssFile/sepet.css";
import Image from "next/image";
import { processOrder } from './actions';


export default function Basket() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [counts, setCounts] = useState({}); 

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        console.log('Veri çekme işlemi başladı...');
        const { data, error } = await supabase
            .from('basket')
            .select('id, product_name, productGame_name, product_price, product_quantity');

        if (error) {
            setError(error);
            console.error('Veri çekme hatası:', error);
        } else {
            console.log('Veri başarıyla çekildi:', data);
            setData(data);

            const initialCounts = {};
            data.forEach(item => {
                initialCounts[item.id] = item.product_quantity; 
            });
            setCounts(initialCounts);
            console.log('Adetler başarıyla ayarlandı:', initialCounts);
        }
    };

    const increment = (id) => {
        console.log(`ID'si ${id} olan ürünün adeti artırıldı`);
        setCounts(prevCounts => ({
            ...prevCounts,
            [id]: (prevCounts[id] || 0) + 1,
        }));
    };

    const decrement = (id) => {
        console.log(`ID'si ${id} olan ürünün adeti azaltıldı`);
        setCounts(prevCounts => {
            const newCount = Math.max((prevCounts[id] || 0) - 1, 0); 
            

            if (newCount === 0) {
                deleteItem(id); 
            }

            return {
                ...prevCounts,
                [id]: newCount,
            };
        });
    };

    const updateQuantity = async (item) => {
        const { id } = item;
        const newQuantity = counts[id] || 0; 

        console.log(`ID'si ${id} olan ürünün yeni miktarı:`, newQuantity);

        if (newQuantity === 0) {
            Swal.fire({
                title: 'Uyarı!',
                text: 'Adet sıfır olamaz.',
                icon: 'warning',
                confirmButtonText: 'Tamam',
            });
            console.log('Adet sıfır olduğundan güncelleme işlemi iptal edildi');
            return;
        }

        const { error } = await supabase
            .from('basket')
            .update({ product_quantity: newQuantity })
            .eq('id', id);

        if (error) {
            console.error("Miktar güncellenirken bir hata oluştu:", error.message);
        } else {
            console.log(`ID'si ${id} olan ürünün miktarı başarıyla güncellendi.`);
            Swal.fire({
                title: 'Başarılı!',
                text: 'Miktar başarıyla güncellendi.',
                icon: 'success',
                confirmButtonText: 'Tamam',
            });
        }
    };


    const deleteItem = async (id) => {
        try {
            console.log(`ID'si ${id} olan ürün silme işlemi başlatıldı`);
            const { error } = await supabase
                .from('basket')
                .delete()
                .eq('id', id);

            if (error) {
                console.error("Ürün silinirken bir hata oluştu:", error.message);
                return;
            }

            setData(prevData => {
                console.log(`ID'si ${id} olan ürün ekrandan kaldırıldı`);
                return prevData.filter(item => item.id !== id);
            });

            Swal.fire({
                title: 'Başarılı!',
                text: 'Ürün sepetten silindi.',
                icon: 'success',
                confirmButtonText: 'Tamam',
            });
        } catch (error) {
            console.error("Ürün silinirken bir hata oluştu:", error.message);
        }
    };

    const calculateTotalPrice = () => {
        const totalPrice = data.reduce((total, item) => {
            const quantity = counts[item.id] || 0; 
            return total + item.product_price * quantity; 
        }, 0);
        console.log('Toplam fiyat:', totalPrice);
        return totalPrice;
    };

// Basket.js


const confirmOrder = async () => {
    if (data.length === 0) { // Sepet boşsa
        Swal.fire({
            title: 'Sepet Boş!',
            text: 'Sepetinizde ürün bulunmamaktadır.',
            icon: 'warning',
            confirmButtonText: 'Tamam',
        });
        return; // Sepet boşsa işlemi durdur
    }

    const { value: formValues } = await Swal.fire({
        title: 'Sipariş Bilgileri',
        html: `
            <input id="first-name" class="swal2-input" placeholder="Ad" />
            <input id="last-name" class="swal2-input" placeholder="Soyad" />
            <input id="address" class="swal2-input" placeholder="Adres" />
            <input id="card-number" class="swal2-input" placeholder="Kart Numarası" />
            <input id="expiry-date" class="swal2-input" placeholder="Son Kullanma Tarihi" />
            <input id="security-code" class="swal2-input" placeholder="Güvenlik Kodu" />
        `,
        focusConfirm: false,
        preConfirm: () => {
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const address = document.getElementById('address').value;
            const cardNumber = document.getElementById('card-number').value;
            const expiryDate = document.getElementById('expiry-date').value;
            const securityCode = document.getElementById('security-code').value;

            if (!firstName || !lastName || !address || !cardNumber || !expiryDate || !securityCode) {
                Swal.showValidationMessage('Lütfen tüm alanları doldurun.');
                return false;
            }

            return {
                firstName,
                lastName,
                address,
                cardNumber,
                expiryDate,
                securityCode,
            };
        }
    });

    if (formValues) {
        // Sipariş bilgilerini actions.js'e gönder
        const orderInfo = processOrder(formValues);

        // Ekrana bilgileri göster
        Swal.fire({
            title: 'Tebrikler Siparişiniz Başarıyla Oluşturuldu!',
            html: `
                <p><strong>Ad:</strong> ${formValues.firstName}</p>
                <p><strong>Soyad:</strong> ${formValues.lastName}</p>
                <p><strong>Adres:</strong> ${formValues.address}</p>
            `,
            icon: 'success',
            confirmButtonText: 'Tamam',
        });

        // Sepeti temizleme işlemi
        const deletePromises = data.map(item => {
            return supabase
                .from('basket')
                .delete()
                .eq('id', item.id);
        });
        await Promise.all(deletePromises);
        setData([]);
        setCounts({});
    }
};


    if (error) return <div>Hata: {error.message}</div>;

    return (
        <div className="mega-container">
            <div className="basket-cotainer">
                <div className="card-container">
                    {data.map((item) => (
                        <div className="cards" key={item.id}>
                            <div className="card">
                                <div className="card-img-name-box">
                                    <Image
                                        src="/logo.svg"
                                        width={50}
                                        height={50}
                                        alt="Logo"
                                    />
                                    <p>{item.product_name} - {item.productGame_name}</p>
                                </div>
                                <div>
                                    <p>{item.product_price} TL</p>
                                    <p>Adet: {counts[item.id] || 0}</p>
                                    <div className="up-down-box"> 
                                        <button className="up-btn" onClick={() => increment(item.id)}>+</button>
                                        <button className="down-btn" onClick={() => decrement(item.id)}>-</button>
                                    </div>
                                    <button className="update-btn" onClick={() => updateQuantity(item)}>Güncelle</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="total-price">
                        <div className="tpl-delete-btn">
                            <p>Sepet Toplamı</p>
                        </div>
                        <div className="ok-total-btn">
                            <h1>{calculateTotalPrice()}</h1>
                            <button onClick={confirmOrder} className="confirm-order-btn">Sepeti Onayla</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}











// // pages/orders.js

// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "../utils/supabase/client";
// import Swal from 'sweetalert2'; 
// import "../cssFile/orders.css";

// export default function Orders() {
//     const [orders, setOrders] = useState([]);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetchOrders();
//     }, []);

//     const fetchOrders = async () => {
//         console.log('Siparişleri çekme işlemi başladı...');
//         const { data, error } = await supabase
//             .from('orders')
//             .select('name_surname, address, product_name, product_price, product_quantity');

//         if (error) {
//             setError(error);
//             console.error('Siparişleri çekerken hata:', error);
//         } else {
//             console.log('Siparişler başarıyla çekildi:', data);
//             setOrders(data);
//         }
//     };

//     if (error) return <div>Hata: {error.message}</div>;

//     return (
//         <div className="orders-main">
//             <div className="orders-container">
//                 <h1>Siparişlerim</h1>
//                 {orders.length === 0 ? (
//                     <p>Henüz siparişiniz yok.</p>
//                 ) : (
//                     orders.map((order, index) => (
//                         <div key={index} className="order-item">
//                             <h2>{order.name_surname}</h2>
//                             <p>Adres: {order.address}</p>
//                             <p>{order.product_name} - {order.product_price} TL x {order.product_quantity}</p>
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// }








// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "../utils/supabase/client";
// import "../cssFile/orders.css"; // CSS dosyanı eklemeyi unutma

// export default function Orders() {
//     const [orders, setOrders] = useState([]);

//     useEffect(() => {
//         fetchOrders();
//     }, []);

//     const fetchOrders = async () => {
//         const { data, error } = await supabase.from('orders').select('*');

//         if (error) {
//             console.error('Siparişler alınırken hata oluştu:', error);
//         } else {
//             setOrders(data);
//         }
//     };

//     // Adrese göre siparişleri gruplamak için yardımcı bir fonksiyon
//     const groupOrdersByAddress = (orders) => {
//         const groupedOrders = {};

//         orders.forEach(order => {
//             const address = order.address;

//             if (!groupedOrders[address]) {
//                 groupedOrders[address] = [];
//             }
//             groupedOrders[address].push(order);
//         });

//         return groupedOrders;
//     };

//     // Gruplanmış siparişleri almak
//     const groupedOrders = groupOrdersByAddress(orders);

//     // Her grup için toplamı hesaplamak
//     const calculateTotalPrice = (orderGroup) => {
//         return orderGroup.reduce((total, order) => {
//             return total + (order.product_price * order.product_quantity);
//         }, 0);
//     };

//     return (
//         <div className="orders-main">
//             <div className="orders-container">
//                 <h1>Siparişlerim</h1>
//                 {orders.length === 0 ? (
//                     <p>Henüz siparişiniz yok.</p>
//                 ) : (
//                     Object.keys(groupedOrders).map((address, index) => {
//                         const orderGroup = groupedOrders[address];
//                         const totalPrice = calculateTotalPrice(orderGroup); // Toplamı hesapla

//                         return (
//                             <div key={index} className="order-group">
//                                 <h2 className="product-orders">Adres: {address}</h2>
//                                 <div className="orders">
//                                 {orderGroup.map((order, orderIndex) => (
//                                     <div key={orderIndex} className="order-item">
//                                         <p><strong>{order.product_name}</strong> - {order.product_price} TL x {order.product_quantity}</p>
//                                     </div>
//                                 ))}
//                                 <h1><strong>Toplam: {totalPrice} TL</strong></h1> {/* Toplamı göster */}
//                                 </div>
//                             </div>
//                         );
//                     })
//                 )}
//             </div>
//         </div>
//     );
// }








"use client";

import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase/client";
import "../cssFile/orders.css"; // CSS dosyanı eklemeyi unutma
import Swal from 'sweetalert2';
import Link from "next/link";

export default function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const { data, error } = await supabase.from('orders').select('*');

        if (error) {
            console.error('Siparişler alınırken hata oluştu:', error);
        } else {
            setOrders(data);
        }
    };

    // Adrese göre siparişleri gruplamak için yardımcı bir fonksiyon
    const groupOrdersByAddress = (orders) => {
        const groupedOrders = {};

        orders.forEach(order => {
            const address = order.address;

            if (!groupedOrders[address]) {
                groupedOrders[address] = [];
            }
            groupedOrders[address].push(order);
        });

        return groupedOrders;
    };

    // Gruplanmış siparişleri almak
    const groupedOrders = groupOrdersByAddress(orders);

    // Her grup için toplamı hesaplamak
    const calculateTotalPrice = (orderGroup) => {
        return orderGroup.reduce((total, order) => {
            return total + (order.product_price * order.product_quantity);
        }, 0);
    };

    // Sipariş geçmişini silme fonksiyonu
    const deleteOrderHistory = async () => {
        const { isConfirmed } = await Swal.fire({
            title: 'Emin misiniz?',
            text: 'Sipariş geçmişiniz silinecektir!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Evet, sil',
            cancelButtonText: 'İptal'
        });
    
        if (isConfirmed) {
            // Tüm siparişleri silmek için koşul eklemiyoruz
            const { error } = await supabase
                .from('orders')
                .delete()
                .neq('id', -1); // Geçerli bir id kullanarak tüm kayıtları silin
    
            if (error) {
                console.error('Sipariş geçmişi silinirken hata oluştu:', error.message);
                Swal.fire('Hata!', 'Sipariş geçmişi silinemedi: ' + error.message, 'error');
            } else {
                setOrders([]); // Siparişleri yerel durumu güncelle
                Swal.fire('Başarılı!', 'Sipariş geçmişiniz silindi.', 'success');
            }
        }
    };

    return (
        <div className="orders-main">
            <div className="orders-container">
                <h1>Siparişlerim</h1>
                {orders.length === 0 ? (
                    <p>Henüz siparişiniz yok.</p>
                ) : (
                    Object.keys(groupedOrders).map((address, index) => {
                        const orderGroup = groupedOrders[address];
                        const totalPrice = calculateTotalPrice(orderGroup); // Toplamı hesapla

                        return (
                            <div key={index} className="order-group">
                                <h2>Adres: {address}</h2>
                                {orderGroup.map((order, orderIndex) => (
                                    <div key={orderIndex} className="order-item">
                                        <p><strong>{order.product_name}</strong> - {order.product_price} TL x {order.product_quantity}</p>
                                    </div>
                                ))}
                                <p><strong>Toplam: {totalPrice} TL</strong></p> {/* Toplamı göster */}
                            </div>
                        );
                    })
                )}
                
                {orders.length === 0 ? (
                    <Link className="continue" href="/gameWorld">Alışverişe Devam Et</Link>
                ) : (
                    <button onClick={deleteOrderHistory} className="delete-history-btn">Sipariş Geçmişini Sil</button> 
                )}
            </div>
        </div>
    );
}


"use client"; // Bileşeni client-side çalışacak şekilde ayarlıyoruz

import { supabase } from "../utils/supabase/client";
import "../cssFile/gameWorld.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'; // SweetAlert2 import ediyoruz

export default function GameWorld() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [counts, setCounts] = useState({}); // Her oyunun count değerini tutmak için bir nesne

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('game')
        .select('id, game_name, product, description, price, stock'); // id'yi de seçiyoruz

      if (error) {
        setError(error);
        console.error('Veri çekme hatası:', error);
      } else {
        setData(data);
        // Yeni veriler geldiğinde, count'ları sıfırla
        const initialCounts = {};
        data.forEach(game => {
          initialCounts[game.id] = 0; // Her oyun için başlangıçta 0
        });
        setCounts(initialCounts);
      }
    };

    fetchData();
  }, []);

  // Adet artırma fonksiyonu
  const increment = (id) => {
    setCounts(prevCounts => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1,
    }));
  };

  // Adet azaltma fonksiyonu
  const decrement = (id) => {
    setCounts(prevCounts => ({
      ...prevCounts,
      [id]: Math.max((prevCounts[id] || 0) - 1, 0), // 0'ın altına düşmesini engelle
    }));
  };

  const addToBasket = async (game) => {
    const { id, stock, price, game_name, product } = game; // product'ı da al
    const count = counts[id] || 0; // İlgili oyunun count değerini al

    console.log("Eklenen ürün:", game);

    // Eğer count 0 ise, kullanıcıya bir uyarı ver
    if (count === 0) {
        Swal.fire({
            title: 'Uyarı!',
            text: 'Sepete eklemek için en az 1 adet seçmelisiniz.',
            icon: 'warning',
            confirmButtonText: 'Tamam',
        });
        return;
    }

    // Eğer stok yetersizse, kullanıcıya uyarı ver
    if (count > stock) {
        Swal.fire({
            title: 'Uyarı!',
            text: 'Yeterli stok yok.',
            icon: 'warning',
            confirmButtonText: 'Tamam',
        });
        return;
    }

    // Sepetteki mevcut ürünü kontrol et
    const { data: existingItems, error: fetchError } = await supabase
        .from('basket')
        .select('*')
        .eq('id', id)
        .limit(1);

    if (fetchError) {
        console.error("Sepet kontrolü sırasında bir hata oluştu:", fetchError.message); // Hata mesajını göster
        return;
    }

    console.log("Sepetteki mevcut ürünler:", existingItems);

    const existingItem = existingItems.length > 0 ? existingItems[0] : null;

    if (existingItem) {
        const currentQuantity = existingItem.product_quantity || 0;
        const newQuantity = currentQuantity + count; // Sepete eklenirken mevcut quantity ile count değerini topla

        console.log("Güncellenen miktar:", newQuantity);

        // Sepeti güncelle
        const { error: updateError } = await supabase
            .from('basket')
            .update({ product_quantity: newQuantity })
            .eq('id', existingItem.id); // Güncelleme için doğru id'yi kullan

        if (updateError) {
            console.error("Sepet güncellenirken bir hata oluştu:", updateError.message); // Hata mesajını göster
        } else {
            console.log("Ürün sepette güncellendi, yeni quantity:", newQuantity);

            // Stoktan düşme işlemi
            const newStock = stock - count;
            const { error: stockError } = await supabase
                .from('game')
                .update({ stock: newStock }) // Yeni stok değeriyle günceller
                .eq('id', id);

            if (stockError) {
                console.error("Stok güncellenirken bir hata oluştu:", stockError.message);
            } else {
                console.log("Stok başarıyla güncellendi, yeni stok:", newStock);

                // Stok değişikliğini UI'ye yansıt
                setData(prevData => prevData.map(gameItem => 
                    gameItem.id === id ? { ...gameItem, stock: newStock } : gameItem
                ));

                Swal.fire({
                    title: 'Başarılı!',
                    text: 'Ürün sepette güncellendi ve stok güncellendi.',
                    icon: 'success',
                    confirmButtonText: 'Tamam',
                });
            }
        }
    } else {
        console.log("Sepete yeni ürün ekleniyor...");

        const { error: insertError } = await supabase
            .from('basket')
            .insert([
                { 
                    id: id, 
                    product_name: game_name, 
                    product_stock: stock, 
                    product_price: price, 
                    product_quantity: count, 
                    productGame_name: product 
                } // product'ı ekle
            ]);

        if (insertError) {
            console.error("Sepete eklenirken bir hata oluştu:", insertError.message); // Hata mesajını göster
        } else {
            console.log("Ürün başarıyla sepete eklendi.");

            // Stoktan düşme işlemi
            const newStock = stock - count;
            const { error: stockError } = await supabase
                .from('game')
                .update({ stock: newStock }) // Yeni stok değeriyle günceller
                .eq('id', id);

            if (stockError) {
                console.error("Stok güncellenirken bir hata oluştu:", stockError.message);
            } else {
                console.log("Stok başarıyla güncellendi, yeni stok:", newStock);

                // Stok değişikliğini UI'ye yansıt
                setData(prevData => prevData.map(gameItem => 
                    gameItem.id === id ? { ...gameItem, stock: newStock } : gameItem
                ));

                Swal.fire({
                    title: 'Başarılı!',
                    text: 'Ürün sepete başarıyla eklendi ve stok güncellendi.',
                    icon: 'success',
                    confirmButtonText: 'Tamam',
                });
            }
        }
    }

    setCounts(prevCounts => ({
      ...prevCounts,
      [id]: 0, // İlgili ürün için sayacı sıfırla
    }));
  };

  return (
    <div className="main-container">
      <div className="left-container">
        <Image
          src="/valorant.jpg"
          width={299}
          height={400}
          alt="Picture of the author"
        />
        <div className="features">
          <h3>Özellikleri</h3>
          <p>Bölgeler</p>
          <p>Platform</p>
          <p>Teslimat</p>
          <p>Teslimat Türü</p>
        </div>
      </div>
      <div className="right-container">
        <h1>Oyun Listesi</h1>
        <div className="card-container">
          {data.map((game) => (
            <div className="card" key={game.id}>
              <div className="card-img-dsc">
                <Image
                  src="/logo.svg"
                  width={50}
                  height={50}
                  alt="Logo"
                />
                <div>
                  <p>{game.game_name}</p>
                  <p>{game.product}</p>
                  <p>{game.description}</p>
                </div>
              </div>
              <div className="card-prc-stc-btn">
                <div>
                  <p>{game.stock} adet</p>
                  <p>Fiyat: {game.price} TL</p>
                </div>
                <div>
                  <p>Adet: {counts[game.id] || 0}</p>
                  <button onClick={() => increment(game.id)}>+</button>
                  <button onClick={() => decrement(game.id)}>-</button>
                </div>
                <button className="basket-btn" onClick={() => addToBasket(game)}>Sepete Ekle</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

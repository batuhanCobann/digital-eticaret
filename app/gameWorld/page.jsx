"use client"; 

import { supabase } from "../utils/supabase/client";
import "../cssFile/gameWorld.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'; 

export default function GameWorld() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [counts, setCounts] = useState({});

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
        const initialCounts = {};
        data.forEach(game => {
          initialCounts[game.id] = 0;
        });
        setCounts(initialCounts);
      }
    };

    fetchData();
  }, []);


  const increment = (id) => {
    setCounts(prevCounts => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1,
    }));
  };

  const decrement = (id) => {
    setCounts(prevCounts => ({
      ...prevCounts,
      [id]: Math.max((prevCounts[id] || 0) - 1, 0),
    }));
  };

  const addToBasket = async (game) => {
    const { id, stock, price, game_name, product } = game; 
    const count = counts[id] || 0; 

    console.log("Eklenen ürün:", game);

    if (count === 0) {
        Swal.fire({
            title: 'Uyarı!',
            text: 'Sepete eklemek için en az 1 adet seçmelisiniz.',
            icon: 'warning',
            confirmButtonText: 'Tamam',
        });
        return;
    }

 
    if (count > stock) {
        Swal.fire({
            title: 'Uyarı!',
            text: 'Yeterli stok yok.',
            icon: 'warning',
            confirmButtonText: 'Tamam',
        });
        return;
    }

 
    const { data: existingItems, error: fetchError } = await supabase
        .from('basket')
        .select('*')
        .eq('id', id)
        .limit(1);

    if (fetchError) {
        console.error("Sepet kontrolü sırasında bir hata oluştu:", fetchError.message); 
        return;
    }

    console.log("Sepetteki mevcut ürünler:", existingItems);

    const existingItem = existingItems.length > 0 ? existingItems[0] : null;

    if (existingItem) {
        const currentQuantity = existingItem.product_quantity || 0;
        const newQuantity = currentQuantity + count; 

        console.log("Güncellenen miktar:", newQuantity);

        const { error: updateError } = await supabase
            .from('basket')
            .update({ product_quantity: newQuantity })
            .eq('id', existingItem.id); 

        if (updateError) {
            console.error("Sepet güncellenirken bir hata oluştu:", updateError.message); // Hata mesajını göster
        } else {
            console.log("Ürün sepette güncellendi, yeni quantity:", newQuantity);

            const newStock = stock - count;
            const { error: stockError } = await supabase
                .from('game')
                .update({ stock: newStock }) 
                .eq('id', id);

            if (stockError) {
                console.error("Stok güncellenirken bir hata oluştu:", stockError.message);
            } else {
                console.log("Stok başarıyla güncellendi, yeni stok:", newStock);

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
                } 
            ]);

        if (insertError) {
            console.error("Sepete eklenirken bir hata oluştu:", insertError.message); // Hata mesajını göster
        } else {
            console.log("Ürün başarıyla sepete eklendi.");

            const newStock = stock - count;
            const { error: stockError } = await supabase
                .from('game')
                .update({ stock: newStock }) 
                .eq('id', id);

            if (stockError) {
                console.error("Stok güncellenirken bir hata oluştu:", stockError.message);
            } else {
                console.log("Stok başarıyla güncellendi, yeni stok:", newStock);


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
      [id]: 0, 
    }));
  };

  return (
    <div className="main-container">
      <div className="left-container">
          <div className="left-img-box">
            <Image
            className="valorant-img"
            src="/valorant.jpg"
            width={299}
            height={400}
            alt="Picture of the author"
          />
          </div>

          <div className="features">
            <div className="features-head">
              <h3>Özellikleri</h3>
            </div>
            <div className="features-box">
              <p>Bölgeler</p>
              <p>TR Global</p>
            </div>
            <div className="features-box">
              <p>Platform</p>
              <p>App/Play Store</p>
            </div>
            <div className="features-box">
              <p>Teslimat</p>
              <p>7/24</p>
            </div>
            <div className="features-box">
            <p>Teslimat Türü</p>
            <p>E-pin</p>
            </div>
          </div>
          <div className="help-form">
            <p>Sıkça Sorulan Sorular</p>
            <p>Oyunlar Hakkında</p>
            <p>Nasıl Alırım</p>
            <p>Satın Almalar Hakkında</p>
          </div>
      </div>


      <div className="right-container">
        <div className="card-container">
          {data.map((game) => (
            <div className="card" key={game.id}>
              <div className="cards">
                <div className="img-prc-div">
                  <div className="card-img-dsc">
                    <div className="card-img-box">
                      <Image
                        src="/logo.svg"
                        width={50}
                        height={50}
                        alt="Logo"
                      />
                    </div>
                    <div className="card-name-prd-dsc">
                      <p>{game.game_name}</p>
                      <p>{game.product}</p>
                      <p>{game.description}</p>
                    </div>
                  </div>


                  <div className="card-prc-stc-btn">
                    <div className="card-stc-prc">
                      <p>{game.stock} stok</p>
                      <p>{game.price} TL</p>
                    </div>
                    <div className="card-adet-btns">
                      <p>Adet: {counts[game.id] || 0}</p>
                      <button onClick={() => increment(game.id)}>+</button>
                      <button onClick={() => decrement(game.id)}>-</button>
                    </div>
                    <div className="add-basket-btn-box">
                      <button className="basket-btn" onClick={ () => addToBasket(game)}>Sepete Ekle</button>
                    </div>
                  </div>

                </div>
                <button className="basket-btn-2" onClick={ () => addToBasket(game)}>Sepete Ekle</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

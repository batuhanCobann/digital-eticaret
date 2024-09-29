// "use client"
// import "@/app/cssFile/kayit.css";
// import Link from "next/link";
// import { signup } from "./actions"; // signup fonksiyonunu import ediyoruz
// import { useState } from "react";

// export default function Kayit() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: ""
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Formun yeniden yüklenmesini engelliyoruz
//     const form = new FormData(e.target); // Formdan gelen verileri alıyoruz
  
//     try {
//       await signup(form); // signup fonksiyonunu çağırıyoruz
//       // Kayıt başarılı, burada yönlendirme yapabilirsiniz
//       console.log('Kayıt başarılı!');
//     } catch (error) {
//       console.error('Kayıt hatası:', error.message);
//       // Kullanıcıya hata mesajı göstermek için bir durum yönetimi ekleyebilirsiniz
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <>
//       <div className="conteiner">
//         <div style={{ textAlign: "center" }}>
//           <div className="user-conteiner">
//             <h2 style={{ fontWeight: "400" }}>Hesap aç</h2>
//             <form onSubmit={handleSubmit}>
//               <input
//                 className="name-input"
//                 type="text"
//                 name="name"
//                 placeholder="Adınız"
//                 autoFocus
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//               <br />
//               <input
//                 className="name-input"
//                 type="email"
//                 name="email"
//                 placeholder="E-posta adresi"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//               <br />
//               <input
//                 className="name-input"
//                 type="password"
//                 name="password"
//                 placeholder="Şifre"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//               <br />
//               <button type="submit" className="enter-button">Kayıt Ol</button>
//             </form>
//             <p className="login-singup">Zaten hesabın var mı <Link className="login-sinup-link" href="/giris">Giriş yap</Link></p>
//             <p className="veya">VEYA</p>
//             <button className="google-button">Google ile giriş yap</button>
//             <br />
//             <button className="apple-button">Apple ile giriş yap</button>
//             <p className="description">Google veya Apple kimliğinizle bir sonraki adıma geçmeniz halinde Bireysel Hesap Sözleşmesi ve Eklerini kabul etmiş sayılırsınız.</p>
//             <p className="footer-p">İşletme sahibi misin <b className="footer-b" >Kurumsal hesap aç</b></p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }











// "use client"
// import "@/app/cssFile/kayit.css";
// import Link from "next/link";
// import { signup } from "./actions"; // signup fonksiyonunu import ediyoruz
// import { useState } from "react";
// import { redirect } from "next/dist/server/api-utils";

// export default function Kayit() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: ""
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Formun yeniden yüklenmesini engelliyoruz
//     const form = new FormData(e.target); // Formdan gelen verileri alıyoruz
  
//     try {
//       await signup(form); // signup fonksiyonunu çağırıyoruz
//       // Kayıt başarılı, burada yönlendirme yapabilirsiniz
//       console.log('Kayıt başarılı!');
//     } catch (error) {
//       console.error('Kayıt hatası:', error.message);
//       // Kullanıcıya hata mesajı göstermek için bir durum yönetimi ekleyebilirsiniz
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <>
//       <div className="conteiner">
//         <div style={{ textAlign: "center" }}>
//           <div className="user-conteiner">
//             <h2 style={{ fontWeight: "400" }}>Hesap aç</h2>
//             <form onSubmit={handleSubmit}>
//               <input
//                 className="name-input"
//                 type="text"
//                 name="name"
//                 placeholder="Adınız"
//                 autoFocus
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//               <br />
//               <input
//                 className="name-input"
//                 type="email"
//                 name="email"
//                 placeholder="E-posta adresi"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//               <br />
//               <input
//                 className="name-input"
//                 type="password"
//                 name="password"
//                 placeholder="Şifre"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//               <br />
//               <button type="submit" className="enter-button">Kayıt Ol</button>
//             </form>
//               <p className="login-singup">Zaten hesabın var mı <Link className="login-sinup-link" href="/giris">Giriş yap</Link></p>
//               <p className="veya">VEYA</p>
//               <button className="google-button">Google ile giriş yap</button>
//               <br />
//               <button className="apple-button">Apple ile giriş yap</button>
//               <p className="description">Google veya Apple kimliğinizle bir sonraki adıma geçmeniz halinde Bireysel Hesap Sözleşmesi ve Eklerini kabul etmiş sayılırsınız.</p>
//               <p className="footer-p">İşletme sahibi misin <b className="footer-b" >Kurumsal hesap aç</b></p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }





// "use client";
// import "@/app/cssFile/kayit.css";
// import Link from "next/link";
// import { signup } from "./actions"; // signup fonksiyonunu import ediyoruz
// import { useState } from "react";

// export default function Kayit() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: ""
//   });

//   const [successMessage, setSuccessMessage] = useState(""); // Başarılı mesaj için durum değişkeni

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Formun yeniden yüklenmesini engelliyoruz
//     const form = new FormData(e.target); // Formdan gelen verileri alıyoruz
  
//     try {
//       await signup(form); // signup fonksiyonunu çağırıyoruz
//       setSuccessMessage("Kayıt başarılı oldu!"); // Kayıt başarılı mesajını ayarlıyoruz
//       setFormData({
//         name: "",
//         email: "",
//         password: ""
//       });
//       console.log('Kayıt başarılı!');
//     } catch (error) {
//       console.error('Kayıt hatası:', error.message);
//       // Kullanıcıya hata mesajı göstermek için bir durum yönetimi ekleyebilirsiniz
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//     setSuccessMessage(""); // Kullanıcı inputu değiştirdiğinde mesajı sıfırlıyoruz
//   };

//   return (
//     <>
//       <div className="conteiner">
//         <div style={{ textAlign: "center" }}>
//           <div className="user-conteiner">
//             <h2 style={{ fontWeight: "400" }}>Hesap aç</h2>
//             <form onSubmit={handleSubmit}>
//               <div style={{ position: "relative" }}>
//                 <input
//                   className="name-input"
//                   type="text"
//                   name="name"
//                   placeholder="Adınız"
//                   autoFocus
//                   value={formData.name}
//                   onChange={handleChange}
//                 />
//                 {successMessage && (
//                   <span style={{ position: "absolute", top: "-20px", left: "0", color: "green" }}>
//                     {successMessage}
//                   </span>
//                 )}
//               </div>
//               <br />
//               <input
//                 className="name-input"
//                 type="email"
//                 name="email"
//                 placeholder="E-posta adresi"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//               <br />
//               <input
//                 className="name-input"
//                 type="password"
//                 name="password"
//                 placeholder="Şifre"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//               <br />
//               <button type="submit" className="enter-button">Kayıt Ol</button>
//             </form>
//             <p className="login-singup">Zaten hesabın var mı <Link className="login-sinup-link" href="/giris">Giriş yap</Link></p>
//             <p className="veya">VEYA</p>
//             <button className="google-button">Google ile giriş yap</button>
//             <br />
//             <button className="apple-button">Apple ile giriş yap</button>
//             <p className="description">Google veya Apple kimliğinizle bir sonraki adıma geçmeniz halinde Bireysel Hesap Sözleşmesi ve Eklerini kabul etmiş sayılırsınız.</p>
//             <p className="footer-p">İşletme sahibi misin <b className="footer-b" >Kurumsal hesap aç</b></p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }















"use client";
import "@/app/cssFile/kayit.css";
import Link from "next/link";
import { signup } from "./actions"; // signup fonksiyonunu import ediyoruz
import { useState } from "react";
import Swal from "sweetalert2"; // SweetAlert2'yi import ediyoruz

export default function Kayit() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); // Formun yeniden yüklenmesini engelliyoruz
    const form = new FormData(e.target); // Formdan gelen verileri alıyoruz
  
    try {
      await signup(form); // signup fonksiyonunu çağırıyoruz
      
      // Kayıt başarılı olduğunda SweetAlert çıkar
      Swal.fire({
        title: 'Kayıt Başarılı!',
        text: 'Hesabınız başarıyla oluşturuldu.',
        icon: 'success',
        confirmButtonText: 'Tamam'
      });

      // Formu sıfırlama
      setFormData({
        name: "",
        email: "",
        password: ""
      });
    } catch (error) {
      console.error('Kayıt hatası:', error.message);
      // Hata durumunda da bir SweetAlert gösterebiliriz
      Swal.fire({
        title: 'Hata!',
        text: 'Kayıt sırasında bir sorun oluştu.',
        icon: 'error',
        confirmButtonText: 'Tamam'
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="conteiner">
        <div style={{ textAlign: "center" }}>
          <div className="user-conteiner">
            <h2 style={{ fontWeight: "400" }}>Hesap aç</h2>
            <form onSubmit={handleSubmit}>
              <input
                className="name-input"
                type="text"
                name="name"
                placeholder="Adınız"
                autoFocus
                value={formData.name}
                onChange={handleChange}
              />
              <br />
              <input
                className="name-input"
                type="email"
                name="email"
                placeholder="E-posta adresi"
                value={formData.email}
                onChange={handleChange}
              />
              <br />
              <input
                className="name-input"
                type="password"
                name="password"
                placeholder="Şifre"
                value={formData.password}
                onChange={handleChange}
              />
              <br />
              <button type="submit" className="enter-button">Kayıt Ol</button>
            </form>
            <p className="login-singup">Zaten hesabın var mı <Link className="login-sinup-link" href="/giris">Giriş yap</Link></p>
            <p className="veya">VEYA</p>
            <button className="google-button">Google ile giriş yap</button>
            <br />
            <button className="apple-button">Apple ile giriş yap</button>
            <p className="description">Google veya Apple kimliğinizle bir sonraki adıma geçmeniz halinde Bireysel Hesap Sözleşmesi ve Eklerini kabul etmiş sayılırsınız.</p>
            <p className="footer-p">İşletme sahibi misin <b className="footer-b" >Kurumsal hesap aç</b></p>
          </div>
        </div>
      </div>
    </>
  );
}

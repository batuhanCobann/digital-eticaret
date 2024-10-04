



// // actions.js
// import { supabase } from "@/app/utils/supabase/client"; // Supabase istemcisini import edin
// export const signup = async (formData) => {
//   const { name, email, password } = Object.fromEntries(formData);

//   // Supabase'de kullanıcıyı oluştur
//   const { user, session, error: signupError } = await supabase.auth.signUp({
//     email,
//     password,
//           options: {
//         data: {
//           display_name: name // Kullanıcı adı olarak display_name alanını ekliyoruz
//         }
//       }
//   });

//   // Hata kontrolü
//   if (signupError) {
//     console.error('Kayıt hatası:', signupError.message);
//     throw new Error(signupError.message);
//   }

//   // E-posta doğrulaması gerekiyorsa, kullanıcı hemen giriş yapmayabilir
//   if (!user) {
//     console.log('Kayıt başarılı, e-posta doğrulaması gerekmektedir.');
//     return;
//   }

//   // Kullanıcı bilgileri varsa veritabanına ekle
//     const { error: dbError } = await supabase
//       .from('users')
//       .insert([{ name, email }]); // `id` alanını burada kaldırdık

//   // Veritabanı hatasını kontrol edin
//   if (dbError) {
//     console.error('Veritabanı hatası:', dbError.message);
//     throw new Error(dbError.message);
//   }

//   console.log('Kullanıcı veritabanına başarıyla eklendi:', { id: user.id, name, email });
//   return user; // Başarıyla kayıt edilen kullanıcıyı döndür
// };















// // actions.js
// import { supabase } from "@/app/utils/supabase/client"; // Supabase istemcisini import edin

// export const signup = async (formData) => {
//   const { name, email, password } = Object.fromEntries(formData);

//   // Supabase'de kullanıcıyı oluştur
//   const { user, session, error: signupError } = await supabase.auth.signUp({
//     email,
//     password,
//     options: {
//       data: {
//         display_name: name,
//       },
//     },
//   });

//   // Hata kontrolü
//   if (signupError) {
//     console.error("Kayıt hatası:", signupError.message);
//     throw new Error(signupError.message);
//   }

//   // Kullanıcı oluşturulduysa veritabanına ekleyin
//   if (user) {
//     // Kullanıcı bilgileri varsa veritabanına ekle
//     const { error: dbError } = await supabase
//       .from("users")
//       .insert([{ user_id: user.id, name, email }]); // user_id'yi Supabase Auth'taki uid ile eşleştiriyoruz

//     // Veritabanı hatasını kontrol edin
//     if (dbError) {
//       console.error("Veritabanı hatası:", dbError.message);
//       throw new Error(dbError.message);
//     }

//     console.log("Kullanıcı veritabanına başarıyla eklendi:", { user_id: user.id, name, email });
//     return user; // Başarıyla kayıt edilen kullanıcıyı döndür
//   } else {
//     console.log("Kayıt başarılı, e-posta doğrulaması gerekmektedir.");
//   }
// };




// // actions.js
// import { supabase } from "@/app/utils/supabase/client"; // Supabase istemcisini import edin

// export const signup = async (formData) => {
//   const { name, email, password } = Object.fromEntries(formData);

//   // Supabase'de kullanıcıyı oluştur
//   const { user, session, error: signupError } = await supabase.auth.signUp({
//     email,
//     password,
//     options: {
//       data: {
//         display_name: name,
//       },
//     },
//   });

//   // Hata kontrolü
//   if (signupError) {
//     console.error("Kayıt hatası:", signupError.message);
//     throw new Error(signupError.message);
//   }

//   // Kullanıcı oluşturulduysa başarı mesajı döndür
//   if (user) {
//     console.log("Kullanıcı başarıyla kaydedildi:", { user_id: user.id, name, email });
//     return user; // Başarıyla kayıt edilen kullanıcıyı döndür
//   } else {
//     console.log("Kayıt başarılı, e-posta doğrulaması gerekmektedir.");
//   }
// };








// // actions.js
// import { supabase } from "@/app/utils/supabase/client"; // Supabase istemcisini import edin
// export const signup = async (formData) => {
//   const { name, email, password } = Object.fromEntries(formData);

//   // Supabase'de kullanıcıyı oluştur
//   const { user, session, error: signupError } = await supabase.auth.signUp({
//     email,
//     password,
//           options: {
//         data: {
//           display_name: name // Kullanıcı adı olarak display_name alanını ekliyoruz
//         }
//       }
//   });

//   // Hata kontrolü
//   if (signupError) {
//     console.error('Kayıt hatası:', signupError.message);
//     throw new Error(signupError.message);
//   }

//   // E-posta doğrulaması gerekiyorsa, kullanıcı hemen giriş yapmayabilir
//   if (!user) {
//     console.log('Kayıt başarılı, e-posta doğrulaması gerekmektedir.');
//     return;
//   }

//   // Kullanıcı bilgileri varsa veritabanına ekle
//     const { error: dbError } = await supabase
//       .from('users')
//       .insert([{ name, email }]); // `id` alanını burada kaldırdık

//   // Veritabanı hatasını kontrol edin
//   if (dbError) {
//     console.error('Veritabanı hatası:', dbError.message);
//     throw new Error(dbError.message);
//   }

//   console.log('Kullanıcı veritabanına başarıyla eklendi:', { id: user.id, name, email });
//   return user; // Başarıyla kayıt edilen kullanıcıyı döndür
// };





















import { supabase } from "@/app/utils/supabase/client"; // Supabase istemcisini import edin

export const signup = async (formData) => {
  const { name, email, password } = Object.fromEntries(formData);

  // Supabase'de kullanıcıyı oluştur
  const { data: signUpData, error: signupError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: name,
      },
    },
  });

  // Hata kontrolü
  if (signupError) {
    console.error("Kayıt hatası:", signupError.message);
    throw new Error(signupError.message);
  }

  // Kayıt başarılı mı kontrol edin
  if (signUpData.user) {
    console.log("Kullanıcı başarıyla kaydedildi:", signUpData.user);
    return signUpData.user; // Başarıyla kayıt edilen kullanıcıyı döndür
  } else {
    console.log("Kayıt başarılı, ancak e-posta doğrulaması gerekiyor.");
  }
};

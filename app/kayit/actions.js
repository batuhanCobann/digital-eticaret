import { supabase } from "@/utils/supabase/client"; // Supabase istemcisini import edin

export const signup = async (formData) => {
  const { name, email, password } = Object.fromEntries(formData);

  // Supabase'de kullanıcıyı oluştur
  const { data: userData, error: signupError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: name // Kullanıcı adı olarak display_name alanını ekliyoruz
      }
    }
  });

  // Hata kontrolü
  if (signupError) {
    console.error('Kayıt hatası:', signupError.message);
    throw new Error(signupError.message);
  }

  // `userData` Supabase'ten dönen kullanıcı verisi
  const user = userData.user;  // Burada user verisini alıyoruz

  // E-posta doğrulaması gerekiyorsa, kullanıcı hemen giriş yapmayabilir
  if (!user) {
    console.log('Kayıt başarılı, e-posta doğrulaması gerekmektedir.');
    return;
  }

  // Kullanıcı bilgileri varsa veritabanına ekle (id'yi kaldırdık)
  const { error: dbError } = await supabase
    .from('users')
    .insert([{ name, email }]); // `id` alanını burada kaldırdık

  // Veritabanı hatasını kontrol edin
  if (dbError) {
    console.error('Veritabanı hatası:', dbError.message);
    throw new Error(dbError.message);
  }

  console.log('Kullanıcı veritabanına başarıyla eklendi:', { name, email });
  return user; // Başarıyla kayıt edilen kullanıcıyı döndür
};

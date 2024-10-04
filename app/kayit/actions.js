
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











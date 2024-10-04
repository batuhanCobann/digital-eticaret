
import { supabase } from "@/app/utils/supabase/client"; 

export const signup = async (formData) => {
  const { name, email, password } = Object.fromEntries(formData);

  const { data: signUpData, error: signupError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: name,
      },
    },
  });

  if (signupError) {
    console.error("Kayıt hatası:", signupError.message);
    throw new Error(signupError.message);
  }

  if (signUpData.user) {
    console.log("Kullanıcı başarıyla kaydedildi:", signUpData.user);
    return signUpData.user; 
  } else {
    console.log("Kayıt başarılı, ancak e-posta doğrulaması gerekiyor.");
  }
};











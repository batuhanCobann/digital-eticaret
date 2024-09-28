import Link from "next/link";
import { createClient } from '@/utils/supabase/server';
import { SingOut } from "../login/actions";
import { redirect } from "next/navigation";

export default async function Header() {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        // redirect('/login'); // Giriş yapılmamışsa yönlendirme
    }

    console.log(error);
    console.log(data?.user);
    
    return (
        <>
            <header className="header">
                <div className="header-left">
                    <h2>Lisansanahtar.com</h2>
                    <input type="text" placeholder="Kelime ilan no veya mağaza adı ile ara" />
                </div>
                {data?.user ? (
                    <div className="header-right">
                        {/* E-posta yerine display_name kullanıyoruz */}
                        <span style={{ color: "white" }}>
                            {data.user.user_metadata?.display_name}
                        </span>
                        <form action={SingOut}>
                            <button>Çıkış yap</button>
                        </form>
                        <Link href="/ilan">
                            <button className="new-advert">Ücretsiz İlan Ver</button>
                        </Link>
                    </div>
                ) : (
                    <div className="header-right">
                        <Link style={{ textDecoration: "none", color: "white" }} href={"/giris"}>
                            <p>Giriş Yap</p>
                        </Link>
                        <Link style={{ textDecoration: "none", color: "white" }} href={"/kayit"}>
                            <p>Hesap Aç</p>
                        </Link>
                        <Link href="/ilan">
                            <button className="new-advert">Ücretsiz İlan Ver</button>
                        </Link>
                    </div>
                )}
            </header>
        </>
    );
}

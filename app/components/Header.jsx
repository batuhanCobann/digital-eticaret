// "use client"
// import Link from "next/link";
// import { SingOut } from "../login/actions";
// import "@/app/cssFile/header.css";
// import { useState } from "react";

// export default async function Header({ data,user }) {
//     const [isOpen, setIsOpen] = useState(false)
 
//     return (
//         <>
//             <header className="header">
//                 <div className="header-left">
//                     <h2>Gamebox.com</h2>
//                     <input type="text" placeholder="Kelime ilan no veya mağaza adı ile ara" />
//                 </div>
//                 {data?.user ? (
//                     <div className="header-right">
//                         <div className="header-right-desktop">
//                             <span style={{ color: "white" }}>{data.user.user_metadata?.display_name}</span>
//                             <form action={SingOut}>
//                                 <button>Çıkış yap</button>
//                             </form>
//                             <Link href="/ilan"><button className="new-advert">Ücretsiz İlan Ver</button></Link>
//                         </div>
//                         <div className="header-right-mobile">
//                             <img src="hamburger-menu.svg" alt="" />
//                         </div>
//                     </div>
                    
//                 ) : (
//                     <div className="header-right">
//                         <div className="header-right-desktop">
//                             <Link style={{ textDecoration: "none", color: "white" }} href={"/giris"}><p>Giriş Yap</p></Link>
//                             <Link style={{ textDecoration: "none", color: "white" }} href={"/kayit"}><p>Hesap Aç</p></Link>
//                             <Link href="/ilan"><button className="new-advert">Ücretsiz İlan Ver</button></Link>
//                         </div>
//                         <div className="header-right-mobile">
//                             <img src="hamburger-menu.svg" alt="" />
//                         </div>
//                     </div>
//                 )}
//             </header>
//         </>
//     );
// }


"use client";

import Link from "next/link";
import { SingOut } from "../login/actions";
import "@/app/cssFile/header.css";
import { useState } from "react";
import Image from "next/image";

export default function Header({ user }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen); // Menüyü aç/kapa
    };
    
    return (
        <header className="header">
            <div className="header-left">
                {/* <Image 
                src="/gamebox.png"
                width={100}
                height={30} /> */}
                <h2>Gamebox</h2>
                <ul className="header-ul">
                    <li>Lisans Anahtarları</li>
                    <li><Link className="gameworld-btn" href="/gameWorld">Oyun Dünyası</Link></li>
                </ul>
                
            </div>
            {user ? (
                <div className="header-right">
                    <div className="header-right-desktop">
                        <Link href="/sepet">
                            <Image
                                className="sepet-icon"
                                src="sepet.svg"
                                width={20}
                                height={20}
                                alt="Picture of the author"/>
                        </Link>
                        <span style={{ color: "white" }}>{user.user_metadata?.display_name}</span>
                        <form action={SingOut}>
                            <button className="btn btn-info" >Çıkış yap</button>
                        </form>
                        <Link href="/ilan"><button className="new-advert">İlan Ver</button></Link>
                    </div>
                    <div className="header-right-mobile">
                        {/* <img className="offcanvas-toggle" onClick={toggleMenu} src="hamburger-menu.svg" alt="" /> */}
                        <div>
                        <Link href="/sepet">
                            <Image
                                className="sepet-icon"
                                src="sepet.svg"
                                width={20}
                                height={20}
                                alt="Picture of the author"/>
                        </Link>
                        </div>
                        <div>
                            <Image
                                onClick={toggleMenu}
                                className="offcanvas-toggle"
                                src="hamburger-menu.svg"
                                width={20}
                                height={20}
                                alt="Picture of the author"/>
                        </div>
                        <div className={`offcanvas ${isOpen ? "open" : ""}`}>
                            <button className="offcanvas-close" onClick={toggleMenu}>
                                X
                            </button><br />
                            <Link href="/sepet">
                                <Image
                                    className="sepet-icon"
                                    src="sepet.svg"
                                    width={20}
                                    height={20}
                                    alt="Picture of the author"/>
                            </Link>
                        <Link href="/ilan"><button className="new-advert">İlan Ver</button></Link><br />
                            <span style={{ color: "white" }}>{user.user_metadata?.display_name}</span>
                            <form action={SingOut}>
                                <button>Çıkış yap</button>
                            </form><br />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="header-right">
                    <div className="header-right-desktop">
                        <Link href="/sepet">
                            <Image
                                className="sepet-icon"
                                src="sepet.svg"
                                width={20}
                                height={20}
                                alt="Picture of the author"/>
                        </Link>
                        <Link style={{ textDecoration: "none", color: "white" }} href={"/giris"}><p>Giriş Yap</p></Link>
                        <Link style={{ textDecoration: "none", color: "white" }} href={"/kayit"}><p>Hesap Aç</p></Link>
                        <Link href="/ilan"><button className="new-advert">İlan Ver</button></Link>
                    </div>
                    <div className="header-right-mobile">
                        {/* <img className="offcanvas-toggle" onClick={toggleMenu} src="hamburger-menu.svg" alt="" /> */}
                        <div>
                        <Link href="/sepet">
                                <Image
                                className="sepet-icon"
                                src="sepet.svg"
                                width={20}
                                height={20}
                                alt="Picture of the author"/>
                        </Link>
                        </div>
                        <div>
                            <Image
                                onClick={toggleMenu}
                                className="offcanvas-toggle"
                                src="hamburger-menu.svg"
                                width={20}
                                height={20}
                                alt="Picture of the author"/>
                        </div>
                        <div className={`offcanvas ${isOpen ? "open" : ""}`}>
                            <button className="offcanvas-close" onClick={toggleMenu}>
                                X
                            </button>

                            <Link style={{ textDecoration: "none", color: "white" }} href={"/giris"}><p>Giriş Yap</p></Link>
                            <Link style={{ textDecoration: "none", color: "white" }} href={"/kayit"}><p>Hesap Aç</p></Link>
                            <Link href="/ilan"><button className="new-advert">İlan Ver</button></Link>
                        </div>
                    </div>
                    
                </div>
            )}
        </header>
    );
}

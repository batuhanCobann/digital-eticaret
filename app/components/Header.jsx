
"use client";

import Link from "next/link";
import { SingOut } from "../login/actions";
import "@/app/cssFile/header.css";
import { useState } from "react";
import Image from "next/image";

export default function Header({ user }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen); 
    };
    
    return (
        <header className="header">
            <div className="header-left">
                <Link className="ansayfa-btn" href="/"><h2>Gamebox</h2></Link>
                <ul className="header-ul">
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
                            <button className="exit-btn" >Çıkış yap</button>
                        </form>
                    </div>
                    <div className="header-right-mobile">
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
                            <span style={{ color: "white" }}>{user.user_metadata?.display_name}</span>
                            <form action={SingOut}>
                                <button className="exit-btn">Çıkış yap</button>
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
                    </div>
                    <div className="header-right-mobile">
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
                        </div>
                    </div>
                    
                </div>
            )}
        </header>
    );
}

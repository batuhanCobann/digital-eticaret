import "@/app/cssFile/login.css"
import Link from "next/link"
import { login } from "./actions"
import Swal from 'sweetalert2'

export default function Giris({ searchParams }){
    return(
        <>
        <div >

            <div className="conteiner">
                <div className="conteiner-mini">
                    <div className="user-conteiner">
                        <h2 className="user-h2">Giriş Yap</h2>
                        <form action={login}>
                        {searchParams.error && (
                            <div style={{ backgroundColor:"red"}}>
                                <span>Kullanıcı veya Şifre yanlış</span>
                            </div>
                        )}
                            <input className="name-input" type="email" name="email" placeholder="E-posta adresi" autoFocus /><br />
                            <input className="password-input" type="password" name="password" placeholder="Şifre"/><br />
                            <div className="checkbox-div">
                                <label className="label" htmlFor=""><input type="checkbox" />Oturumum açık kalsın</label>
                                <p className="checkbox-p">Şifremi unuttum</p>
                            </div>
                            <button className="enter-button">E-posta ile giriş yap</button>
                        </form>
                        <p className="singup">Henüz hesabın yok mu? <Link className="singup-link" href="/kayit">Hesap aç</Link></p>
                        <p className="veya">VEYA</p>
                        <button className="google-button">Google ile giriş yap</button><br />
                        <button className="apple-button">Apple ile giriş yap</button>
                        <p className="description">Google veya Apple kimliğinizle bir sonraki adıma geçmeniz halinde Bireysel <br /> Hesap Sözleşmesi ve Eklerini kabul etmiş sayılırsınız.</p>
                        <p className="qr-enter">QR kod ile mobil uyulamadan <b className="qr-enter-b" >Giriş yap</b></p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
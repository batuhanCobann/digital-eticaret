import "@/app/cssFile/login.css"
import Link from "next/link"
import { login } from "./actions"
import Swal from 'sweetalert2'

export default function Giris({ searchParams }){
    return(
        <>
        <div >

            <div className="conteiner">
                <div style={{textAlign:"center"}}>
                    <div className="user-conteiner">
                        <h2 style={{fontWeight:"400", marginBottom:"20px"}}>Giriş Yap</h2>
                        <form action={login}>
                        {searchParams.error && (
                            <div style={{ backgroundColor:"red"}}>
                                <span>Kullanıcı veya Şifre yanlış</span>
                            </div>
                        )}
                            <input className="name-input" type="email" name="email" placeholder="E-posta adresi" autoFocus /><br />
                            <input className="password-input" type="password" name="password" placeholder="Şifre"/><br />
                            <div className="checkbox-div">
                                <label style={{fontWeight:"500", fontSize:"14px", color:"#333" }} htmlFor=""><input type="checkbox" />Oturumum açık kalsın</label>
                                <p style={{cursor:"pointer", color:"#2c7cd1", fontWeight:"300", fontSize:"13px"}}>Şifremi unuttum</p>
                            </div>
                            <button className="enter-button">E-posta ile giriş yap</button>
                        </form>
                        <p style={{marginTop:"20px"}}>Henüz hesabın yok mu? <Link style={{textDecoration:"none", color:"#2c7cd1"}} href="/kayit">Hesap aç</Link></p>
                        <p style={{marginTop:"30px",  fontWeight:"300", fontSize:"13px" }}>VEYA</p>
                        <button className="google-button">Google ile giriş yap</button><br />
                        <button className="apple-button">Apple ile giriş yap</button>
                        <p style={{fontSize:"10px", textAlign:"left", marginTop:"10px"}}>Google veya Apple kimliğinizle bir sonraki adıma geçmeniz halinde Bireysel <br /> Hesap Sözleşmesi ve Ekleri'ni kabul etmiş sayılırsınız.</p>
                        <p style={{marginTop:"20px"}}>QR kod ile mobil uyulamadan <b style={{color:"#2c7cd1", fontSize:"15px"}}>Giriş yap</b></p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
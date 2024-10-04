import Image from "next/image";
import "./globals.css";
import Link from "next/link";
export default function Home() {

    
    return (
    <div className="div-container">
        <Link href="/gameWorld" className="picture">
            {Array.from({ length: 32 }, (_, i) => (
                <Image
                key={i}
                src={`/resim-${i + 1}.webp`}
                width={299}
                height={400}
                alt={`Logo ${i + 1}`}
                />
            ))}
        </Link>
    </div>
    );
}

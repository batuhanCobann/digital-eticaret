import Image from "next/image";

export default function Home() {

    
    return (
        <div>
                <Image
                    src="/resim.webp"
                    width={299}
                    height={400}
                    alt="Logo"
                  />
        </div>
    );
}

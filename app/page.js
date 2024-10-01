// import Image from "next/image";
// import styles from "./page.module.css";
// import Link from "next/link";
// import Header from "./components/Header";
// import { createClient } from "./utils/supabase/server";

// export default async function Home() {

     

//   const supabase = createClient();

    

//   const { data, error } = await supabase.auth.getUser();
//   if (error || !data?.user) {
//       // redirect('/login'); // Giriş yapılmamışsa yönlendirme
//   }

//   console.log(error);
//   console.log(data?.user);
  
//   return (
//     <>
//     <Header data={data} />
//     </>
//   );
// }



export default async function Home() {


    return (
        <>
        </>
    );
}

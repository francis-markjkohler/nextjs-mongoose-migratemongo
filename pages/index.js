import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import axios from 'axios'
import connectDB from "@/db/db";

export const getServerSideProps = async () => {
    try {
        await connectDB();
        const res = await axios.get('http://localhost:3001/api/user');
        const user = res.data;

        return { props: { user } };
    } catch (error) {
        console.error('API request error:', error);
        return { props: { user: [] } }; // Provide an empty array as a fallback
    }
};
export default function Home({user}) {
    console.log(user)
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
         Hello world
            {/*{user.map((item)=> {*/}
            {/*    return(*/}
            {/*        <div>*/}
            {/*            <h1>*/}
            {/*                {item.userName}*/}
            {/*            </h1>*/}
            {/*            <h2>{item.email}</h2>*/}
            {/*        </div>*/}
            {/*    )*/}
            {/*})}*/}
        </div>
      </main>
    </>
  )
}



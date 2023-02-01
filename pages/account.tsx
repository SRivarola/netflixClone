import { getProducts, Product } from "@stripe/firestore-stripe-payments"
import { GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import Membership from "../components/Membership"
import payments from "../config/stripe"
import useAuth from "../hook/useAuth"
import useSubscription from "../hook/useSubscription"

interface Props {
    products: Product[]
}

function Account({ products }: Props) {

    const { user, logOut } = useAuth()
    const subscription = useSubscription(user)
    
  return (
    <div>
        <Head>
            <title>Account - Netflix</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className="bg-[#141414]">
            <Link href='/'>
                <Image 
                    src='https://firebasestorage.googleapis.com/v0/b/netflix-clone-b9cab.appspot.com/o/580b57fcd9996e24bc43c529.png?alt=media&token=9cd3f971-1b89-4377-bb3f-07802b35cb0c'
                    alt='netflix logo'
                    width={120}
                    height={80}
                    className='cursor-pinter object-contain h-auto'
                />
            </Link>
            <Link href='/'>
                <Image 
                    src="https://firebasestorage.googleapis.com/v0/b/netflix-clone-b9cab.appspot.com/o/avatar.png?alt=media&token=80f5b3e5-9204-42d8-a409-901c4ab24560" 
                    alt='avatar'
                    width={30}
                    height={30}
                    className='cursor-pointer rounded'
                />
            </Link>
        </header>

        <main className="pt-28 mx-auto max-w-6xl px-5 pb-12 transition-all md:px-10">
            <div className="flex flex-col gap-x-4 md:flex-row md:items-center">
                <h1 className="text-3xl md:text-4xl">Account</h1>
                <div className="-ml-0.5 flex items-center gap-x-1.5">
                    <Image 
                        src={'https://firebasestorage.googleapis.com/v0/b/netflix-clone-b9cab.appspot.com/o/1675176663277.png?alt=media&token=46000952-dae3-4fc8-8226-9c2e5cc42aa1'}
                        alt='icono'
                        width={28}
                        height={28}
                        className=''
                    />
                    <p className="text-xm font-semibold text-[#555]">Member since {subscription?.created}</p>
                </div>
            </div>

            <Membership />

            <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0">
                <h4 className="text-lg text-[gray]">Plan Details</h4>
                <div className="col-span-2 font-medium">
                    {
                        products.filter(product => product.id === subscription?.product)[0]?.name
                    }
                </div>
                <p className="cursor-pointer text-blue-500 hover:underline md:text-right">Change plan</p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
                <h4 className="text-lg text-[gray]">Settings</h4>
                <p
                    onClick={logOut} 
                    className="col-span-3 cursor-pointer text-blue-500 hover:underline"
                >
                    Sign out of all devices
                </p>
            </div>
            
        </main>
    </div>
  )
}
export default Account

export const getStaticProps: GetStaticProps = async () => {

    const products = await getProducts(payments, {
        includePrices: true,
        activeOnly: true,
    })
        .then(res => res)
        .catch(err => console.log(err.nessage))

    return {
        props: {
            products,
        }
    }
}
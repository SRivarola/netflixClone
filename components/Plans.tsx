import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import useAuth from "../hook/useAuth"
import { BiCheck } from "react-icons/bi"
import { Product } from "@stripe/firestore-stripe-payments"
import Table from "./Table"
import { useState } from "react"
import Loader from "./Loader"
import { loadCheckout } from "../config/stripe"

interface Props {
    products: Product[]
}

function Plans({ products }: Props) {

    const { logOut, user } = useAuth()
    const [selectedPlan, setSelectedPlan] = useState<Product | null>(products[2])
    const [billingLoading, setBillingLoading] = useState(false)

    const subscribeToPlan = () => {
        if(!user) return
        loadCheckout(selectedPlan?.prices[0].id!)
        setBillingLoading(true)
    }

  return (
    <div>
        <Head>
            <title>Home - Netflix</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className='py-0 border-b border-white/10 bg-[#141414]'>
            <Link href='/'>
                <Image 
                    src='https://firebasestorage.googleapis.com/v0/b/netflix-clone-b9cab.appspot.com/o/580b57fcd9996e24bc43c529.png?alt=media&token=9cd3f971-1b89-4377-bb3f-07802b35cb0c'
                    alt='netflix logo' 
                    width={150} 
                    height={90} 
                    className='cursor-pointer object-contain' 
                />
            </Link>
            <button onClick={logOut} className="text-lg font-medium hover:underline">Sign Out</button>
        </header>

        <main className="mx-auto pt-28 max-w-5xl px-5 pb-12 transition-all md:px-10">
            <h1 className="mb-3 text-3xl font-medium">
                Choose the plan that's right for you
            </h1>
            <ul>
                <li className="flex items-center gap-x-2 text-lg">
                    <BiCheck className="h-7 w-7 text-[#e50914]"/> 
                    Watch all you want. Ad-free.
                </li>
                <li className="flex items-center gap-x-2 text-lg">
                    <BiCheck className="h-7 w-7 text-[#e50914]"/>
                    Recomendations just for you.
                </li>
                <li className="flex items-center gap-x-2 text-lg">
                    <BiCheck className="h-7 w-7 text-[#e50914]"/>
                    Change or cancel your plan anytime.
                </li>
            </ul>

            <div className="mt-4 flex flex-col space-y-4">
                <div className="flex w-full items-center self-end md:w-3/5">
                    {
                        products.map(product => (
                            <div
                                onClick={() => setSelectedPlan(product)} 
                                key={product.id} 
                                className={`planBox ${selectedPlan?.id !== product.id && 'opacity-60'}`}
                            >
                                {product.name}
                            </div>
                        ))
                    }
                </div>

                <Table products={products} selectedPlan={selectedPlan} />
                
                <button
                    disabled={!selectedPlan || billingLoading}
                    className={`mx-auto w-11/12 rounded bg-[#e50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${billingLoading && 'opacity-60'}`}
                    onClick={subscribeToPlan}
                >
                    {
                        billingLoading ? (
                            <Loader />
                        ) : (
                            'Subscribe'
                        )
                    }
                </button>
            </div>
        </main>
    </div>
  )
}
export default Plans
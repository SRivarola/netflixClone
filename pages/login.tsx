import { useState } from "react"
import Head from "next/head"
import Image from "next/image"
import { useForm, SubmitHandler } from "react-hook-form"
import useAuth from "../hook/useAuth"

interface Inputs {
  email: string
  password: string
}

function Login() {

  const [login, setLogin] = useState(false)
  const {signIn, signUp} = useAuth()

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async({email, password}) => {
    if(login){
      await signIn(email, password)
    } else {
      await signUp(email, password)
    }
  }
  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src={'https://firebasestorage.googleapis.com/v0/b/netflix-clone-b9cab.appspot.com/o/loginBG.jpg?alt=media&token=e6dddb00-7a7b-4c27-bcd6-59f36f2511d1'}
        alt=''
        fill
        objectFit="cover"
        className="-z-10 !hidden opacity-60 sm:!inline"
      />
      <img 
        src='https://firebasestorage.googleapis.com/v0/b/netflix-clone-b9cab.appspot.com/o/580b57fcd9996e24bc43c529.png?alt=media&token=9cd3f971-1b89-4377-bb3f-07802b35cb0c'
        alt='netflix logo' 
        width={150} 
        height={150} 
        className='absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6' 
      />

      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="realtive mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-3xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input 
              className="input" 
              type='email' 
              placeholder='Email'
              {...register('email', {required: true})} 
            />
            {
              errors.email && (
                <p className="p-1 text-[13px] font-light text-orange-500">
                  Please enter a valid email.
                </p>
              )
            }
          </label>
          <label className="inline-block w-full">
            <input 
              className="input" 
              type='password' 
              placeholder='Password' 
              {...register('password', {required: true})} 
            />
            {
              errors.password && (
                <p className="p-1 text-[13px] font-light text-orange-500">
                  Your password must contain between 4 and 60 characters.
                </p>
              )
            }
          </label>
        </div>
        <button onClick={() => setLogin(true)} type="submit" className="w-full rounded bg-[#e50914] py-3 font-semibold">Sign In</button>

        <div className="text-[gray]">
          New to Netflix?
          <button onClick={() => setLogin(false)} className="text-white hover:underline px-2">Sign up now</button>
        </div>
      </form>

    </div>
  )
}
export default Login
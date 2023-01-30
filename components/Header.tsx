import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import { HiBell } from "react-icons/hi"
import useAuth from "../hook/useAuth"

function Header() {

    const [isScrolled, setIsScrolled] = useState(false)
    const { logOut } = useAuth()

    useEffect(() => {
      const handleScroll = () => {
        if(window.scrollY > 0){
            setIsScrolled(true)
        } else {
            setIsScrolled(false)
        }
      }

      window.addEventListener('scroll', handleScroll)

      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }, [])
    

  return (
    <header className={`py-2 ${isScrolled && 'bg-[#141414]'}`}>
        <div className="flex items-center space-x-2 md:space-x-10">
            <Image 
                src='https://firebasestorage.googleapis.com/v0/b/netflix-clone-b9cab.appspot.com/o/580b57fcd9996e24bc43c529.png?alt=media&token=9cd3f971-1b89-4377-bb3f-07802b35cb0c'
                alt='netflix logo' 
                width={120} 
                height={80} 
                className='cursor-pointer object-contain h-auto' 
            />

            <ul className="hidden space-x-4 md:flex">
                <li className="headerLink">Home</li>
                <li className="headerLink">TV Shows</li>
                <li className="headerLink">Movies</li>
                <li className="headerLink">New & Popular</li>
                <li className="headerLink">My List</li>
            </ul>
        </div>

        <div className="flex items-center space-x-4 text-sm font-light">
            <AiOutlineSearch className="hidden sm:inline h-6 w-6"/>
            <p className="hidden lg:inline">Kids</p>
            <HiBell className="h-6 w-6"/>
            {/* <Link href='/account'> */}
                <Image 
                  onClick={logOut}
                  width={30}
                  height={30}
                  className="cursor-pointer rounded" 
                  src="https://firebasestorage.googleapis.com/v0/b/netflix-clone-b9cab.appspot.com/o/avatar.png?alt=media&token=80f5b3e5-9204-42d8-a409-901c4ab24560" 
                  alt="avatar" 
                />
            {/* </Link> */}
        </div>
    </header>
  )
}
export default Header
import Image from "next/image"
import { useEffect, useState } from "react"
import { baseUrl } from "../constants/movie"
import { Movie } from "../typing"
import { FaPlay } from 'react-icons/fa'
import { BsFillInfoCircleFill } from "react-icons/bs"
import useModal from "../hook/useModal"

interface Props {
    netflixOriginals: Movie[]
}

function Banner({netflixOriginals}: Props) {

    const [movie, setMovie] = useState<Movie | null>(null)
    const { setShowModal, setMovieState } = useModal()

    const handleModal = () => {
        setShowModal(true)
        setMovieState(movie)
    }

    useEffect(() => {
      setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])
    }, [netflixOriginals])

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-2 lg:h-[85vh] lg:justify-end lg:pb-12">
        <div className="absolute top-0 left-0 w-full h-[100vh] -z-10">
            <Image 
                src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
                alt={`${movie?.title}`}
                fill
                className="object-cover"
                priority
            />
        </div>

        <h1 className="text-2xl lg:text-6xl">{movie?.title || movie?.name || movie?.original_name}</h1>

        <p className="max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl  text-shadow-md">{movie?.overview}</p>

        <div className="flex space-x-3">
            <button className="bannerButton bg-white text-black">
                <FaPlay className="h-3 w-3 text-black md:h-4 md:w-4" /> Play
            </button>
            <button onClick={handleModal} className="bannerButton bg-[gray]/70">
                More Info <BsFillInfoCircleFill className="h-4 w-4 md:h-5 md:w-5"/>
            </button>
        </div>
    </div>
  )
}
export default Banner
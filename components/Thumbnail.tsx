import { DocumentData } from "firebase/firestore"
import Image from "next/image"
import useModal from "../hook/useModal"
import { Movie } from "../typing"

interface Props {
    movie: Movie | DocumentData
}

function Thumbnail({movie}: Props) {

  const { setShowModal, setMovieState } = useModal()

  const handleModal = () => {
    setShowModal(true)
    setMovieState(movie)
  }

  return (
    <div onClick={handleModal} className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
        <Image 
            src={`http://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
            fill
            sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
            alt={`${movie.title}`}
            className="rounded-sm object-cover md:rounded"
        />
    </div>
  )
}
export default Thumbnail
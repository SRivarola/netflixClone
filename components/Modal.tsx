import MuiModal from '@mui/material/Modal'
import { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5"
import { FaPlay } from "react-icons/fa"
import { BsPlusLg, BsHandThumbsUp } from "react-icons/bs"
import { BiVolumeMute, BiVolumeFull } from "react-icons/bi"
import { Element, Genre } from '../typing'
import ReactPlayer from 'react-player/lazy'
import useModal from '../hook/useModal'

function Modal() {

    const { showModal, setShowModal, movieState } = useModal()
    const [trailer, setTrailer] = useState('')
    const [genres, setGenres] = useState<Genre[]>([])
    const [muted, setMuted] = useState(false)

    const handleClose = () => { setShowModal(false) }

    useEffect(() => {
      if(!movieState) return 

      async function fetchMovie(){

        const data = await fetch(`https://api.themoviedb.org/3/${movieState?.media_type === 'tv' ? 'tv' : 'movie'}/${movieState?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`)
            .then(res => res.json())
            .catch(err => console.log(err))

        if (data?.videos){
            const index = data.videos.results.findIndex((element: Element) => element.type === 'Trailer')
            setTrailer(data.videos?.results[index]?.key)
        }

        if(data?.genres){
            setGenres(data.genres)
        }

      }

      fetchMovie()

    }, [movieState])

  return (
    <MuiModal className='fixed !top-7 left-0 right-0 x-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide mb-7' open={showModal} onClose={handleClose}>
        <>
            <button onClick={handleClose} className='modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]'>
                <IoClose className='h-6 w-6'/>
            </button>

            <div className='relative pt-[56.25%]'>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${trailer}`}
                    width='100%'
                    height='100%'
                    style={{ position: 'absolute', top: '0', left: '0' }}
                    playing
                    muted={muted}
                />
                <div className='absolute bottom-10 flex w-full items-center justify-between px-10'>
                    <div className='flex space-x-2'>
                        <button className='flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]'>
                            <FaPlay className='h-7 w-7 text-black' />
                            Play
                        </button>

                        <button className='modalButton'>
                            <BsPlusLg className='h-7 w-7'/>
                        </button>
                        
                        <button className='modalButton'>
                            <BsHandThumbsUp className='h-7 w-7'/>
                        </button>

                    </div>
                    <button onClick={() => setMuted(!muted)} className='modalButton'>
                        {
                            muted ? (
                                <BiVolumeMute className='h-6 w-6'/>
                            ) : (
                                <BiVolumeFull className='h-6 w-6'/>
                            )
                        }
                    </button>
                </div>
            </div>
            <div className='flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8'>
                <div className='space-y-6'>
                    <div className='flex items-end space-x-2 text-sm'>
                        <p className='font-semibold text-green-400'>{movieState?.vote_average * 10}% Match</p>
                        <p className='font-light'>{movieState?.release_date || movieState?.first_air_date }</p>
                        <div className='flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs'>
                            HD
                        </div>
                    </div>

                    <div className='flex flex-col gap-x-10 gap-y-4 font-light md:flex-row'>
                        <p className='w-5/6'>{movieState?.overview}</p>
                        <div className='flex flex-col space-y-3 text-sm'>
                            <div>
                                <span className='text-[gray]'>Genres: </span>
                                {
                                    genres.map(genre => genre.name).join(', ')
                                }
                            </div>

                            <div>
                                <span className='text-[gray]'>Original language: </span>
                                {movieState?.original_language}
                            </div>

                            <div className=''>
                            <span className='text-[gray]'>Total votes: </span>
                                {movieState?.vote_count}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    </MuiModal>
  )
}
export default Modal
import { DocumentData } from "firebase/firestore"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"
import { Movie } from "../typing"

interface IModal {
    showModal: boolean
    setShowModal: Dispatch<SetStateAction<boolean>>
    movieState: Movie | DocumentData | null
    setMovieState: Dispatch<SetStateAction<Movie | DocumentData | null>>
}

const ModalContext = createContext<IModal>({
    showModal: false,
    setShowModal: () => false || true,
    movieState: null,
    setMovieState: (movie: Movie | DocumentData | null) => {}
})

interface ModalProviderProps {
    children: React.ReactNode
}

export const ModalProvider = ({children}: ModalProviderProps) => {
    
    const [showModal, setShowModal] = useState(false)
    const [movieState, setMovieState] = useState<Movie | DocumentData | null>(null)
    
    return (
        <ModalContext.Provider value={{
            showModal,
            setShowModal,
            movieState,
            setMovieState
        }}>
            {children}
        </ModalContext.Provider>
    )
}

export default function useModal(){
    return useContext(ModalContext)
}
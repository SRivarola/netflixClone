import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Modal from '../components/Modal'
import Plans from '../components/Plans'
import Row from '../components/Row'
import payments from '../config/stripe'
import useAuth from '../hook/useAuth'
import useModal from '../hook/useModal'
import useSubscription from '../hook/useSubscription'
import { Movie } from '../typing'
import requests from '../utils/requests'

interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
  products: Product[]
}

const Home = ({netflixOriginals, trendingNow, topRated, actionMovies, comedyMovies, horrorMovies, romanceMovies, documentaries, products}: Props) => {
  
  const [list, setList] = useState([])
  const { loading, user } = useAuth()
  const { showModal } = useModal()
  const subscription = useSubscription(user)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [])
  

  if(loading || isLoading) return null
  if(!subscription) return <Plans products={products} />
  return (
    <div className={`relative h-screen bg-gradient-to-b lg:h-[140vh] ${showModal && '!h-screen overflow-hidden'}`}>
      <Head>
        <title>Home - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-16'>
        <Banner netflixOriginals={netflixOriginals}/>

        <section className='space-y-2 md:space-y-12'>
          <Row title='Trending Now' movies={trendingNow} />
          <Row title='Top Rated' movies={topRated} />
          <Row title='Action Thrillers' movies={actionMovies} />

          {/* My List */}
          {/* {list.length && <Row title='My List' movies={list} />} */}

          <Row title='Comedies' movies={comedyMovies} />
          <Row title='Scary Movies' movies={horrorMovies} />
          <Row title='Romance Movies' movies={romanceMovies} />
          <Row title='Documentaries' movies={documentaries} />
        </section>

      </main>
      {showModal && <Modal />}
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {

  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then(res => res)
    .catch(err => console.log(err.message))

  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json())
  ])

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
      products,
    }
  }
}
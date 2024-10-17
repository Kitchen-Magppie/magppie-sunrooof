import { useState } from 'react'
import Buttons from '../components/Buttons'
import Hero from '../components/Hero'

type TCorpus = { file?: File }
const Home = () => {
    const [corpus, setCorpus] = useState<TCorpus>({})
    console.log(corpus)
    return (
        <div className="flex flex-col justify-between items-center min-h-screen">
            <Hero />
            <Buttons
                onChangeFile={(file) => { setCorpus((prev) => ({ ...prev, file })) }}
            />
        </div>
    )
}

export default Home

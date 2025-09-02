import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { useEffect, useState } from 'react'




function App() {
  const [conteudo, setConteudo] = useState(<>Carregando</>)

  async function PegarConteudo() {
    //vai realizar o fetch para a api do rick and morty - usando axios
    //get= busca info, post= adicionar infor, put= alterar info , delete = deletar info 
    const requestOptions = {
      method: 'GET'
    }

    const response = await fetch(
      'https://rickandmortyapi.com/api/character', 
      requestOptions
    )

    if(!response.ok) {
      return []
    }

  
    const data = await response.json()

      //data = {info: {}}
    return data.results 
  }
 async function TransformaEmLista() {
    const todosPersonagens = await PegarConteudo()

   return todosPersonagens.map(personagem => 
      <div className='card char'key={personagem.id}>
        <><img src={personagem.image} alt={`Foto de ${personagem.name}`} /></>
        <h2>{personagem.name}</h2>


        <div className= 'char-info'>
          <span> <b> Espécie</b> {personagem.species}</span>
           <span> <b> Espécie</b> {personagem.gender}</span>

        </div>
    <div>
      <div className= 'lista-secundaria'>
      <b>Paricipações: </b>
      {/* desafio traga as participações, personagem.episode.map() 
      */ }
      </div>
      <h5> <b>Status: </b> {personagem.status} </h5>
    </div>
      </div>
    )
    
  }

  useEffect(() => {
   async function carregar() {
     setConteudo( 
     await TransformaEmLista()
    )
    }
    carregar()
  }, [])

  return (
    <>
      <Header />
      <main>
        {/*filtros*/}
        <div className='lista-principal'>
          {conteudo}
        </div>
      </main>
      <Footer />


    </>
  )
}

export default App

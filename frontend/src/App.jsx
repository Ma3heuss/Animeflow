import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar.jsx'
import AnimeForm from './components/AnimeForm.jsx'
import AnimeList from './components/AnimeList.jsx'
import './App.css'

const API_URL = 'http://127.0.0.1:8000/api/animes/'

export default function App() {
  const [animes, setAnimes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('nome')
  const [mostrarForm, setMostrarForm] = useState(false)

  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      buscarAnimes(search)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [search])

  async function buscarAnimes(nome) {
    setLoading(true)
    setError('')
    try {
      const url = nome ? `${API_URL}?nome=${encodeURIComponent(nome)}` : API_URL
      const resposta = await fetch(url)
      if (!resposta.ok) throw new Error('Falha ao buscar')
      const dados = await resposta.json()
      setAnimes(dados)
    } catch (err) {
      setError('Não foi possível carregar os animes. Verifique se a API Django está rodando.')
    } finally {
      setLoading(false)
    }
  }

  async function handleAdd(novoAnime) {
    try {
      const resposta = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoAnime),
      })
      if (!resposta.ok) throw new Error('Falha ao cadastrar')
      const criado = await resposta.json()
      setAnimes((atual) => [criado, ...atual])
      setMostrarForm(false)
    } catch (err) {
      setError('Não foi possível cadastrar o anime.')
    }
  }

  async function handleDelete(id) {
    try {
      const resposta = await fetch(`${API_URL}${id}/`, { method: 'DELETE' })
      if (!resposta.ok) throw new Error('Falha ao excluir')
    
      setAnimes((atual) => atual.filter((anime) => anime.id !== id))
    } catch (err) {
      setError('Não foi possível excluir o anime.')
    }
  }

  const animesOrdenados = [...animes].sort((a, b) => {
    if (sortBy === 'ano') return a.ano - b.ano
    return a.nome.localeCompare(b.nome)
  })

  return (
    <div className="app">
      <header className="app-header">
        <h1>AnimeFlow</h1>
        <p>sua lista pessoal de animes</p>
      </header>

      <div className="app-controles">
        <SearchBar value={search} onChange={setSearch} />
        <button className="btn-toggle" onClick={() => setMostrarForm((v) => !v)}>
          {mostrarForm ? 'Cancelar' : '+ Novo anime'}
        </button>
      </div>

      {mostrarForm && <AnimeForm onAdd={handleAdd} />}

      <AnimeList
        animes={animesOrdenados}
        loading={loading}
        error={error}
        onDelete={handleDelete}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
    </div>
  )
}

import { useState } from 'react'

export default function AnimeForm({ onAdd }) {
  const [nome, setNome] = useState('')
  const [genero, setGenero] = useState('')
  const [ano, setAno] = useState('')
  const [finalizado, setFinalizado] = useState(false)
  const [erro, setErro] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    if (!nome.trim() || !genero.trim() || !ano) {
      setErro('Preencha nome, gênero e ano antes de cadastrar.')
      return
    }

    onAdd({
      nome: nome.trim(),
      genero: genero.trim(),
      ano: Number(ano),
      finalizado,
    })

    setNome('')
    setGenero('')
    setAno('')
    setFinalizado(false)
    setErro('')
  }

  return (
    <form className="anime-form" onSubmit={handleSubmit}>
      <h2>Adicionar anime</h2>

      {erro && <p className="form-erro">{erro}</p>}

      <div className="form-linha">
        <input
          type="text"
          placeholder="Nome do anime"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Gênero (ex: Shounen)"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        />
        <input
          type="number"
          placeholder="Ano"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
        />
      </div>

      <label className="form-checkbox">
        <input
          type="checkbox"
          checked={finalizado}
          onChange={(e) => setFinalizado(e.target.checked)}
        />
        Já finalizei de assistir
      </label>

      <button type="submit">Adicionar</button>
    </form>
  )
}

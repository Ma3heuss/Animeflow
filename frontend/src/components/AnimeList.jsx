import AnimeCard from './AnimeCard.jsx'

export default function AnimeList({ animes, loading, error, onDelete, sortBy, onSortChange }) {
  if (loading) {
    return <p className="mensagem">Carregando...</p>
  }

  if (error) {
    return <p className="mensagem mensagem-erro">{error}</p>
  }

  return (
    <div>
      <div className="lista-cabecalho">
        <span>
          {animes.length} anime{animes.length !== 1 ? 's' : ''} encontrado{animes.length !== 1 ? 's' : ''}
        </span>
        <label>
          Ordenar por:
          <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
            <option value="nome">Nome</option>
            <option value="ano">Ano</option>
          </select>
        </label>
      </div>

      {animes.length === 0 ? (
        <p className="mensagem">Nenhum item cadastrado.</p>
      ) : (
        <div className="anime-grid">
          {animes.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  )
}

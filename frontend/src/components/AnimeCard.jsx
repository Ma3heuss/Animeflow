export default function AnimeCard({ anime, onDelete }) {
  function handleDelete() {
    const confirmar = window.confirm(`Excluir "${anime.nome}" da lista?`)
    if (confirmar) {
      onDelete(anime.id)
    }
  }

  return (
    <div className="anime-card">
      <div className="anime-card-topo">
        <span className={`badge ${anime.finalizado ? 'badge-ok' : 'badge-pendente'}`}>
          {anime.finalizado ? 'Finalizado' : 'Assistindo'}
        </span>
        <button className="btn-excluir" onClick={handleDelete} title="Excluir">
          ✕
        </button>
      </div>
      <h3>{anime.nome}</h3>
      <p className="anime-card-info">{anime.genero} • {anime.ano}</p>
    </div>
  )
}

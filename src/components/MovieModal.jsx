export const MovieModal = ({ movie, isFavorite, onToggleFavorite, onClose }) => {
  if (!movie) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }} tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content bg-dark text-white border-secondary">
          <div className="modal-header border-secondary">
            <h5 className="modal-title fw-bold">{movie.title} ({movie.year})</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body p-0">
            <div className="ratio ratio-16x9">
              <iframe
                src={`${movie.trailerUrl}?autoplay=1&mute=1`}
                title={movie.title}
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4">
              <div className="d-flex flex-wrap gap-3 align-items-center mb-3">
                <span className="badge bg-warning text-dark"><i className="bi bi-star-fill me-1"></i>{movie.rating} / 10</span>
                <span className="badge bg-secondary">{movie.genre}</span>
                <span className="text-secondary"><i className="bi bi-clock me-1"></i>{movie.duration}</span>
                <span className="text-secondary"><i className="bi bi-graph-up-arrow me-1"></i>{movie.boxOffice}</span>
              </div>
              <p className="text-light">{movie.synopsis}</p>
              <hr className="border-secondary" />
              <p className="mb-1"><strong className="text-secondary">Director:</strong> {movie.director}</p>
              <p className="mb-0"><strong className="text-secondary">Reparto:</strong> {movie.cast.join(', ')}</p>
            </div>
          </div>
          <div className="modal-footer border-secondary">
            <button 
              className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-warning'}`} 
              onClick={() => onToggleFavorite(movie.id)}
            >
              <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'} me-2`}></i>
              {isFavorite ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};
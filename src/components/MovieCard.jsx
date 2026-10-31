import { useState } from 'react';

export const MovieCard = ({ movie, isFavorite, onToggleFavorite, onSelectMovie }) => {
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRate = (e, ratingValue) => {
    e.stopPropagation();
    setUserRating(ratingValue === userRating ? 0 : ratingValue);
  };

  return (
    <div className="card h-100 bg-dark text-white border-secondary movie-card shadow-sm position-relative overflow-hidden">
      <div className="position-relative">
        <img 
          src={movie.poster} 
          alt={movie.title} 
          className="card-img-top object-fit-cover" 
          style={{ height: '320px', cursor: 'pointer' }}
          onClick={() => onSelectMovie(movie)}
        />
        
        <button
          type="button"
          className={`btn btn-sm position-absolute top-0 end-0 m-2 rounded-circle ${
            isFavorite ? 'btn-warning text-dark' : 'btn-dark bg-opacity-75 text-white'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(movie.id);
          }}
          title={isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
        >
          <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}`}></i>
        </button>

        <span className="badge bg-black bg-opacity-75 text-warning position-absolute bottom-0 start-0 m-2">
          <i className="bi bi-cash-stack me-1"></i>{movie.boxOffice}
        </span>
      </div>

      <div className="card-body p-3 d-flex flex-column justify-content-between">
        <div onClick={() => onSelectMovie(movie)} style={{ cursor: 'pointer' }}>
          <h6 className="card-title text-truncate fw-bold mb-1" title={movie.title}>
            {movie.title}
          </h6>
          
          <div className="d-flex justify-content-between align-items-center small text-secondary mb-2">
            <span>{movie.year} • {movie.genre}</span>
            <span className="text-warning fw-semibold">
              <i className="bi bi-star-fill me-1"></i>{movie.rating}
            </span>
          </div>
        </div>

        <div className="border-top border-secondary pt-2 mt-2">
          <div className="d-flex justify-content-between align-items-center">
            <span className="small text-secondary">Mi voto:</span>
            <div className="d-flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <i
                  key={star}
                  className={`bi bi-star-fill small ${
                    (hoverRating || userRating) >= star ? 'text-warning' : 'text-secondary'
                  }`}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={(e) => handleRate(e, star)}
                ></i>
              ))}
            </div>
          </div>

          <button 
            className="btn btn-sm btn-outline-light w-100 mt-2 d-flex align-items-center justify-content-center gap-2"
            onClick={() => onSelectMovie(movie)}
          >
            <i className="bi bi-info-circle"></i> Ver Detalles
          </button>
        </div>
      </div>
    </div>
  );
};
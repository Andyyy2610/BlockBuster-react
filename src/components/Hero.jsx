export const Hero = ({ movie, onSelectMovie }) => {
  if (!movie) return null;

  return (
    <div 
      className="position-relative text-white py-4 py-md-5 px-3 px-md-4 mb-4 rounded-3 overflow-hidden shadow-lg border border-secondary"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(13,15,20,0.95) 15%, rgba(13,15,20,0.7) 60%, rgba(13,15,20,0.3) 100%), url(${movie.backdrop})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '380px'
      }}
    >
      <div className="container-fluid py-2 py-md-3">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <span className="badge bg-warning text-dark fw-bold mb-2">
            <i className="bi bi-fire me-1"></i>BLOCKBUSTER DESTACADO
          </span>
          <h1 className="display-5 display-md-4 fw-black text-white mb-2">{movie.title}</h1>
          
          <div className="d-flex flex-wrap align-items-center gap-3 text-secondary my-2 small">
            <span className="text-warning fw-bold fs-6">
              <i className="bi bi-star-fill me-1"></i>{movie.rating}
            </span>
            <span><i className="bi bi-calendar-event me-1"></i>{movie.year}</span>
            <span><i className="bi bi-clock me-1"></i>{movie.duration}</span>
            <span className="badge bg-secondary bg-opacity-50 border border-secondary text-light">{movie.genre}</span>
          </div>

          <p className="lead fs-6 text-light opacity-75 my-3 line-clamp-2">
            {movie.synopsis}
          </p>

          <div className="d-flex flex-wrap gap-2 pt-2">
            <button className="btn btn-warning fw-bold px-4 py-2" onClick={() => onSelectMovie(movie)}>
              <i className="bi bi-play-circle-fill me-2"></i>Ver Ficha y Tráiler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
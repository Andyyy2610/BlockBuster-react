import { MovieCard } from './MovieCard';

export const MovieGrid = ({ movies, isFavorite, onToggleFavorite, onSelectMovie }) => {
  if (movies.length === 0) {
    return (
      <div className="text-center py-5 my-4 bg-dark bg-opacity-25 rounded-3 border border-secondary border-dashed">
        <i className="bi bi-camera-reels display-3 text-secondary opacity-50 mb-3 d-block"></i>
        <h4 className="text-light">No se encontraron películas</h4>
        <p className="text-secondary mb-0">Intenta modificar los filtros de búsqueda o tu lista de favoritos.</p>
      </div>
    );
  }

  return (
    <div className="row g-3 g-md-4">
      {movies.map((movie) => (
        <div key={movie.id} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex align-items-stretch">
          <div className="w-100">
            <MovieCard
              movie={movie}
              isFavorite={isFavorite(movie.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectMovie={onSelectMovie}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
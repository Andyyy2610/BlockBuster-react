export const MovieFilters = ({ genres, selectedGenre, onSelectGenre }) => {
  return (
    <div className="d-flex flex-wrap gap-2 mb-4">
      {genres.map((genre) => (
        <button
          key={genre}
          className={`btn btn-sm rounded-pill px-3 ${
            selectedGenre === genre ? 'btn-warning text-dark fw-bold' : 'btn-dark text-light border border-secondary'
          }`}
          onClick={() => onSelectGenre(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};
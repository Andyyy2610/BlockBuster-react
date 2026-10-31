import { useState, useMemo } from 'react';
import { MOVIES_DATA, GENRES } from './data/movies';
import { useFavorites } from "./hooks/useFavorites.js";
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MovieFilters } from './components/MovieFilters';
import { MovieGrid } from './components/MovieGrid';
import { MovieModal } from './components/MovieModal';
import { Footer } from './components/Footer';

export default function App() {
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Todos');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const filteredMovies = useMemo(() => {
    return MOVIES_DATA.filter((movie) => {
      const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase()) ||
        movie.cast.some(actor => actor.toLowerCase().includes(search.toLowerCase()));
      const matchesGenre = selectedGenre === 'Todos' || movie.genre === selectedGenre;
      const matchesFavorites = !showFavoritesOnly || favorites.includes(movie.id);

      return matchesSearch && matchesGenre && matchesFavorites;
    });
  }, [search, selectedGenre, showFavoritesOnly, favorites]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar
        search={search}
        setSearch={setSearch}
        favCount={favorites.length}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
      />

      <main className="container flex-grow-1 mt-4">
        {!showFavoritesOnly && !search && (
          <Hero movie={MOVIES_DATA[0]} onSelectMovie={setSelectedMovie} />
        )}

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold m-0 text-white">
            {showFavoritesOnly ? 'Mis Películas Favoritas' : 'Películas Disponibles'}
          </h4>
          <span className="text-secondary small">{filteredMovies.length} títulos</span>
        </div>

        {!showFavoritesOnly && (
          <MovieFilters
            genres={GENRES}
            selectedGenre={selectedGenre}
            onSelectGenre={setSelectedGenre}
          />
        )}

        <MovieGrid
          movies={filteredMovies}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          onSelectMovie={setSelectedMovie}
        />

        {selectedMovie && (
          <MovieModal
            movie={selectedMovie}
            isFavorite={isFavorite(selectedMovie.id)}
            onToggleFavorite={toggleFavorite}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
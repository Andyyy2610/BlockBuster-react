import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MovieCard } from './MovieCard';

describe('Componente: MovieCard', () => {
  let mockMovie;
  let onToggleFavoriteSpy;
  let onSelectMovieSpy;

  beforeEach(() => {
    onToggleFavoriteSpy = jasmine.createSpy('onToggleFavorite');
    onSelectMovieSpy = jasmine.createSpy('onSelectMovie');

    mockMovie = {
      id: 1,
      title: 'Avengers: Endgame',
      year: 2019,
      genre: 'Action',
      rating: 8.4,
      boxOffice: '$2.799B',
      poster: 'https://example.com/poster.jpg'
    };
  });

  it('debe renderizar la información principal de la película (título, taquilla, género y año)', () => {
    render(
      <MovieCard
        movie={mockMovie}
        isFavorite={false}
        onToggleFavorite={onToggleFavoriteSpy}
        onSelectMovie={onSelectMovieSpy}
      />
    );

    expect(screen.getByText('Avengers: Endgame')).not.toBeNull();
    expect(screen.getByText('$2.799B')).not.toBeNull();
    expect(screen.getByText('2019 • Action')).not.toBeNull();
    expect(screen.getByText('8.4')).not.toBeNull();
  });

  it('debe invocar onToggleFavorite con el ID de la película al hacer clic en el botón de favoritos', () => {
    render(
      <MovieCard
        movie={mockMovie}
        isFavorite={false}
        onToggleFavorite={onToggleFavoriteSpy}
        onSelectMovie={onSelectMovieSpy}
      />
    );

    const favButton = screen.getByRole('button', { name: /guardar en favoritos/i });
    fireEvent.click(favButton);

    expect(onToggleFavoriteSpy).toHaveBeenCalledWith(1);
    expect(onToggleFavoriteSpy.calls.count()).toBe(1);
  });

  it('debe reflejar visualmente la clase activa si isFavorite es true', () => {
    render(
      <MovieCard
        movie={mockMovie}
        isFavorite={true}
        onToggleFavorite={onToggleFavoriteSpy}
        onSelectMovie={onSelectMovieSpy}
      />
    );

    const favButton = screen.getByRole('button', { name: /quitar de favoritos/i });
    expect(favButton.className).toContain('btn-warning');
  });

  it('debe actualizar el estado local de puntuación al interactuar con las estrellas', () => {
    const { container } = render(
      <MovieCard
        movie={mockMovie}
        isFavorite={false}
        onToggleFavorite={onToggleFavoriteSpy}
        onSelectMovie={onSelectMovieSpy}
      />
    );
    const stars = container.querySelectorAll('.bi-star-fill.small');
    expect(stars.length).toBe(5);

    fireEvent.click(stars[3]);

    expect(stars[3].className).toContain('text-warning');
    expect(stars[4].className).toContain('text-secondary');
  });

  it('debe invocar onSelectMovie al pulsar "Ver Detalles"', () => {
    render(
      <MovieCard
        movie={mockMovie}
        isFavorite={false}
        onToggleFavorite={onToggleFavoriteSpy}
        onSelectMovie={onSelectMovieSpy}
      />
    );

    const detailsButton = screen.getByRole('button', { name: /ver detalles/i });
    fireEvent.click(detailsButton);

    expect(onSelectMovieSpy).toHaveBeenCalledWith(mockMovie);
  });
});
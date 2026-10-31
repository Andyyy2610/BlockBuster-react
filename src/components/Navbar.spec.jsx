import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from './Navbar';

describe('Componente: Navbar', () => {
  let setSearchSpy;
  let setShowFavoritesOnlySpy;

  beforeEach(() => {
    setSearchSpy = jasmine.createSpy('setSearch');
    setShowFavoritesOnlySpy = jasmine.createSpy('setShowFavoritesOnly');
  });

  it('debe emitir el nuevo valor de búsqueda cuando el usuario escribe en el input', () => {
    render(
      <Navbar
        search=""
        setSearch={setSearchSpy}
        favCount={0}
        showFavoritesOnly={false}
        setShowFavoritesOnly={setShowFavoritesOnlySpy}
      />
    );

    const searchInput = screen.getByPlaceholderText(/buscar película o elenco/i);
    fireEvent.change(searchInput, { target: { value: 'Avatar' } });

    expect(setSearchSpy).toHaveBeenCalledWith('Avatar');
  });

  it('debe alternar la visibilidad del menú colapsable (estado local isNavCollapsed)', () => {
    const { container } = render(
      <Navbar
        search=""
        setSearch={setSearchSpy}
        favCount={2}
        showFavoritesOnly={false}
        setShowFavoritesOnly={setShowFavoritesOnlySpy}
      />
    );

    const collapseDiv = container.querySelector('#navbarContent');
    const toggleButton = screen.getByLabelText(/toggle navigation/i);

    expect(collapseDiv.className).not.toContain('show');

    fireEvent.click(toggleButton);
    expect(collapseDiv.className).toContain('show');

    fireEvent.click(toggleButton);
    expect(collapseDiv.className).not.toContain('show');
  });

  it('debe renderizar el contador de favoritos cuando favCount es mayor a cero', () => {
    render(
      <Navbar
        search=""
        setSearch={setSearchSpy}
        favCount={5}
        showFavoritesOnly={false}
        setShowFavoritesOnly={setShowFavoritesOnlySpy}
      />
    );

    const badge = screen.getByText('5');
    expect(badge).not.toBeNull();
    expect(badge.className).toContain('badge');
  });
});
import { renderHook, act } from '@testing-library/react';
import { useFavorites } from '../hooks/useFavorites';

describe('Hook: useFavorites', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe inicializarse con un arreglo vacío si localStorage no contiene datos', () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([]);
  });

  it('debe agregar un ID a la lista de favoritos y guardarlo en localStorage', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite(101);
    });

    expect(result.current.favorites).toEqual([101]);
    expect(result.current.isFavorite(101)).toBeTrue();
    expect(JSON.parse(localStorage.getItem('blockbuster_favs'))).toEqual([101]);
  });

  it('debe remover el ID si ya existía en favoritos (comportamiento toggle)', () => {
    localStorage.setItem('blockbuster_favs', JSON.stringify([101, 202]));
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite(101);
    });

    expect(result.current.favorites).toEqual([202]);
    expect(result.current.isFavorite(101)).toBeFalse();
    expect(result.current.isFavorite(202)).toBeTrue();
  });
});
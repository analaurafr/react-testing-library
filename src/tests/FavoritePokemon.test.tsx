import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente FavoritePokemon', () => {
  test('Teste se é exibida na tela a mensagem No favorite pokemon found caso a pessoa não tenha Pokémon favorito', () => {
    renderWithRouter(<FavoritePokemon />);
    const naoFavs = screen.getByText(/no favorite pokémon found/i);
    expect(naoFavs).toBeInTheDocument();
  });

  test('Teste se apenas são exibidos os Pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemon />);
  });
});

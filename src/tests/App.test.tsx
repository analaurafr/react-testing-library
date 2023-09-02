import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  test('O primeiro link deve ter o texto Home', () => {
    renderWithRouter(<App />);
    const temHome = screen.getByRole('link', { name: /home/i });
    expect(temHome).toBeInTheDocument();
  });

  test('O segundo link deve ter o texto About', () => {
    renderWithRouter(<App />);
    const temAbout = screen.getByRole('link', { name: /about/i });
    expect(temAbout).toBeInTheDocument();
  });

  test('O terceiro link deve ter o texto Favorite Pokémon', () => {
    renderWithRouter(<App />);
    const temFavoritePokemon = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(temFavoritePokemon).toBeInTheDocument();
  });
});

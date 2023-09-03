import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente Pokedex', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const pageText = screen.getByRole('heading', { name: /encountered pokémon/i });
    expect(pageText).toBeInTheDocument();
  });
});

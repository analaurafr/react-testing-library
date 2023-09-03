import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About/About';

describe('Teste o componente About', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const pagInfos = screen.getByRole('heading', { name: /what does this app do\?/i });
    expect(pagInfos).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', { name: /about pokédex/i });
    expect(heading).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragrafos = screen.getByText(/this application simulates a pokédex, a digital encyclopedia containing all pokémon\./i);
    expect(paragrafos).toBeInTheDocument();
  });

  test('Teste se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const pokedexImage = screen.getByRole('img', { name: /pokédex/i });
    expect(pokedexImage).toBeInTheDocument();

    const expectedImageUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(pokedexImage).toHaveAttribute('src', expectedImageUrl);
  });
});

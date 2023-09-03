import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Teste o componente PokemonDetails', () => {
  it('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />, { route: '/pokemon/25' });

    const nome = screen.getByRole('heading', { name: /pikachu details/i });
    expect(nome).toBeInTheDocument();

    const sumario = screen.getByRole('heading', { name: /summary/i });
    expect(sumario).toBeInTheDocument();

    const texto = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
    expect(texto).toBeInTheDocument();

    const naoLink = screen.queryByRole('link', { name: /More details/i });
    expect(naoLink).not.toBeInTheDocument();
  });

  test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', async () => {
    renderWithRouter(<App />, { route: '/pokemon/25' });
    const localizacoes = screen.getByRole('heading', { name: /game locations of pikachu/i });
    expect(localizacoes).toBeInTheDocument();

    const locais = screen.getAllByAltText(/Pikachu location/i);
    const urls = locais.map((img) => img.getAttribute('src'));
    expect(urls).toContain('https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(urls).toContain('https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');

    const um = screen.getByText(/kanto viridian forest/i);
    expect(um).toBeInTheDocument();
    const dois = screen.getByText(/kanto power plant/i);
    expect(dois).toBeInTheDocument();
    const imagens = pokemonList[0].foundAt;
    expect(imagens).toHaveLength(2);
  });

  test('Teste se o usuário pode favoritar um Pokémon por meio da página de detalhes', async () => {
    const { user } = renderWithRouter(<App />, { route: '/pokemon/10' });

    const favCheckbox = screen.getByLabelText(/pokémon favoritado\?/i);
    await user.click(favCheckbox);

    const favoritado = screen.getByRole('img', { name: /caterpie is marked as favorite/i });
    expect(favoritado).toBeInTheDocument();
    expect(favoritado).toHaveAttribute('src', '/star-icon.png');
    expect(favoritado).toHaveAttribute('alt', 'Caterpie is marked as favorite');
  });
});

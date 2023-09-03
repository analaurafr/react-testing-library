import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente Pokemon', () => {
  test('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />, { route: '/' });

    const nomeCorreto = screen.getByTestId('pokemon-name');
    expect(nomeCorreto).toBeInTheDocument();
    expect(nomeCorreto).toHaveTextContent('Pikachu');

    const tipoCorreto = screen.getByTestId('pokemon-type');
    expect(tipoCorreto).toBeInTheDocument();
    expect(tipoCorreto).toHaveTextContent('Electric');

    const pesoCorreto = screen.getByTestId('pokemon-weight');
    expect(pesoCorreto).toBeInTheDocument();
    expect(pesoCorreto).toHaveTextContent('6.0 kg');

    const imagem = screen.getByRole('img');
    expect(imagem).toHaveAttribute('alt', 'Pikachu sprite');
    expect(imagem).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes do Pokémon', async () => {
    const { user } = renderWithRouter(<App />);
    const maisDetalhes = screen.getByRole('link', { name: /more details/i });
    await user.click(maisDetalhes);
    const detalhes = screen.getByText('Pikachu Details');
    expect(detalhes).toBeInTheDocument();
  });

  test('Teste também se a URL exibida no navegador muda para /pokemon/<id>, em que <id> é o id do Pokémon cujos detalhes se deseja ver', async () => {
    const { user } = renderWithRouter(<App />);
    const maisDetalhes = screen.getByRole('link', { name: 'More details' });
    await user.click(maisDetalhes);
    expect(window.location.pathname).toBe('/pokemon/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémon favoritados', async () => {
    const { user } = renderWithRouter(<App />);
    const maisDetalhes = screen.getByRole('link', { name: 'More details' });
    await user.click(maisDetalhes);
    const checkbox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(checkbox).toBeInTheDocument();
    await user.click(checkbox);
    const favStar = screen.getByAltText('Pikachu is marked as favorite');
    expect(favStar).toBeInTheDocument();
    expect(favStar).toHaveAttribute('src', '/star-icon.png');
  });
});

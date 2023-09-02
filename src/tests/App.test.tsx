import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  test('Teste se a aplicação é redirecionada para a página inicial, na URL /, ao clicar no link Home da barra de navegação', async () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByText('Home');
    await userEvent.click(homeLink);

    const homePageText = screen.getByText('Encountered Pokémon');
    expect(homePageText).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', async () => {
    renderWithRouter(<App />);

    const mainLink = screen.getByRole('main');
    await userEvent.click(mainLink);

    const aboutPage = screen.getByRole('link', { name: /about/i });
    expect(aboutPage).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', async () => {
    renderWithRouter(<App />);

    const mainLink = screen.getByRole('main');
    await userEvent.click(mainLink);

    const favPage = screen.getByRole('link', { name: /favorite/i });
    expect(favPage).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    renderWithRouter(<App />, { route: '/page-not-found' });

    const notFoundText = screen.getByRole('heading', { name: /page requested not found/i });
    expect(notFoundText).toBeInTheDocument();
  });
});

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente FavoritePokemon', () => {
  renderWithRouter(<App />, { route: '/favorites' });

  test('Teste se é exibida na tela a mensagem No favorite pokemon found caso a pessoa não tenha Pokémon favorito', () => {
    const temTexto = screen.getByText('No favorite Pokémon found');
    expect(temTexto).toBeInTheDocument();
  });

  test('Teste se são favoritados', async () => {
    renderWithRouter(<App />, { route: '/' });

    const mais = screen.getByRole('link', { name: /more details/i });
    await userEvent.click(mais);

    const fav = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    await userEvent.click(fav);

    const favPoke = screen.getByRole('link', { name: /favorite pokémon/i });
    await userEvent.click(favPoke);

    const imgs = screen.queryAllByRole('img');
    expect(imgs).toHaveLength(2);
  });
  test('Teste se são removidos', async () => {
    renderWithRouter(<App />);

    const mais = screen.getByRole('link', { name: /more details/i });
    await userEvent.click(mais);

    const fav = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    await userEvent.click(fav);

    const favPoke = screen.getByRole('link', { name: /favorite pokémon/i });
    await userEvent.click(favPoke);
    await userEvent.click(mais);
    await userEvent.click(favPoke);
    await userEvent.click(fav);

    const texto = screen.getByText(/no favorite pokémon found/i);
    expect(texto).toBeInTheDocument();
  });
});

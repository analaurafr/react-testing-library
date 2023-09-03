import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente Pokedex', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />, { route: '/' });

    const temH2 = screen.getByRole('heading', { name: /Encountered Pokémon/i });
    expect(temH2).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', async () => {
    const { user } = renderWithRouter(<App />, { route: '/' });

    const nomePokemon = screen.getByTestId('pokemon-name');

    expect(nomePokemon).toBeInTheDocument();

    const botaoProx = screen.getByRole('button', { name: /próximo pokémon/i });

    expect(botaoProx).toBeInTheDocument();

    await user.click(botaoProx);
    expect(nomePokemon.textContent).toBe('Charmander');

    await user.click(botaoProx);
    expect(nomePokemon.textContent).toBe('Caterpie');

    await user.click(botaoProx);
    expect(nomePokemon.textContent).toBe('Ekans');
  });

  test('O primeiro Pokémon da lista deve ser mostrado ao clicar no botão se estiver no último Pokémon da lista', async () => {
    const { user } = renderWithRouter(<App />, { route: '/' });

    const nomePokemon = screen.getByTestId('pokemon-name');
    const botaoProx = screen.getByRole('button', { name: /próximo pokémon/i });

    await user.click(botaoProx);
    expect(nomePokemon.textContent).toBe('Charmander');
    await user.click(botaoProx);
    await user.click(botaoProx);
    expect(nomePokemon.textContent).toBe('Ekans');
  });

  test('Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição', () => {
    renderWithRouter(<App />, { route: '/' });

    const eletrico = screen.getByRole('button', { name: /electric/i });
    expect(eletrico).toBeInTheDocument();

    const fogo = screen.getByRole('button', { name: /fire/i });
    expect(fogo).toBeInTheDocument();

    const inseto = screen.getByRole('button', { name: /bug/i });
    expect(inseto).toBeInTheDocument();

    const veneno = screen.getByRole('button', { name: /poison/i });
    expect(veneno).toBeInTheDocument();

    const psico = screen.getByRole('button', { name: /psychic/i });
    expect(psico).toBeInTheDocument();

    const normal = screen.getByRole('button', { name: /normal/i });
    expect(normal).toBeInTheDocument();

    const dragao = screen.getByRole('button', { name: /dragon/i });
    expect(dragao).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', async () => {
    const { user } = renderWithRouter(<App />, { route: '/' });
    const tudo = screen.getByRole('button', { name: /All/i });
    const resetFiltro = screen.getByRole('button', { name: /fire/i });

    expect(tudo).toBeInTheDocument();
    await user.click(resetFiltro);
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    await user.click(tudo);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });
});

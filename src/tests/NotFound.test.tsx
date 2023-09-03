import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('Teste o componente NotFound', () => {
  test('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const pageNot = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(pageNot).toBeInTheDocument();
  });

  test('Teste se a página mostra a imagem com o texto alternativo', () => {
    renderWithRouter(<NotFound />);
    const altText = screen.getByRole('img', { name: /clefairy pushing buttons randomly with text i have no idea what i'm doing/i });
    expect(altText).toBeInTheDocument();
  });
});

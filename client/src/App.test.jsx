import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

test('App renders correctly', async () => {
  render(<App />);
  const linkElement = screen.getByText(/title/i);
  expect(linkElement).toBeInTheDocument();
});

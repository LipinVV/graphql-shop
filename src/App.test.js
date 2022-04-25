import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom'
import {BrowserRouter} from "react-router-dom";

test('renders learn react link', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const linkElement = screen.getByText(/Graphql mini-shop/i);
  expect(linkElement).toBeInTheDocument();
});

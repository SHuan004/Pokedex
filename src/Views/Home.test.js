import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home'; 
import { BrowserRouter as Router } from 'react-router-dom';

describe('Home Component', () => {
  test('should render without crashing', () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    expect(screen.getByRole('img')).toHaveClass('pokeball-image');
    expect(screen.getByText('START')).toBeInTheDocument();
  });

  test('should have correct link navigation', () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    expect(screen.getByRole('link')).toHaveAttribute('href', '/index');
  });

  test('button should have correct styling', () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    const button = screen.getByText('START');
    expect(button).toHaveClass('shadow-lg');
    expect(button).toHaveStyle('borderRadius: 9999px');
  });
});

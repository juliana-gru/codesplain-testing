import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createServer } from '../../test/server';
import AuthButtons from './AuthButtons';
import { SWRConfig } from 'swr';

async function renderComponent() {
  render(
      <SWRConfig value={{ provider: () => new Map()}}>
        <MemoryRouter>
          <AuthButtons />
        </MemoryRouter>
      </SWRConfig>
  );

  const links = await screen.findAllByRole('link');
  return { links }
}

describe('When user is not signed in', () => {
  createServer([
    {
      path:'/api/user',
      res: () => {
        return { user: null }
      }
    }
  ]);

  test('sign in and sign up are visible', async () => {
    const { links } = await renderComponent()

    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', '/signin');
    expect(links[1]).toHaveAttribute('href', '/signup');

  });

  test('sign out is not visible', async () => {
    await renderComponent()

    const signOutButton = screen.queryByRole('link', { name: /sign out/i});
    expect(signOutButton).not.toBeInTheDocument();
  });
});


describe('When user is signed in', () => {
  createServer([
    {
      path:'/api/user',
      res: () => {
        return { user: { id: 3, email:'fake@email.com' } }
      }
    }
  ]);

  test('sign in and sign up are not visible', async () => {
    await renderComponent();

    const signInButton = screen.queryByRole('link', { name: /sign in/i});
    const signUpButton = screen.queryByRole('link', { name: /sign up/i});

    expect(signInButton).not.toBeInTheDocument();
    expect(signUpButton).not.toBeInTheDocument();
  });

  test('sign out is visible', async () => {
    await renderComponent()

    const signOutButton = await screen.findByRole('link', { name: /sign out/i});
    expect(signOutButton).toBeInTheDocument();
  });

});

import { screen, render } from '@testing-library/react';
import RepositoriesListItem from './RepositoriesListItem';
import { MemoryRouter } from 'react-router';




function renderComponent() {
  const repository = {
    full_name: 'facebook/react',
    language: 'Javascript',
    description: 'A JS library',
    owner: 'facebook',
    name: 'react',
    html_url: 'https://github.com/facebook/react'
  }

  render(<MemoryRouter>
      <RepositoriesListItem repository={repository}/>
    </MemoryRouter>);
}

test('shows a link to the github homepage for this repository', async () => {
  renderComponent();

  // solve the Act warning by finding the img element that is rendering async
  await screen.findByRole('img', { name: 'Javascript'});
});
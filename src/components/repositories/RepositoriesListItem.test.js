import { screen, render, act } from '@testing-library/react';
import RepositoriesListItem from './RepositoriesListItem';
import { MemoryRouter } from 'react-router';

// jest.mock('../tree/FileIcon', () => {
//   //contents of FileIcon.js
//   return () => {
//     return 'File Icon Component'
//   }
// });

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

  await act(async () => {
    await pause();
  })

  // solve the Act warning by finding the img element that is rendering async
  // await screen.findByRole('img', { name: 'Javascript'});
});

const pause = () => new Promise(resolve => setTimeout(resolve, 100));

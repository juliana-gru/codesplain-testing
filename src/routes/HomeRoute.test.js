import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import HomeRoute from './HomeRoute';
import { createServer } from '../test/server';


createServer([
  {
    path:'/api/repositories',
    res: (req) => {
      const language = req.url.searchParams.get('q').split('language:')[1];

      return {
        items: [
          { id: 1, full_name: `${language}_one` },
          { id: 2, full_name: `${language}_two`}
        ]
      }
    }
  }
]);

test('renders two links for each language', async () => {
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>
    );

  //loop over each language and make sure we see two links for each
  const languages = ['javascript', 'typescript', 'rust', 'go', 'java', 'python'];

  for (let language of languages) {
    const links = await screen.findAllByRole('link', { name: new RegExp(`${language}_`)});

    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent(`${language}_one`);
    expect(links[1]).toHaveAttribute('href', `/repositories/${language}_two`);
  }

});

import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter as Router } from 'react-router-dom';

import ShowBookshelves from './ShowBookshelves';

it('ShowBookshelves renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><ShowBookshelves myBooks={[]} onUpdateBook={jest.fn()} /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});

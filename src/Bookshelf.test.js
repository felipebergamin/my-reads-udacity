import React from 'react';
import ReactDOM from 'react-dom';

import Bookshelf from './Bookshelf';

it('BOokshelf renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Bookshelf books={[]} onUpdateBook={jest.fn()} title="Testing" />, div);
  ReactDOM.unmountComponentAtNode(div);
});

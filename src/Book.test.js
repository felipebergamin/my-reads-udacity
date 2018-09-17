import React from 'react';
import ReactDOM from 'react-dom';

import Book from './Book';

it('Book renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Book book={{}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

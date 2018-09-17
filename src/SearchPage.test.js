import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter as Router } from 'react-router-dom';

import SearchPage from './SearchPage';

it('SearchPage renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><SearchPage onUpdateBook={jest.fn()} /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});

var fetchMock = require('fetch-mock');

fetchMock.get('*', Promise.resolve([]));

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;
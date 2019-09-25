const consoleError = console.error;

global.beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    if (!args[0].includes('was not wrapped in act')) {
      consoleError(...args);
    }
  });
});

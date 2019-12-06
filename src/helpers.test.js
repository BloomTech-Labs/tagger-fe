const help = require('./helpers');

describe('sum function', () => {
  // This is a describe block. You can nest them,
  // to group your tests

  
     // This is a test block. Note the test runner
     // is reporting a success. Not so soon!
     // This test is not done.
  it('sums two integers', () => {
    const expected = 3;
    const actual = help.sum(1, 2);
    expect(actual).toBe(expected); // .toBe() looks for strict equality!
  });
}); 
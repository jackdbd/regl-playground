
const { myFunction, myOtherFunction } = require('../src/index');
// import { myFunction, myOtherFunction } from '../src/index';


describe('myFunction', () => {
  test('one plus two is three', () => {
    expect(myFunction(1, 2)).toBe(3);
  });

  test('one plus two is greater than zero', () => {
    expect(myFunction(1, 2)).toBeGreaterThan(0);
  });

  test('is always true', () => {
    expect(true).toBeTruthy();
  });
});


describe('myOtherFunction', () => {
  test('three minus two is one', () => {
    expect(myOtherFunction(3, 2)).toBe(1);
  });
});

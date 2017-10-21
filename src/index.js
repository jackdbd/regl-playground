const myFunction = (a, b) => {
  console.log(`a+b=${a + b}`);
  return a + b;
};

const myOtherFunction = (a, b) => a - b;

module.exports = {
  myFunction,
  myOtherFunction,
};

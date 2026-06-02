// A simple function to simulate logic before the backend is fully ready
function sum(a, b) {
  return a + b;
}

// The actual automated test case
test('adds 1 + 2 to equal 3 to confirm Jest is configured correctly', () => {
  expect(sum(1, 2)).toBe(3);
});
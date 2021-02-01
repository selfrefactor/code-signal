function languageTransform(code) {}

test("happy", () => {
  const result = languageTransform("afa");
  console.log(result, 1);
  expect(result).toMatchInlineSnapshot(`undefined`);
});

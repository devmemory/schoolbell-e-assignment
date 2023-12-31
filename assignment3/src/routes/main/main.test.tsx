import { RenderResult, fireEvent, render } from "@testing-library/react";
import React from "react";
import Main from "./index";

const nameLengthError = "Name must be at least 3 characters.";
const pwLengthError = "Password must be at least 6 characters.";
const duplicateError = "The name test is duplicated.";

test("1. input fail test", () => {
  const { getByTestId, getByText, queryByText }: RenderResult = render(
    <Main />
  );

  const name = getByTestId("Name");
  const password = getByTestId("Password");
  const confirm = getByText("Confirm");

  fireEvent.change(name, { target: { value: "te" } });

  const nameError = queryByText(nameLengthError);

  expect(nameError).toBeTruthy();

  fireEvent.change(password, { target: { value: "123" } });

  const pwError = queryByText(pwLengthError);

  expect(pwError).toBeTruthy();

  expect(confirm).toHaveProperty("disabled", true);
});

test("2. input success test", () => {
  const { getByTestId, getByText, queryByText }: RenderResult = render(
    <Main />
  );

  const name = getByTestId("Name");
  const password = getByTestId("Password");
  const confirm = getByText("Confirm");

  fireEvent.change(name, { target: { value: "test" } });

  const nameError = queryByText(nameLengthError);

  expect(nameError).toBeFalsy();

  fireEvent.change(password, { target: { value: "123456" } });

  const pwError = queryByText(pwLengthError);

  expect(pwError).toBeFalsy();

  expect(confirm).toHaveProperty("disabled", false);
});

test("3. add user and duplicate test - 1", () => {
  const { getAllByTestId, getByText, queryAllByText }: RenderResult = render(
    <Main />
  );

  const addUser = getByText("Add User");

  fireEvent.click(addUser);

  const names = getAllByTestId("Name");
  const passwords = getAllByTestId("Password");

  expect(names).toHaveLength(2);
  expect(passwords).toHaveLength(2);

  fireEvent.change(names[0], { target: { value: "test" } });
  fireEvent.change(names[1], { target: { value: "test" } });

  fireEvent.change(passwords[0], { target: { value: "123456" } });
  fireEvent.change(passwords[1], { target: { value: "123456" } });

  const duplicate = queryAllByText(duplicateError);

  expect(duplicate).toHaveLength(2);

  const button = getByText("Confirm");

  expect(button).toHaveProperty("disabled", true);
});

test("4. add user and duplicate test - 2", () => {
  const {
    getAllByTestId,
    getByText,
    queryAllByText,
    queryByText,
  }: RenderResult = render(<Main />);

  const addUser = getByText("Add User");

  fireEvent.click(addUser);
  fireEvent.click(addUser);

  const names = getAllByTestId("Name");
  const passwords = getAllByTestId("Password");

  expect(names).toHaveLength(3);
  expect(passwords).toHaveLength(3);

  fireEvent.change(names[0], { target: { value: "test" } });
  fireEvent.change(names[1], { target: { value: "test" } });

  let duplicate = queryAllByText(duplicateError);

  expect(duplicate).toHaveLength(2);

  fireEvent.change(names[2], { target: { value: "te" } });

  let nameError = queryByText(nameLengthError);

  expect(nameError).toBeTruthy();

  fireEvent.change(names[2], { target: { value: "tes" } });

  nameError = queryByText(nameLengthError);

  expect(nameError).toBeFalsy();

  duplicate = queryAllByText(duplicateError);

  expect(duplicate).toHaveLength(2);
});

test("5. delete user and duplicate test", () => {
  const { getAllByTestId, getByText, queryAllByText }: RenderResult = render(
    <Main />
  );

  const addUser = getByText("Add User");

  fireEvent.click(addUser);

  const names = getAllByTestId("Name");
  const passwords = getAllByTestId("Password");

  expect(names).toHaveLength(2);
  expect(passwords).toHaveLength(2);

  fireEvent.change(names[0], { target: { value: "test" } });
  fireEvent.change(names[1], { target: { value: "test" } });

  let duplicate = queryAllByText(duplicateError);

  expect(duplicate).toHaveLength(2);

  const button = getAllByTestId("delete")[1];

  fireEvent.click(button);

  duplicate = queryAllByText(duplicateError);

  expect(duplicate).toHaveLength(0);
});

test("6. result test", () => {
  const { getAllByTestId, getByText, queryByTestId }: RenderResult = render(
    <Main />
  );

  const addUser = getByText("Add User");

  fireEvent.click(addUser);

  const names = getAllByTestId("Name");
  const passwords = getAllByTestId("Password");

  fireEvent.change(names[0], { target: { value: "test" } });
  fireEvent.change(names[1], { target: { value: "test1" } });

  fireEvent.change(passwords[0], { target: { value: "123456" } });
  fireEvent.change(passwords[1], { target: { value: "123456" } });

  const button = getByText("Confirm");

  fireEvent.click(button);

  const result = queryByTestId("result");

  console.log({ result: result?.innerHTML });

  expect(result).toBeTruthy();
});

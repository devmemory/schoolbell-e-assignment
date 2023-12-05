import { RenderResult, fireEvent, render } from "@testing-library/react";
import React from "react";
import Main from "./index";

test("input fail test", () => {
  const { getByTestId, getByText, queryByText }: RenderResult = render(
    <Main />
  );

  const name = getByTestId("Name");
  const password = getByTestId("Password");
  const confirm = getByText("Confirm");

  fireEvent.change(name, { target: { value: "te" } });

  const nameError = queryByText("Name must be at least 3 characters.");

  expect(nameError).toBeTruthy();

  fireEvent.change(password, { target: { value: "123" } });

  const pwError = queryByText("Password must be at least 6 characters.");

  expect(pwError).toBeTruthy();

  expect(confirm).toHaveProperty("disabled", true);
});

test("input success test", () => {
  const { getByTestId, getByText, queryByText }: RenderResult = render(
    <Main />
  );

  const name = getByTestId("Name");
  const password = getByTestId("Password");
  const confirm = getByText("Confirm");

  fireEvent.change(name, { target: { value: "test" } });

  const nameError = queryByText("Name must be at least 3 characters.");

  expect(nameError).toBeFalsy();

  fireEvent.change(password, { target: { value: "123456" } });

  const pwError = queryByText("Password must be at least 6 characters.");

  expect(pwError).toBeFalsy();

  expect(confirm).toHaveProperty("disabled", false);
});

test("add user and duplicate test", () => {
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

  const duplicate = queryAllByText("The name test is duplicated.");

  expect(duplicate).toHaveLength(2);

  const button = getByText("Confirm");

  expect(button).toHaveProperty("disabled", true);
});

test("result test", () => {
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

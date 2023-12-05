import { useState } from "react";
import { UserModel } from "src/models/userModel";
import { USER_INPUT_ENUM, USER_INPUT_TYPE } from "src/utils/constants";

const useUserEditor = () => {
  const [list, setList] = useState<UserModel[]>([
    { name: { value: "" }, password: { value: "" } },
  ]);
  const [result, setResult] = useState<UserModel[]>();

  /** - add new user */
  const addUser = () => {
    const newUser: UserModel = { name: { value: "" }, password: { value: "" } };

    setList([...list, newUser]);
  };

  /** - delete user if list.length > 1 */
  const deleteUser = (index: number) => {
    if (list.length > 1) {
      setList(list.filter((_, i) => i !== index));
    } else {
      alert("At least, one user is needed.");
    }
  };

  /** - show result */
  const confirm = () => {
    setResult(list);
    setList([{ name: { value: "" }, password: { value: "" } }]);
  };

  /** - check if there is error(> -1) */
  const error =
    list.findIndex(
      (e) => e.name?.error !== undefined || e.password?.error !== undefined || e.name!.value === "" || e.password!.value === ''
    ) > -1;

  /** - input and validation */
  const onChangeText = (value: string, i: number, type: USER_INPUT_TYPE) => {
    setList((state) => {
      state[i][type]!.value = value!;

      if (type === USER_INPUT_ENUM.name) {
        state = _validateName(value, i, state);
      }

      if (type === USER_INPUT_ENUM.password) {
        state = _validatePw(value, i, state);
      }

      return [...state];
    });
  };

  /** - validate name */
  const _validateName = (value: string, i: number, state: UserModel[]) => {
    let hasError = false;

    if (value.length < 3) {
      state[i].name!.error = "Name must be at least 3 characters.";

      hasError = true;
    } else if (state[i].name?.error !== undefined) {
      state[i].name!.error = undefined;
    }

    if (!hasError) {
      state.forEach((e, idx) => {
        if (e.name!.value === value && i !== idx) {
          const err = `The name ${value} is duplicated.`;

          state[i].name!.error = err;
          state[idx].name!.error = err;

          hasError = true;
        }

        if (!hasError) {
          state[i].name!.error = undefined;
          state[idx].name!.error = undefined;
        }
      });
    }

    return [...state];
  };

  /** - validate password */
  const _validatePw = (value: string, i: number, state: UserModel[]) => {
    if (value.length < 6) {
      state[i].password!.error = "Password must be at least 6 characters.";
    } else if (state[i].password!.error !== undefined) {
      state[i].password!.error = undefined;
    }

    return [...state];
  };

  return { list, addUser, deleteUser, confirm, result, error, onChangeText };
};

export default useUserEditor;

import { useState } from "react";
import { UserModel } from "src/models/userModel";
import { USER_INPUT_ENUM, USER_INPUT_TYPE } from "src/utils/constants";

const useUserEditor = () => {
  const [list, setList] = useState<UserModel[]>([{ name: "", password: "" }]);
  const [result, setResult] = useState<UserModel[]>();

  /** - add new user */
  const addUser = () => {
    const newUser: UserModel = { name: "", password: "" };

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
    setList([{ name: "", password: "" }]);
  };

  /** - check if there is error(> -1) */
  const error =
    list.findIndex((e) => e.error !== undefined || e.password === "") > -1;

  /** - input and validation */
  const onChangeText = (value: string, i: number, type: USER_INPUT_TYPE) => {
    setList((state) => {
      state[i][type] = value!;

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
      state[i].error = {
        msg: "Name must be at least 3 characters.",
        location: USER_INPUT_ENUM.name,
      };

      hasError = true;
    } else if (state[i].error !== undefined) {
      state[i].error = undefined;
    }

    if (!hasError) {
      state.forEach((e, idx) => {
        if (e.name === value && i !== idx) {
          const err = {
            msg: `The name ${value} is duplicated.`,
            location: USER_INPUT_ENUM.name,
          };

          state[i].error = err;
          state[idx].error = err;

          hasError = true;
        }

        if (!hasError) {
          state[i].error = undefined;
          state[idx].error = undefined;
        }
      });
    }

    return [...state];
  };

  /** - validate password */
  const _validatePw = (value: string, i: number, state: UserModel[]) => {
    if (value.length < 6) {
      state[i].error = {
        msg: "Password must be at least 6 characters.",
        location: USER_INPUT_ENUM.password,
      };
    } else if (state[i].error !== undefined) {
      state[i].error = undefined;
    }

    return [...state];
  };

  return { list, addUser, deleteUser, confirm, result, error, onChangeText };
};

export default useUserEditor;

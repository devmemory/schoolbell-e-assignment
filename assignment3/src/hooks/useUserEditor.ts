import { useState } from "react";
import UserModel from "src/models/userModel";
import { USER_INPUT_ENUM, USER_INPUT_TYPE } from "src/utils/constants";

type DuplicateNameType = {
  [key: string]: number[];
};

const useUserEditor = () => {
  const [list, setList] = useState<UserModel[]>([new UserModel()]);
  const [result, setResult] = useState<UserModel[]>();

  /** - add new user */
  const addUser = () => {
    setList([...list, new UserModel()]);
  };

  /** - delete user if list.length > 1 */
  const deleteUser = (index: number) => {
    if (list.length > 1) {
      setList((state) => {
        state = state.filter((_, i) => i !== index);

        const idxList = _checkNameDuplicate(state);

        if (idxList.length === 0) {
          state.forEach((e) => {
            e.name!.error = undefined;
          });
        }

        return [...state];
      });
    } else {
      alert("At least, one user is needed.");
    }
  };

  /** - show result */
  const confirm = () => {
    setResult(list);
    setList([new UserModel()]);
  };

  /** - check if there is error(> -1) */
  const error = list.findIndex((e) => !e.checkModel()) > -1;

  /** - input and validation */
  const onChangeText = (value: string, i: number, type: USER_INPUT_TYPE) => {
    setList((state) => {
      state[i][type]!.value = value;

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
    const idxList = _checkNameDuplicate(state);

    if (idxList.length > 0) {
      idxList.forEach((idx) => {
        state[idx].name!.error = `The name ${
          state[idx].name!.value
        } is duplicated.`;
      });
    } else {
      state.forEach((e) => {
        e.name!.error = undefined;
      });
    }

    return [...state];
  };

  /** - check duplicate */
  const _checkNameDuplicate = (modelList: UserModel[]) => {
    const obj: DuplicateNameType = {};
    let idxList: number[] = [];

    modelList.forEach((e, i) => {
      if (obj.hasOwnProperty(e.name!.value)) {
        obj[e.name!.value] = [...obj[e.name!.value], i];

        idxList = [...idxList, ...obj[e.name!.value]];
      } else {
        obj[e.name!.value] = [i];
      }
    });

    return idxList;
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

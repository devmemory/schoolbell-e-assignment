import React from "react";
import UserModel from "src/models/userModel";
import { USER_INPUT_ENUM, USER_INPUT_TYPE } from "src/utils/constants";
import UserInput from "./UserInput";
import styles from "./user_box.module.css";

interface UserBoxProps {
  onChangeText: (value: string, i: number, type: USER_INPUT_TYPE) => void;
  list: UserModel[];
  deleteUser: (i: number) => void;
}

const UserBox = ({ list, deleteUser, onChangeText }: UserBoxProps) => {
  const validateAndChange = (
    value: string,
    i: number,
    type: USER_INPUT_TYPE
  ) => {
    onChangeText(value, i, type);
  };

  return (
    <>
      {list.map((e, i) => {
        return (
          <div key={`user_${i}`} className={styles.div_box}>
            <div>
              <p>User - {i}</p>
              <button
                className={styles.btn_close}
                data-testid='delete'
                onClick={() => deleteUser(i)}>
                x
              </button>
            </div>

            <UserInput
              title="Name"
              value={e.name!.value}
              error={e.name?.error}
              onChange={(value) =>
                validateAndChange(value, i, USER_INPUT_ENUM.name)
              }
            />

            <UserInput
              title="Password"
              value={e.password!.value}
              error={e.password?.error}
              onChange={(value) =>
                validateAndChange(value, i, USER_INPUT_ENUM.password)
              }
            />
          </div>
        );
      })}
    </>
  );
};

export default UserBox;

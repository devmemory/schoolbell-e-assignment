import React from "react";
import styles from "./user_btn.module.css";

interface UserBtnProps {
  addUser: () => void;
  confirm: () => void;
  disabled: boolean;
}

const UserBtn = ({ addUser, confirm, disabled }: UserBtnProps) => {
  return (
    <div className={styles.div_btns}>
      <button onClick={addUser}>Add User</button>
      <button onClick={confirm} disabled={disabled}>
        Confirm
      </button>
    </div>
  );
};

export default UserBtn;

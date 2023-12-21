import React from "react";
import UserModel from "src/models/userModel";
import styles from "./user_result.module.css";

interface UserResultProps {
  result?: UserModel[];
}

const UserResult = ({ result }: UserResultProps) => {
  const hidePassword = (pw: string) => {
    let fixed = "";
    for (let i = 0; i < pw.length; i++) {
      if (i < 3) {
        fixed += pw[i];
      } else {
        fixed += "*";
      }
    }

    return fixed;
  };

  return (
    <>
      {result && (
        <div className={styles.div_result} data-testid="result">
          {result.map((e) => {
            return (
              <div key={e.name!.value}>
                UserName: {e.name!.value} <br />
                UserPassword: {hidePassword(e.password!.value)}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default UserResult;

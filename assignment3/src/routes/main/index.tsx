import React from "react";
import useUserEditor from "src/hooks/useUserEditor";
import UserBox from "./components/UserBox";
import UserBtn from "./components/UserBtn";
import UserResult from "./components/UserResult";
import styles from "./main.module.css";

const Main = () => {
  const { list, addUser, deleteUser, confirm, result, error, onChangeText } =
    useUserEditor();

  return (
    <div className={styles.div_main}>
      <UserBox
        list={list}
        deleteUser={deleteUser}
        onChangeText={onChangeText}
      />
      <UserBtn addUser={addUser} confirm={confirm} disabled={error} />
      <UserResult result={result} />
    </div>
  );
};

export default Main;

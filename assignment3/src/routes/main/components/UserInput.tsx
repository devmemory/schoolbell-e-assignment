import React from "react";
import styles from "./user_input.module.css";

interface UserInputProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const UserInput = ({ title, value, onChange, error }: UserInputProps) => {
  const hasError = error !== undefined;

  return (
    <>
      <p>{title}</p>
      <input
        className={
          hasError
            ? `${styles.input_user} ${styles.has_error}`
            : styles.input_user
        }
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className={styles.div_error}>{error}</div>
    </>
  );
};

export default UserInput;

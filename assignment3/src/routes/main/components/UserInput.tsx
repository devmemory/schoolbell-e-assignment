import React from "react";
import styles from "./user_input.module.css";

interface UserInputProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const UserInput = ({ title, value, onChange, error }: UserInputProps) => {
  const checkLength = value.length < 3 && value !== "" && title === "Name";
  const hasError = error !== undefined || checkLength;

  const errMsg = checkLength ? "Name must be at least 3 characters." : error;

  return (
    <>
      <p>{title}</p>
      <input
        className={
          hasError
            ? `${styles.input_user} ${styles.has_error}`
            : styles.input_user
        }
        data-testid={title}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className={styles.div_error}>{errMsg}</div>
    </>
  );
};

export default UserInput;

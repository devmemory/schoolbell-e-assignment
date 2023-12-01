import { USER_INPUT_TYPE } from "src/utils/constants";

export interface UserModel {
  name?: string;
  password?: string;
  error?: {
    msg: string;
    location: USER_INPUT_TYPE;
  };
}

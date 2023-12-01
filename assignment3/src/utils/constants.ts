export const USER_INPUT_ENUM = {
  name: "name",
  password: "password",
} as const;

export type USER_INPUT_TYPE = keyof typeof USER_INPUT_ENUM
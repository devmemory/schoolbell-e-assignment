interface ValueType {
  value: string;
  error?: string;
}

export default class UserModel {
  name: ValueType = { value: "" };
  password: ValueType = { value: "" };

  checkModel() {
    return this.hasValue(this.name) && this.hasValue(this.password);
  }

  hasValue(value: ValueType) {
    return value.value.length >= 3 && value.error === undefined;
  }
}

import User from "./User";

export default interface RegisterRes {
  user: User;
  access_token: string;
}

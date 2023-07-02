import User from "./User";

export default interface LoginRes {
  currentUser: User;
  access_token: string;
}

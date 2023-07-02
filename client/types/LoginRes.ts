import User from "./User";
import Flashcard from "./Flashcard";
import Stats from "./Stats";

export default interface LoginRes {
  currentUser: User;
  access_token: string;
  flashcards: Flashcard[];
  stats: Stats[];
}

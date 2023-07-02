import User from "./User";
import Flashcard from "./Flashcard";
import Stats from "./Stats";

export default interface AuthState {
  loading: boolean;
  user: User | null;
  flashcards: Flashcard[] | null;
  stats: Stats[] | null;
  token: string | null;
  error: string | null | unknown;
  success: boolean;
  isLoggedIn: boolean;
}

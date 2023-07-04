export default interface UpdateScoreData {
  id: number;
  score: number;
  lessonId: number;
  outOf: number;
  userId: number | null;
}

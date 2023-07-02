export interface Unit {
  title: string;
  lessonCount: number;
  lessons: Lesson[][];
}

export interface Lesson {
  type: string;
  text?: string;
  grammar?: Grammar[];
  chart?: Chart[];
  vocabulary?: Vocabulary[];
  exercises?: Exercise[];
}

export interface Grammar {
  text: string[];
  examples: string[];
}

export interface Chart {
  title: string;
  chart: string[];
}

export interface Vocabulary {
  title: string;
  chart: string[];
}

export interface Exercise {
  title: string;
  instructions?: string;
  questions: string[] | MatchingQuestions;
  type: string;
  answers?: string[];
}

export interface MatchingQuestions {
  prompts: string[];
  answers: string[];
}

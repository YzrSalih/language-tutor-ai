export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface ChatRequest {
  messages: ChatMessage[];
  language: string;
  difficulty_level: string;
}

export interface ChatResponse {
  message: string;
  correction?: string;
  explanation?: string;
}

export interface Language {
  code: string;
  name: string;
}

export interface Lesson {
  title: string;
  content: string;
  vocabulary: VocabularyItem[];
  exercises: Exercise[];
}

export interface VocabularyItem {
  word: string;
  meaning: string;
}

export interface Exercise {
  question: string;
  answer: string;
  type?: 'multiple-choice' | 'fill-blank' | 'translation';
}

export interface LessonRequest {
  language: string;
  topic: string;
  difficulty_level: string;
}

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

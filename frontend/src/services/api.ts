import axios from 'axios';
import { 
  ChatRequest, 
  ChatResponse, 
  LessonRequest, 
  Lesson, 
  Language 
} from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Chat endpoints
  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    const response = await api.post<ChatResponse>('/chat', request);
    return response.data;
  },

  // Lesson endpoints
  async generateLesson(request: LessonRequest): Promise<Lesson> {
    const response = await api.post<Lesson>('/generate-lesson', request);
    return response.data;
  },

  // Language endpoints
  async getSupportedLanguages(): Promise<{ languages: Language[] }> {
    const response = await api.get<{ languages: Language[] }>('/languages');
    return response.data;
  },

  // Health check
  async healthCheck(): Promise<{ message: string }> {
    const response = await api.get<{ message: string }>('/');
    return response.data;
  },
};

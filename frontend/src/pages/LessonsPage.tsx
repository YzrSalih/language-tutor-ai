import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BookOpen, Plus, Globe, Target, FileText } from 'lucide-react';
import { apiService } from '../services/api';
import { Language, DifficultyLevel, Lesson } from '../types';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  color: white;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
`;

const LessonCreator = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const CreatorTitle = styled.h2`
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  backdrop-filter: blur(10px);

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    border-color: rgba(255, 255, 255, 0.5);
    outline: none;
  }
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  backdrop-filter: blur(10px);

  option {
    background: #333;
    color: white;
  }

  &:focus {
    border-color: rgba(255, 255, 255, 0.5);
    outline: none;
  }
`;

const CreateButton = styled.button`
  grid-column: 1 / -1;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LessonCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 1.5rem;
`;

const LessonTitle = styled.h3`
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const LessonContent = styled.div`
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const VocabularySection = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h4`
  color: white;
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
`;

const VocabularyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.75rem;
`;

const VocabularyItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const VocabWord = styled.span`
  color: white;
  font-weight: 600;
  display: block;
  margin-bottom: 0.25rem;
`;

const VocabMeaning = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const ExercisesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ExerciseItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ExerciseQuestion = styled.div`
  color: white;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ExerciseAnswer = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-style: italic;
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  font-size: 1.1rem;
`;

const LessonsPage: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('intermediate');
  const [loading, setLoading] = useState(false);
  const [lesson, setLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const response = await apiService.getSupportedLanguages();
        setLanguages(response.languages);
      } catch (error) {
        console.error('Failed to load languages:', error);
      }
    };

    loadLanguages();
  }, []);

  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || loading) return;

    setLoading(true);
    try {
      const response = await apiService.generateLesson({
        language: selectedLanguage,
        topic: topic.trim(),
        difficulty_level: difficulty
      });
      setLesson(response);
    } catch (error) {
      console.error('Failed to create lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <Title>Kişisel Dersler</Title>
        <Subtitle>
          İlginizi çeken konularda özel dersler oluşturun. 
          AI öğretmeniniz size özel içerik, kelime hazinesi ve alıştırmalar hazırlayacak.
        </Subtitle>
      </Header>

      <LessonCreator>
        <CreatorTitle>
          <Plus size={24} />
          Yeni Ders Oluştur
        </CreatorTitle>
        
        <Form onSubmit={handleCreateLesson}>
          <FormGroup>
            <Label>
              <Globe size={16} />
              Dil:
            </Label>
            <Select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>
              <FileText size={16} />
              Konu:
            </Label>
            <Input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Örn: Restoranda yemek sipariş etme"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>
              <Target size={16} />
              Seviye:
            </Label>
            <Select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
            >
              <option value="beginner">Başlangıç</option>
              <option value="intermediate">Orta</option>
              <option value="advanced">İleri</option>
            </Select>
          </FormGroup>

          <CreateButton type="submit" disabled={loading || !topic.trim()}>
            <BookOpen size={20} />
            {loading ? 'Ders Oluşturuluyor...' : 'Ders Oluştur'}
          </CreateButton>
        </Form>
      </LessonCreator>

      {loading && (
        <LoadingMessage>
          AI öğretmeniniz sizin için özel bir ders hazırlıyor...
        </LoadingMessage>
      )}

      {lesson && (
        <LessonCard>
          <LessonTitle>{lesson.title}</LessonTitle>
          <LessonContent>{lesson.content}</LessonContent>

          {lesson.vocabulary && lesson.vocabulary.length > 0 && (
            <VocabularySection>
              <SectionTitle>Kelime Hazinesi</SectionTitle>
              <VocabularyGrid>
                {lesson.vocabulary.map((item, index) => (
                  <VocabularyItem key={index}>
                    <VocabWord>{item.word}</VocabWord>
                    <VocabMeaning>{item.meaning}</VocabMeaning>
                  </VocabularyItem>
                ))}
              </VocabularyGrid>
            </VocabularySection>
          )}

          {lesson.exercises && lesson.exercises.length > 0 && (
            <VocabularySection>
              <SectionTitle>Alıştırmalar</SectionTitle>
              <ExercisesList>
                {lesson.exercises.map((exercise, index) => (
                  <ExerciseItem key={index}>
                    <ExerciseQuestion>{exercise.question}</ExerciseQuestion>
                    <ExerciseAnswer>Cevap: {exercise.answer}</ExerciseAnswer>
                  </ExerciseItem>
                ))}
              </ExercisesList>
            </VocabularySection>
          )}
        </LessonCard>
      )}
    </Container>
  );
};

export default LessonsPage;

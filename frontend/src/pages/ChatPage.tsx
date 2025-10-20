import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Send, Bot, User, Settings } from 'lucide-react';
import { apiService } from '../services/api';
import { ChatMessage, Language, DifficultyLevel } from '../types';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
`;

const SettingsPanel = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const SettingsRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const Select = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  backdrop-filter: blur(10px);
  min-width: 150px;

  option {
    background: #333;
    color: white;
  }
`;

const Label = styled.label`
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ChatContainer = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const MessagesArea = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
  padding-right: 0.5rem;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
`;

const MessageBubble = styled.div<{ $isUser: boolean }>`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  align-items: flex-start;
`;

const Avatar = styled.div<{ $isUser: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${props => props.$isUser ? 'rgba(255, 255, 255, 0.2)' : 'rgba(67, 56, 202, 0.8)'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const MessageContent = styled.div<{ $isUser: boolean }>`
  background: ${props => props.$isUser ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)'};
  padding: 0.75rem 1rem;
  border-radius: 12px;
  color: white;
  line-height: 1.5;
  max-width: 70%;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const InputArea = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: flex-end;
`;

const MessageInput = styled.textarea`
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  backdrop-filter: blur(10px);
  resize: none;
  min-height: 44px;
  max-height: 120px;
  font-size: 1rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const SendButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LoadingIndicator = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);
  padding: 1rem;
`;

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('intermediate');
  const [languages, setLanguages] = useState<Language[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load supported languages
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || loading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputText.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      const response = await apiService.sendMessage({
        messages: [...messages, userMessage],
        language: selectedLanguage,
        difficulty_level: difficulty
      });

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response.message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Container>
      <SettingsPanel>
        <SettingsRow>
          <Label>
            <Settings size={16} />
            Ayarlar:
          </Label>
          <div>
            <Label htmlFor="language">Öğrenilecek Dil:</Label>
            <Select
              id="language"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="difficulty">Seviye:</Label>
            <Select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
            >
              <option value="beginner">Başlangıç</option>
              <option value="intermediate">Orta</option>
              <option value="advanced">İleri</option>
            </Select>
          </div>
        </SettingsRow>
      </SettingsPanel>

      <ChatContainer>
        <MessagesArea>
          {messages.length === 0 && (
            <MessageBubble $isUser={false}>
              <Avatar $isUser={false}>
                <Bot size={20} color="white" />
              </Avatar>
              <MessageContent $isUser={false}>
                Merhaba! Ben senin dil öğretmeniniyim. Hangi konuda yardım istiyorsun? 
                Sorular sorabilir, çeviri isteyebilir veya sadece sohbet edebiliriz!
              </MessageContent>
            </MessageBubble>
          )}
          
          {messages.map((message, index) => (
            <MessageBubble key={index} $isUser={message.role === 'user'}>
              <Avatar $isUser={message.role === 'user'}>
                {message.role === 'user' ? (
                  <User size={20} color="white" />
                ) : (
                  <Bot size={20} color="white" />
                )}
              </Avatar>
              <MessageContent $isUser={message.role === 'user'}>
                {message.content}
              </MessageContent>
            </MessageBubble>
          ))}
          
          {loading && (
            <LoadingIndicator>
              <Bot size={16} />
              Yazıyor...
            </LoadingIndicator>
          )}
          
          <div ref={messagesEndRef} />
        </MessagesArea>

        <InputArea>
          <MessageInput
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Mesajınızı yazın..."
            disabled={loading}
          />
          <SendButton onClick={handleSendMessage} disabled={loading || !inputText.trim()}>
            <Send size={20} />
          </SendButton>
        </InputArea>
      </ChatContainer>
    </Container>
  );
};

export default ChatPage;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import ChatPage from './pages/ChatPage';
import LessonsPage from './pages/LessonsPage';
import HomePage from './pages/HomePage';
import { GlobalStyle } from './styles/GlobalStyle';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/lessons" element={<LessonsPage />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;

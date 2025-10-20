import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MessageCircle, BookOpen, Users, Zap } from 'lucide-react';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const Hero = styled.section`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: white;
  margin-bottom: 1rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  &.primary {
    background: rgba(255, 255, 255, 0.9);
    color: #667eea;

    &:hover {
      background: white;
    }
  }
`;

const Features = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
`;

const FeatureTitle = styled.h3`
  color: white;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
`;

const HomePage: React.FC = () => {
  return (
    <Container>
      <Hero>
        <Title>Dil Öğrenmenin Yeni Yolu</Title>
        <Subtitle>
          AI destekli kişisel dil öğretmeninizle konuşarak, etkileşimli derslerle ve 
          akıllı geri bildirimlerle dil öğrenme yolculuğunuza başlayın.
        </Subtitle>
        <CTAContainer>
          <CTAButton to="/chat" className="primary">
            <MessageCircle size={20} />
            Sohbete Başla
          </CTAButton>
          <CTAButton to="/lessons">
            <BookOpen size={20} />
            Dersleri Keşfet
          </CTAButton>
        </CTAContainer>
      </Hero>

      <Features>
        <FeatureCard>
          <FeatureIcon>
            <MessageCircle size={32} color="white" />
          </FeatureIcon>
          <FeatureTitle>Akıllı Sohbet</FeatureTitle>
          <FeatureDescription>
            AI öğretmeninizle doğal konuşmalar yapın. Hatalarınız anında düzeltilir 
            ve daha iyi ifadeler önerilir.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>
            <BookOpen size={32} color="white" />
          </FeatureIcon>
          <FeatureTitle>Kişisel Dersler</FeatureTitle>
          <FeatureDescription>
            İlginizi çeken konularda, seviyenize uygun dersler oluşturun. 
            Kelime hazinesi ve alıştırmalarla öğrenmenizi destekleyin.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>
            <Zap size={32} color="white" />
          </FeatureIcon>
          <FeatureTitle>Hızlı Geri Bildirim</FeatureTitle>
          <FeatureDescription>
            Anında düzeltmeler ve açıklamalarla öğrenme sürecinizi hızlandırın. 
            Her hatadan bir şeyler öğrenin.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>
            <Users size={32} color="white" />
          </FeatureIcon>
          <FeatureTitle>Çoklu Dil Desteği</FeatureTitle>
          <FeatureDescription>
            İngilizce, İspanyolca, Fransızca ve daha birçok dilde öğrenme 
            fırsatı. Hangi dili öğrenmek istiyorsanız!
          </FeatureDescription>
        </FeatureCard>
      </Features>
    </Container>
  );
};

export default HomePage;

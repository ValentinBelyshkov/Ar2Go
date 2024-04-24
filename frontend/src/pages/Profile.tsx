import { useEffect, useState } from 'react';
import { FooterButton } from '../components/FooterButton';
import { Header } from '../components/Header';
import './Quest.scss';
import api from '../stores/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../stores/auth';

export const Profile = () => {
  const [hearts, setHearts] = useState(3);

  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
    
    const fetchData = async () => {
      const { data } = await api.get('quests');

      const { hearts } = data;

      setHearts(hearts);
    };

    fetchData();
  }, []);

  const renderHearts = (value: number) => {
    const hearts = [];
    for (let i = 0; i < 3; i++) {
      if (i < value) {
        hearts.push(<img src={"/heart.svg"} key={i} />);
      } else {
        hearts.push(<img src={"/heart-empty.svg"} key={i} />);
      }
    }
    return hearts;
  };

  return (
    <div className="quest">
      <Header height={"15%"}>
        <div className="info">
          <div className="hearts">{renderHearts(hearts)}</div>
        </div>  
      </Header>

      <FooterButton onClick={() => navigate('/map')}>
        Начать квест
      </FooterButton>
      
    </div>
  );
}
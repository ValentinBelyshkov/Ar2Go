import { useEffect, useState } from 'react';
import { FooterButton } from '../components/FooterButton';
import { Header } from '../components/Header';
import './Quest.scss';
import api from '../stores/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../stores/auth';

import './Profile.scss';

export const Profile = () => {
  const [name, setName] = useState('');
  const [hearts, setHearts] = useState(3);

  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
    
    const fetchData = async () => {
      const { data } = await api.get('quests');
      const user = await api.get('users/me').then((i) => i.data);

      const { hearts } = data;
      const { name } = user;

      setHearts(hearts);
      setName(name);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (name !== '') {
      api.patch('users/me', { name });
    }
  }, [name]);

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
    <div className="profile">
      <Header height={"40%"}>
        <div className="profile-info">
          <p>Оставшиеся жизни</p>
          <div className="hearts">{renderHearts(hearts)}</div>
        </div>  
        <div className="user-logo">
          <img src="/user.svg" alt="" />
        </div>
      </Header>
      <main>

        <div className="input">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <img src="/shape.svg" alt="" />
        </div>
      </main>
      <FooterButton onClick={() => navigate('/map')}>
        Начать квест
      </FooterButton>
      
    </div>
  );
}
import { useEffect, useState } from 'react';
import { FooterButton } from '../components/FooterButton';
import { Header } from '../components/Header';
import './Quest.scss';
import api from '../stores/api';

export const Quest = () => {
  const [hearts, setHearts] = useState(3);
  const [stars, setStars] = useState(0);

  // const a

  useEffect(() => {
    (async () => {
      const { data } = await api.get('quests');

      const { hearts, stars } = data;

      setHearts(hearts);
      setStars(stars);
    })();
  }, []);

  const onClick = () => {

  }

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
          <div className="stars">{stars}<img src="/star.svg" /></div>
          <div className="hearts">{renderHearts(hearts)}</div>
        </div>  
      </Header>
      <div className="content">
        <h1>Победа!</h1>
        <div className="points">
          <p>Получено баллов:</p>
          <div className="stars">
            <span>100</span>
            <img src="/public/star.svg" width={"39px"} height={"38px"} />
          </div>
        </div>
        <div className="purchase">
          <img src="/public/heart.svg" alt="Heart" width={"37px"} height={"37px"} />
          <p>1 жизнь - 50 баллов</p>
          <a>Купить</a>
        </div>
      </div>
      <FooterButton onClick={onClick}>
        Далее
      </FooterButton>
    </div>
  );
}
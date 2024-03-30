import { useEffect, useState } from 'react';
import { FooterButton } from '../components/FooterButton';
import { Header } from '../components/Header';
import './Quest.scss';
import api from '../stores/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../stores/auth';

export const Quest = () => {
  const [hearts, setHearts] = useState(3);
  const [stars, setStars] = useState(0);
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);

  const pointId = params.get('point');
  const failed = params.get('failed');

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
    
    (async () => {
      if (pointId && failed) {
        const body = {
          pointId,
          hearts: failed === 'true' ? -1 : 0,
          stars: 100,
        };

        const { data } = await api.post('quests', body);

        const { hearts, stars } = data;
  
        setHearts(hearts);
        setStars(stars);
      } else {
        const { data } = await api.get('quests');

        const { hearts, stars } = data;
  
        setHearts(hearts);
        setStars(stars);
      }
    })();
  }, []);

  const onClick = () => {
    navigate(failed === 'true' ? '/webxr/qp' + pointId : '/map');
  };

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
        { failed === 'true' ?
          <h1 className="failed">{"Попробуй еще раз :("}</h1> :
          <>
            <h1>Победа!</h1>
            <div className="points">
              <p>Получено баллов:</p>
              <div className="stars">
                <span>100</span>
                <img src="/star.svg" width={"39px"} height={"38px"} />
              </div>
            </div>
          </>
        }
        { hearts < 3 && stars !== 700 &&
          <div className="purchase">
            <img src="/heart.svg" alt="Heart" width={"37px"} height={"37px"} />
            <p>1 жизнь - 50 баллов</p>
            <a>Купить</a>
          </div>
        }
      </div>
      { stars !== 700 &&
        <FooterButton onClick={onClick}>
          { failed === 'true' ? 'Еще раз!' : 'Далее' }
        </FooterButton>
      }
    </div>
  );
}
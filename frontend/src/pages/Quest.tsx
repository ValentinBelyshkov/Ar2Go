import { useEffect, useState } from 'react';
import { FooterButton } from '../components/FooterButton';
import { Header } from '../components/Header';
import './Quest.scss';
import api from '../stores/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../stores/auth';
import { SOCIALS } from '../constants';

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

  const handleButton = async () => {
    if (failed === 'true') {
      window.location.href = '/webxr/qp' + pointId;
    } else if (stars === 700) {
      await resetQuestsState();
    }

     navigate('/map');
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

  const resetQuestsState = async () => {
    try {
      await api.post('quests/reset');
    } catch (e) {
      console.log(e);
    }
  } 

  return (
    <div className="quest">
      <Header height={"15%"}>
        <div className="info">
          <div className="stars">{stars}<img src="/star.svg" /></div>
          <div className="hearts">{renderHearts(hearts)}</div>
        </div>  
      </Header>
      <div className="content">
        { stars === 700 &&
          <>
            <h1 className='success'>Вы прошли все квесты!</h1>
            <div className="contact">
              <p>Свяжитесь с нами</p>
              <div className="socials">
                <a href={SOCIALS.instagram} target="_blank" rel="noreferrer">
                  <img src="/instagram.svg" />
                </a>
                <a href={SOCIALS.telegram} target="_blank" rel="noreferrer">
                  <img src="/telegram.svg" />
                </a>
                <a href={SOCIALS.whatsapp} target="_blank" rel="noreferrer">
                  <img src="/whatsapp.svg" />
                </a>
                <a href={SOCIALS.youtube} target="_blank" rel="noreferrer">
                  <img src="/youtube.svg" />
                </a>
              </div>
            </div>
          </>
        }
        { stars < 700 && 
          (
            failed === 'true' ?
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
          )
        }
        { hearts < 3 && stars < 700 &&
          <div className="purchase">
            <img src="/heart.svg" alt="Heart" width={"37px"} height={"37px"} />
            <p>1 жизнь - 50 баллов</p>
            <a>Купить</a>
          </div>
        }
      </div>
      <FooterButton onClick={handleButton}>
        { failed === 'true' ? 'Еще раз!' : 'Далее' }
      </FooterButton>
      
    </div>
  );
}
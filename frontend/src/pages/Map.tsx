import { useEffect, useRef, useState } from "react";

import './Map.scss';
import { Header } from "../components/Header";
import { FooterButton } from "../components/FooterButton";
import api from "../stores/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../stores/auth";

export const Map = () => {
  const [distance, setDistance] = useState(0);
  const pointRef = useRef<number | null>(null);
  const [excludePoints, setExcludePoints] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCatchable, setIsCatchable] = useState(false);
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
    
    const receiveMessage = (event: MessageEvent) => {
      if (event.data.target === 'distance') {
        const { distance, point } = event.data;

        // console.log({ distance, point });

        setIsCatchable(distance <= 20);
        setDistance(distance);
        pointRef.current = point;
      }
    };
  
    window.addEventListener('message', receiveMessage);
  
    (async () => {
      try {
        const { data } = await api.get('quests');

        const excludePoints = [];

        for (const i in data) {
          if (i.startsWith('quest') && data[i] === true) {
            excludePoints.push(+i.slice(-1));
          }
        }

        setExcludePoints(excludePoints);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    })();

    return () => {
      window.removeEventListener('message', receiveMessage);
    };
  }, []);

  const startQuest = () => {
    try {
      const point = pointRef.current;

      navigate('/quest/' + point);
    } catch (e) {
      console.log(e);
    }
  }

  return loading ? 
      "loading" : 
      ( <div className="map">
        <iframe src={`/webxr/gotomap?exclude=${excludePoints.join(',')}`} allow="geolocation"/>
        <Header height={"10%"}>
          <h1>{Math.round(distance)} метров до точки</h1>
        </Header>
        <div style={{ display: isCatchable ? "block" : "none" }}>
          <FooterButton onClick={startQuest}>
            Поймать
          </FooterButton>
        </div>
      </div>
      );
}
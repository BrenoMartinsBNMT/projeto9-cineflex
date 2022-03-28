import axios from 'axios';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FooterInfosClient from '../FooterInfosSessionFilms/FooterInfosSessionFilms';

const TimeSessions = styled.div`
  margin-left: 24px;
`;
const EachSession = styled.div`
  p {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    display: flex;
    align-items: center;
    letter-spacing: 0.02em;

    color: #293845;
  }
  button {
    width: 83px;
    height: 43px;
    border: none;
    outline: none;

    background: #e8833a;
    border-radius: 3px;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.02em;

    color: #ffffff;
  }
`;

const SessionButtons = styled.div`
  width: 172px;
  display: flex;
  justify-content: space-between;
  margin: 23px 0px 23px 0px;
  a {
    text-decoration: none;
  }
`;

export default function SelectYourSession() {
  const { idFilms } = useParams();
  let [sessionsTime, setSessionsTime] = useState('');
  let [footerInfos, setFooterInfos] = useState('');

  useEffect(() => {
    let sessions = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilms}/showtimes`
    );
    sessions.then((element) => {
      setSessionsTime(element.data.days);
      setFooterInfos(element.data);
    });
  }, []);

  return (
    <TimeSessions>
      {sessionsTime === '' ? (
        <div>carregando</div>
      ) : (
        sessionsTime.map((element) => {
          return (
            <EachSession key={element.id}>
              <p>{element.date}</p>

              <SessionButtons>
                <Link to={'/selecao-de-assentos/' + element.showtimes[0].id}>
                  <button>{element.showtimes[0].name}</button>
                </Link>
                <Link to={'/selecao-de-assentos/' + element.showtimes[1].id}>
                  <button>{element.showtimes[1].name}</button>
                </Link>
              </SessionButtons>
            </EachSession>
          );
        })
      )}
      <FooterInfosClient
        img={footerInfos.posterURL}
        title={footerInfos.title}
      />
    </TimeSessions>
  );
}

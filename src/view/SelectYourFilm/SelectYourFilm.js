import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
const MainContentSelectFilm = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const PostersFilms = styled.div`
  display: flex;
  justify-content: center;
  width: 145px;
  height: 209px;
  margin: 0px 23px 0px 23px;
  background: #ffffff;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
  border-radius: 3px;

  img {
    width: 129px;
    height: 193px;
  }
`;
export default function SelectYourFilm(props) {
  let [dataFilms, setDataFilms] = useState('');
  let changeTextContent = props.functionChangeText;

  function changeTextContentFunction() {
    changeTextContent('Selecione o Horário');
  }
  useEffect(() => {
    let requisicao = axios.get(
      'https://mock-api.driven.com.br/api/v5/cineflex/movies'
    );

    requisicao.then((element) => {
      setDataFilms(element.data);
    });
  }, []);
  return (
    <MainContentSelectFilm>
      {dataFilms === '' ? (
        <div>carregando</div>
      ) : (
        dataFilms.map((element) => {
          return (
            <PostersFilms key={element.id}>
              <Link to={`/Selecao-de-horarios/${element.id}`}>
                <img
                  src={element.posterURL}
                  alt=""
                  onClick={changeTextContentFunction}
                />
              </Link>
            </PostersFilms>
          );
        })
      )}
    </MainContentSelectFilm>
  );
}

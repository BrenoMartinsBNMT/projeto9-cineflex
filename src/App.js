import styled from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SelectYourFilm from './view/SelectYourFilm/SelectYourFilm';
import NavBar from './view/NavBar/NavBar';
import { useState } from 'react';
import SelectYourSession from './view/SelectYourSession/SelectYourSession';
import SelectSeats from './view/SelectYourSeats/SelectYourSeats';
import SucessOrder from './view/SucessOrder/SucessOrder';
const MainContent = styled.div`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  font-family: 'Roboto';
`;

const TextMainContent = styled.p`
  width: 100vw;
  height: 110px;
  display: flex;
  justify-content: center;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.04em;

  color: #293845;
`;

export default function App() {
  let [textMainContent, setTextMainContent] = useState('Selecione o Filme');
  let [contentSucessOrder, setContentSucessOrder] = useState('');

  function changeTextMainContent(e) {
    setTextMainContent(e);
  }
  function infosSucess(e) {
    setContentSucessOrder(e);
  }
  return (
    <BrowserRouter>
      <NavBar />
      <MainContent>
        <TextMainContent>{textMainContent}</TextMainContent>
        <Routes>
          <Route
            path="/"
            element={
              <SelectYourFilm functionChangeText={changeTextMainContent} />
            }
          />
          <Route
            path="/Selecao-de-horarios/:idFilms"
            element={<SelectYourSession />}
          />
          <Route
            path="/selecao-de-assentos/:idSessao"
            element={
              <SelectSeats
                functionInfosOrder={infosSucess}
                functionChangeText={changeTextMainContent}
              />
            }
          />
          <Route
            path="/pedido-confirmado"
            element={
              <SucessOrder
                data={contentSucessOrder}
                functionChangeText={changeTextMainContent}
              />
            }
          />
        </Routes>
      </MainContent>
    </BrowserRouter>
  );
}

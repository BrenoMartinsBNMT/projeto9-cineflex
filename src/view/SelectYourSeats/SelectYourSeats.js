import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FooterInfosClient from '../FooterInfosSessionFilms/FooterInfosSessionFilms';
const SelectYourSeats = styled.div`
  margin: 0% 7% 0% 7%;
  .Selecionado {
    width: 26px;
    height: 26px;

    background: #8dd7cf;
    border: 1px solid #1aae9e;
    box-sizing: border-box;
    border-radius: 17px;
  }
  .Disponivel {
    width: 26px;
    height: 26px;

    background: #c3cfd9;
    border: 1px solid #7b8b99;
    box-sizing: border-box;
    border-radius: 17px;
  }
  .Indisponivel {
    width: 26px;
    height: 26px;
    background: #fbe192;
    border: 1px solid #f7c52b;
    border-radius: 12px;
  }
`;
const ButtonSeats = styled.button`
  width: 26px;
  height: 26px;

  background: #c3cfd9;
  border: 1px solid #808f9d;
  box-sizing: border-box;
  border-radius: 12px;

  margin: 0px 7px 18px 0px;
  :disabled {
    background: #fbe192;
    border: 1px solid #f7c52b;
    color: inherit;
  }
`;
const SubtitleSeats = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0px 42px 0px;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const InputsInfosClient = styled.div`
  p {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    display: flex;
    align-items: center;

    color: #293845;
  }
  input {
    width: 327px;
    height: 51px;

    background: #ffffff;
    border: 1px solid #d5d5d5;
    box-sizing: border-box;
    border-radius: 3px;
  }
  input::placeholder {
    font-style: italic;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;

    color: #afafaf;
  }
`;
const ButtonReserveSeat = styled.button`
  display: flex;
  align-items: center;

  justify-content: center;

  width: 225px;
  height: 42px;

  margin-top: 25px;
  margin-left: 15%;

  background: #e8833a;
  border-radius: 3px;
  border: none;
  outline: none;

  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;

  letter-spacing: 0.04em;

  color: #ffffff;
`;
export default function SelectSeats(props) {
  let { idSessao } = useParams();
  let navigate = useNavigate();
  let functionChangeText = props.functionChangeText;
  let infosOrder = props.functionInfosOrder;
  let [seats, setSeats] = useState('');
  let [seatsSelecteds, SetSeatsSelecteds] = useState([]);
  let [seatsSelectedsNumber, setSeatsSelectedsNumber] = useState([]);
  let [nameClient, setNameClient] = useState('');
  let [cpfClient, setCpfClient] = useState('');
  functionChangeText('Selecione o(s) assento(s)');
  useEffect(() => {
    let promisse = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`
    );
    promisse.then((element) => {
      setSeats(element.data);
    });
  }, []);

  function SelectSeat(e) {
    let seatsNumber = Number.parseInt(e.target.value);
    SetSeatsSelecteds([...seatsSelecteds, seatsNumber]);
    setSeatsSelectedsNumber([...seatsSelectedsNumber, e.target.innerHTML]);
    e.target.className += ' Selecionado';
  }
  function saveNameClient(e) {
    setNameClient(e.target.value);
  }
  function saveCpfClient(e) {
    setCpfClient(e.target.value);
  }

  function finishOrder(e) {
    e.preventDefault();

    if (seatsSelecteds === []) {
      alert('preencha os campos');
      return;
    } else {
      let promisse = axios.post(
        'https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many',
        { ids: [seatsSelecteds], name: nameClient, cpf: cpfClient }
      );

      promisse.then((element) => {
        let dataOrder = {
          dateFilm: seats.day.weekday + ' ' + seats.day.date,
          nameFilm: seats.movie.title,
          seats: seatsSelectedsNumber,
          name: nameClient,
          cpf: cpfClient,
        };

        infosOrder(dataOrder);

        navigate('/pedido-confirmado', { replace: true });
      });
      promisse.catch((element) => {
        alert(
          'houve algum problema. Preencha os campos novamente ou se o problema persistir contate o adiministrador'
        );
      });
    }
  }

  return (
    <SelectYourSeats>
      {seats === '' ? (
        <div>carregando</div>
      ) : (
        seats.seats.map((element, index) => {
          return (
            <ButtonSeats
              key={index}
              disabled={element.isAvailable === false ? true : false}
              onClick={SelectSeat}
              value={element.id}
            >
              {element.name}
            </ButtonSeats>
          );
        })
      )}
      <SubtitleSeats>
        <div>
          <button className="Selecionado"></button>
          <p>Selecionado</p>
        </div>
        <div>
          <button className="Disponivel"></button>
          <p>Disponível</p>
        </div>
        <div>
          <button className="Indisponivel"></button>
          <p>Indisponível</p>
        </div>
      </SubtitleSeats>

      <InputsInfosClient>
        <p>Nome do comprador:</p>
        <input
          type="text"
          placeholder="Digite seu nome..."
          onChange={saveNameClient}
        />
        <p>CPF do comprador:</p>
        <input
          type="text"
          placeholder="Digite seu CPF..."
          onChange={saveCpfClient}
        />
      </InputsInfosClient>
      <ButtonReserveSeat onClick={finishOrder}>
        Reservar Assento(s)
      </ButtonReserveSeat>

      {seats === '' ? (
        <></>
      ) : (
        <FooterInfosClient
          img={seats.movie.posterURL}
          title={seats.movie.title}
          date={seats.day.weekday + '-' + seats.day.date}
        />
      )}
    </SelectYourSeats>
  );
}

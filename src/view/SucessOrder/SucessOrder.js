import { Link } from 'react-router-dom';
import styled from 'styled-components';

const InfosOrder = styled.div`
  margin-left: 25px;
`;
const Infos = styled.div`
  margin-bottom: 25px;
  p {
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 26px;
    display: flex;
    align-items: center;
    letter-spacing: 0.04em;

    color: #293845;
  }
`;
const TitleInfos = styled.h1`
  margin-bottom: 11px;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  letter-spacing: 0.04em;

  color: #293845;
`;
const ButtonHome = styled.button`
  position: fixed;
  top: 70%;
  left: 21%;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;

  width: 225px;
  height: 42px;
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
export default function SucessOrder(props) {
  let dataOrder = props.data;
  let functionChangeText = props.functionChangeText;

  functionChangeText('Pedido feito com sucesso!');

  return (
    <InfosOrder>
      <Infos>
        <TitleInfos>Filme e sessão</TitleInfos>
        <p>{dataOrder.nameFilm}</p>
        <p>{dataOrder.dateFilm}</p>
      </Infos>
      <Infos>
        <TitleInfos>Ingressos</TitleInfos>
        {dataOrder.seats.map((element) => {
          return <p>{'Assento ' + element}</p>;
        })}
      </Infos>
      <Infos>
        <TitleInfos>Comprador</TitleInfos>
        <p>{dataOrder.name}</p>
        <p>{dataOrder.cpf}</p>
      </Infos>
      <Link to="/">
        <ButtonHome>Voltar pra Home</ButtonHome>
      </Link>
    </InfosOrder>
  );
}

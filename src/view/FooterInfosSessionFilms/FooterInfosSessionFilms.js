import styled from 'styled-components';
const FooterInfosSessionFilms = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100vw;
  height: 117px;
  background: #dfe6ed;
  border: 1px solid #9eadba;
  display: flex;
  align-items: center;
  .border-img {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    margin-left: 20px;
    padding: 8px;
    background: #ffffff;
  }
  img {
    width: 50px;
    height: 76px;
  }
  p {
    margin-left: 14px;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 26px;
    line-height: 30px;
    display: flex;
    align-items: center;

    color: #293845;
  }
`;
export default function FooterInfosClient(props) {
  return (
    <FooterInfosSessionFilms>
      <div className="border-img">
        <img src={props.img} alt="" />{' '}
      </div>
      <div>
        <p>{props.title}</p>
        <p>{props.date}</p>
      </div>
    </FooterInfosSessionFilms>
  );
}

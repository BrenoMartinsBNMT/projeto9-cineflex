import { Link } from 'react-router-dom';
import styled from 'styled-components';
const Nav = styled.div`
  width: 100vw;
  height: 67px;

  background: #c3cfd9;

  display: flex;
  justify-content: center;
  align-items: center;
  a {
    text-decoration: none;
  }
`;
const TextNavBar = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 34px;
  line-height: 40px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #e8833a;
`;
export default function NavBar() {
  return (
    <Nav>
      <Link to="/">
        <TextNavBar>CINEFLEX</TextNavBar>
      </Link>
    </Nav>
  );
}

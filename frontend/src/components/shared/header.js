import * as React from "react";
import Guru from "../../images/guru.png";
import styled from "styled-components";

const Logo = styled.a`
  font-size: 24px;
  text-decoration: none;
  font-weight: 700;
  img {
    margin: 0 !important;
  }
  cursor: pointer;
`;
const Holder = styled.div`
  width: 90%;
  max-width: 1440px;
  margin: auto;
`;
function Header() {
  return (
    <header>
      <Holder>
        <Logo href="/">
          <img width={32} height={33.7614679} src={Guru} alt="Guru" />{" "}
          FitnessGuru.AI
        </Logo>
      </Holder>
    </header>
  );
}

export default Header;

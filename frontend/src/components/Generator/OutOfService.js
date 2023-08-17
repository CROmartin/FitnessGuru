import React from "react";
import styled from "styled-components";
import EmailList from "../shared/EmailList";
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const H1 = styled.h1`
  margin-left: 16px;
  margin-bottom: 96px;
  margin-top: 32px;
  color: white;

  text-transform: uppercase;
  @media (max-width: 480px) {
    font-size: 24px;
  }
`;
function OutOfService() {
  return (
    <Wrapper>
      <H1>Generator is now only available through mobile app!</H1>
      <EmailList />
    </Wrapper>
  );
}

export default OutOfService;

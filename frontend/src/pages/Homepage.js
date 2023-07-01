import React from "react";
import Cloud from "../components/Homepage/Cloud";
import EmailList from "../components/shared/EmailList";
import TypingEffect from "../components/shared/TypingEffect";
import styled from "styled-components";
import { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
`;

const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 64px;
`;

const callToClickAnimation = keyframes`
  0% {
    transform: translateY(0);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
  50% {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  }
  100% {
    transform: translateY(0);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

const CoolButton = styled.button`
  cursor: pointer;
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #3bb0b7;
  color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease, transform 0.3s ease;
  min-width: max-content;
  margin-top: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #4bc5cc;
    transform: translateY(-2px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  }

  &:active {
    background-color: #3aa2a9;
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  animation: ${callToClickAnimation} 2s infinite;
  animation-direction: alternate;
  animation-timing-function: ease-in-out;

  span {
    display: flex;
    align-items: center;
    font-size: 24px;
    margin-left: 8px;
    padding-bottom: 2px;
  }
`;
function Homepage() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Cloud />
      <Column>
        <TypingEffect
          text="AI powered Fitness guru"
          typingSpeed={120}
          delay={0}
        />
        <TypingEffect
          text="Generate your meal plan now!"
          typingSpeed={120}
          delay={3500}
        />
        <CoolButton
          onClick={() => {
            navigate("/generator");
          }}
        >
          Try generator <span>›</span>
        </CoolButton>
      </Column>
      <EmailList />
    </Wrapper>
  );
}

export default Homepage;

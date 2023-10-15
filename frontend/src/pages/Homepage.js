import React from "react";
import Cloud from "../components/Homepage/Cloud";
import EmailList from "../components/shared/EmailList";
import TypingEffect from "../components/shared/TypingEffect";
import styled from "styled-components";
import { keyframes } from "styled-components";
import Screen1 from "../images/screen_1.jpeg";
import Screen2 from "../images/screen_2.jpeg";
import Screen3 from "../images/screen_3.jpeg";
import Screen4 from "../images/screen_4.jpeg";
import Screen5 from "../images/screen_5.jpeg";
import Screen6 from "../images/screen_6.jpeg";

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

const Space = styled.div`
  height: 0px;
  width: 100%;
  margin-top: 10vh;
`;

const Image = styled.img`
  width: auto;
  max-width: 200px;
  height: auto;
`;

const ImageContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 2%;
  margin-top: 64px;
  max-width: 940px;
  overflow-x: scroll;
  scrollbar-width: thin;
  scrollbar-color: gray transparent;

  ::-webkit-scrollbar {
    width: 8px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-button {
    display: none;
  }
`;
function Homepage() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
        <ImageContainer>
          <Image src={Screen1} alt="screen 1" />
          <Image src={Screen2} alt="screen 2" />
          <Image src={Screen3} alt="screen 3" />
          <Image src={Screen4} alt="screen 4" />
          <Image src={Screen5} alt="screen 5" />
          <Image src={Screen6} alt="screen 6" />
        </ImageContainer>

        {/* <CoolButton
          onClick={() => {
            navigate("/generator");
          }}
        >
          Try generator <span>›</span>
        </CoolButton> */}
      </Column>

      <EmailList />
    </Wrapper>
  );
}

export default Homepage;

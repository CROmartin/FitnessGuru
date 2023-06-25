import React from "react";
import styled, { keyframes } from "styled-components";
import LoadingMessages from "./LoadingMessages";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 32px;
  align-items: center;
`;
// Define keyframes for the circle popping

const popUp = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  } 
  40% {
    transform: scale(1.0);
  }
`;

// Styled component for the loader
const LoaderS = styled.div`
  display: inline-block;
  position: relative;
  width: 60px;
  height: 60px;
`;

// Styled component for the dots
const Dot = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.2);
  animation: ${popUp} 1.8s infinite;

  &:nth-child(1) {
    top: 0px;
    left: 50%;
    animation-delay: -0.9s;
  }

  &:nth-child(2) {
    top: 50%;
    right: 0px;
    animation-delay: -0.6s;
  }

  &:nth-child(3) {
    bottom: 0px;
    right: 50%;
    animation-delay: -0.3s;
  }

  &:nth-child(4) {
    bottom: 50%;
    left: 0px;
    animation-delay: 0s;
  }
`;

const Loader = () => {
  return (
    <Wrapper>
      <LoaderS>
        <Dot />
        <Dot />
        <Dot />
        <Dot />
      </LoaderS>
      <LoadingMessages />
    </Wrapper>
  );
};

export default Loader;

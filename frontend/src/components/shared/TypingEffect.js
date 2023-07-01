import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";

const TypingEffectContainer = styled.div`
  font-family: var(--font-mono));
  font-size: 24px;
  min-height: 36px;
  font-weight: 600;
  width: max-content;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  justify-content: flex-start;
  color: white;
  text-transform: uppercase;
  /* Blinking cursor animation */
  ${(props) =>
    props.showCursor &&
    css`
      &::after {
        content: "";
        display: inline-block;
        width: 14px;
        transform: translateY(4px);

        height: 28px;

        background-color: white;
        animation: ${blinkAnimation} 0.7s infinite;
        vertical-align: bottom;
      }
    `};
  

  @media (max-width: 480px) {
    font-size: 18px;
    &::after {
        height: 20px;
        width: 12px;
      }
  }

  
  @media (max-width: 375px) {
    font-size: 16px;
    &::after {
        height: 18px;
        width: 10px;
      }
  
  }
  @media (max-width: 335px) {
    font-size: 14px;
    &::after {
        height: 14px;
        width: 8px;
      }
  
  }
`;

const blinkAnimation = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const TypingEffect = ({ text, typingSpeed, delay }) => {
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    let charIndex = 0;
    let timeoutId;

    const type = () => {
      if (charIndex <= text.length) {
        setTypedText(text.slice(0, charIndex));
        charIndex++;
        timeoutId = setTimeout(type, typingSpeed);
      } else {
        setShowCursor((prevShowCursor) => !prevShowCursor);
      }
    };

    setTimeout(type, delay);
    setTimeout(() => setShowCursor(true), delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [text, typingSpeed]);

  return (
    <TypingEffectContainer showCursor={showCursor}>
      {typedText}
    </TypingEffectContainer>
  );
};

export default TypingEffect;

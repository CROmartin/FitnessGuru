import React, { useState, useEffect } from "react";

import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 32px;
`;
// Styled component for the messages
const Message = styled.div`
  font-size: 18px;
  margin-top: 20px;
  color: white;
  text-align: center;
`;

const LoadingMessages = () => {
  const messages = [
    "Crunching numbers...",
    "Advising with nutrition guru...",
    "Lifting nutritional facts...",
    "Generating perfect meal plan...",
    "Calculating calories...",
    "Balancing macronutrients...",
    "Finding perfect recipes...",
    "Optimizing grocery list...",
  ];

  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate a random index for the messages array
      const messageIndex = Math.floor(Math.random() * messages.length);
      setMessage(messages[messageIndex]);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [messages]);

  return (
    <Wrapper>
      <Message>{message}</Message>
    </Wrapper>
  );
};

export default LoadingMessages;

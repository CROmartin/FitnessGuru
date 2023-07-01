import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import guru from "../../images/guru.png";

const StyledCloud = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 64px;

  @media (max-width: 480px) {
    margin-bottom: 32px;
  }
`;
const Guru = styled.div`
  height: 0;
  overflow: visible;
  transition: transform 0.5s ease-in-out;
  ${(props) =>
    props.sizeCof && `transform: translateY(${props.sizeCof * 128}px);`}

  ${(props) =>
    props.isVisible && `transform: translateY(${props.sizeCof * 96}px);`}

    @media (max-width: 480px) {
    .gatsby-image-wrapper {
      width: 45vw;
      height: auto;
    }
    img {
      width: 50vw;
      height: 50vw;

      max-width: 218px;
      max-height: 230px;
    }
  }
`;
function Cloud() {
  let maxSize = 500;
  const [cloudSize, setCloudSize] = useState(maxSize);
  const [sizeCof, setSizeCof] = useState(1);

  const [isVisible, setIsVisible] = useState(false);

  const canvasRef = useRef(null);
  const cloudRadius = cloudSize / 2;
  const pointSize = 13;

  useEffect(() => {
    const handleResize = () => {
      setCloudSize(Math.min(window.innerWidth - 64, maxSize));
      if (window.innerWidth < maxSize) {
        setSizeCof((window.innerWidth - 64) / maxSize);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const interval = setInterval(() => {
      setIsVisible((prevIsVisible) => !prevIsVisible);
    }, 500);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const yitterCof = 0.2;
    const generateCloud = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < cloudSize; y += pointSize) {
        for (let x = 0; x < cloudSize; x += pointSize) {
          const distanceX = (x - centerX) / cloudRadius;
          const distanceY = (y - centerY) / cloudRadius;
          const distance = Math.sqrt(
            (distanceX / Math.max(yitterCof, Math.random())) ** 2 +
              (distanceY / Math.max(yitterCof, Math.random())) ** 2
          );

          const random = distance <= 1 ? Math.round(Math.random()) : null;

          if (random !== null) {
            context.fillStyle = "white";
            context.fillText(random, x + pointSize / 2, y + pointSize / 2);
          }
        }
      }
    };

    context.font = `${pointSize}px monospace`;
    context.textAlign = "center";
    context.textBaseline = "middle";

    //const intervalDuration = 100 // Adjust interval duration in milliseconds (e.g., 2000 = 2 seconds)

    // const intervalId = setInterval(() => {
    //   generateCloud()
    // }, intervalDuration)
    generateCloud();

    return () => {
      //   clearInterval(intervalId)
    };
  }, [cloudSize]);

  return (
    <StyledCloud>
      <Guru isVisible={isVisible} sizeCof={sizeCof}>
        <img width={218} height={230} src={guru} alt="gure" />
      </Guru>
      <canvas ref={canvasRef} width={cloudSize} height={cloudSize} />
    </StyledCloud>
  );
}

export default Cloud;

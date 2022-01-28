import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import pigeon from '../../assets/images/pigeon.png';
import flame from '../../assets/images/flame.png';
import COLOR from '../../constants/color';

const Progress = styled.div`
  border-radius: 50px;
  background-color: ${COLOR.WHITE};
  width: calc(100% - 50px);
`;
const ProgressBar = styled.div`
  border-radius: 50px;
  background-color: ${COLOR.PROGRESS_BAR};
  width: 100%;
  height: 30px;
  position: relative;

  &::before {
    content: '';
    display: block;
    width: 60px;
    height: 60px;
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translateY(-40%);
    background-image: url(${flame});
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  &::after {
    content: '';
    display: block;
    width: 54px;
    height: 54px;
    position: absolute;
    right: 0;
    bottom: 0;
    transform: scaleX(-1) translateY(-40%);
    background-image: url(${pigeon});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    filter: opacity(
        ${({ width }) => {
          console.log(width);
          if (width > 300) return 1;
          return width / 1500 + 0.7;
        }}
      )
      drop-shadow(0 0 0 red);
  }
`;

const TimeNumber = styled.p`
  padding-left: 10px;
  padding-top: 3px;
`;

const GameTimer = ({ width }) => {
  const [widthState, setWidthState] = useState(width.current);
  const time = useRef(new Date());
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      const now = new Date();
      const diff = Math.floor((now - time.current) / 10);
      if (width.current >= diff) {
        width.current -= diff;
      } else {
        width.current = 0;
      }
      setWidthState(width.current);
      time.current = now;
    }, 40);
    return () => clearInterval(timer.current);
  }, []);

  useEffect(() => {
    if (width.current === 0) {
      clearInterval(timer.current);
    } else if (width.current > 1500) {
      width.current = 1500;
      setWidthState(width.current);
    }
  }, [width.current]);

  return (
    <Progress>
      <ProgressBar
        style={{ width: `${(widthState / 1500) * 90 + 10}%` }}
        width={width.current}
      >
        <TimeNumber>{`${Math.floor(widthState / 100)} : ${
          widthState % 100
        }`}</TimeNumber>
      </ProgressBar>
    </Progress>
  );
};

GameTimer.propTypes = {
  width: propTypes.object
};

export default React.memo(GameTimer);

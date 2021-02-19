import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signInBackgroundImg from '../../assets/sign-in-background.png';

const appearFromLeft = keyframes`
  from: {
    opacity: 0;
    transform: translateX(-500px)
  }
  to: {
    opacity: 1;
    transform: translateX(0)
  }
`;

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromLeft} 1s;

  form {
    margin: 50px 0;
    width: 340px;
    text-align: center;

    @media (min-width: 1400px) {
      margin: 80px 0;
    }

    h1 {
      margin-bottom: 24px;
    }

    > a {
      color: ${props => props.theme.colors.textLight};
      display: block;
      margin-top: 24px;
      transition: color 0.2s;

      &:hover {
        color: ${props => shade(0.2, props.theme.colors.textLight)};
      }
    }
  }

  > a {
    color: ${props => props.theme.colors.primary};
    margin-top: 24px;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${props => shade(0.2, props.theme.colors.primary)};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`;

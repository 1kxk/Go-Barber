import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signUpBackgroundImg from '../../assets/sign-up-background.png';

const appearFromRight = keyframes`
  from: {
    opacity: 0;
    transform: translateX(50px)
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

  animation: ${appearFromRight} 1s;

  form {
    margin: 30px 0;
    width: 330px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      font-size: 26px;
    }

    > div {
      padding: 12px;
    }

    button {
      height: 45px;
    }

    > a {
      color: ${props => props.theme.colors.textLight};
      margin-top: 24px;
      transition: color 0.2s;

      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        margin-right: 8px;
      }

      &:hover {
        color: ${props => shade(0.2, props.theme.colors.textLight)};
      }
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackgroundImg}) no-repeat center;
  background-size: cover;
`;

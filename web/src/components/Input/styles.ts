import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: ${props => props.theme.colors.secondary};
  border-radius: 10px;
  border: 2px solid ${props => props.theme.colors.secondary};
  padding: 14px;
  width: 100%;
  color: ${props => props.theme.colors.textInput};

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: ${props => props.theme.colors.errorDark};
    `}

  ${props =>
    props.isFocused &&
    css`
      color: ${props => props.theme.colors.primary};
      border-color: ${props => props.theme.colors.primary};
    `}

  ${props =>
    props.isFilled &&
    css`
      color: ${props => props.theme.colors.primary};
    `}


  input {
    background: transparent;
    flex: 1;
    border: 0;
    color: ${props => props.theme.colors.textLight};

    &::placeholder {
      color: ${props => props.theme.colors.textInput};
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: ${props => props.theme.colors.errorDark};
    color: ${props => props.theme.colors.textLight};

    &::before {
      border-color: ${props => props.theme.colors.errorDark} transparent;
    }
  }
`;

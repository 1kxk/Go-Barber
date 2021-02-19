import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 160px;
    background: ${props => props.theme.colors.primary};
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s;

    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);

    color: ${props => props.theme.colors.textDark};

    &::before {
      border-style: solid;
      border-color: ${props => props.theme.colors.primary} transparent;
      border-width: 6px 6px 0px 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      content: '';
    }
  }

  &:hover span {
    visibility: visible;
    opacity: 1;
  }
`;

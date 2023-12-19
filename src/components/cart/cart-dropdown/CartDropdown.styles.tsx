import styled from "styled-components";

import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton
} from '../../button/Button.styles'

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 280px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid rgba(0,0,0, .1);
  background-color: var(--background-light);
  top: 52px;
  right: 0;
  z-index: 5;
  color: var(--color-text-primary);

  ${BaseButton},
  ${GoogleSignInButton},
  ${InvertedButton} {
    margin-top: auto;
  }

  @media only screen and (max-width: 800px) {
    display: none;
  }
`

export const CartDropdownEmptyMessage = styled.span`
  font-size: 18px;
  margin: 50px auto;
`

export const CartItems = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`
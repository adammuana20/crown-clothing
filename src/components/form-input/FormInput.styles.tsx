import styled, { css } from "styled-components";

const subColor = 'grey'
const mainColor = 'black'

const shrinkLabelStyles = css`
  top: -18px;
  font-size: 12px;
  color: ${mainColor};
`

type FormInputLabelProps = {
  $shrink?: boolean;
}

export const FormInputLabel = styled.label<FormInputLabelProps>`
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;
  
  ${({$shrink}) => $shrink && shrinkLabelStyles};
`

export const Input = styled.input`
  background: none;
  background-color: #eee;
  color: ${mainColor};
  font-size: 17px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${subColor};
  margin: 25px 0;

  &[type='search'] {
    margin: 0;
    border-bottom: none;
    background-color: transparent;
    cursor: pointer;
  }

  &[type='search'] + ${FormInputLabel} {
    display: none;
  }

  &:focus {
    outline: none;
  }
  
  &:focus:not(input[type='search']) ~ ${FormInputLabel} {
    ${shrinkLabelStyles}
  }

  &:not([type='search']):not(:placeholder-shown) {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`

export const Group = styled.div`
  position: relative;
  margin: 45px 0;

  &[data-search="true"] {
    margin: 0;
  }

  input[type='password'] {
    letter-spacing: 0.3em;
  }
`

import styled from 'styled-components'

export const HeaderWrapper = styled.header`
  top: 0;
  box-shadow: 0 10px 15px 0 rgba(0,0,0,.06);
  background-color: white;
  margin-bottom: 25px;
  position: sticky;
  z-index: 99;  
`

export const HeaderContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  height: 70px;
  align-items: center;
  max-width: 1250px;
  padding: 0 1rem;

  @media only screen and (max-width: 800px) {
    padding: 0 1.2rem 0 1rem;
  }
`

export const OutletMain = styled.main`
    min-height: 90vh;
    margin-bottom: 5rem;
`

export const OutletContainer = styled.div`
  padding: 0;
  max-width: 1250px;
  margin: 2rem auto;
  padding: 0 1rem;
`
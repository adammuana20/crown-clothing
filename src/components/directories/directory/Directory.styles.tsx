import styled from "styled-components";

export const DirectoryContainer = styled.div`

`

export const SliderContainer = styled.div`
    width: 100%;
    height: 35rem;
    position: relative;
`

export const CategoriesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1250px;
    margin: 3rem auto;
    color: var(--color-text-primary);
`

export const CategoriesContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

export const ProductsWrapper = styled.div`
    display: flex;
    max-width: 1250px;
    margin: 0 auto;
    flex-direction: column;
    color: var(--color-text-primary);
`

export const ProductsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 20px;
    row-gap: 50px;

    @media only screen and (max-width: 800px) {
        grid-template-columns: 1fr 1fr;
    }
`
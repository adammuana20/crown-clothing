import styled from "styled-components";

export const DirectoryContainer = styled.div`
    h2 {
        padding-bottom: 1.5rem;
    }
`

export const CategoriesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding-inline: 1rem;
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
    padding-inline: 1rem;
`

export const ProductsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(18rem,1fr));
    column-gap: 20px;
    row-gap: 50px;

    @media only screen and (max-width: 800px) {
        grid-template-columns: 1fr 1fr;
    }
`
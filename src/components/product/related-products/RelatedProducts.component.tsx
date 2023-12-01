import { FC, useState } from "react"
import { useSelector } from "react-redux"

import Button from "../../button/Button.component"
import ProductCard from "../product-card/ProductCard.component"

import { selectCategoriesMap } from "../../../store/categories/Category.selector"
import { RelatedProductsContainer, RelatedProductsWrapper } from "./RelatedProducts.styles"
import { ButtonContainer } from "../../../routes/category/Category.styles"

type RelatedProductsProps = {
    category: string;
    catID: string | undefined;
}

const RelatedProducts: FC<RelatedProductsProps> = ({ category, catID }) => {
    const categoriesMap = useSelector(selectCategoriesMap)
    const [limit, setLimit] = useState(8)    

    const loadmore = () => {
        setLimit((prev) => prev + 8)
    }

    const relatedProductsArr = categoriesMap[category].filter(product => product.id.toString() !== catID);  

    return (
        <>
            <RelatedProductsWrapper>
                <h2>Related Products</h2>
                <RelatedProductsContainer>
                    { relatedProductsArr
                        .filter((_, idx) => idx < limit)
                        .map((product) =>
                            <ProductCard product={product} categoryTitle={category} key={product.id} />
                        )
                    }
                </RelatedProductsContainer>
            </RelatedProductsWrapper>
            <ButtonContainer>
                { relatedProductsArr.length <= limit ? 
                    null :
                    <Button onClick={loadmore}>Load More</Button>
                }
            </ButtonContainer>
        </>
    )
}

export default RelatedProducts
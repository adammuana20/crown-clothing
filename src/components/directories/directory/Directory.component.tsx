import { useState } from 'react';
import { useSelector } from 'react-redux';

import DirectoryItem from '../directory-item/DirectoryItem.component';
import MobileBottomMenu from '../../../routes/mobile-bottom-menu/MobileBottomMenu.component';

import { selectCategories, selectCategoriesMap } from '../../../store/categories/Category.selector';

import { DirectoryContainer, CategoriesContainer, CategoriesWrapper, ProductsContainer, ProductsWrapper } from './Directory.styles'
import Slider from '../slider/Slider.component';
import ProductCard from '../../product/product-card/ProductCard.component';
import { ButtonContainer } from '../../../routes/category/Category.styles';
import Button from '../../button/Button.component';


const Directory = () => {
    const categories = useSelector(selectCategories)
    const categoriesMap = useSelector(selectCategoriesMap)
    const combinedProductsWithCategory = Object.keys(categoriesMap).reduce((acc, title) => {
        const products = categoriesMap[title].map(product => ({ product, title }));
        return acc.concat(products);
    }, [] as any[]);

    const imageUrls = categories.map((category) => category.imageUrl)
    const [limit, setLimit] = useState(8)

    const loadmore = () => {
        setLimit((prev) => prev + 8)
    }
    
    return (
        <>
            <DirectoryContainer>
                <Slider imageUrls={imageUrls} />
                <CategoriesWrapper>
                    <h2>Categories</h2>
                    <CategoriesContainer>
                    {categories.map((category, idx) => (
                        <DirectoryItem key={idx} category={category} />
                    ))}
                    </CategoriesContainer>
                </CategoriesWrapper>
                <ProductsWrapper>
                    <h2>Product Overview</h2>
                    <ProductsContainer>
                        { combinedProductsWithCategory
                            .filter((_, idx) => idx < limit)
                            .map((productWithCategory) => (
                                <ProductCard key={productWithCategory.product.id} product={productWithCategory.product} categoryTitle={productWithCategory.title} />
                            ))
                        }
                    </ProductsContainer>
                </ProductsWrapper>
                <ButtonContainer>
                    { combinedProductsWithCategory.length <= limit ? 
                        null :
                        <Button onClick={loadmore}>Load More</Button>
                    }
                </ButtonContainer>
            </DirectoryContainer>
            <MobileBottomMenu />
        </>
    )
}

export default Directory
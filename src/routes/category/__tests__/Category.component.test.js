import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../../utils/test/Test.utils";
import Category from "../Category.component";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        category: 'mens',
    })
}))

describe('Category tests', () => {
    test('It should render a Spinner if isLoading is true', () => {
        renderWithProviders(<Category />, {
            preloadedState: {
                categories: {
                    isLoading: true,
                    categories: []
                }
            }
        })

        const spinnerElement = screen.getByTestId('spinner')
        expect(spinnerElement).toBeInTheDocument()
    })

    test('It should render products if isLoading is false', () => {
        renderWithProviders(<Category/>, {
            preloadedState: {
                categories: {
                    isLoading: false,
                    categories:[
                        {
                            title: 'mens',
                            items: [
                                {
                                    id: 1,
                                    name: 'Product 1'
                                },
                                {
                                    id: 2,
                                    name: 'Product 2'
                                }
                            ]
                        }
                    ]
                }
            }
        })

        const spinnerElement = screen.queryByTestId('spinner')
        expect(spinnerElement).toBeNull()

        const productElement = screen.getByText(/product 1/i)
        expect(productElement).toBeInTheDocument()
    })

})
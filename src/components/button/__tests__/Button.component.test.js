import '@testing-library/jest-dom/extend-expect'
import { render, screen } from "@testing-library/react";
import Button from "../Button.component";
import { BUTTON_TYPE_CLASSES } from '../Button.component';

describe('button tests', () => {
    test('should render base button when nothing is passed', () => {
        render(<Button />);

        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toHaveStyle('background-color: white');
    })

    // test('should render google button when passed google button type', () => {
    //     render(<Button buttonType={BUTTON_TYPE_CLASSES.google} />);

    //     const googleButtonElement = screen.getByRole('button');
    //     expect(googleButtonElement).toHaveStyle('background-color: #357ae8');
    // })

    // test('should render inverted button when passed inverted button type', () => {
    //     render(<Button buttonType={BUTTON_TYPE_CLASSES.inverted} />);

    //     const invertedButtonElement = screen.getByRole('button');
    //     expect(invertedButtonElement).toHaveStyle('background-color: black');
    // })

    test('should be disabled if isLoading is true', () => {
        render(<Button isLoading={true} />)

        const buttonElemet = screen.getByRole('button')
        expect(buttonElemet).toBeDisabled()
    })
})
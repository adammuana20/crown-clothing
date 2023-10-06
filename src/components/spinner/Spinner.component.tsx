import { SpinnerOverlay, SpinnerContainer } from "./Spinner.styles";

const Spinner = () => {
    return (
        <SpinnerOverlay data-testid='spinner'>
            <SpinnerContainer />
        </SpinnerOverlay>
    )
}


export default Spinner
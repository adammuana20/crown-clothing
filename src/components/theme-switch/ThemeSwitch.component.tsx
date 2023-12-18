import {
    BsMoon,
    BsSun,
  } from "react-icons/bs";

import { useTheme } from "../../contexts/Theme.context"

import { ThemeContainer, TooltipBtn } from "./ThemeSwitch.styles";

const ThemeSwitch = () => {
    const { theme, toggleTheme } = useTheme()

  return (
    <ThemeContainer>
        <TooltipBtn
            onClick={toggleTheme}
            className={`${theme === 'dark' ? 'dark-mode' : ''}`}
        >
            { theme === 'light' ? <BsSun /> : <BsMoon/> }
        </TooltipBtn>
    </ThemeContainer>
  )
}

export default ThemeSwitch
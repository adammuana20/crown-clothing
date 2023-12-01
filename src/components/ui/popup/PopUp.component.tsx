import { FC } from "react"
import ReactDOM from "react-dom"
import { FaCircleCheck } from "react-icons/fa6";
import { MdError } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import { Toast } from "../../../hooks/usePopup.hooks";

import { PopUpContainer, Message, IconMessageContainer, Line, ToastContainer, ToastWrapper, IoCloseStyle } from "./PopUp.styles"


type PopUpProps = {
    handleClose: (id: number) => void;
    toasts: Toast[];
}

const PopUp: FC<PopUpProps> = ({ handleClose, toasts }) => {

    return (
        ReactDOM.createPortal(
            <PopUpContainer>
            {toasts.map((toast, index) => (
                <ToastWrapper key={toast.id} $top={((index + 1) * 70)}>
                    <ToastContainer>
                        <IconMessageContainer>
                        { toast.type === 'success'
                            ? <FaCircleCheck color={'#22bb33'} size={30} />
                            : toast.type === 'warning'
                            ? <IoIosWarning color={'#f1c40f'} size={30} /> 
                            : <MdError color={'#bb2124'} size={30} />
                        }
                        <Message>{toast.message}</Message>
                        </IconMessageContainer>
                        <IoCloseStyle color={'#aaaaaa'} size={20} onClick={() => handleClose(toast.id)} />
                    </ToastContainer>
                    <Line $progress={(toast.countdown / 3) * 100} $type={toast.type} />
                </ToastWrapper>
            ))}
            </PopUpContainer>,document.body
        )
    )   
}

export default PopUp
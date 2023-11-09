import { forwardRef } from 'react'

const Modal = forwardRef((props, ref) => {
    return <dialog ref={ref}>
        <h3>Are you sure?</h3>
        <button onClick={props.closeModalHandler}>Cancel</button>
        <button onClick={props.onConfirmHandler}>OK</button>
    </dialog>
})

export default Modal
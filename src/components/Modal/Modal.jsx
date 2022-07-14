import {clearCart} from '../../features/cart/CartSlice'
import { closeModal } from "../../features/modal/modalSlice";
import { useDispatch } from "react-redux";

const Modal = () => {
  const dispatch = useDispatch()
  const clear = () => {
    dispatch(clearCart())
    dispatch(closeModal())
  }
  const cancel = () => {
    dispatch(closeModal())
  }
  return (
    <aside className='modal-container'>
      <div className='modal'>
        <h4>Remove all items from your shopping cart?</h4>
        <div className='btn-container'>
          <button type='button' onClick={clear} className='btn confirm-btn'>
            confirm
          </button>
          <button type='button' onClick={cancel} className='btn clear-btn'>
            cancel
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Modal
import {calculateTotal, getCartItems} from './features/cart/CartSlice'
import {useDispatch, useSelector} from 'react-redux'

import CartContainer from "./components/CartContainer/CartContainer";
import Modal from './components/Modal/Modal'
import Navbar from "./components/Navbar/Navbar";
import {useEffect} from 'react'

function App() {
  const {isOpen} = useSelector((store)=> store.modal)
  const {cartItems,isLoading} = useSelector((store) =>store.cart)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotal())
  }, [cartItems]);
  useEffect(() =>{
    dispatch(getCartItems('random'));
  },[]);

  if(isLoading){
    return <main className="loading">
      Loading...
    </main>
  }
  return( 
  <main>
    {isOpen && <Modal/>}
    <Navbar/>
    <CartContainer/>
  </main>) ;
}
export default App;

import { useDispatch, useSelector } from "react-redux";

import CartItem from "../CartItem/CartItem";
import React from "react";
import { openModal } from "../../features/modal/modalSlice";

function CartContainer() {
  const { cartItems, total } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  if (total==0) {
    return (
      <section className="cart">
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
        <div>
          {cartItems.map((item) => {
            return <CartItem key={item.id} {...item} />;
          })}
        </div>
      </header>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total.toFixed(2)}</span>
          </h4>
        </div>
        <button className="btn clear-btn" onClick={() => {
          dispatch(openModal())
        }}>
          clear cart
        </button>
      </footer>
    </section>
  );
}

export default CartContainer;

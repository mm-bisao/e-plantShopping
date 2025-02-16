import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // 🛒 Calcula o total de todos os itens no carrinho
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      const itemCost = parseFloat(item.cost.substring(1)); // Remove '$' e converte para número
      total += item.quantity * itemCost;
    });
    return total.toFixed(2); // Retorna o total formatado
  };

  // 🔄 Função para calcular o subtotal de cada item
  const calculateTotalCost = (item) => {
    const itemCost = parseFloat(item.cost.substring(1)); 
    return (item.quantity * itemCost).toFixed(2);
  };

  // 🔼 Incrementa a quantidade de um item
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // 🔽 Decrementa a quantidade de um item ou remove se for 0
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // ❌ Remove um item do carrinho
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // 🔙 Continuar comprando
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  // 🚀 Função futura para checkout
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.length > 0 ? (
          cart.map(item => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">{item.cost}</div>
                <div className="cart-item-quantity">
                  <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                </div>
                <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div>
                <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <h3 style={{ textAlign: 'center' }}>Your cart is empty.</h3>
        )}
      </div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        {cart.length > 0 && <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>}
      </div>
    </div>
  );
};

export default CartItem;

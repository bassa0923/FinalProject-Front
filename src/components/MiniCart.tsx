import React from "react";

interface Product {
  id: number;
  name: string;
  imageLink: string;
  description: string;
  price: number;
}

interface MiniCartProps {
  cartItems: Product[];
  removeFromCart: (productId: number, index: number) => void;
}

const MiniCart: React.FC<MiniCartProps> = ({ cartItems, removeFromCart }) => {
  const totalCount = cartItems.reduce((total, item) => total + 1, 0);

  return (
    <div className="mini-cart">
      <h3>Mini Cart</h3>

      {totalCount > 0 && (
        <div className="count-circle">
          Total Amount of Products:{totalCount}
        </div>
      )}
      <ul>
        {cartItems.map((item: Product, index: number) => (
          <li key={index}>
            <div className="product-info">
              <button
                className="remove-button"
                onClick={() => removeFromCart(item.id, index)}
              >
                X
              </button>
              <img src={item.imageLink} alt={item.name} />
              <div>
                <p className="mini-cart-name">{item.name}</p>
                <p className="mini-cart-description">{item.description}</p>
                <p className="mini-cart-price">${item.price}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MiniCart;

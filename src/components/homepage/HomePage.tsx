import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutForm from "../LogoutForm";
import axios from "axios";
import cartIcon from "../../images/cart.png";
import MiniCart from "../MiniCart";

interface Product {
  id: number;
  name: string;
  imageLink: string;
  description: string;
  price: number;
}

interface HomePageProps {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const HomePage: React.FC<HomePageProps> = ({ loggedIn, setLoggedIn }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [showMiniCart, setShowMiniCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    const storedCartItemsJson = localStorage.getItem("cartItems");
    if (storedCartItemsJson) {
      const parsedCartItems: Product[] = JSON.parse(storedCartItemsJson);
      setCartItems(parsedCartItems);
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/auth/products");
      setProducts(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Error fetching products");
    }
  };

  const deleteProduct = async (productId: number) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(
        `http://localhost:8000/auth/deleteProduct/${productId}`,
        config
      );
      fetchProducts();
      setError(null);
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Error deleting product");
    }
  };

  const addToCart = (product: Product) => {
    const updatedCartItems = [...cartItems, product];
    setCartItems(updatedCartItems);

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const removeFromCart = (productId: number, index: number) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const toggleMiniCart = () => {
    setShowMiniCart(!showMiniCart);
  };

  return (
    <div>
      <div className="buttons-container">
        {/* Cart Icon with badge */}
        <button className="cart-icon" onClick={toggleMiniCart}>
          <img src={cartIcon} alt="Cart" />
          {cartItems.length > 0 && (
            <div className="cart-badge">{cartItems.length}</div>
          )}
        </button>

        {loggedIn ? (
          <>
            <LogoutForm setLoggedIn={setLoggedIn} />
            <Link to="/addProduct" className="button add-product-button">
              Add Product
            </Link>
          </>
        ) : (
          <>
            <Link to="/signup" className="button signup-button">
              Signup
            </Link>
            <Link to="/login" className="button login-button">
              Login
            </Link>
          </>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            {loggedIn && (
              <>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="delete-button"
                >
                  X
                </button>
                <button
                  onClick={() => navigate(`/editProduct/${product.id}`)}
                  className="edit-button"
                >
                  Edit
                </button>
              </>
            )}
            <img src={product.imageLink} alt={product.name} />
            <h3 className="product-name">{product.name}</h3>

            <p className="product-description">
              Description: {product.description}
            </p>
            <p className="product-price">Price: ${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="add-to-cart-button"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Conditionally render the mini cart */}
      {showMiniCart && (
        <MiniCart cartItems={cartItems} removeFromCart={removeFromCart} />
      )}
    </div>
  );
};

export default HomePage;

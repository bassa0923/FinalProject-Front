import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/homepage/HomePage";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import AddProduct from "./components/AddProducts";
import axios from "axios";
import EditProduct from "./components/EditProduct";

interface ProductData {
  productName: string;
  imageLink: string;
  description: string;
  price: number;
}

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(() => {
    // Check if the user is logged in from local storage
    return localStorage.getItem("loggedIn") === "true";
  });

  useEffect(() => {
    // Update local storage when loggedIn state changes
    localStorage.setItem("loggedIn", loggedIn.toString());
  }, [loggedIn]);

  const handleSubmit = async (productData: ProductData) => {
    try {
      const response = await axios.post("/api/products", productData);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        />
        <Route
          path="/login"
          element={<LoginForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        />
        <Route
          path="/signup"
          element={<SignupForm setLoggedIn={setLoggedIn} />}
        />
        <Route
          path="/addProduct"
          element={<AddProduct onSubmit={handleSubmit} />}
        />
        <Route path="/editProduct/:productId" element={<EditProduct />} />
      </Routes>
    </Router>
  );
};

export default App;

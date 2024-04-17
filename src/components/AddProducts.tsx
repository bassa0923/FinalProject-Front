import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface ProductData {
  productName: string;
  imageLink: string;
  description: string;
  price: number;
}

interface AddProductProps {
  onSubmit: (productData: ProductData) => void;
}

const AddProduct: React.FC<AddProductProps> = ({ onSubmit }) => {
  const [productData, setProductData] = useState<ProductData>({
    productName: "",
    imageLink: "",
    description: "",
    price: 0,
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const parsedValue = name === "price" ? parseFloat(value) : value;

    setProductData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        "http://localhost:8000/auth/addProduct",
        productData,
        config
      );
      navigate("/");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <form className="add-product-form" onSubmit={handleSubmit}>
      <label htmlFor="productName">Product Name</label>
      <input
        type="text"
        id="productName"
        name="productName"
        value={productData.productName}
        onChange={handleChange}
        required
        className="input-field"
      />
      <label htmlFor="imageLink">Image Link</label>
      <input
        type="text"
        id="imageLink"
        name="imageLink"
        value={productData.imageLink}
        onChange={handleChange}
        required
        className="input-field"
      />
      <label htmlFor="description">Product Description</label>{" "}
      {/* Use 'description' as the name */}
      <textarea
        id="description"
        name="description"
        value={productData.description}
        onChange={handleChange}
        required
        className="textarea-field"
      ></textarea>
      <label htmlFor="productPrice">Product Price</label>
      <input
        type="number"
        id="productPrice"
        name="price"
        value={productData.price}
        onChange={handleChange}
        required
        className="input-field"
      />
      <button type="submit" className="submit-button">
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./productslist.css";

const ProductsList = () => {
const [products, setProducts] = useState([]);
const [showForm, setShowForm] = useState(false);
const [showEditForm, setShowEditForm] = useState(false);
const [productToBeCreated, setProductToBeCreated] = useState({
name: "",
brand: "",
category: "",
price: 0,
image: "",
});
const [productToBeEdited, setProductToBeEdited] = useState({
id: "",
name: "",
brand: "",
category: "",
price: 0,
image: "",
});

const handleEditProductClick = (product) => {
    setProductToBeEdited(product);
    setShowEditForm(true);
  };

useEffect(() => {
const fetchData = async () => {
const result = await axios.get("http://localhost:3001/products");
setProducts(result.data);
};
fetchData();
}, []);
const handleCreateProduct = async (event) => {
    event.preventDefault();
    const response = await axios.post("http://localhost:3001/products", productToBeCreated);
    setProducts([...products, response.data]);
    setShowForm(false);
    };
    
    const handleEditProduct = async (event, id) => {
    event.preventDefault();
    console.log(productToBeEdited);
    console.log(productToBeEdited.id)

    const response = await axios.put(`http://localhost:3001/products/${productToBeEdited.id}`, productToBeEdited);
    const updatedProducts = products.map((product) =>
    product.id === productToBeEdited.id ? response.data : product
    );
    setProducts(updatedProducts);
    setShowEditForm(false);
    };
    
    const handleDeleteProduct = async (id) => {
        await axios.delete(`http://localhost:3001/products/${id}`);
        const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    };
    
    const handleInputChange = (event) => {
    if (showEditForm) {
    setProductToBeEdited({
    ...productToBeEdited,
    [event.target.name]: event.target.value,
    });
    } else {
    setProductToBeCreated({
    ...productToBeCreated,
    [event.target.name]: event.target.value,
    });
    }
    };
    
    return (
    <div className="products-list">
    {showForm ? (
    <form onSubmit={handleCreateProduct}>
    <input
             type="text"
             name="name"
             placeholder="Product name"
             value={productToBeCreated.name}
             onChange={handleInputChange}
           />
    <input
             type="text"
             name="brand"
             placeholder="Product brand"
             value={productToBeCreated.brand}
             onChange={handleInputChange}
           />
    <input
      type="text"
      name="category"
      placeholder="Product category"
      value={productToBeCreated.category}
      onChange={handleInputChange}
    />  
    <input
      type="float"
      name="price"
      placeholder="Price"
      value={productToBeCreated.price}
      onChange={handleInputChange}
    />
    <input
      type="text"
      name="image"
      placeholder="imageURL"
      value={productToBeCreated.image}
      onChange={handleInputChange}
    />
<button type="submit">Create product</button>

</form>
) : (
<button onClick={() => setShowForm(true)}>Add new product</button>
)}
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Brand</th>
      <th>Category</th>
      <th>Price</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {products.map((product) => (
      <tr key={product.id}>
        <td>{product.name}</td>
        <td>{product.brand}</td>
        <td>{product.category}</td>
        <td>{product.price}$</td>
        <td> <img className="media" src={product.image} alt="product"></img></td>
        <td>
        <button onClick={() => handleEditProductClick(product)}>Edit</button>          
        <button onClick={() => handleDeleteProduct(product.id)}>
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
{showEditForm && (
  <form onSubmit={handleEditProduct}>
    <input
      type="text"
      name="name"
      placeholder="Product name"
      value={productToBeEdited.name}
      onChange={handleInputChange}
    />
    <input
      type="text"
      name="brand"
      placeholder="Product brand"
      value={productToBeEdited.brand}
      onChange={handleInputChange}
    />
    <input
      type="text"
      name="category"
      placeholder="category"
      value={productToBeEdited.category}
      onChange={handleInputChange}
    />  
    <input
      type="float"
      name="price"
      placeholder="Price"
      value={productToBeEdited.price}
      onChange={handleInputChange}
    />
    <button type="submit">Save changes</button>
  </form>
)}
</div>
);
};

export default ProductsList;
import React from 'react';

const productTableHeadings = ['Product Name', 'Price', 'Category', 'Image'];
const productCategories = [
  { product_id: 1, product_name: 'Shirts' },
  { product_id: 2, product_name: 'Jeans' },
  { product_id: 3, product_name: 'Jackets' },
  { product_id: 4, product_name: 'Sweaters' },
  { product_id: 5, product_name: 'Accessories' },
];

export default class ProductAdd extends React.Component {
    constructor() {
      super();
      this.state = {
        product_price: '$',
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handlePriceChange = this.handlePriceChange.bind(this);
    }
  
    handleSubmit(event) {
      event.preventDefault();
      const { addProduct } = this.props;
      const {
        product_name, product_price, product_category, product_image,
      } = document.forms.addProduct;
      const priceWithoutDollar = product_price.value.substring(1); // Getting value without '$'
      console.log("Hello",product_name.value, product_price.value, product_category.value, product_image.value)
  
      const product = {
        product_name: product_name.value,
        product_price: parseFloat(priceWithoutDollar),
        product_category: product_category.value,
        product_image: product_image.value,
      };
      
      addProduct(product);
  
      product_name.value = '';
      product_category.value = 'Shirts';
      product_image.value = '';
      this.setState({ product_price: '$' });
    }
  
    handlePriceChange(event) {
      const priceWithoutDollar = event.target.value.substring(1); // Getting value without '$'
      this.setState({ product_price: `$${priceWithoutDollar}` });
    }

  
  render() {
    const { product_price } = this.state;
    return (
      <form name="addProduct" onSubmit={this.handleSubmit} className="onSubmit_form">
        <div className="form-element-container">
          <label htmlFor="product_category" >Category</label>
          <select name="product_category">
            {
              productCategories.map(({ product_id, product_name }) => (
                <option key={product_id} id={product_id} value={product_name}>{product_name}</option>
              ))
            }
          </select>
        </div>

        <div className="form-element-container">
          <label htmlFor="product_price">Price Per Unit</label>
          <input type="text" name="product_price" value={product_price} onChange={this.handlePriceChange} />
        </div>

        <div className="form-element-container">
          <label htmlFor="product_name">Product Name</label>
          <input type="text" name="product_name" />
        </div>

        <div className="form-element-container">
          <label htmlFor="product_image">Image URL</label>
          <input type="text" name="product_image" />
        </div>

        <button type="submit" className="submit-button submit-button-dark">Add Product</button>
      </form>
    );
  }
}
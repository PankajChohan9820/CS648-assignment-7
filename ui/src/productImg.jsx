import React from 'react';

import fetchGraphQl from './fetchGraphQl.js';

export default class ProductImg extends React.Component {
  constructor() {
    super();
    this.state = { product: {} };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { product_id: prevId } } } = prevProps;
    const { match: { params: { product_id } } } = this.props;
    if (prevId !== product_id) {
      this.loadData();
    }
  }

  async loadData() {
    const { match: { params: { product_id } } } = this.props;
    console.log(product_id)
    const query = `query product($product_id: Int!) {
      product (product_id: $product_id) {
        product_id product_name product_image
      }
    }`;

    const data = await fetchGraphQl(query, { product_id: parseInt(product_id, 10) });
    if (data) {
      this.setState({ product: data.product });
    } else {
      this.setState({ product: {} });
    }
  }

  render() {
    const { product: { product_id, product_name, product_image } } = this.state;

    if (!product_id) {
      return (<p>{`Product with Id ${product_id} not present in the Database`}</p>);
    }

    if (!product_image) {
      return (
        <p>{`No Image Url set for Product with id ${product_id}`}</p>
      );
    }

    return (
      <div>
        <h3>{`Viewing Image of Product with name - ${product_name}`}</h3>
        <img src={product_image} alt={`Product id ${product_id}`} />
      </div>
    );
  }
}

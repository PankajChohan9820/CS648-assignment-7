import React from 'react';
import {
  Col, Panel, Form, FormGroup, FormControl, ControlLabel,
  ButtonToolbar, Button,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import fetchGraphQl from './fetchGraphQl.js';
import NumInp from './NumInp.jsx';
import TextInp from './TextInp.jsx';

export default class ProductEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
      isLoading: true,
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { product_id: prevId } } } = prevProps;
    const { match: { params: { product_id } } } = this.props;
    if (product_id !== prevId) {
      this.loadData();
    }
  }

  onChange(event, naturalValue) {
    const { name, value: textValue } = event.target;
    const value = naturalValue === undefined ? textValue : naturalValue;

    this.setState(prevState => ({
      product: { ...prevState.product, [name]: value },
    }));
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { product } = this.state;
    console.log("Submitting form :: ",this.state)
    const query = `mutation updateProduct(
      $product_id: Int!
      $changes: ProductUpdateInputs!
    ) {
      updateProduct(
        product_id: $product_id
        changes: $changes
      ) {
        product_id product_name product_category product_price product_image
      }
    }`;

    const { product_id, ...changes } = product;
    console.log("Changes :: ", changes);
    const data = await fetchGraphQl(query, { product_id, changes });
    if (data) {
      this.setState({ product: data.updateProduct });
      alert('Updated product successfully'); // eslint-disable-line no-alert
    }
  }

  async loadData() {
    const query = `query product($product_id: Int!) {
      product(product_id: $product_id) {
        product_id product_name product_category product_price product_image
      }
    }`;

    const { match: { params: { product_id } } } = this.props;
    const data = await fetchGraphQl(query, { product_id: parseInt(product_id, 10) });
    if (data) {
      const { product } = data;
      product.product_name = product.product_name != null ? product.product_name : '';
      product.product_category = product.product_category != null ? product.product_category : '';
      product.product_price = product.product_price != null ? product.product_price : '';
      product.product_image = product.product_image != null ? product.product_image : '';
      this.setState({ product, isLoading: false });
    } else {
      this.setState({ product: {}, isLoading: false });
    }
  }

  render() {
    const { product: { product_id }, isLoading } = this.state;
    const { match: { params: { product_id: propsId } } } = this.props;
    if (product_id == null) {
      if (isLoading) {
        return <h3>Loading Product details...</h3>;
      }

      if (propsId != null) {
        return <h3>{`Product with ID ${propsId} not found.`}</h3>;
      }

      return null;
    }

    const {
      product: {
        product_name, product_category, product_price, product_image,
      },
    } = this.state;

    return (
      <Panel className="edit-form">
        <Panel.Heading bsClass="dark">
          <Panel.Title>{`Editing Product: ${product_id}`}</Panel.Title>
        </Panel.Heading>

        <Panel.Body>
          <Form horizontal onSubmit={this.handleSubmit}>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Name</Col>
              <Col sm={9}>
                <TextInp
                  name="product_name"
                  value={product_name}
                  onChange={this.onChange}
                  key={product_id}
                  className="form-control"
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Category</Col>
              <Col sm={9}>
                <FormControl
                  componentClass="select"
                  name="product_category"
                  value={product_category}
                  onChange={this.onChange}
                >
                  <option value="Shirts">Shirts</option>
                  <option value="Jeans">Jeans</option>
                  <option value="Jackets">Jackets</option>
                  <option value="Sweaters">Sweaters</option>
                  <option value="Accessories">Accessories</option>
                </FormControl>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Price</Col>
              <Col sm={9}>
                <NumInp
                  name="product_price"
                  value={product_price}
                  onChange={this.onChange}
                  key={product_id}
                  className="form-control"
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Image Url</Col>
              <Col sm={9}>
                <TextInp
                  name="product_image"
                  value={product_image}
                  onChange={this.onChange}
                  key={product_id}
                  className="form-control"
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={3} sm={6}>
                <ButtonToolbar>
                  <Button bsStyle="primary" type="submit">Submit</Button>
                  <LinkContainer to="/products">
                    <Button bsStyle="link">Back</Button>
                  </LinkContainer>
                </ButtonToolbar>
              </Col>
            </FormGroup>
          </Form>
        </Panel.Body>
      </Panel>
    );
  }
}

import React from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Button, Glyphicon, Tooltip, OverlayTrigger, Table,
} from 'react-bootstrap';

const NO_DATA_AVAILABLE = 'No Data Available';

function ProductTableRow({ product, deleteProduct, index }) {
  const {
    product_name, product_price, product_category, product_image, product_id,
  } = product;
  const deleteTooltip = (
    <Tooltip id="delete-tooltip" placement="top">Delete Product</Tooltip>
  );

  const viewImageTooltip = (
    <Tooltip id="view-tooltip" placement="top">View Image</Tooltip>
  );

  const editTooltip = (
    <Tooltip id="close-tooltip" placement="top">Edit Product</Tooltip>
  );

  function onDelete(e) {
    e.preventDefault();
    deleteProduct(index);
  }
  return (
    <tr>
      <td>{product_name || NO_DATA_AVAILABLE}</td>
      <td>{product_price ? `$${product_price}` : NO_DATA_AVAILABLE}</td>
      <td>{product_category}</td>
      {/* <td>{product_image ? <Link to={`/img/${product_id}`}>View</Link> : NO_DATA_AVAILABLE}</td>
      <td>
        <Link to={`/edit/${product_id}`}>Edit</Link>
        {' | '}
        <button type="button" className="small submit-button submit-button-dark small" onClick={() => { deleteProduct(index); }}>
          Delete
        </button>
      </td> */}
      <td>
        {product_image ? (
          <OverlayTrigger delayShow={500} overlay={viewImageTooltip}>
            <Link to={`/img/${product_id}`}>View</Link>
          </OverlayTrigger>
        ) : NO_DATA_AVAILABLE}
      </td>
      <td>
        <LinkContainer to={`/edit/${product_id}`}>
          <OverlayTrigger delayShow={500} overlay={editTooltip}>
            <Button bsSize="xsmall">
              <Glyphicon glyph="edit" />
            </Button>
          </OverlayTrigger>
        </LinkContainer>

        {' | '}

        <OverlayTrigger delayShow={500} overlay={deleteTooltip}>
          <Button bsSize="xsmall" onClick={e => onDelete(e)}>
            <Glyphicon glyph="trash" />
          </Button>
        </OverlayTrigger>
      </td>
    </tr>
  );
}

export default function ProductTable({
  headings, products, loading, deleteProduct,
}) {
  const ProductTableRows = products.map(
    (product, index) => (
      <ProductTableRow
        key={product.product_id}
        product={product}
        deleteProduct={deleteProduct}
        index={index}
      />
    ),
  );
  const initialTableMessage = loading ? 'Loading products...' : 'Add Products here';

  return (
    <Table bordered condensed hover responsive className="table">
      <thead className="text-left bordered-table">
        <tr>
          {headings.map((heading, index) =>
            // using index as keys as Table Headings will not change dynamically
            // eslint-disable-next-line implicit-arrow-linebreak, react/no-array-index-key
            <th key={index}>{heading}</th>)}
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {products.length > 0 ? ProductTableRows : (
          <tr className="text-center"><td colSpan="5">{initialTableMessage}</td></tr>
        )}
      </tbody>
    </Table>
  );
}

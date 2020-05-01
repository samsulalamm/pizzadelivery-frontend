import React, {useEffect, useState} from 'react';
import "../assets/scss/homepage.scss";
import pizzaBg from "../assets/img/pizza_bg.jpg";
import Companylogo from "../assets/img/logo.jpg";
import {FiGrid, FiList, FiShoppingCart} from "react-icons/all";
import ProductList from "../components/ProductList";
import productData from "../static-data/product.json";
import {Button, Form, Modal} from "react-bootstrap";
import QuantityCounter from "../components/QuantityCounter";

const Home = () => {
  const [isListView, setIsListView] = useState(false);
  const [productList, setProductList] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);

  useEffect(() => {
    setProductList(productData);
  }, [])

  const handleViewGrid = () => {
    setIsListView(false);
  }

  const handleViewList = () => {
    setIsListView(true);
  }

  const handleCloseCartModal = () => {
    setShowCartModal(false)
  }

  const handleShowCartModal = () => {
    setShowCartModal(true)
  }

  return (
    <div style={{backgroundImage: `url(${pizzaBg})`}} className={"full-page-background"}>
      <div className="overlay dark">
        <div className="home-page-header">
          <div className="logo">
              <span className="text">
                <img src={Companylogo} alt=""/>
              </span>
          </div>

          <h2 className="main-title">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
        </div>

        <div className="menu-box">
          <div className="box-header">
            <h3 className="box-title">Menu</h3>
            <div className="view-actions">
              <span onClick={handleViewList} className={isListView ? 'action active' : 'action'}><FiList/></span>
              <span onClick={handleViewGrid} className={!isListView ? 'action active' : 'action'}><FiGrid/></span>
            </div>
          </div>

          <div className="box-body">
            <ProductList isListView={isListView} data={productList}/>
          </div>
        </div>

        <Modal show={showCartModal} onHide={handleCloseCartModal}>
          <Modal.Header closeButton>
            <Modal.Title>Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table className="table table-striped">
              <thead>
              <tr>
                <th>Item</th>
                <th>Qnt.</th>
                <th>Unit price</th>
                <th>Total Price</th>
              </tr>
              </thead>

              <tbody>
              <tr>
                <td>Spicy Pizza - Small</td>
                <td>
                  <QuantityCounter size={"sm"} value={2}/>
                </td>
                <td>$ 10.00</td>
                <td className="text-right">$ 20.00</td>
              </tr>
              <tr>
                <td >Spicy Pizza - Small</td>
                <td>
                  <QuantityCounter size={"sm"} value={1}/>
                </td>
                <td>$ 10.00</td>
                <td className="text-right">$ 10.00</td>
              </tr>
              <tr>
                <td colSpan={3} className="text-right"><strong>Total</strong></td>
                <td className="text-right"><strong>$ 30.00</strong></td>
              </tr>
              </tbody>
            </table>

            <h5 className="mb-3">Delivery Information</h5>

            <Form.Group controlId={"Name"}>
              <Form.Label className="sr-only">Name</Form.Label>
              <Form.Control placeholder="Name" type="text"/>
            </Form.Group>

            <Form.Group controlId={"phone"}>
              <Form.Label className="sr-only">Phone</Form.Label>
              <Form.Control placeholder="Phone" type="text"/>
            </Form.Group>

            <Form.Group controlId={"email"}>
              <Form.Label className="sr-only">Email</Form.Label>
              <Form.Control placeholder="Email" type="email"/>
            </Form.Group>

            <Form.Group controlId={"addressLineOne"}>
              <Form.Label className="sr-only">Address Line 1</Form.Label>
              <Form.Control placeholder="Address Line 1" type="text"/>
            </Form.Group>

            <Form.Group controlId={"addressLineTwo"}>
              <Form.Label className="sr-only">Address Line 2</Form.Label>
              <Form.Control placeholder="Address Line 2" type="text"/>
            </Form.Group>

            <Button block={true} variant={"primary"}>Place Order</Button>
          </Modal.Body>
          {/*<Modal.Footer>
            <Button onClick={handleCloseCartModal} variant="default">
              Close
            </Button>
            <Button onClick={handleCloseCartModal} variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>*/}
        </Modal>

        <button onClick={handleShowCartModal} className="btn-cart">
          <span className="upper-part">
            <span className="icon"><FiShoppingCart/></span>
          <span className="item-qnt">3 Items</span>

          </span>
          <span className="item-price">$ 36.00</span>
        </button>
      </div>
    </div>
  );
}

export default Home;

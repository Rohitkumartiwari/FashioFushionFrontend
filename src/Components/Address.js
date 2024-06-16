import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
const Address = () => {
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const toggle = () => setModal(!modal);
  const togglee = () => setEditModal(!editModal);
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [addressType, setAddressType] = useState("");
  const [addressData, setAddressData] = useState("");
  const [itemId, newItemId] = useState();
  const [itemDelete, setItemDelete] = useState(false);
  const [itemAdded, setItemAdded] = useState(false);
  const [itemUpdated, setItemUpdated] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const handleAddress = () => {
    axios
      .post("http://localhost:4000/add-address", {
        userId: user?._id,
        pincode,
        city,
        state,
        street,
        addressType,
      })
      .then((res) => {
        setItemAdded(!itemAdded);
        setModal(!modal);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    axios
      .get(`http://localhost:4000/get-address/${user?._id}`)
      .then((res) => setAddressData(res?.data))
      .catch((err) => console.log(err));
  }, [itemDelete, itemAdded, itemUpdated]);
  const handleEdit = (item) => {
    newItemId(item?._id);
    setPincode(item.pincode);
    setCity(item.city);
    setState(item.state);
    setStreet(item.street);
    setAddressType(item.addressType);
    // Open the edit modal
    togglee();
  };
  const handleUpdateAddress = () => {
    axios
      .post(`http://localhost:4000/update-address/${itemId}`, {
        pincode,
        city,
        state,
        street,
        addressType,
      })
      .then((res) => {
        setItemUpdated(!itemUpdated);
        setEditModal(!editModal);
      })
      .catch((err) => console.log(err));
  };
  const deletAddress = (item) => {
    axios
      .delete(`http://localhost:4000/address-delete/${item?._id}`)
      .then((res) => setItemDelete(!itemDelete))
      .catch((err) => console.log(err));
  };
  const resetFields = () => {
    setPincode("");
    setState("");
    setCity("");
    setStreet("");
    setAddressType("");
  };
  return (
    <div className="container">
      <div className="d-flex my-2 justify-content-between">
        <h4>Saved Addres</h4>
        <button
          className="btn btn-danger"
          onClick={() => {
            toggle();
            resetFields();
          }}
        >
          Add New Address
        </button>
      </div>
      {(addressData ? addressData : [])?.map((item) => {
        return (
          <div className="mb-2 address_wrapper" key={item?._id}>
            <div className="address_list_wrapper p-3">
              <div className="d-flex my-2 justify-content-between">
                <h6>{user?.user?.name}</h6>
                <button className="address_type_btn fw-bolder" onClick={toggle}>
                  {item?.addressType}
                </button>
              </div>
              <p className="fs-14 mb-0">{item?.street}</p>
              <p className="fs-14 mb-0">
                {item?.city}-{item?.pincode}
              </p>
              <p className="fs-14 mb-0">{item?.state}</p>
              <p className="fs-14 mb-0 my-2">Mobile:{user?.user?.mobile}</p>
            </div>
            <div className="address_list_wrapperr p-2">
              <div className="row my-2 ">
                <div className="col-md-6 text-center ">
                  <h6
                    className="cursor-pointer text-danger fw-bolder"
                    onClick={() => {
                      handleEdit(item);
                    }}
                  >
                    EDIT
                  </h6>
                </div>

                <div className="col-md-6 text-center">
                  <h6
                    className="cursor-pointer text-danger fw-bolder"
                    onClick={() => deletAddress(item)}
                  >
                    REMOVE
                  </h6>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Address Detail</ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Enter Pincode</label>
                <input
                  type="text"
                  className="form-control"
                  id="pincode"
                  onChange={(e) => setPincode(e.target.value)}
                  value={pincode}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">State</label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  onChange={(e) => setState(e.target.value)}
                  value={state}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Enter Street</label>
                <input
                  type="text"
                  className="form-control"
                  id="street"
                  onChange={(e) => setStreet(e.target.value)}
                  value={street}
                  placeholder="House No,Building No,Area"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="form-label">Type Of Address</label>
              <br />
              <select
                value={addressType}
                onChange={(e) => setAddressType(e.target.value)}
                class="form-select"
              >
                <option value="">Select Type</option>
                <option value="home">Home</option>
                <option value="office">Office</option>
              </select>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleAddress}>
            Add Address
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={editModal} toggle={togglee}>
        <ModalHeader toggle={togglee}>Update Address Detail</ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Enter Pincode</label>
                <input
                  type="text"
                  className="form-control"
                  id="pincode"
                  onChange={(e) => setPincode(e.target.value)}
                  value={pincode}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">State</label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  onChange={(e) => setState(e.target.value)}
                  value={state}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Enter Street</label>
                <input
                  type="text"
                  className="form-control"
                  id="street"
                  onChange={(e) => setStreet(e.target.value)}
                  value={street}
                  placeholder="House No,Building No,Area"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="form-label">Type Of Address</label>
              <br />
              <select
                value={addressType}
                onChange={(e) => setAddressType(e.target.value)}
                class="form-select"
              >
                <option value="">Select Type</option>
                <option value="home">Home</option>
                <option value="office">Office</option>
              </select>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleUpdateAddress}>
            Update Address
          </Button>{" "}
          <Button color="secondary" onClick={togglee}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Address;

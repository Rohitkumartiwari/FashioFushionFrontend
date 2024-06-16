import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState(" ");
  const user = JSON.parse(localStorage.getItem("user"));
  const [detail, setDetail] = useState();
  const [modal, setModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/user/${user._id}`)
      .then((res) => setDetail(res?.data))
      .catch((err) => console.log(err));
  }, [user._id]);
  useEffect(() => {
    if (detail) {
      setName(detail.name);
      setEmail(detail.email);
      setMobile(detail.mobile);
    }
  }, [detail]);
  const updateProfileAction = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    if (selectedFile) {
      formData.append("image", selectedFile); // Append the selected file to the form data
    }

    axios
      .post(`http://localhost:4000/updateProfile/${email}`, formData)
      .then((res) => {
        console.log("Profile updated successfully:", res.data);
        toggle(); // Close the modal after successful update if needed
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
      });
  };

  return (
    <>
      <div className=" p-3">
        <div className="profile_form_wrapper">
          <h4 className="text-bold">Profile Detail</h4>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Enter Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  aria-describedby="emailHelp"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Mobile</label>
                <input
                  type="number"
                  className="form-control"
                  id="number"
                  aria-describedby="emailHelp"
                  onChange={(e) => setMobile(e.target.value)}
                  value={mobile}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Image</label>
                <br />
                <input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-danger" onClick={toggle}>
            Update Profile
          </button>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Update Profile Detail</ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Enter Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  aria-describedby="emailHelp"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Mobile</label>
                <input
                  type="number"
                  className="form-control"
                  id="number"
                  aria-describedby="emailHelp"
                  onChange={(e) => setMobile(e.target.value)}
                  value={mobile}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Image</label>
                <br />
                <input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={updateProfileAction}>
            Update Profile
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default UserProfile;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiNotepad } from "react-icons/bi";
import { MdCancel, MdLocalShipping } from "react-icons/md";
import { GrAtm } from "react-icons/gr";
const Faq = () => {
  const [categoriType, setCategoryType] = useState(1);
  return (
    <div className="container">
      <h2 className="text-center my-3">FAQS</h2>
      <div className="row">
        <div className="col-md-8 ">
          <div className=" d-flex gap-3">
            <div>
              <button
                className={
                  categoriType == 1 ? "category_btn_active " : "category_btnn"
                }
                onClick={() => {
                  setCategoryType(1);
                }}
              >
                <BiNotepad /> General
              </button>
            </div>
            <div>
              <button
                className={
                  categoriType == 5 ? "category_btn_active " : "category_btnn"
                }
                onClick={() => {
                  setCategoryType(5);
                }}
              >
                <BiNotepad /> Payment
              </button>
            </div>
            <div>
              <button
                className={
                  categoriType == 2 ? "category_btn_active" : "category_btnn"
                }
                onClick={() => {
                  setCategoryType(2);
                }}
              >
                <MdCancel /> Cancellation
              </button>
            </div>
            <div>
              <button
                className={
                  categoriType == 3 ? "category_btn_active " : "category_btnn"
                }
                onClick={() => {
                  setCategoryType(3);
                }}
              >
                <MdLocalShipping size={20} />
                Shipping
              </button>
            </div>
            <div>
              <button
                className={
                  categoriType == 4 ? "category_btn_active " : "category_btnn"
                }
                onClick={() => {
                  setCategoryType(4);
                }}
              >
                <GrAtm className="me-1" />
                Return
              </button>
            </div>
          </div>
          {categoriType == 1 && (
            <div
              className="accordion accordion-flush"
              id="accordionFlushExample"
            >
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingOne">
                  <button
                    className="px-0 accordion-button collapsed "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    IS CASH ON DELIVERY (COD) AVAILABLE?
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="px-0 accordion-body">
                    Yes! COD is available for orders below INR 5000 on all
                    serviceable pincodes.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingTwo">
                  <button
                    className="px-0 accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    HOW TO PLACE AN RETURN / EXCHANGE REQUEST?
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingTwo"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="px-0 accordion-body">
                    <ul className="px-0">
                      <li>
                        Visit the Place your Return / Exchange Request section
                        on the website / app or <Link to="/">click here</Link>{" "}
                        to raise a return/exchange request for your order.
                      </li>
                      <li>Submit the required details as prompted.</li>
                      <li>
                        Follow the instructions and select the item(s) you would
                        want to Return/Exchange.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingThree">
                  <button
                    className="px-0 accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                  >
                    HOW LONG WILL MY ORDER TAKE TO ARRIVE?
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingThree"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="px-0 accordion-body">
                    The order usually takes 2-5 working days to reach all the
                    metros and tier I cities, however for some pin codes it
                    might take a little more time.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingFour">
                  <button
                    className="px-0 accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFour"
                    aria-expanded="false"
                    aria-controls="flush-collapseFour"
                  >
                    ARE THERE ANY SHIPPING CHARGES ON DELIVERY?
                  </button>
                </h2>
                <div
                  id="flush-collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingFour"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="px-0 accordion-body">
                    We charge a shipping fee of INR 100/- on all COD orders.
                  </div>
                </div>
              </div>
            </div>
          )}

          {categoriType == 2 && (
            <div
              className="accordion accordion-flush"
              id="accordionFlushExample"
            >
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingOne">
                  <button
                    className="px-0 accordion-button collapsed "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    HOW CAN I CANCEL AN ORDER?
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="px-0 accordion-body">
                    You can cancel you order within 6 hours of placing the order
                    via Whatsapp. You can opt to cancel order by clicking the
                    cancel order button in the Order confirmation message.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingTwo">
                  <button
                    className="px-0 accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    HOW DO I RETURN / EXCHANGE A PRODUCT?
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingTwo"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="px-0 accordion-body">
                    <ul className="px-0">
                      <li>
                        In case of returns/exchange, visit the returns section
                        on the website or click here to raise a return request
                        for your order. You need to pack the product back in its
                        original packing (with tags) and handover the packet to
                        our courier person. As soon as we have it back in our
                        warehouse, we will verify and issue a refund on the same
                        account details used while making payment.
                      </li>
                      <li>
                        Please note that handling fee of INR 100 is charged for
                        returns. In addition, order placed during any sale (eg:
                        BOGO) which includes free products are not eligible for
                        returns / exchanges.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingThree">
                  <button
                    className="px-0 accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                  >
                    CAN I RETURN ALL ITEMS?
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingThree"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="px-0 accordion-body">
                    Innerwear (Briefs, Trunks, Boxers), Socks, Sunglasses,
                    Accessories, Perfumes and Face Masks cannot be returned
                    keeping hygiene into consideration. In addition, orders
                    including any free products received during promotional
                    events/offers are not eligible for returns / exchanges.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingFour">
                  <button
                    className="px-0 accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFour"
                    aria-expanded="false"
                    aria-controls="flush-collapseFour"
                  >
                    HOW DO I GET MY REFUND FOR DISCOUNTED ITEMS?
                  </button>
                </h2>
                <div
                  id="flush-collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingFour"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="px-0 accordion-body">
                    <p>
                      In case of orders placed with discount is returned, the
                      discount will be waived of and the products will be billed
                      on MRP. The balance amount will be refunded as store
                      credit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {categoriType == 3 && (
            <div
              className="accordion accordion-flush"
              id="accordionFlushExample"
            >
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingOne">
                  <button
                    className="px-0 accordion-button collapsed "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    What Is Estimate Time Of Delivery?
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="px-0 accordion-body">
                    Your faves will reach you in 2-5 business days. A few areas
                    may face delay due to Government-mandated restrictions amid
                    COVID-19. Take Care!
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingTwo">
                  <button
                    className="px-0 accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    Are there any shipping charges applicable on my order?
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingTwo"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="px-0 accordion-body">
                    A minimal fee of Rs.49 is applicable on orders below Rs.500.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingThree">
                  <button
                    className="px-0 accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                  >
                    Do you ship outside India? Are there any additional shipping
                    charges?
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingThree"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="px-0 accordion-body">
                    Yes, we do. Additional shipping charges may apply. You can
                    also check out us.sugarcosmetics.com
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingFour">
                  <button
                    className="px-0 accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFour"
                    aria-expanded="false"
                    aria-controls="flush-collapseFour"
                  >
                    Where can I track my order?
                  </button>
                </h2>
                <div
                  id="flush-collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingFour"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="px-0 accordion-body">
                    <p>
                      You can log in to your SUGAR account and track your order
                      in 'My Orders' section. We will also send you an email
                      with the tracking details once the order is shipped.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {categoriType == 4 && (
            <div
              className="accordion accordion-flush"
              id="accordionFlushExample"
            >
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingOne">
                  <button
                    className="px-0 accordion-button collapsed "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    CAN I RETURN ALL ITEMS?
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="px-0 accordion-body">
                    Innerwear (Briefs, Trunks, Boxers), Socks, Sunglasses,
                    Accessories, Perfumes and Face Masks cannot be returned
                    keeping hygiene into consideration. In addition, orders
                    including any free products received during promotional
                    events/offers are not eligible for returns / exchanges.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingTwo">
                  <button
                    className="px-0 accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    HOW DO I CHECK THE STATUS FOR MY RETURNED ORDER?
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingTwo"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="px-0 accordion-body">
                    For further information on your returned order, you may log
                    into your account or reach us at: Instagram: @fashion.co.in
                    Whatsapp :+91 xxxxxxxx
                  </div>
                </div>
              </div>
            </div>
          )}
          {categoriType == 5 && (
            <div
              className="accordion accordion-flush"
              id="accordionFlushExample"
            >
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingOne">
                  <button
                    className="px-0 accordion-button collapsed "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    What is Fashion's credit card EMI payment option?
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="px-0 accordion-body">
                    <ul>
                      <li>HDFC</li>
                      <li>Citi</li>
                      <li>ICICI</li>
                      <li>Kotak</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingTwo">
                  <button
                    className="px-0 accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    How does Fashion prevent card fraud?
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingTwo"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="px-0 accordion-body">
                    Online payments are monitored by our systems for any
                    suspicious activity and some transactions are verified
                    through extensive checks if we find that they are not
                    authorised by the owner of the card. When we're not able to
                    rule fraud out in rare cases, the transaction is kept on
                    hold and we ask the shopper to share relevant proofs. This
                    is done to make sure that the transaction is genuine and
                    authorised.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingTwo">
                  <button
                    className="px-0 accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    Can I use any Debit Card to pay for my order?
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingTwo"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="px-0 accordion-body">
                    You can choose to pay for your order on Flipkart with any
                    Visa, MasterCard or Maestro Debit Card.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-4">
          <div className="ask_question">
            <input
              type="name"
              className="form-control mb-3"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="name"
              value=""
              placeholder="Your Name"
            />
            <input
              type="email"
              className="form-control mb-3"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value=""
              placeholder="Your Email"
            />
            <textarea
              type="text"
              className="form-control mb-3"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="message"
              value=""
              placeholder="Your Message"
            />
            <div className="d-flex justify-content-center">
              <button className={"ask_question_btn "}>Ask A Question</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;

import React, { Component } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import { toVnd } from "../utils/formatPrice";

export default class Product extends Component {
  
  displayModal = () => {
    this.props.getCurrentProductId(this.props._id);
  };
  componentDidMount() {
    $(".js-show-modal1").on("click", function (e) {
      e.preventDefault();
      $(".js-modal1").addClass("show-modal1");
    });

    $(".js-hide-modal1").on("click", function () {
      $(".js-modal1").removeClass("show-modal1");
    });
  }
  render() {
    return (
      <div className={`col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item ${this.props.category}`}>
        {/* Block2 */}
        <div className="block2">
          <div className="block2-pic hov-img0">
            <img
              src={`http://localhost:8080/images/${this.props.images[0]}`}
              alt="IMG-PRODUCT"
            />
            {/* <button
              onClick={this.displayModal}
              className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
            >
              Quick View
            </button> */}
          </div>
          <div className="block2-txt flex-w flex-t p-t-14">
            <div className="block2-txt-child1 flex-col-l ">
              <Link
                to={`/product-detail/${this.props._id}`}
                className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
              >
                {this.props.productName}
              </Link>
              <span className="stext-105 cl3">{toVnd(this.props.price)}</span>
            </div>
            <div className="block2-txt-child2 flex-r p-t-3">
              <a
                href="/"
                className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
              >
                <img
                  className="icon-heart1 dis-block trans-04"
                  src="images/icons/icon-heart-01.png"
                  alt="ICON"
                />
                <img
                  className="icon-heart2 dis-block trans-04 ab-t-l"
                  src="images/icons/icon-heart-02.png"
                  alt="ICON"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import Product from "../../../components/Product";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isLoading: false,
      currentProduct: {},
      page: 0,
      filter: {
        query: "",
        sortBy: "newness",
        price: {
          from: 0,
          to: 100000,
        },
        color: "red",
        tag: "fashion",
      },
    };
  }
  shouldComponentUpdate(nextProps) {
    // this.state.filter["price"];
    console.log(queryString.parse(nextProps.searchParams));
    return true;
  }
  componentDidMount() {
    this.setState({ ...this.state, isLoading: true });
    axios
      .get("http://localhost:8080/api/products", {
        params: {
          page: this.state.page,
        },
      })
      .then((res) => {
        this.setState({ ...this.state, products: res.data });
        this.setState({ ...this.state, isLoading: false });
      });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.filter.query !== prevState.filter.query) {
      this.setState({ ...this.state, isLoading: true });
      axios
        .post("http://localhost:8080/api/products/search", {
          query: this.state.filter.query,
        })
        .then((res) => {
          this.setState({ ...this.state, products: res.data });
          this.setState({ ...this.state, isLoading: false });
        });
      return true;
    }
    if (this.state.page !== prevState.page) {
      this.setState({ ...this.state, isLoading: true });
      axios
        .get("http://localhost:8080/api/products", {
          params: {
            page: this.state.page,
          },
        })
        .then((res) => {
          this.setState({
            ...this.state,
            products: [...this.state.products, ...res.data],
          });
          this.setState({ ...this.state, isLoading: false });
        });
    }
    return false;
  }
  getCurrentProductId = (productId) => {
    this.setState({
      ...this.state,
      currentProduct: this.state.products.find(
        (product) => product._id === productId
      ),
    });
  };
  handleSearch = (e) => {
    this.setState({
      ...this.state,
      filter: {
        ...this.state.filter,
        query: e.target.value,
      },
    });
  };
  render() {
    return (
      <>
        <section className="bg0 p-t-23 p-b-140">
          <div className="container">
            <div className="p-b-10">
              <h3 className="ltext-103 cl5">Product Overview</h3>
            </div>
            <div className="flex-w flex-sb-m p-b-52">
              <div className="flex-w flex-l-m filter-tope-group m-tb-10">
                <button
                  className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 how-active1"
                  data-filter="*"
                >
                  All Products
                </button>
                <button
                  className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
                  data-filter=".women"
                >
                  Women
                </button>
                <button
                  className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
                  data-filter=".men"
                >
                  Men
                </button>
                <button
                  className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
                  data-filter=".bag"
                >
                  Bag
                </button>
                <button
                  className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
                  data-filter=".shoes"
                >
                  Shoes
                </button>
                <button
                  className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
                  data-filter=".watches"
                >
                  Watches
                </button>
              </div>
              <div className="flex-w flex-c-m m-tb-10">
                <div className="flex-c-m stext-106 cl6 size-104 bor4 pointer hov-btn3 trans-04 m-r-8 m-tb-4 js-show-filter">
                  <i className="icon-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-filter-list" />
                  <i className="icon-close-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none" />
                  Filter
                </div>
                <div className="flex-c-m stext-106 cl6 size-105 bor4 pointer hov-btn3 trans-04 m-tb-4 js-show-search">
                  <i className="icon-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-search" />
                  <i className="icon-close-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none" />
                  Search
                </div>
              </div>
              {/* Search product */}
              <div className="dis-none panel-search w-full p-t-10 p-b-15">
                <div className="bor8 dis-flex p-l-15">
                  <button className="size-113 flex-c-m fs-16 cl2 hov-cl1 trans-04">
                    <i className="zmdi zmdi-search" />
                  </button>
                  <input
                    className="mtext-107 cl2 size-114 plh2 p-r-15"
                    type="text"
                    name="search-product"
                    placeholder="Search"
                    value={this.state.filter.query}
                    onChange={this.handleSearch}
                  />
                </div>
              </div>
              {/* Filter */}
              <div className="dis-none panel-filter w-full p-t-10">
                <div className="wrap-filter flex-w bg6 w-full p-lr-40 p-t-27 p-lr-15-sm">
                  <div className="filter-col1 p-r-15 p-b-27">
                    <div className="mtext-102 cl2 p-b-15">Sort By</div>
                    <ul>
                      <li className="p-b-6">
                        <a href="/" className="filter-link stext-106 trans-04">
                          Default
                        </a>
                      </li>
                      <li className="p-b-6">
                        <a href="/" className="filter-link stext-106 trans-04">
                          Popularity
                        </a>
                      </li>
                      <li className="p-b-6">
                        <a href="/" className="filter-link stext-106 trans-04">
                          Average rating
                        </a>
                      </li>
                      <li className="p-b-6">
                        <a
                          href="/"
                          className="filter-link stext-106 trans-04 filter-link-active"
                        >
                          Newness
                        </a>
                      </li>
                      <li className="p-b-6">
                        <a href="/" className="filter-link stext-106 trans-04">
                          Price: Low to High
                        </a>
                      </li>
                      <li className="p-b-6">
                        <a href="/" className="filter-link stext-106 trans-04">
                          Price: High to Low
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="filter-col2 p-r-15 p-b-27">
                    <div className="mtext-102 cl2 p-b-15">Price</div>
                    <ul>
                      <li className="p-b-6">
                        <button className="filter-link stext-106 trans-04 filter-link-active">
                          All
                        </button>
                      </li>
                      <li className="p-b-6">
                        <Link
                          to="/?price=0-1000000"
                          className="filter-link stext-106 trans-04"
                          onClick={() => {
                            console.log(this.props.searchParams);
                          }}
                        >
                          0 VND - 1.000,000 VND
                        </Link>
                      </li>
                      <li className="p-b-6">
                        <Link
                          to="?price=1000000-3000000"
                          className="filter-link stext-106 trans-04"
                          onClick={() => {
                            console.log(this.props.searchParams);
                          }}
                        >
                          1.000,000 VND - 3.000.000 VND
                        </Link>
                      </li>
                      <li className="p-b-6">
                        <button className="filter-link stext-106 trans-04">
                          3.000,000 VND - 5.000.000 VND
                        </button>
                      </li>
                      <li className="p-b-6">
                        <button className="filter-link stext-106 trans-04">
                          5.000,000 VND - 10.000.000 VND
                        </button>
                      </li>
                      <li className="p-b-6">
                        <button className="filter-link stext-106 trans-04">
                          10.000,000 VND +
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="filter-col3 p-r-15 p-b-27">
                    <div className="mtext-102 cl2 p-b-15">Color</div>
                    <ul>
                      <li className="p-b-6">
                        <span
                          className="fs-15 lh-12 m-r-6"
                          style={{ color: "/222" }}
                        >
                          <i className="zmdi zmdi-circle" />
                        </span>
                        <a href="/" className="filter-link stext-106 trans-04">
                          Black
                        </a>
                      </li>
                      <li className="p-b-6">
                        <span
                          className="fs-15 lh-12 m-r-6"
                          style={{ color: "/4272d7" }}
                        >
                          <i className="zmdi zmdi-circle" />
                        </span>
                        <a
                          href="/"
                          className="filter-link stext-106 trans-04 filter-link-active"
                        >
                          Blue
                        </a>
                      </li>
                      <li className="p-b-6">
                        <span
                          className="fs-15 lh-12 m-r-6"
                          style={{ color: "/b3b3b3" }}
                        >
                          <i className="zmdi zmdi-circle" />
                        </span>
                        <a href="/" className="filter-link stext-106 trans-04">
                          Grey
                        </a>
                      </li>
                      <li className="p-b-6">
                        <span
                          className="fs-15 lh-12 m-r-6"
                          style={{ color: "/00ad5f" }}
                        >
                          <i className="zmdi zmdi-circle" />
                        </span>
                        <a href="/" className="filter-link stext-106 trans-04">
                          Green
                        </a>
                      </li>
                      <li className="p-b-6">
                        <span
                          className="fs-15 lh-12 m-r-6"
                          style={{ color: "/fa4251" }}
                        >
                          <i className="zmdi zmdi-circle" />
                        </span>
                        <a href="/" className="filter-link stext-106 trans-04">
                          Red
                        </a>
                      </li>
                      <li className="p-b-6">
                        <span
                          className="fs-15 lh-12 m-r-6"
                          style={{ color: "/aaa" }}
                        >
                          <i className="zmdi zmdi-circle-o" />
                        </span>
                        <a href="/" className="filter-link stext-106 trans-04">
                          White
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="filter-col4 p-b-27">
                    <div className="mtext-102 cl2 p-b-15">Tags</div>
                    <div className="flex-w p-t-4 m-r--5">
                      <a
                        href="/"
                        className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                      >
                        Fashion
                      </a>
                      <a
                        href="/"
                        className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                      >
                        Lifestyle
                      </a>
                      <a
                        href="/"
                        className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                      >
                        Denim
                      </a>
                      <a
                        href="/"
                        className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                      >
                        Streetstyle
                      </a>
                      <a
                        href="/"
                        className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                      >
                        Crafts
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="row isotope-grid"
              style={
                this.state.isLoading
                  ? {
                      height: "200px !important",
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "30px",
                    }
                  : { height: "auto" }
              }
            >
              {this.state.isLoading ? (
                <div className="d-flex justify-content-center align-items-center">
                  <svg
                    className="spinner"
                    width="65px"
                    height="65px"
                    viewBox="0 0 66 66"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="path"
                      fill="none"
                      strokeWidth="6"
                      strokeLinecap="round"
                      cx="33"
                      cy="33"
                      r="30"
                    ></circle>
                  </svg>
                </div>
              ) : (
                this.state.products.map((product) => (
                  <Product
                    key={product._id}
                    {...product}
                    getCurrentProductId={this.getCurrentProductId}
                  />
                ))
              )}
            </div>
            {/* Load more */}
            <div className="flex-c-m flex-w w-full p-t-45">
              <button
                className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04"
                onClick={() => {
                  this.setState({ ...this.state, page: this.state.page + 1 });
                }}
              >
                Load More
              </button>
            </div>
          </div>
        </section>
        <Modal currentProduct={this.state.currentProduct} />
      </>
    );
  }
}

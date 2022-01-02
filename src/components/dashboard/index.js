import React, { Component } from 'react';
import { Link, NavLink, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Avatar } from "antd";
import { logout } from '../../actions/authAction'

//dashboard components
import '../../dashboard.css'
import Home from './components/Home';
import AddProduct from './components/AddProduct';
import Product from './components/Product';
import Profile from './components/Profile';
import AddProfile from './components/AddProfile';

// function ActiveNav({
//   to,
//   className,
//   activeClassName,
//   inactiveClassName,
//   ...rest
// }) {
//   let location = useLocation()
//   let isActive = location.pathname === to

//   let allClassNames = className + (isActive ? `${activeClassName}` : `${inactiveClassName}`)

//   return <Link className={allClassNames} to={to} {...rest} />
// }

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      child: props.nestedRoute,
      search: "",
    };
  }

  avatarText = (name) => {
    let initial = "";
    const names = name.split(" ");
    names.forEach((name) => {
      initial = initial + name.charAt(0);
    });
    return initial;
  };

  logUserOut = (e) => {
    e.preventDefault();
    this.props.logout();
  };

  render() {
    // const Child = this.state.child
    // console.log(Child)
    const { user } = this.props.auth;

    return (
      <div>
        <div className="wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <nav className="navbar navbar-expand navbar-light bg-white topbar mb-44 static-top shadow">
                <button
                  id="sidebarToggleTop"
                  className="btn btn-link rounded-circle mr-3"
                >
                  <i className="fa fa-bars"></i>
                </button>

                <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control bg-light border-0 small"
                      placeholder="Search for..."
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button">
                        <i className="fas fa-search fa-sm"></i>
                      </button>
                    </div>
                  </div>
                </form>

                <ul className="navbar-nav ml-auto">
                  <li className="nav-item dropdown no-arrow d-sm-none">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="#"
                      id="searchDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-search fa-fw"></i>
                    </Link>

                    <div
                      className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                      aria-labelledby="searchDropdown"
                    >
                      <form className="form-inline mr-auto w-100 navbar-search">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control bg-light border-0 small"
                            placeholder="Search for..."
                            aria-label="Search"
                            aria-describedby="basic-addon2"
                          />
                          <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                              <i className="fas fa-search fa-sm"></i>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </li>

                  <li className='nav-item dropdown no-arrow'>
                    <Link
                      className="nav-link dropdown-toggle"
                      to="#"
                      id="userDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                        {user.name}
                      </span>
                      <Avatar size={40}>
                        {user.name && this.avatarText(user.name)}
                      </Avatar>
                    </Link>

                    <div
                      className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                      aria-labelledby="userDropdown"
                    >
                      <Link className="dropdown-item" to="#">
                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        Profile
                      </Link>
                      <Link className="dropdown-item" to="#">
                        <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                        Settings
                      </Link>
                      <Link className="dropdown-item" to="#">
                        <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                        Activity Log
                      </Link>
                      <div className="dropdown-divider"></div>
                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={this.logUserOut}
                      >
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                        Logout
                      </Link>
                    </div>
                  </li>
                </ul>
              </nav>
              {/* <Child {...this.props} search={this.state.search} /> */}

            </div>
          </div>

          <div className='main-content' style={{display:"flex"}}>
            <ul
              className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
              id="accordionSidebar"
            >
              <NavLink
                className="sidebar-brand d-flex align-items-center justify-content-center"
                to="/"
              >
                <div className="sidebar-brand-text mx-3">
                  <i className="fas fa-store"></i> e-Shop
                </div>
              </NavLink>

              <hr className="sidebar-divider my-0" />

              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard">
                  <i className="fas fa-fw fa-tachometer-alt "></i>
                  <span>Merchant Store</span>
                </NavLink>
              </li>

              <hr className="sidebar-divider" />

              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard/addProduct">
                  <i className="fas fa-fw fa-chart-area"></i>
                  <span>Add A Product</span>
                </NavLink>
              </li>

              <hr className="sidebar-divider " />

              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard/products">
                  <i className="fas fa-fw fa-table"></i>
                  <span>Products</span>
                </NavLink>
              </li>

              <hr className="sidebar-divider" />

              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard/profile">
                  <i className="far fa-id-card"></i>
                  <span>Profile</span>
                </NavLink>
              </li>
              <hr className="sidebar-divider " />
            </ul>

            <div className='nested-routes' style={{ margin:"2rem" }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/addProduct" element={<AddProduct />} />
                <Route path="/products" element={<Product />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/addprofile" element={<AddProfile />} />
              </Routes>
            </div>
          </div>



          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>Copyright &copy; eShop {new Date().getFullYear()}</span>
              </div>
            </div>
          </footer>
        </div>

        <Link className="scroll-to-top rounded" to="#page-top">
          <i className="fas fa-angle-up"></i>
        </Link>
        <div
          className="modal fade"
          id="logoutModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Ready to Leave?
                </h5>
                <button
                  className="close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                Select "Logout" below if you are ready to end your current
                session.
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  type="button"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <Link className="btn btn-primary" to="login.html">
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Dashboard);


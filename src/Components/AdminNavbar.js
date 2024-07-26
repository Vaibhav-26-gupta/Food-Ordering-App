import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const navigate = useNavigate();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic " to="/">
            GoFooD
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="d-flex flex-grow-1 justify-content-center align-items-center fs-1 fw-bold">
              GoFooD-CMS
            </div>

            <div className="d-flex">
              <div
                className="btn bg-white text-danger mx-2 "
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

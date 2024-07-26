import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <footer
        className="d-flex flex-wrap justify-content-between align-items-center border-top"
        style={{ height: "80px" }}
      >
        <div className="col-md-4 d-flex align-items-center w-100 justify-content-center">
          <Link
            to="/"
            className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
          ></Link>
          <span className="text-muted">© 2024 GoFooD, Inc</span>
        </div>
      </footer>
    </div>
  );
}

export default Footer;

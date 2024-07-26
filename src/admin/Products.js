import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../Components/AdminNavbar";
import Footer from "../Components/Footer";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

const Products = () => {
  const [items, setItems] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const TOTAL_ITEMS_PER_PAGE = 8;
  const goPrevPage = () => {
    if (currentPageNumber === 1) return;
    setCurrentPageNumber((prev) => prev - 1);
  };

  const goNextPage = () => {
    if (currentPageNumber === Math.ceil(items.length / TOTAL_ITEMS_PER_PAGE))
      return;
    setCurrentPageNumber((prev) => prev + 1);
  };

  const handlePageChange = (e) => {
    setCurrentPageNumber(parseInt(e.target.value));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/displayItems"
        );
        console.log(response.data);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const startIndex = (currentPageNumber - 1) * TOTAL_ITEMS_PER_PAGE;
    const endIndex = startIndex + TOTAL_ITEMS_PER_PAGE;
    setDataToDisplay(items.slice(startIndex, endIndex));
  }, [currentPageNumber, items]);

  if (items.length === 0) return <div>Loading...</div>;

  // const addCategory = async () => {
  //   const category = prompt("Enter New Category");
  //   await fetch("http://localhost:8080/api/v1/addcategory", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: category,
  //     }),
  //   });
  // };
  const addCategory = async () => {
    const category = prompt("Enter New Category");

    if (category === null || category.trim() === "") {
      console.log("User canceled or entered empty category. No action taken.");
      return;
    }

    const capitalizeFirstLetter = (str) => {
      return str
        .toLowerCase()
        .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
    };

    const capitalizedCategory = capitalizeFirstLetter(category);

    await fetch("http://localhost:8080/api/v1/addcategory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: capitalizedCategory,
      }),
    });
  };

  return (
    <>
      <AdminNavbar />
      <Sidebar>
        <div className="m-2">
          <div
            className="d-grid gap-2 d-md-flex"
            style={{
              float: "right",
              marginRight: "50px",
              marginBottom: "10px",
            }}
          >
            <button onClick={addCategory}>Add Category</button>
            <button>
              <Link className="btn text-white" to="/admin/addItem">
                Add Item
              </Link>
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Category Name</th>
                <th scope="col">Item Name</th>
                <th scope="col">Options</th>
                <th scope="col">Image</th>
                <th scope="col">Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {dataToDisplay.map((item, index) => (
                <tr key={index}>
                  <th scope="row">
                    {(currentPageNumber - 1) * TOTAL_ITEMS_PER_PAGE + index + 1}
                  </th>
                  <td>{item.CategoryName}</td>
                  <td>{item.name}</td>
                  <td>
                    {/* Display options based on structure */}
                    {item.options.map((option, i) => (
                      <div key={i}>
                        {option.regular && <div>Regular: {option.regular}</div>}
                        {option.medium && <div>Medium: {option.medium}</div>}
                        {option.large && <div>Large: {option.large}</div>}
                        {option.half && <div>Half: {option.half}</div>}
                        {option.full && <div>Full: {option.full}</div>}
                      </div>
                    ))}
                  </td>
                  <td>
                    <img
                      src={item.img}
                      alt="food"
                      style={{ width: "100px", height: "75px" }}
                    />
                  </td>
                  <td>
                    <div className="d-grid gap-2 d-md-flex ">
                      <button className="btn btn-primary btn-color btn-bg-color btn-sm col-xs-2 ">
                        Edit
                      </button>{" "}
                      <br />
                      <button className="btn btn-primary btn-color btn-bg-color btn-sm col-xs-2 ">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          id="pagination-controls"
          className="text-center  d d-flex align-items-center w-100"
          style={{
            justifyContent: "center",
            // paddingBottom: "30px",
            marginTop: "2rem",
          }}
        >
          <button
            className="btn btn-primary mr-2"
            style={{ marginRight: "12px", width: "100px" }}
            onClick={goPrevPage}
          >
            Prev
          </button>
          <select
            className="form-control d-inline-block"
            style={{ width: "100px" }}
            onChange={handlePageChange}
            value={currentPageNumber}
          >
            {Array.from(
              Array(Math.ceil(items.length / TOTAL_ITEMS_PER_PAGE)),
              (e, i) => i + 1
            ).map((page) => (
              <option key={page} value={page}>
                Page {page}
              </option>
            ))}
          </select>
          <button
            className="btn btn-primary ml-2"
            style={{ marginLeft: "12px", width: "100px" }}
            onClick={goNextPage}
          >
            Next
          </button>
        </div>
      </Sidebar>
      <Footer />
    </>
  );
};

export default Products;

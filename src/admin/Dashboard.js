import React, { useEffect, useState } from "react";
import AdminNavbar from "../Components/AdminNavbar";
import Footer from "../Components/Footer";
import Sidebar from "./Sidebar";
import axios from "axios";
// import { TablePagination } from "@mui/material";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [data, setData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get("http://localhost:8080/api/v1/displayUsers")
          .then((result) => {
            setItems(result.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [data]);

  const fetchAdmin = async () => {
    try {
      const response = await axios
        .get("http://localhost:8080/api/v1/displayAdmins")
        .then((result) => {
          setItems(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div>
        <AdminNavbar />
        {/* <div className="d-flex flex-col"> */}
        <Sidebar>
          <div className=" m-2 ">
            <button
              type="button"
              class="btn btn-primary btn-lg"
              onClick={() => setData(!data)}
            >
              Users
            </button>
            <button
              type="button"
              class="btn btn-secondary btn-lg"
              onClick={fetchAdmin}
            >
              Admins
            </button>{" "}
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Address</th>
                </tr>
              </thead>
              {items.map((e, i) => {
                return (
                  <>
                    <tbody>
                      <tr>
                        <th scope="row">{i + 1}</th>
                        <td>{e.name}</td>
                        <td>{e.email}</td>
                        <td>{e.location}</td>
                      </tr>
                    </tbody>
                  </>
                );
              })}
            </table>
          </div>
        </Sidebar>

        {/* </div> */}
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;

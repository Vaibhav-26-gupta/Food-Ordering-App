import "./App.css";
import Home from "./screens/Home";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import Login from "./screens/Login";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Signup from "./screens/Signup.js";
import CartProvider from "./Components/ContextReducer.js";
import Admin from "./admin/Dashboard.js";
import MyOrder from "./screens/MyOrder.js";
import { useEffect, useState } from "react";
import Orders from "./admin/Orders.js";
import Products from "./admin/Products.js";
import AddItemForm from "./screens/AddItem.js";

function App() {
  const [rol, setRol] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  var tokenData = localStorage.getItem("authToken");
  const parseJwt = (token) => {
    try {
      const tData = JSON.parse(atob(token.split(".")[1]));
      setRol(tData.user.role);
      return tData;
    } catch (e) {
      return null;
    }
  };

  const logout = () => {
    window.localStorage.removeItem("authToken");
    navigate("/login");
  };
  useEffect(() => {
    const user = localStorage.getItem("authToken");
    if (!!user) {
      const decodedJwt = parseJwt(user);
      //   if (decodedJwt.exp * 1000 < Date.now()) {
      //     logout();
      //   }
      // } else {
      //   logout();
    }
    return;
  }, [location.pathname, tokenData]);

  return (
    <>
      <CartProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/createuser" element={<Signup />} />
          <Route exact path="/myOrder" element={<MyOrder />} />
          (rol === "admin" || rol === "superAdmin") &&{" "}
          <Route exact path="/admin" element={<Admin />} /> && (
          <Route exact path="/admin/orders" element={<Orders />} />
          ) && <Route exact path="/admin/products" element={<Products />} />
          &&
          <Route exact path="/admin/addItem" element={<AddItemForm />} />
          {rol === "user" && <Route exact path="/" element={<Home />} />}
          {tokenData == null && location.pathname === "/admin" && (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
          {tokenData !== null &&
            location.pathname === "/admin" &&
            rol === "user" && (
              <Route path="*" element={<Navigate to="/" replace />} />
            )}
          {}
        </Routes>
      </CartProvider>
    </>
  );
}

export default App;

//   return (
//     <>
//       <CartProvider>
//         <Routes>
//           <Route exact path="/" element={<Home />} />
//           <Route exact path="/login" element={<Login />} />
//           <Route exact path="/createuser" element={<Signup />} />
//           <Route exact path="/myOrder" element={<MyOrder />} />

//           {/* Admin Routes */}
//           {(rol === "admin" || rol === "superAdmin") && (
//             <>
//               <Route exact path="/admin" element={<Admin />} />
//               <Route exact path="/admin/orders" element={<Orders />} />
//               <Route exact path="/admin/products" element={<Products />} />
//               <Route exact path="/admin/addItem" element={<AddItemForm />} />
//             </>
//           )}

//           {/* Redirects */}
//           {!tokenData && location.pathname.startsWith("/admin") && (
//             <Route path="*" element={<Navigate to="/login" replace />} />
//           )}
//           {tokenData &&
//             !["admin", "superAdmin"].includes(rol) &&
//             location.pathname.startsWith("/admin") && (
//               <Route path="*" element={<Navigate to="/" replace />} />
//             )}
//         </Routes>
//       </CartProvider>
//     </>
//   );
// }

// export default App;

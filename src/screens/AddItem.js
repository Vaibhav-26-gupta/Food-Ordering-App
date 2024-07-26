// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AddItemForm = () => {
//   const [categories, setCategories] = useState([]);
//   const [categoryName, setCategoryName] = useState("");
//   const [itemName, setItemName] = useState("");
//   const [itemImg, setItemImg] = useState("");
//   const [itemOptions, setItemOptions] = useState([]);
//   const [itemDescription, setItemDescription] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8080/api/v1/categories"
//         );
//         setCategories(response.data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/v1/additem",
//         {
//           CategoryName: categoryName,
//           name: itemName,
//           img: itemImg,
//           options: itemOptions,
//           description: itemDescription,
//         }
//       );
//       console.log(response.data);
//       setSuccessMessage("Item added successfully");
//       setErrorMessage("");
//       setCategoryName("");
//       setItemName("");
//       setItemImg("");
//       setItemOptions([]);
//       setItemDescription("");
//     } catch (error) {
//       console.error("Error adding item:", error);
//       setSuccessMessage("");
//       setErrorMessage("Failed to add item");
//     }
//   };

//   const handleOptionChange = (index, field, value) => {
//     const updatedOptions = [...itemOptions];
//     updatedOptions[index][field] = value;
//     setItemOptions(updatedOptions);
//   };

//   const handleAddOption = () => {
//     setItemOptions([...itemOptions, { option: "", price: "" }]);
//   };

//   const handleRemoveOption = (index) => {
//     const updatedOptions = [...itemOptions];
//     updatedOptions.splice(index, 1);
//     setItemOptions(updatedOptions);
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">Add New Item</h2>
//       {successMessage && (
//         <div className="alert alert-success">{successMessage}</div>
//       )}
//       {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="categoryName" className="form-label">
//             Category Name:
//           </label>
//           <select
//             className="form-control"
//             id="categoryName"
//             value={categoryName}
//             onChange={(e) => setCategoryName(e.target.value)}
//             required
//           >
//             <option value="">Select a category</option>
//             {categories.map((category) => (
//               <option key={category._id} value={category.CategoryName}>
//                 {category.CategoryName}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="itemName" className="form-label">
//             Item Name:
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="itemName"
//             value={itemName}
//             onChange={(e) => setItemName(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="itemImg" className="form-label">
//             Item Image URL:
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="itemImg"
//             value={itemImg}
//             onChange={(e) => setItemImg(e.target.value)}
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Options:</label>
//           {itemOptions.map((option, index) => (
//             <div key={index} className="row mb-3">
//               <div className="col">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Option"
//                   value={option.option}
//                   onChange={(e) =>
//                     handleOptionChange(index, "option", e.target.value)
//                   }
//                   required
//                 />
//               </div>
//               <div className="col">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Price"
//                   value={option.price}
//                   onChange={(e) =>
//                     handleOptionChange(index, "price", e.target.value)
//                   }
//                   required
//                 />
//               </div>
//               <div className="col-auto">
//                 <button
//                   type="button"
//                   className="btn btn-outline-danger"
//                   onClick={() => handleRemoveOption(index)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//           <button
//             type="button"
//             className="btn btn-outline-primary"
//             onClick={handleAddOption}
//           >
//             Add Option
//           </button>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="itemDescription" className="form-label">
//             Item Description:
//           </label>
//           <textarea
//             className="form-control"
//             id="itemDescription"
//             rows="3"
//             value={itemDescription}
//             onChange={(e) => setItemDescription(e.target.value)}
//             required
//           ></textarea>
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Add Item
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddItemForm;

import React, { useState, useEffect } from "react";
import axios from "axios";

const AddItemForm = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemImg, setItemImg] = useState("");
  const [itemOptions, setItemOptions] = useState([]);
  const [itemDescription, setItemDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const transformedOptions = itemOptions.map((option) => ({
        [option.option]: option.price,
      }));

      const response = await axios.post(
        "http://localhost:8080/api/v1/additem",
        {
          CategoryName: categoryName,
          name: itemName,
          img: itemImg,
          options: transformedOptions,
          description: itemDescription,
        }
      );
      console.log(response.data);
      setSuccessMessage("Item added successfully");
      setErrorMessage("");
      setCategoryName("");
      setItemName("");
      setItemImg("");
      setItemOptions([]);
      setItemDescription("");
    } catch (error) {
      console.error("Error adding item:", error);
      setSuccessMessage("");
      setErrorMessage("Failed to add item");
    }
  };

  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...itemOptions];
    updatedOptions[index][field] = value;
    setItemOptions(updatedOptions);
  };

  const handleAddOption = () => {
    setItemOptions([...itemOptions, { option: "", price: "" }]);
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = [...itemOptions];
    updatedOptions.splice(index, 1);
    setItemOptions(updatedOptions);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add New Item</h2>
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="categoryName" className="form-label">
            Category Name:
          </label>
          <select
            className="form-control"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.CategoryName}>
                {category.CategoryName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="itemName" className="form-label">
            Item Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="itemImg" className="form-label">
            Item Image URL:
          </label>
          <input
            type="text"
            className="form-control"
            id="itemImg"
            value={itemImg}
            onChange={(e) => setItemImg(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Options:</label>
          {itemOptions.map((option, index) => (
            <div key={index} className="row mb-3">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Option"
                  value={option.option}
                  onChange={(e) =>
                    handleOptionChange(index, "option", e.target.value)
                  }
                  required
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Price"
                  value={option.price}
                  onChange={(e) =>
                    handleOptionChange(index, "price", e.target.value)
                  }
                  required
                />
              </div>
              <div className="col-auto">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => handleRemoveOption(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleAddOption}
          >
            Add Option
          </button>
        </div>
        <div className="mb-3">
          <label htmlFor="itemDescription" className="form-label">
            Item Description:
          </label>
          <textarea
            className="form-control"
            id="itemDescription"
            rows="3"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItemForm;

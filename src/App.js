import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "./App.css";

const PER_PAGE = 10;

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    fetch("https://ihsavru.me/Demo/uploads.json")
      .then((res) => res.json())
      .then((data) => {
        const {
          course: { uploads }
        } = data;
        setData(uploads);
      });
  }

  function handlePageClick({ selected: selectedPage }) {
    // if using material ui or bootstrap might need to subtract 1 to stop first items to be sliced out
    setCurrentPage(selectedPage - 1);
  }

  const offset = currentPage * PER_PAGE;

  const currentPageData = data
    .slice(offset, offset + PER_PAGE)
    .map(({ thumburl }) => <img src={thumburl} />);

  const pageCount = Math.ceil(data.length / PER_PAGE);

  return (
    <div className="App">
      <h1>React Paginate Example</h1>
      {currentPageData}
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import * as XLSX from "xlsx";
// import Table from "react-bootstrap/Table";
// import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";

// const DisplayXlsx = () => {
//   const [items, setItems] = useState([]);
//   const [sheetNames, setSheetNames] = useState();
//   const [readFile, setReadFile] = useState();
//   const [sheetIndex, setSheetIndex] = useState({ idx: 0 });
//   const [currentPage, setCurrentPage] = useState(0);
//   const [itemsPerPage, setItemsPerPage] = useState(25);

//   useEffect(() => {
//     const promise = new Promise((resolve, reject) => {
//       const fileReader = new FileReader();
//       if (readFile) {
//         fileReader.readAsArrayBuffer(readFile);

//         fileReader.onload = (e) => {
//           const bufferArray = e.target.result;
//           const wb = XLSX.read(bufferArray, { type: "buffer" });
//           setSheetNames(wb.SheetNames);
//           const wsname = wb.SheetNames[sheetIndex.idx];
//           const ws = wb.Sheets[wsname];
//           const data = XLSX.utils.sheet_to_json(ws);
//           resolve(data);
//         };

//         fileReader.onerror = (error) => {
//           reject(error);
//         };
//       }
//     });

//     promise.then((d) => {
//       setItems(d);
//     });
//   }, [readFile, sheetIndex]);

//   let style = {
//     activeColor: {
//       backgroundColor: "#343a40",
//       color: "white",
//     },
//   };

//   const handlePageClick = (event, value) => {
//     setCurrentPage(value - 1);
//   };

//   const offset = currentPage * itemsPerPage;
//   const totalPages = Math.ceil(items.length / itemsPerPage);

//   const currentPageData = items.slice(offset, offset + itemsPerPage);

//   const chooseFile = (
//     <input
//       type="file"
//       onChange={(e) => {
//         const file = e.target.files[0];
//         setReadFile(file);
//       }}
//     />
//   );

//   const showSheets = sheetNames?.map((e, idx) => (
//     <div
//       style={idx === sheetIndex.idx ? style.activeColor : null}
//       key={idx}
//       className="sheetName"
//       onClick={() => setSheetIndex({ idx: idx })}
//     >{`${e}`}</div>
//   ));

//   const preview = (
//     <Table
//       striped
//       bordered
//       hover
//       variant="dark"
//       responsive
//       style={{ marginTop: "5px" }}
//     >
//       <thead>
//         <tr>
//           {currentPageData.length > 0
//             ? Object.keys(currentPageData[0]).map((e, idx) => (
//                 <th key={idx}>{e}</th>
//               ))
//             : null}
//         </tr>
//       </thead>
//       <tbody>
//         {currentPageData.map((d, idx) => {
//           let headers = Object.keys(d);
//           return (
//             <tr>
//               {headers.map((e, idx) => {
//                 return (
//                   <td key={idx}>
//                     {d[e].length > 200 ? d[e].substring(0, 200) + "..." : d[e]}
//                   </td>
//                 );
//               })}
//             </tr>
//           );
//         })}
//       </tbody>
//     </Table>
//   );

//   const pageCountSelector = (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         width: "100%",
//         marginTop: "5px",
//       }}
//     >
//       <datalist id="page-count">
//         <option value="25">25</option>
//         <option value="50">50</option>
//         <option value="100">100</option>
//         <option value="200">200</option>
//         <option value="500">500</option>
//       </datalist>
//       <h5>Total items: {items.length}</h5>
//       <InputGroup style={{ maxWidth: "15rem" }}>
//         <InputGroup.Text>Show</InputGroup.Text>
//         <Form.Control
//           list="page-count"
//           onChange={(e) => setItemsPerPage(+e.target.value)}
//           placeholder={itemsPerPage}
//         />
//       </InputGroup>
//     </div>
//   );

//   const pagination = (
//     <Stack spacing={2} style={{ marginTop: "5px" }}>
//       <Pagination count={totalPages} onChange={handlePageClick} />
//     </Stack>
//   );

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         padding: "1.25rem",
//       }}
//     >
//       {chooseFile}
//       {sheetNames && <h5 style={{ marginRight: "auto" }}>Sheet names:</h5>}
//       {showSheets}
//       {items.length > 0 && pageCountSelector}
//       {items.length > 0 && pagination}
//       {preview}
//     </div>
//   );
// };

// export default DisplayXlsx;


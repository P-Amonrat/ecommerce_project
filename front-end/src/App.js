import "./App.css";
import "antd/dist/antd.css";
import TableComp from "./components/TableComp";
import CreateComp from "./components/CreateComp";
import EditComp from "./components/EditComp";
import { Routes, Route, Link } from "react-router-dom";
import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { init } from "./slice/productSlice";
import LayoutComp from "./components/LayoutComp";
import LoginComp from "./components/LoginComp";
import RegisterComp from "./components/RegisterComp";
import UserContext from "./UserContext";

function App() {
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  // let result = "";
  axios.defaults.baseURL = "http://localhost:3000/";
  // axios.defaults.baseURL = "http://54.169.253.245:3000/";

  useEffect(() => {
    // console.log(axios("/"));
    async function getData() {
      let result = await axios.get("/");
      result = result.data;
      dispatch(init(result));
    }
    getData();

    // dispatch(init());
  }, []);

  return (
    <UserContext.Provider value={{ token, setToken }}>
      <Routes>
        <Route path="/" element={<LayoutComp />}>
          <Route index element={<LoginComp />} />
          <Route path="table" element={<TableComp />} />
          <Route path="create" element={<CreateComp />} />
          <Route path="register" element={<RegisterComp />} />
          <Route path="update/:id" element={<EditComp />} />
        </Route>
      </Routes>
      {/* <Axios /> */}
    </UserContext.Provider>
  );
}

export default App;

/* eslint-disable no-undef */
import "antd/dist/antd.css";
import "../App.css";
import { Table, Tag, Space, Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { create, edit, del } from "../slice/productSlice";
import "./table.css";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import jwt_decode from "jwt-decode";

const TableComp = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const state = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [username, setUsername] = useState();
  let token = localStorage.getItem("token")

  useEffect(() => {
    localStorage.getItem("token");

    if (token) {
      const decode = jwt_decode(token);
      console.log(decode);
      const username = decode.username;
      setUsername(username);
    }
  }, []);

  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      align: "center",
      render: (photo) => {
        // console.log(photo);
        return (
          <img src={`http://localhost:3000/static/upload-files/${photo}`}></img>
        );
      },
    },
    {
      title: "Product_Name",
      //   dataIndex: "product_name",
      key: "product_name",
      align: "center",
      render: (x) => <p>{x.product_name}</p>,
    },
    {
      title: "Stock_Left",
      dataIndex: "stock_left",
      align: "center",
      key: "Stock_Left",
    },
    {
      title: "Category",
      //   dataIndex: "category",
      align: "center",
      key: "category",
      render: (record) => (
        //  console.log(record),
        // console.log(_);

        <Space size="middle">
          <p>{record.category}</p>
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          {/* <a>Invite {record.name}</a> */}
          <Button
            type="primary"
            className="edit-btn"
            onClick={() =>
              navigate(`/update/${record.id}`, { data: record.id })
            }
          >
            <AiOutlineEdit className="edit-icon"></AiOutlineEdit>
            Edit
          </Button>
          <Button
            className="delete-btn"
            type="danger"
            onClick={() => dispatch(del(record))}
          >
            <AiOutlineDelete className="delete-icon"></AiOutlineDelete>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    // console.log(state);
  }, []);

  //   console.log(state.product[0]);
  return (
    <div className="table">
    <div className="welcome">
      <p >Welcome!! {username}</p>
    </div>
      <div className="table-page">
        <Table
          className="table"
          align="center"
          columns={columns}
          dataSource={state.product}
        />
        <div className="centerButton">
          <Button
            className="create-btn"
            type="primary"
            onClick={() => {
              navigate("/create");
            }}
          >
            Create
          </Button>
        </div>
      </div>
    </div>

  );
};
export default TableComp;

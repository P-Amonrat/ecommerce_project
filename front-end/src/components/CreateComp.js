import "antd/dist/antd.css";
import { Form, Input, Button, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { create } from "../slice/productSlice";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./create.css";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }

  return isJpgOrPng && isLt2M;
};

const CreateComp = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  //photo
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [insertId, setInsertId] = useState(null);

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e?.fileList;
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  //end

  const onFinish = async (values) => {
    // console.log("Success:", values);
    // console.log(values.photo);
    const formData = new FormData();
    formData.append("product_name", values.product_name);
    formData.append("stock_left", values.stock_left);
    formData.append("category", values.category);
    if (values.photo.length > 0) {
      formData.append("photo", values.photo[0].originFileObj);
    }

    let res = await axios.post(`/create`, formData);
    dispatch(
      create({
        key: values.product_name,
        ...values,
      })
    );
    navigate("/table");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="create-page">
      <div className="create-bg">
        <h1 className="create-new-product">Create new product!!</h1>
        <Form
          className="form-create"
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <p>Product Name :</p>
          <Form.Item
            name="product_name"
            rules={[
              {
                required: true,
                message: "Please input your product name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <p>Category :</p>
          <Form.Item name="category">
            <Input />
          </Form.Item>

          <p>Stock Left :</p>
          <Form.Item
            name="stock_left"
            rules={[
              {
                required: true,
                message: "Please input your stock left!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <p>Photo Upload :</p>
          <Form.Item
            name="photo"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              style={{
                width: "50px",
              }}
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={true}
              beforeUpload={() => false}
              // onChange={handleChange}
              // action={`http://localhost:3000/photo/${id}`}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    width: "50px",
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>

          <Form.Item>
            <div className="centerButton">
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateComp;

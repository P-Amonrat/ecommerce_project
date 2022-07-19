import "antd/dist/antd.css";
import { Form, Input, Button, Upload } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { edit } from "../slice/productSlice";
import ImgCrop from "antd-img-crop";
import { useState } from "react";
import { useForm } from "antd/lib/form/Form";
import "./create.css";

const EditComp = () => {
  let navigate = useNavigate();
  let params = useParams();
  let location = useLocation();
  let dispatch = useDispatch();

  console.log(location);

  // let form = Form.useForm();
  // form.setFieldsValue({
  //   product_name: "values.product_name",
  // });

  const onFinish = (values) => {
    console.log("Success:", values);
    console.log("iddd", params.id);

    // console.log("checksend", location);
    dispatch(
      edit({
        key: params.id,
        product_name: values.product_name,
        stock_left: values.stock_left,
        category: values.category,
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
        <h1 className="create-new-product">Edit product!!</h1>
        <Form
          //form={form}
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

          <p>Stock Left :</p>
          <Form.Item
            name="stock_left"
            rules={[
              {
                required: true,
                message: "Please input your stock left!",
              },
            ]}
            initialValue=""
          >
            <Input />
          </Form.Item>

          <p>Category :</p>
          <Form.Item name="category">
            <Input />
          </Form.Item>

          <Form.Item>
            <div className="centerButton">
              <Button type="primary" htmlType="submit">
                Edit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditComp;

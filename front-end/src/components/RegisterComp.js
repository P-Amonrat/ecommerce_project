import React from "react";
import "antd/dist/antd.css";
import { Button, Form, Input } from "antd";
import axios from "axios";
import "./form.css";
import "./login.css";
import { useNavigate } from "react-router-dom";

const RegisterComp = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Success:", values);
    let result = await axios.post("/register", values);
    console.log(result);
    alert("Register is successfull!!")
    navigate("/");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-page">
      <div className="register-bg">
        <h1 className="register">Please Register Your Account!</h1>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <p>Username :</p>
          <Form.Item
            style={{ fontSize: "30px" }}
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input style={{ width: "300px" }} />
          </Form.Item>

          <p>Password :</p>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password style={{ width: "300px" }} />
          </Form.Item>

          <p>First Name : </p>
                    <Form.Item
                        name="firstname"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your firstname!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <p>Last Name : </p>
                    <Form.Item
                        name="lastname"
                        rules={[
                            {
                                message: 'Please input your lastname!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <p>E-mail : </p>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <p>Phone Number : </p>
                    <Form.Item
                        name="phone_number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

          <Form.Item>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterComp;

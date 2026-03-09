import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { Form, Input, Button, Row, Col, Spin } from "antd";
import { ToastContainer, toast } from "react-toastify";
import fetchHandler, { ACCESS_TOKEN, setCookie } from "./axios-config";
import { useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginAsync = async (values) => {
    const loginReq = {
      username: values.username,
      password: values.password,
      buildNumber: "11021",
      version: "1.98",
      deviceIP: "10.15.184.1",
      deviceModel: "SM-G965N",
      osVersion: "7.1.2",
    };

    setIsLoading(true);
    const res = await fetchHandler.post("login", loginReq);
    if (res && res.data && res.data.token) {
      setCookie(ACCESS_TOKEN, res.data.token);
      setIsLogin(true);
      toast.success("Đăng nhập thành công");
      setIsLoading(false);
      await handleCheckIn();
    } else {
      toast.error(res.message);
      setIsLoading(false);
    }
  };

  const handleCheckIn = async () => {
    const checkInReq = {
      deviceId: "",
      ssid: "FIS-User-5GHz",
      ipGateway: "10.15.184.1",
      type: 0,
    };

    setIsLoading(true);
    const res = await fetchHandler.post("checkin_all", checkInReq);
    if (res) {
      toast.success("Check in thành công");
      setIsLoading(false);
    } else {
      toast.error(res.message);
      setIsLoading(false);
    }
  };

  const handleCheckOut = async () => {
    const checkOutReq = {
      deviceId: "",
      ssid: "FIS-User-5GHz",
      ipGateway: "10.15.184.1",
      type: 0,
    };

    setIsLoading(true);
    const res = await fetchHandler.post("checkout_all", checkOutReq);
    if (res) {
      toast.success("Check out thành công");
      setIsLoading(false);
    } else {
      toast.error(res.message);
      setIsLoading(false);
    }
  };

  return (
    <Spin spinning={isLoading}>
      <div className="App">
        <h1 style={{ textAlign: "center", textTransform: "uppercase" }}>
          Team thỉnh kinh
        </h1>
        {isLogin ? (
          <Row gutter={50} style={{ 'justifyContent': 'center' }}>
            <Col xxl={6} xl={6} lg={6} md={24} sm={24}>
              {" "}
              <Button onClick={handleCheckIn}>Checkin</Button>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={24} sm={24}>
              {" "}
              <Button onClick={handleCheckOut}>Checkout</Button>
            </Col>
          </Row>
        ) : (
          <Form onFinish={handleLoginAsync} layout="vertical">
            <Form.Item
              label="Tài khoản"
              name="username"
              rules={[{ required: true, message: "Vui lòng nhập tài khoản" }]}
            >
              <Input placeholder="Nhập tài khoản" />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
              <Input placeholder="Nhập mật khẩu" />
            </Form.Item>
            <Form.Item label="">
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Đăng nhập
              </Button>
            </Form.Item>
            <Form.Item label="" style={{ textAlign: "center" }}>
              <a
                href="https://ess.fpt.com/account/unlock-account"
                style={{ width: "100%" }}
              >
                Mở khóa tài khoản
              </a>
            </Form.Item>
          </Form>
        )}

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Spin>
  );
}

export default App;

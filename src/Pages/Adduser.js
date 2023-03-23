import React, { useState } from "react";
import Header from "../Component/Header/Header";
import { Button } from "react-bootstrap";
import { Form, Input, Modal, Table } from "antd";
import axios from "axios";

const Adduser = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [image, setImage] = useState();

  const showModal = (e) => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (value) => {
    value.avatar = image;
    console.log(value);
    axios
      .post("https://reqres.in/api/users")
      .then((resp) => {
        // setData(resp);
        console.log(resp);
      });

    form.resetFields();
    setImage("");
    setIsModalOpen(false);
  };

  const checkImage = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div className="adduser-page">
      <Header />
      <div>
        <h1>Adduser page</h1>
        <Button onClick={showModal}>Adduser</Button>
      </div>
      <Modal
        footer={false}
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <div className="profile">
            <input
              type="file"
              className="input-btn"
              onChange={(event) => checkImage(event)}
            />
            {image && (
              <img src={image} alt="setImage" height="100px" width="100px" />
            )}
          </div>

          <Form.Item
            label="Firstname"
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please input your firstname!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Lastname"
            name="last_name"
            rules={[
              {
                required: true,
                message: "Please input your lastname!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary">Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Profile</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img src={item?.avatar} alt="img" className="image" />
                  </td>
                  <td>{item?.first_name}</td>
                  <td>{item?.last_name}</td>
                  <td>{item?.email}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Adduser;

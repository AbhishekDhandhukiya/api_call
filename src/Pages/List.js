import React, { useEffect, useState } from "react";
import "./singleUser.css";
import { Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Input, Modal } from "antd";
import Header from "../Component/Header/Header";
import axios from "axios";

const List = () => {
  const [userData, setUserData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState("");
  const [editId, setEditId] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch("https://reqres.in/api/users").then((result) => {
      result.json().then((resp) => {
        setUserData(resp.data);
      });
    });
  };
  const showModal = (item, id) => {
    setEditId(id);
    setIsModalOpen(true);
    setImage(item.avatar);
    form.setFieldsValue(item);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = () => {
    axios
      .put(`https://reqres.in/api/users/${editId}`)
      .then((response) => response.json())
      .then((resp) => {
        console.log(resp);
      });
    setIsModalOpen(false);
  };

  return (
    <div className="list-page">
      <Header />
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Profile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item?.id}</td>
                  <td>{item?.first_name}</td>
                  <td>{item?.last_name}</td>
                  <td>{item?.email}</td>
                  <td>
                    <img src={item?.avatar} alt="img" className="image" />
                  </td>
                  <td>
                    <Button onClick={() => showModal(item, index, item?.id)}>
                      EDIT
                    </Button>
                    <Button>DELETE</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
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
            {image && (
              <img src={image} alt="iamge" height="100px" width="100px" />
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
    </div>
  );
};

export default List;

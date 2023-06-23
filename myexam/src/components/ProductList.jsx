/* eslint-disable react/no-unknown-property */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {
  DeleteTwoTone,
  ExclamationCircleFilled,
  EyeTwoTone,
} from "@ant-design/icons";
import { Avatar, Card, Modal, Button } from "antd";
import { ModalView } from "./ModalView";
import { ModalAdd } from "./ModalAdd";
import noImg from "./../assets/No_img.png";

const { confirm } = Modal;
const { Meta } = Card;

function ProductList() {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Cabbage",
      detail: "aaaaaaaaaaaaaaaa",
      price: 500,
      img: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
      currency: "Baht",
    },
  ]);
  const [visible, setVisible] = useState(false);
  const [selectedView, setSelectedView] = useState();
  const [editData, setEditData] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [valid, setValid] = useState(true);

  const showModal = () => {
    setVisible(true);
    setEditData(false);
    setValid(true);
  };
  const productView = products.find((item) => {
    return selectedView === item.id;
  });

  const handleCancel = () => {
    setVisible(false);
  };
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure delete this product?",
      icon: <ExclamationCircleFilled />,
      okText: "Delete",
      okType: "danger",
      cancelText: "No",
      onOk() {
        const filtered = products.filter((item) => item.id !== id);
        setProducts(filtered);
      },
    });
  };
  const modalAddOpen = () => {
    setShowModalAdd(true);
  };
  console.log("product", products);
  return (
    <div
      className="flex flex-row flex-wrap gap-4 mt-4 px-10"
      style={{ maxWidth: 700 }}
    >
      <Button onClick={() => modalAddOpen()} className="w-full">
        Add Products
      </Button>
      {products.map((item) => (
        <Card
          key={item.id}
          style={{ width: 300 }}
          cover={
            <img
              alt="example"
              style={{
                width: "100%",
                maxHeight: 175,
              }}
              src={item.img || noImg}
            />
          }
          actions={[
            <EyeTwoTone
              key="view"
              onClick={() => {
                showModal();
                setSelectedView(item.id);
              }}
            />,
            <DeleteTwoTone
              twoToneColor="red"
              key="delete"
              onClick={() => {
                showDeleteConfirm(item.id);
              }}
            />,
          ]}
        >
          <Meta
            avatar={
              <Avatar
                src={"https://xsgames.co/randomusers/avatar.php?g=pixel"}
              />
            }
            title={item.title}
            description={item.detail}
          />
        </Card>
      ))}
      <ModalView
        visible={visible}
        setVisible={setVisible}
        handleCancel={handleCancel}
        products={products}
        setProducts={setProducts}
        selectedView={selectedView}
        editData={editData}
        setEditData={setEditData}
        productView={productView}
        setValid={setValid}
        valid={valid}
      />
      <ModalAdd
        showModalAdd={showModalAdd}
        handleCancel={handleCancel}
        setShowModalAdd={setShowModalAdd}
        products={products}
        setProducts={setProducts}
      />
    </div>
  );
}

export default ProductList;

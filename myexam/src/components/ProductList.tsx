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
type Product = {
  id: number;
  title: string;
  detail: string;
  price: number;
  img: string;
  currency: string;
};
function ProductList() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      title: "Cabbage",
      detail: "aaaaaaaaaaaaaaaa",
      price: 500,
      img: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
      currency: "Baht",
    },
  ]);

  const [visible, setVisible] = useState<boolean>(false);
  const [selectedView, setSelectedView] = useState<number>();
  const [editData, setEditData] = useState<boolean>(false);
  const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(true);

  const showModal = () => {
    setVisible(true);
    setEditData(false);
    setValid(true);
  };
  const productView = products.find((item: any) => {
    return selectedView === item.id;
  });

  const handleCancel = () => {
    setVisible(false);
  };
  const showDeleteConfirm = (id: number) => {
    confirm({
      title: "Are you sure delete this product?",
      icon: <ExclamationCircleFilled />,
      okText: "Delete",
      okType: "danger",
      cancelText: "No",
      onOk() {
        const filtered = products.filter((item: any) => item.id !== id);
        setProducts(filtered);
      },
    });
  };
  const modalAddOpen = () => {
    setShowModalAdd(true);
  };
  return (
    <div
      className="flex flex-row flex-wrap gap-4 mt-4 px-10"
      style={{ maxWidth: 700 }}
    >
      <Button onClick={() => modalAddOpen()} className="w-full">
        Add Products
      </Button>
      {products.map((item: any) => (
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

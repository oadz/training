import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import {
  EditOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import noImg from "./../assets/No_img.png";
const { Option } = Select;

export const ModalView = (props) => {
  const {
    visible,
    products,
    selectedView,
    handleCancel,
    editData,
    setProducts,
    setEditData,
    setVisible,
  } = props;
  const { TextArea } = Input;
  const [imageUrl, setImageUrl] = useState(products.img);


  const productView = products.find((item) => {
    return selectedView === item.id;
  });
  // console.log("products", products);
  // console.log("productView", productView);
  const [dataToEdit, setDataToEdit] = useState({
    title: null,
    detail: null,
    price: 1,
    img: "",
    id: "",
    currency: "Baht",
  });
  const editButton = () => {
    setEditData(!editData);
  };

  const handleEdit = (id) => {
    if (!editData) {
      setVisible(false)
    } else {
      setProducts((item) => {
        const editedIndex = item.findIndex((data) => data.id === id);
        item[editedIndex] = dataToEdit
        return [...item];
      });
      setEditData(false)
      setVisible(false)
    }

  };
  // const handleChange = (event) => {
  //   const { files } = event.target;
  //   const url = URL.createObjectURL(files[0]);
  //   setImageUrl(url)
  //   setDataToEdit((data) => ({
  //     ...data,
  //     img: url,
  //   }));
  // };

  // useEffect(() => {
  //   setDataToEdit((data) => ({
  //     ...data,
  //     title: productView ? productView.title : "Unknown",
  //     detail: productView ? productView.detail : "Unknown",
  //     img: productView ? productView.img : noImg,
  //     price: productView ? productView.price : 0,
  //     id: productView ? productView.id : "Unknown"
  //   }));
  // }, [selectedView, editData, visible]);
  function setIdEdit(id, value) {
    console.log("aaaaaaaaaaaaa", value);
    console.log("aaaaaaaaaaaaa", products);

    setDataToEdit((data) => ({ ...data, [id]: value }));
  };

  const handleSelected = (value) => {
    setIdEdit("currency", value)
  };
  const handleClose = (id) => {
    if (!dataToEdit.title || !dataToEdit.detail) {
      setDataToEdit((data) => ({
        ...data,
        title: products.title
        // detail: productView ? productView.detail : "Unknown",
        // img: productView ? productView.img : noImg,
        // price: productView ? productView.price : 0,
        // id: productView ? productView.id : "Unknown"
      }));
    } else handleEdit(id)
  };
  // console.log("productView", productView);
  // console.log("dataToEdit", dataToEdit);
  // console.log("products", products);

  return (
    <Modal
      open={visible}
      key={selectedView}
      closable={false}
      className="p-20"
      centered
      footer={null}
      onCancel={handleCancel}
    >
      <Form>
        <div className="header">
          <h1
            className="text-left font-extrabold text-xl flex "
            style={{ justifyContent: "space-between", width: "100%" }}
          >
            <Input
              // placeholder={productView ? productView.title : "Unknown"}
              className="w-3/5"
              maxLength={20}
              onChange={(e) => setIdEdit("title", e.target.value)}
              // defaultValue={productView ? productView.title : "Unknown"}
              // value={dataToEdit ? dataToEdit.title : productView.title}
              // value={productView ? products.title : productView.title}
              // defaultValue={products?.title}
              // value={products?.title}
              defaultValue={productView ? productView.title : "Unknown"}
              required
              disabled={!editData}
            />
            <div className="flex items-center gap-1">
              <EditOutlined
                onClick={() => {
                  editButton();
                }}
              />
              <CloseOutlined onClick={handleCancel} />
            </div>
          </h1>
        </div>

        <div className="w-full mt-5">
          <img
            src={productView ? productView.img : noImg}
            className="w-full"
            style={{
              width: "100%",
              maxHeight: 175
            }}
          ></img>
          {/* <Input type="file" onChange={handleChange} disabled={!editData}></Input> */}

          <div className="mt-5 mb-5">
            <TextArea
              showCount
              maxLength={100}
              onChange={(e) => setIdEdit("detail", e.target.value)}
              // placeholder={productView ? productView.detail : "Unknown"}
              style={{
                height: 80,
                resize: "none",
              }}
              allowClear
              defaultValue={productView ? productView.detail : "Unknown"}
              // value={productView ? productView.detail : "Unknown"}
              disabled={!editData}
            />
            <div className="text-right mt-5 flex items-center">
              <Input
                type="number"
                style={{ width: "40%" }}
                defaultValue={productView ? productView.price : "Unknown"}
                disabled={!editData}
                maxLength={2}
                onChange={(e) => setIdEdit("price", e.target.value)} />
              <Select
                defaultValue={productView ? productView.currency : "Unknown"}
                style={{
                  width: 100,
                }}
                disabled={!editData}
                onChange={handleSelected}
                options={[
                  {
                    value: 'Baht',
                    label: 'Baht',
                  },
                  {
                    value: 'Dollar',
                    label: 'Dollar',
                  },
                  {
                    value: 'Rupee',
                    label: 'Rupee',
                  },
                ]}
              />
            </div>
          </div>
          <div className="flex justify-end gap-1">
            <Button
              type="primary"
              style={{
                background: "white",
                color: "black",
                borderColor: "#bfbfbf",
              }}
              // onClick={() => { handleClose(productView.id) }}
              onClick={handleCancel}
            // onClick={() => {
            //   handleCancel
            //   handleClose(productView.id);
            // }}
            >

              Cancle
            </Button>
            <Button
              type="primary"
              style={{ background: "#4545a2", color: "white" }}
              onClick={() => { handleEdit(productView.id) }}
            >
              {editData ? "Edit" : "OK"}
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

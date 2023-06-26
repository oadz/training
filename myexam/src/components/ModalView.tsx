import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Button, Alert } from "antd";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
import noImg from "./../assets/No_img.png";

export const ModalView = (props: any) => {
  const {
    visible,
    selectedView,
    editData,
    setProducts,
    setEditData,
    setVisible,
    productView,
    setValid,
    valid,
  } = props;
  const { TextArea } = Input;
  // const [imageUrl, setImageUrl] = useState(products.img);
  const [validationMessages, setValidationMessages] = useState<string[]>([]);
  const [dataToEdit, setDataToEdit] = useState<{
    id: number;
    title: string;
    detail: string;
    price: number;
    img: string;
    currency: string;
  }>({
    id: productView?.id,
    title: productView?.title,
    detail: productView?.detail,
    price: productView?.price,
    img: productView?.img,
    currency: productView?.currency,
  });
  const editButton = () => {
    setEditData(!editData);
  };

  const handleEdit = (id: number) => {
    if (!editData) {
      setVisible(false);
    } else {
      if (!dataToEdit.title || !dataToEdit.detail) {
        validateForm();
        setVisible(true);
      } else {
        setProducts((item: any) => {
          const editedIndex = item.findIndex((data: any) => data.id === id);
          item[editedIndex] = dataToEdit;
          return [...item];
        });
        setEditData(false);
        setVisible(false);
      }
    }
  };

  const handleChange = (event: any) => {
    const { files } = event.target;
    const url = URL.createObjectURL(files[0]);
    // setImageUrl(url);
    setDataToEdit((data: any) => ({
      ...data,
      img: url,
    }));
  };
  const validateForm = () => {
    setValidationMessages([]);
    const messages: string[] = [];
    if (!dataToEdit.title) {
      messages.push("Title is required");
    }
    if (!dataToEdit.detail) {
      messages.push("Detail is required");
    }
    setValidationMessages(messages);
    if (dataToEdit.title && dataToEdit.detail) {
      setValid(true);
    } else setValid(false);
  };

  function setIdEdit(id: string, value: any) {
    setDataToEdit((data) => ({ ...data, [id]: value }));
  }
  const handleSelected = (value) => {
    setIdEdit("currency", value);
  };
  const handleClose = () => {
    setDataToEdit((data: any) => ({
      ...data,
      id: productView.id,
      title: productView.title,
      detail: productView.detail,
      img: productView ? productView.img : noImg,
      price: productView.price,
      currency: productView ? productView.currency : "bath",
    }));
    setVisible(false);
  };

  useEffect(() => {
    setDataToEdit((data: any) => ({
      ...data,
      id: productView ? productView.id : "Unknown",
      title: productView ? productView.title : "Unknown",
      detail: productView ? productView.detail : "Unknown",
      img: productView ? productView.img : noImg,
      price: productView ? productView.price : 0,
      currency: productView ? productView.currency : "bath",
    }));
  }, [selectedView, editData, visible]);
  return (
    <Modal
      open={visible}
      key={selectedView}
      closable={false}
      className="p-20"
      centered
      footer={null}
    >
      <Form>
        <div className="header">
          <h1
            className="text-left font-extrabold text-xl flex "
            style={{ justifyContent: "space-between", width: "100%" }}
          >
            {!valid && (
              <Alert
                onClose={() => setValid(true)}
                message="Error"
                description={validationMessages.map((vm: any) => (
                  <li key={vm}>{vm}</li>
                ))}
                type="error"
                closable
                className="alert"
                showIcon
              />
            )}
            {/* <InputForm></InputForm> */}
            <Input
              className="w-3/5"
              maxLength={20}
              onChange={(e) => setIdEdit("title", e.target.value)}
              value={dataToEdit.title}
              disabled={!editData}
            />
            <div className="flex items-center gap-1">
              <EditOutlined
                onClick={() => {
                  editButton();
                }}
              />
              <CloseOutlined onClick={handleClose} />
            </div>
          </h1>
        </div>

        <div className="w-full mt-5">
          <img
            src={dataToEdit.img}
            className="w-full"
            style={{
              width: "100%",
              maxHeight: 175,
            }}
          ></img>
          <Input
            type="file"
            onChange={handleChange}
            disabled={!editData}
          ></Input>

          <div className="mt-5 mb-5">
            <TextArea
              showCount
              maxLength={100}
              onChange={(e) => setIdEdit("detail", e.target.value)}
              style={{
                height: 80,
                resize: "none",
              }}
              allowClear
              value={dataToEdit.detail}
              disabled={!editData}
            />
            <div className="text-right mt-5 flex items-center">
              <Input
                type="number"
                style={{ width: "35%", marginRight: 10 }}
                value={dataToEdit.price}
                disabled={!editData}
                onChange={(e) =>
                  e.target.value.length <= 5 &&
                  setIdEdit("price", e.target.value)
                }
              />
              <Select
                value={dataToEdit.currency}
                style={{
                  width: 80,
                }}
                disabled={!editData}
                onChange={handleSelected}
                options={[
                  {
                    value: "Baht",
                    label: "Baht",
                  },
                  {
                    value: "Dollar",
                    label: "Dollar",
                  },
                  {
                    value: "Rupee",
                    label: "Rupee",
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
              onClick={handleClose}
            >
              Cancle
            </Button>
            <Button
              type="primary"
              style={{ background: "#4545a2", color: "white" }}
              onClick={() => {
                handleEdit(productView.id);
              }}
            >
              {editData ? "Edit" : "OK"}
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

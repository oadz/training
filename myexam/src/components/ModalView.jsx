import React, { useState } from "react";
import { Modal, Form, Input,  Select, Button } from "antd";
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
  const [imageUrl, setImageUrl] = useState();
  const [dataToEdit, setDataToEdit] = useState({
    title: "",
    detail: "",
    price: 0,
    img: "",
    id: 0,
  });

  const productView = products.find((item) => {
    return selectedView === item.id;
  });
  const editButton = () => {
    setEditData(!editData);
  };

  const handleEdit = (id) => {
    setProducts((item) => {
      const editedIndex = item.findIndex((data) => data.id === id);
      item[editedIndex] = dataToEdit
      return [...item];
    });
    setEditData(false)
    setVisible(false)
  };
  const handleChange = (event) => {
    const { files } = event.target;
    const url = URL.createObjectURL(files[0]);
    setImageUrl(url)
    setDataToEdit((data) => ({
      ...data,
      img: url,
    }));
  };
  const PriceInput = ({ value = {}, onChange }) => {
    const [number, setNumber] = useState(0);
    const [currency, setCurrency] = useState("rmb");
    const triggerChange = (changedValue) => {
      onChange?.({
        number,
        currency,
        ...value,
        ...changedValue,
      });
    };

    const onCurrencyChange = (newCurrency) => {
      if (!("currency" in value)) {
        setCurrency(newCurrency);
      }
      triggerChange({
        currency: newCurrency,
      });
    };

    return (
      <span>
        <Input
          type="text"
          value={dataToEdit.price}
          onChange={onChange}
          style={{
            width: 100,
          }}
        />
        <Select
          value={value.currency || currency}
          style={{
            width: 80,
            margin: "0 8px",
          }}
          onChange={onCurrencyChange}
        >
          <Option value="rmb">RMB</Option>
          <Option value="dollar">Dollar</Option>
        </Select>
      </span>
    );
  };

  function setIdEdit  (id, value)  {
    setDataToEdit((data) => ({ ...data, [id]: value }));
  };
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
      {editData ? (
        <Form>
          <div className="header">
            <h1
              className="text-left font-extrabold text-xl flex "
              style={{ justifyContent: "space-between" }}
            >
              <Input
                placeholder={productView ? productView.title : "Unknown"}
                className="w-3/5 absolute"
                maxLength={20}
                onChange={(e) => setIdEdit("title" ,e.target.value)}
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

          <div className="w-full mt-5 text-center">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              <Input type="file" onChange={handleChange}></Input>
            )}
            <div className="mt-3 mb-5">
              <div>
                <TextArea
                  showCount
                  maxLength={100}
                  onChange={(e) => setIdEdit("detail", e.target.value)}
                  placeholder={productView ? productView.detail : "Unknown"}
                  style={{
                    height: 80,
                    resize: "none",
                  }}
                  allowClear
                />
              </div>
              <div className="text-right mt-5 flex items-center">
                <PriceInput
                  onChange={(e) => setIdEdit("price", e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className=" flex justify-end gap-1">
            <Button
              type="primary"
              style={{
                background: "white",
                color: "black",
                borderColor: "#bfbfbf",
              }}
              onClick={handleCancel}
            >
              Cancle
            </Button>
            <Button
              type="primary"
              style={{ background: "#4545a2", color: "white" }}
              onClick={() => handleEdit(productView.id)}
            >
              Edit
            </Button>
          </div>
        </Form>
      ) : (
        <Form>
          <div className="header">
            <h1
              className="text-left font-extrabold text-xl flex "
              style={{ justifyContent: "space-between" }}
            >
              {productView ? productView.title : "Unknown"}
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
            ></img>
            <div className="mt-5 mb-5">
              <div>{productView ? productView.detail : "Unknown"}</div>
              <div className="text-left mt-5 w-1/3">
                {productView ? productView.price : "Unknown"} Bath{" "}
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
                onClick={handleCancel}
              >
                Cancle
              </Button>
              <Button
                type="primary"
                style={{ background: "#4545a2", color: "white" }}
                onClick={handleCancel}
              >
                OK
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Modal>
  );
};

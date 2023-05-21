import React, { useState, useEffect } from "react";
import { Avatar, Card, Modal, Form, Input, Upload, Select, Button } from "antd";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";

const { Option } = Select;

export const ModalAdd = (props) => {
  const {
    handleCancel,
    editData,
    setProducts,
    setEditData,
    setShowModalAdd,
    showModalAdd,
  } = props;
  const { TextArea } = Input;
  const [imageUrl, setImageUrl] = useState();
  const [titleToEdit, setTitleToEdit] = useState("");
  const [detailToEdit, setDetailToEdit] = useState("");
  const [priceToEdit, setPriceToEdit] = useState(0);

  const editButton = () => {
    setEditData(!editData);
  };
  const handleOk = () => {
    setShowModalAdd(false);
  };

  const setItemName = (value) => {
    setTitleToEdit(value);
  };
  const setItemPrice = (value) => {
    setPriceToEdit(value);
  };
  const setDetail = (value) => {
    setDetailToEdit(value);
  };
  const handleChange = (event) => {
    const { files } = event.target;
    const url = URL.createObjectURL(files[0]);
    setImageUrl(url);
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
    const onNumberChange = (e) => {
      const newNumber = parseInt(e.target.value || "0", 10);
      if (Number.isNaN(number)) {
        return;
      }
      if (!("number" in value)) {
        setNumber(newNumber);
      }
      triggerChange({
        number: newNumber,
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
          value={priceToEdit}
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
  const handleAdd = () => {
    setProducts((data) => {
      return [
        ...data,
        {
          title: titleToEdit,
          detail: detailToEdit,
          price: priceToEdit,
          img: imageUrl,
          id: data.length + 1,
        },
      ];
    });
    setShowModalAdd(false);
  };
  return (
    <Modal
      open={showModalAdd}
      closable={false}
      className="p-20"
      centered
      footer={null}
    >
      <Form>
        <div className="header">
          <h1
            className="text-left font-extrabold text-xl flex "
            style={{ justifyContent: "space-between" }}
          >
            <Input
              placeholder="title"
              className="w-3/5 absolute"
              maxLength={20}
              onChange={(e) => setItemName(e.target.value)}
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
                onChange={(e) => setDetail(e.target.value)}
                placeholder="Detail"
                style={{
                  height: 80,
                  resize: "none",
                }}
                allowClear
              />
            </div>
            <div className="text-right mt-5 flex items-center">
              <PriceInput onChange={(e) => setItemPrice(e.target.value)} />
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
            onClick={handleOk}
          >
            Cancle
          </Button>
          <Button
            type="primary"
            style={{ background: "#4545a2", color: "white" }}
            onClick={() => handleAdd()}
          >
            Add
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

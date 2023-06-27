import React, { useState, useEffect, useRef } from "react";
import { Modal, Form, Input, Select, Button, Alert } from "antd";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
import noImg from "./../assets/No_img.png";
import { addItem } from "../store/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
export const ModalAdd = (props: any) => {
  const {
    handleCancel,
    editData,
    setProducts,
    setEditData,
    setShowModalAdd,
    showModalAdd,
    // products,
  } = props;
  const { TextArea } = Input;
  const [imageUrl, setImageUrl] = useState<any>();
  const [titleToEdit, setTitleToEdit] = useState<string>("");
  const [detailToEdit, setDetailToEdit] = useState<string>("");
  const [priceToEdit, setPriceToEdit] = useState<number>(0);
  const [currencyToEdit, setCurrencyToEdit] = useState<string>("bath");
  const [valid, setValid] = useState<boolean>(true);
  const [validationMessages, setValidationMessages] = useState<string[]>([]);
  const dispatch = useDispatch();
  const ProductItems = useSelector((state: RootState) => state.product);

  const fileRef = useRef<any>();
  const editButton = () => {
    setEditData(!editData);
  };
  const handleOk = () => {
    fileRef.current.value = null;
    setShowModalAdd(false);
  };

  const setItemName = (value: string) => {
    setTitleToEdit(value);
  };
  const setItemPrice = (value: any) => {
    setPriceToEdit(value);
  };
  const setDetail = (value: string) => {
    setDetailToEdit(value);
  };
  const handleChange = (event: any) => {
    const { files } = event.target;
    const url = URL.createObjectURL(files[0]);
    setImageUrl(url);
  };
  const handleSelected = (value: any) => {
    setCurrencyToEdit(value);
  };
  const handleAdd = () => {
    if (!titleToEdit || !detailToEdit) {
      validateForm();
    } else {
      fileRef.current.value = null;
      // setProducts((data: any) => {
      //   return [
      //     ...data,
      //     {
      //       id: !products.length
      //         ? data.length + 1
      //         : products[products.length - 1].id + 1 || 1,
      //       title: titleToEdit,
      //       detail: detailToEdit,
      //       price: priceToEdit,
      //       img: imageUrl || noImg,
      //       currency: currencyToEdit,
      //     },
      //   ];
      // });

      dispatch(
        addItem({
          id: !ProductItems.length
            ? ProductItems.length + 1
            : ProductItems[ProductItems.length - 1].id + 1 || 1,
          title: titleToEdit,
          detail: detailToEdit,
          price: priceToEdit,
          img: imageUrl || noImg,
          currency: currencyToEdit,
        })
      );
      setShowModalAdd(false);
    }
  };
  const validateForm = () => {
    setValidationMessages([]);
    const messages: string[] = [];
    if (!titleToEdit) {
      messages.push("Title is required");
    }
    if (!detailToEdit) {
      messages.push("Detail is required");
    }
    setValidationMessages(messages);
    if (titleToEdit && detailToEdit) {
      setValid(true);
    } else setValid(false);
  };

  useEffect(() => {
    setTitleToEdit("");
    setDetail("");
    setImageUrl(null);
    setItemPrice(100);
    setValid(true);
  }, [showModalAdd]);

  return (
    <Modal
      open={showModalAdd}
      closable={false}
      className="p-20"
      centered
      footer={null}
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
              value={titleToEdit}
              onChange={(e) => setItemName(e.target.value)}
              id="inputTitle"
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
          <img
            src={imageUrl || noImg}
            alt="avatar"
            style={{
              width: "100%",
              maxHeight: 175,
            }}
          />
          <input type="file" ref={fileRef} onChange={handleChange}></input>

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
                value={detailToEdit}
                id="inputDetail"
              />
            </div>
            <div className="text-right mt-5 flex items-center">
              <Input
                type="number"
                style={{ width: "35%", marginRight: 10 }}
                value={priceToEdit}
                onChange={(e) =>
                  e.target.value.length <= 5 && setItemPrice(e.target.value)
                }
                id="inputPrice"
              />
              <Select
                defaultValue="Baht"
                style={{
                  width: 80,
                }}
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
        </div>
        <div className=" flex justify-end gap-1">
          <Button
            type="primary"
            style={{
              background: "white",
              color: "black",
              borderColor: "#bfbfbf",
            }}
            onClick={() => handleOk()}
          >
            Cancle
          </Button>
          <Button type="primary" className="submit" onClick={() => handleAdd()}>
            Add
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

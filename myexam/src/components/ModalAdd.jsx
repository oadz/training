import React, { useState, useEffect, useRef } from "react";
import { Avatar, Card, Modal, Form, Input, Upload, Select, Button, InputNumber, message, Alert } from "antd";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
import noImg from "./../assets/No_img.png";

const { Option } = Select;

export const ModalAdd = (props) => {
  const {
    handleCancel,
    editData,
    setProducts,
    setEditData,
    setShowModalAdd,
    showModalAdd,
    products,
  } = props;
  const { TextArea } = Input;
  const [imageUrl, setImageUrl] = useState();
  const [titleToEdit, setTitleToEdit] = useState("");
  const [detailToEdit, setDetailToEdit] = useState("");
  const [priceToEdit, setPriceToEdit] = useState(0);
  const [currencyToEdit, setCurrencyToEdit] = useState("bath");
  const [valid, setValid] = useState(true);
  const [validationMessages, setValidationMessages] = useState([]);

  const fileRef = useRef()
  const editButton = () => {
    setEditData(!editData);
  };
  const handleOk = () => {
    fileRef.current.value = null
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
  const handleSelected = (value) => {
    setCurrencyToEdit(value)
  };
  // const handlerErrorMessage = (id, value) => {
  //   setCurrencyToEdit(value)
  // };
  const handleAdd = () => {
    if (!titleToEdit || !detailToEdit) {
      validateForm();
    } else {
      fileRef.current.value = null
      setProducts((data) => {
        return [
          ...data,
          {
            title: titleToEdit ? titleToEdit : "No title",
            detail: detailToEdit ? detailToEdit : "No description",
            price: priceToEdit,
            img: imageUrl ? imageUrl : noImg,
            id: products.length === 0 ? data.length + 1 : products[products.length - 1].id + 1 ||
              1,
            // id: data.length + 1,
            currency: currencyToEdit,
          },
        ];
      });
      setShowModalAdd(false);
    }

    // console.log("checkInput", inputTitle.value === '');
    // if (inputTitle.value === '') {
    //   console.log("1");
    //   error("inputTitle", "Please fill title")
    //   setCurrencyToEdit(false)
    //   // setValidate("inputTitle", "Please fill title")
    // }
    // if (inputDetail.value === '') {
    //   console.log("2");

    //   setValidate("inputDetail", "Please fill detail")
    // }
    // if (!titleToEdit) {
    //   console.log("tirrle");
    //   handlerErrorMessage("title",)
    //   setValidate(true)
    // } else {
    //   fileRef.current.value = null
    //   setProducts((data) => {
    //     return [
    //       ...data,
    //       {
    //         title: titleToEdit ? titleToEdit : "No title",
    //         detail: detailToEdit ? detailToEdit : "No description",
    //         price: priceToEdit,
    //         img: imageUrl ? imageUrl : noImg,
    //         id: products.length === 0 ? data.length + 1 : products[products.length - 1].id + 1 ||
    //           1,
    //         // id: data.length + 1,
    //         currency: currencyToEdit,
    //       },
    //     ];
    //   });
    //   setShowModalAdd(false);
    // }
  };
  const validateForm = () => {
    console.log("1");
    // const { fullName, contact } = formData;
    setValidationMessages([]);
    let messages = [];
    if (!titleToEdit) {
      messages.push("Title is required");
    }
    if (!detailToEdit) {
      messages.push("Detail is required");
    }
    setValidationMessages(messages);
    if (titleToEdit && detailToEdit) {
      setValid(true)
    } else setValid(false)


  }
  // // const error = () => {
  // //   Modal.error({
  // //     title: 'This is an error message',
  // //     content: validationMessages.map(vm => <li key={vm}>{vm}</li>)
  // //   });
  // // };
  // const error = () => {
  //   Modal.error({
  //     title: 'This is an error message',
  //     content: validationMessages.map(txt => <li key={txt}>{txt}</li>)
  //   });
  // };
  useEffect(() => {
    setTitleToEdit("")
    setDetail("")
    setImageUrl()
    setItemPrice(100)
    setValid(true)
  }, [showModalAdd]);

  return (
    <Modal
      open={showModalAdd}
      closable={false}
      className="p-20"
      centered
      footer={null}
    >
      {!valid &&
        <Alert
          onClose={() => setValid(true)}
          message="Error"
          description={validationMessages.map(vm => <li key={vm}>{vm}</li>)}
          type="error"
          closable
          className="alert"
          // onClose={onClose}
          showIcon

        // style={{ zIndex: 5, position: "absolute", width: "85%", bottom: "50%" }}
        />
      }
      {/* {!validate && error()} */}

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
        {/* {!currencyToEdit && validate.inputTitle} */}
        <div className="w-full mt-5 text-center">
          <img
            src={imageUrl ? imageUrl : noImg}
            alt="avatar"
            style={{
              width: "100%",
              maxHeight: 175
            }}
          />

          {/* {validationMessages.map(vm => <li key={vm}>{vm}</li>)} */}
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
              {/* <InputNumber
                type="number"
                style={{ width: "40%" }}
                value={priceToEdit}
                min={1}
                max={99999}
                onChange={setItemPrice} /> */}
              <Input
                type="number"
                style={{ width: "40%" }}
                value={priceToEdit}
                onChange={(e) => setItemPrice(e.target.value)}
                id="inputPrice"
              />

              {/* <input value={priceToEdit} type="number" onChange={(e) => setItemPrice(e.target.value)} /> */}
              <Select
                defaultValue="Baht"
                style={{
                  width: 100,
                }}
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
                  // {
                  //   value: 'disabled',
                  //   label: 'Disabled',
                  //   disabled: true,
                  // },
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
          <Button
            type="primary"
            className="submit"
            // style={{ background: "#4545a2", color: "white" }}
            onClick={() => handleAdd()}
          >
            Add
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

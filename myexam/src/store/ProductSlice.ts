import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ProductState = {
  id: number;
  title: string;
  detail: string;
  price: number;
  img: string;
  currency: string;
};

const initialValues: ProductState[] = [
  {
    id: 1,
    title: "Cabbage",
    detail: "aaaaaaaaaaaaaaaa",
    price: 500,
    img: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    currency: "Baht",
  },
];
export const productSlice = createSlice({
  name: "product",
  initialState: initialValues,
  reducers: {
    addItem: (state, action: PayloadAction<any>) => {
      return [
        ...state,
        {
          id: action.payload.id,
          title: action.payload.title,
          detail: action.payload.detail,
          price: action.payload.price,
          img: action.payload.img,
          currency: action.payload.currency,
        },
      ];
    },
    removeItem: (state, action: PayloadAction<any>) => {
      const itemId = action.payload;
      return (state = state.filter((item) => item.id !== itemId));
    },
    editItem: (state, action: PayloadAction<any>) => {
      const { id, title, detail, price, img, currency } = action.payload;
      const oldData = state.find((item) => item.id === id);
      if (oldData) {
        oldData.title = title;
        oldData.detail = detail;
        oldData.price = price;
        oldData.img = img;
        oldData.currency = currency;
      }
    },
  },
});
export const { addItem, removeItem, editItem } = productSlice.actions;
// export const productSelector = (store: RootState) => store.productReducer;
export default productSlice.reducer;

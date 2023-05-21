// eslint-disable-next-line no-unused-vars
import { useState } from "react";

import "./App.css";
import ProductList from "./components/ProductList";
function App() {
  const main =
    "https://plus.unsplash.com/premium_photo-1676717962720-d9a812c8f8c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80";

  return (
    <>
      <div className="header">
        <img className="max-h-96 w-full" src={main}></img>
      </div>
      <div className="content overflow-auto"></div>
      <div className="text-center font-bold text-5xl">Product</div>
      <div className="p-20 flex justify-center">
        <ProductList></ProductList>
      </div>
    </>
  );
}

export default App;

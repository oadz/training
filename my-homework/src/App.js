import React from 'react'
import MainPage from './component/MainPage.js'
import * as data from './assets/products.json'

// export type Props = {
//   id: string
//   name: string
//   price: number
//   department: string
//   currency: string;
//   children: React.ReactNode
// }
// const dataJson = JSON.parse(data);
// console.log("dataJson",dataJson);

export default function App(props) {
  console.log('data',data);

  return (
    <div className="h-screen">
      <MainPage> </MainPage>
    </div>
  )
}
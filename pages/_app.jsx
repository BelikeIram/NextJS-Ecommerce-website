import '@/styles/globals.css'
import React from 'react'
import  {Layout}  from '@/Components'
import {StateContext} from '../Context/StateContext'
import { Toaster } from 'react-hot-toast';
// import  { AppProps } from 'next/app'

export default function App({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
      <Toaster/>  
        <Component {...pageProps} />
      </Layout>
    </StateContext>
)
}

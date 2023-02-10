import React, {useState} from 'react'
import { Product, HeroBanner,FooterBanner } from '@/Components'
import { client } from '@/lib/Client'
const Home = ({products, bannerData}) => {
  const [content, setContent] = useState(products)
  return (
      <>
             <HeroBanner  heroBanner = {bannerData?.length && bannerData[0]}/>
        <div className="products-heading">
          <h2>Best Selling Products</h2>
          <p>Speakers of many variations</p>
        </div>
        <div className="products-container">
          {products.map((product)=> <Product product={product} key={product._id} content={content}/> )}
        </div>
        <FooterBanner footerBanner={bannerData && bannerData[0]}/>
      </>
  ) 
}

export const getServerSideProps = async()=>{
  const query = '*[_type == "product"]'
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery)

  return {
    props: {products, bannerData}
  }
}

export default Home

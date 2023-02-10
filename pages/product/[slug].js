import React, { useState } from 'react'
import { urlFor, client } from '../../lib/Client'
import {AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar} from 'react-icons/ai'
import { Product } from '@/Components';
import { toast } from 'react-hot-toast';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import "swiper/css/navigation";
import 'swiper/css/scrollbar';


import {GlobalContext} from '../../Context/StateContext'
import { Navigation } from "swiper";
 

const productDetail = ({product, products}) => {
  const {qty, incQty, decQty, onAdd} = GlobalContext()


const [index, setIndex] = useState(0)

  
 const {name, image, details, price} = product

  return (
    <div>
       <div className='product-detail-container'>
          <div>
             <div className='image-container '>
                <img className='product-detail-image' src={urlFor(image && image[index])} alt={name}/>
             </div>
             <div className='small-image-container'>
                {image?.map((img, i)=>{
                  return <img key={i} src={urlFor(img)} alt='small-img' className={i === index ? 'small-image selected-image' : 'small-image'} onMouseEnter={()=>setIndex(i)}/>
                })}
             </div>
          </div>
          <div className='product-detail-desc'>
             <h1>{name}</h1>
             <div className='reviews'>
                 <div>
                    <AiFillStar/>
                    <AiFillStar/>
                    <AiFillStar/>
                    <AiFillStar/>
                    <AiOutlineStar/>
                 </div>
                 <p>(20)</p>
             </div>
             <h4>Details:</h4>
             <p>{details}</p>
             <p className='price'>${price}</p>
             <div className='quantity'>
                <h3>Quantity : </h3>
                <p className='quantity-desc'>
                <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
                <span className="num">{qty}</span>
                <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
                </p>
             </div> 
             <div className='buttons'>
                <button className='add-to-cart' type='button' onClick={()=> onAdd(product, qty)}>Add to Cart</button>
                <button className='buy-now' type='button' onClick=''>Buy Now!</button>
             </div>
          </div>
       </div>
       <div className="maylike-products-wrapper">
       <h2>You may also like</h2>
       <div className="marquee">
         <div className="products-container">
         <Swiper 
           navigation={true} modules={[Navigation]} 
           slidesPerView={3}
           breakpoints={
             {
               700 : {
                  slidesPerView : 4
               }
             }
           }
          >
         {products.map((item) => (
                <SwiperSlide><Product key={item._id} product={item} /> </SwiperSlide>
         ))}
          </Swiper>    
         </div>
       </div>
   </div>
    </div>
  )
}




export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: { 
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}


export const getStaticProps = async ({ params: { slug }}) => {

  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]'
  
  const product = await client.fetch(query);

  console.log(product);


  const products = await client.fetch(productsQuery);
  
  return {
    props: { product, products }
  }
}
export default productDetail
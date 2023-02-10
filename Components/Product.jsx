import React from 'react'
import Link from 'next/link'

import { urlFor } from '@/lib/Client'
import { GlobalContext } from '@/Context/StateContext'

const Product = ({product, content}) => {

  const {name, image, slug, price, category} = product

  const {changesHandle} = GlobalContext()
  return (
    <div className='home-product'>
      <Link
        href={`/product/${slug.current}`}
        onClick={changesHandle}
        shallow
      >
         <div className='product-card'>
           <img src={urlFor(image && image[0])}/>
           <p className='product-name'>{name}</p>
           <p className='product-price'>${price}</p>
         </div>
      </Link>
    </div>
  )
}

export default Product
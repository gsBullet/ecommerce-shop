import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContest'
import dropdownIcon from '../components/assets/Frontend_Assets/dropdown_icon.png'

const ShopCategory = (props) => {
  const {allProducts} = useContext(ShopContext)
  return (
    <div className='shop-category'>
      <img src={props.banner} alt={props.category} />

      <div className='shopcategory-indexSort'>
        <p>
          <span>showing 1-12</span> out of 36 products
        </p>
        <div className='shopcategory-sort'>

          sort by <img src={dropdownIcon} alt="" />

        </div>

      </div>
    </div>
  )
}

export default ShopCategory
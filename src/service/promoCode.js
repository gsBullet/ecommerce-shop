

import Axios from "./Axios"

export const checkPromoCodeForProduct= async()=>{
    const response = await Axios.get(`/get-promo-code-for-products`);
    return response.data;
}
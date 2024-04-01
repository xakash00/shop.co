import axios from "axios"

export const api_url = process.env.API_URL

export const get_all_products_api = async () => {
    const response = await axios.get(api_url + `/products?limit=100&skip=0`)
    // const data = await response.json()
    return response
}
import axios from "axios";
class ProductService{

    static BASE_URL = "http://localhost:8080";
    
    static async getAllProduct(token){
        try {
            const response = await axios.get(`${this.BASE_URL}/adminuser/get-all-product`, 
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async getProductById(id, token){
        try {
            const response = await axios.get(`${this.BASE_URL}/adminuser/get-product/${id}`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }

            )
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async deleteProductById(id, token){
        try {
            const response = await axios.delete(`${this.BASE_URL}/adminuser/delete-product/${id}`, {
                headers: {Authorization: `Bearer ${token}`}
            })

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async updateProductWithId(id, data, token){
        try {
            const response = await axios.put(`${this.BASE_URL}/adminuser/update-product/${id}`, data , 
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )

            return response.data;
        } catch (error) {
            
        }
    }

    static async addProduct(data, token){
        try {
            const response = await axios.post(`${this.BASE_URL}/adminuser/add-product`, data, {
                headers: {Authorization: `Bearer ${token}`}
            })

            return response.data;
        } catch (error) {
            throw error;
        }
    }
    
}

export default ProductService;
import axios from "axios";

class OrderService{
    static EMPLOYEE_API_BASE_URL = "http://localhost:8080/public/order";
    

    static async addOrder(data, token){
        try {
            const response = 
            await axios.post(`${OrderService.EMPLOYEE_API_BASE_URL}/add-order`, data, 
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )

            return response.data;
        } catch (error) {
            throw error
        }
    }

    static async deleteOrderByIdOrder(id, token){
        try {
            const response = 
            await axios.delete(`${this.EMPLOYEE_API_BASE_URL}/delete-order-by-id/${id}`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async getAllOrder(token){
        try {
            const response = await axios.get(`${OrderService.EMPLOYEE_API_BASE_URL}/list-all-order`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
            return response.data;
        } catch (error) {
            
        }
    }
    static async getAllOrderByUser(token){
        try {
            const response = await axios.get(`${OrderService.EMPLOYEE_API_BASE_URL}/list-order-by-user`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
            return response.data;
        } catch (error) {
            
        }
    }
}

export default OrderService;
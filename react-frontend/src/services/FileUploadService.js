import axios from 'axios'

const API_BASE_URL = "http://localhost:8080/api/files";

class FileUploadService {
    uploadFile(file) {
        const formData = new FormData();
        formData.append("file", file);

        return axios.post(`${API_BASE_URL}/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }
}

export default new FileUploadService();
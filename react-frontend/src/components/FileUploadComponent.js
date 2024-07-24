import React, {useState} from 'react';
import FileUploadService from '../services/FileUploadService';
import 'bootstrap/dist/css/bootstrap.min.css'


const FileUploadComponent = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');
    // const [image, setImage] = useState('');
    // const photo = require(`../../uploads/images/${obj.photo}`).default;
    const handleFileChange = (e) => {
        console.log(e);
        setSelectedFile(e.target.files[0]);
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        try {
            const response = await FileUploadService.uploadFile(selectedFile);
            setMessage(response.data);
        } catch (error) {
            setMessage('File upload failed!');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">File Upload</div>
                        <div className="card-body">
                            {message && <div className="alert alert-info">{message}</div>}
                            {/* {image && <img src={image} alt="Logo" />} */}
                            <img src="/files/avatar_7_trangcanhan.png" alt="Logo" />
                            <form onSubmit={handleFileUpload}>
                                <div className="form-group">
                                    <label>Choose file</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <button

                                type="submit" className="btn btn-primary mt-3">Upload</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileUploadComponent;
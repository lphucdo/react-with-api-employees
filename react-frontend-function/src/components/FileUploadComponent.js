import React, {useState} from 'react';
import FileUploadService from '../services/FileUploadService';
import 'bootstrap/dist/css/bootstrap.min.css'


const FileUploadComponent = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleFileUpload = async (e) => {
        e.preventDefault();

        try {
            const response = await FileUploadService.uploadFile(selectedFile);
            setMessage(response.data)
        } catch (error) {
            setMessage('Upload failed')
        }
    }
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">File Upload</div>
                        <div className="card-body">
                            {message && <div className="alert alert-info">{message}</div>}
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
}

export default FileUploadComponent;
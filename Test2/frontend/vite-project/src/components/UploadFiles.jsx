import React, { useState } from 'react';
import axios from 'axios';
const BASE_URL = 'http://localhost:80';

export default function UploadFiles() {
    const [content, setContent] = useState('');
    const [uploadedImg, setUploadedImg] = useState({
        fileName: '',
        filePath: '',
    });
    const onChange = (e) => {
        setContent(e.target.files[0]);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('img', content);
        axios
            .post('/upload', formData)
            .then((res) => {
                const { fileName } = res.data;
                console.log(fileName);
                setUploadedImg({ fileName, filePath: `${BASE_URL}/img/${fileName}` });
                alert('The file is successfully uploaded');
            })
            .catch((err) => {
                console.error(err);
            });
    };
    return (
        <>
            <div>
                <form onSubmit={onSubmit}>
                    {uploadedImg ? (
                        <>
                            <img src={uploadedImg.filePath} alt="" />
                            <h3>{uploadedImg.fileName}</h3>
                        </>
                    ) : (
                        ''
                    )}
                    <input type="file" onChange={onChange} />
                    <button type="submit">Upload</button>
                </form>
            </div>
        </>
    );
}

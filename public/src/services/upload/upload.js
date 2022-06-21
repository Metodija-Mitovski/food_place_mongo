import axios from "axios"
import config from "../../config/config";

export const handleUpload = async (fileImg) => {
    const form_data = new FormData();
    form_data.append('document', fileImg);
    const res = await axios.post(`${config.api.storage}`, form_data);
    return res.data.fileUrl;
};


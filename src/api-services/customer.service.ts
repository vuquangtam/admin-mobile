const axios = require('axios');

class CustomerService {
    sendSms(customerIds, message) {
        const url = 'https://thelash.bpsgroup.us' + '/api/ios/send_sms';

        return axios.post(url, {customerIds, message});
    }

    sendMms(customerIds, message, imageUrl) {
        const url = 'https://thelash.bpsgroup.us' + '/api/ios/send_mms';

        return axios.post(url, {customerIds, message, images: [imageUrl]});
    }

    uploadFile(type, file) {
        const url = 'https://thelash.bpsgroup.us/api/admin' + '/upload-image';

        const formData = new FormData();
        formData.append("file", file);
        formData.append("data", JSON.stringify({type: type}));

        return axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export default new CustomerService()

import axios from 'axios';


const ls = require('local-storage');

const callApi = async (data, method, url) => {
  try {
    const baseUrl = process.env.REACT_APP_BASE_URL + url;
    const response = await axios({
      method,
      url: baseUrl,
      ...data,
      headers: {
        Authorization: ls.get('token'),
      },
    });
    return response.data;

  } catch (error) {
    console.log('Inside catch');
    return { status: 'error', message: 'This is a error message' };
  }
};


export default callApi;

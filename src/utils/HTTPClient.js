import axios from 'axios';
import domain from '../config/domain';

const endpoint = process.env.NODE_ENV ? domain[process.env.NODE_ENV] : domain.development;

const deafaultHeaders = {
  Accept: 'application/json',
  'Content-type': 'application/json',
};

const axiosConfig = (token = null, headers = {}) =>
  axios.create({
    baseURL: endpoint,
    headers: {
      ...deafaultHeaders,
      ...headers,
      ...(token !== null ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

export const post = (path = '', body, headers, token = null, config = null) =>
  axiosConfig(token, headers).post(path, body, config);

export const get = (path = '', token = null, config = null) => axiosConfig(token).get(path, config);

export const del = (path = '', token = null, config = null) =>
  axiosConfig(token).delete(path, config);

export const put = (path, data, token = null, config = null) =>
  axiosConfig(token).put(path, data, config);

export default axiosConfig;

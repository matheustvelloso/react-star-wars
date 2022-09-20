import axios from 'axios';

import Config from 'Config';

const ViaCepApi = axios.create({
  baseURL: Config.api.viaCepBaseURL,
});

export default ViaCepApi;

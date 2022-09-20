import axios from 'axios';

import Config from 'Config';

const StarWarsApi = axios.create({
  baseURL: Config.api.baseURL,
});

export default StarWarsApi;

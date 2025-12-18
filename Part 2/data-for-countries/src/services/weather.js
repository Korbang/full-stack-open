import axios from 'axios';

const baseUrl = 'https://api.open-meteo.com/v1/forecast';

const getCurrent = (lat, lon) => {
  const params = {
    latitude: lat,
    longitude: lon,
    current_weather: true
  };

  return axios.get(baseUrl, { params }).then(res => res.data.current_weather);
};

export default { getCurrent };

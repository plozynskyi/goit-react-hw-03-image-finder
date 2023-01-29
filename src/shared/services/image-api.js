import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    per_page: 12,
    key: '31765853-e30cfb70381adc432e0775e7f',
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

export const searchImage = async (q, page = 1) => {
  const { data } = await instance.get('/', {
    params: {
      q,
      page,
    },
  });

  return data;
};

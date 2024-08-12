import axios from 'axios';

const URL = 'http://localhost:3000';

export const messagesQuery = async (address: { address: string }) => {
  return (await axios.post(`${URL}/messages`, address)).data;
};

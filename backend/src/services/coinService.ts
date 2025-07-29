import axios from 'axios';

const COINGECKO_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple&vs_currencies=brl';

export const getCryptoPrices = async () => {
  try {
    const response = await axios.get(COINGECKO_URL);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar preços das criptomoedas');
  }
};

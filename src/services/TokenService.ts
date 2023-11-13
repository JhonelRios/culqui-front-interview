import axios from 'axios';
import { CardData, CardDataRequestBody } from '../types/card';
import { PK_TEST } from '../utils/constants';

class TokenService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = import.meta.env.VITE_API_URL;
    axios.defaults.headers.common['Authorization'] = `Bearer ${PK_TEST}`;
  }

  private formatErrorMessage(error) {
    console.error(error);

    const errorBody = error.response.data;
    const errorMessage = Array.isArray(errorBody.error)
      ? errorBody.error.map(e => e.message).join('')
      : errorBody.error;

    return errorMessage;
  }

  async tokenize(card: CardData): Promise<{ token: string }> {
    const body: CardDataRequestBody = {
      card_number: card.cardNumber,
      cvv: card.cvv,
      email: card.email,
      expiration_month: card.expirationMonth,
      expiration_year: card.expirationYear,
    };

    try {
      const response = await axios.post(`${this.apiUrl}/tokenize`, body);

      return response.data;
    } catch (error) {
      const errorMessage = this.formatErrorMessage(error);

      throw new Error(errorMessage);
    }
  }

  async getCardByToken(token: string): Promise<{ card: CardDataRequestBody }> {
    try {
      const response = await axios.get(`${this.apiUrl}/token/${token}`);

      return response.data;
    } catch (error) {
      const errorMessage = this.formatErrorMessage(error);

      throw new Error(errorMessage);
    }
  }
}

export const tokenService = new TokenService();

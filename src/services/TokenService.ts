import axios from 'axios';
import { CardData, CardDataRequestBody } from '../types/card';

class TokenService {
  apiUrl: string;

  constructor() {
    this.apiUrl = import.meta.env.VITE_API_URL;
  }

  async tokenize(card: CardData): Promise<{ token: string }> {
    const body: CardDataRequestBody = {
      card_number: card.cardNumber,
      cvv: card.cvv,
      email: card.email,
      expiration_month: card.expirationMonth,
      expiration_year: card.expirationYear,
    };

    const response = await axios.post(`${this.apiUrl}/tokenize`, body);

    return response.data;
  }

  async getCardByToken(token: string): Promise<{ card: CardDataRequestBody }> {
    const response = await axios.get(`${this.apiUrl}/token/${token}`);

    return response.data;
  }
}

export const tokenService = new TokenService();

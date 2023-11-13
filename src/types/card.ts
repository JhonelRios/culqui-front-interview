export interface CardData {
  cardNumber: string;
  cvv: string;
  expirationMonth: string;
  expirationYear: string;
  email: string;
}

export interface CardDataRequestBody {
  email: string;
  card_number: string;
  cvv: string;
  expiration_year: string;
  expiration_month: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface ContactFormPayload {
  name: string;
  address: string;
  phone: string;
  email: string;
  message: string;
}

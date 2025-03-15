export interface Contac {
  name: string;
  telephone: string;
}

export interface Address {
  zipCode: string;
  state: string;
  city: string;
  street: string;
  number: string;
  reference?: string;
}

export interface Supplier {
  id: string;
  name: string;
  description?: string;
  contacts: Contac[];
  address: Address;
}

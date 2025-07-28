export interface Address {
  id: string;
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export const addresses: Address[] = [
  {
    id: '1',
    name: 'Home',
    addressLine1: 'House 123, Street 4',
    city: 'Lahore',
    state: 'Punjab',
    zip: '54000',
    country: 'Pakistan',
    phone: '+92 300 1234567',
    isDefault: true,
  },
  {
    id: '2',
    name: 'Office',
    addressLine1: 'Office 789, ABC Plaza',
    addressLine2: 'Gulberg III',
    city: 'Lahore',
    state: 'Punjab',
    zip: '54660',
    country: 'Pakistan',
    phone: '+92 321 7654321',
    isDefault: false,
  },
];

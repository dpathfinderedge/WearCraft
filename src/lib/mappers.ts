import { Address } from '@/types/user';

/**
 * Maps our Address type to API Address format
 * Frontend uses: street, postalCode
 * Backend uses: address, zipCode
 */
export function mapAddressToApi(address: Address) {
  return {
    firstName: address.firstName,
    lastName: address.lastName,
    address: address.street, // Frontend 'street' -> API 'address'
    city: address.city,
    state: address.state,
    zipCode: address.postalCode, // Frontend 'postalCode' -> API 'zipCode'
    country: address.country,
    phone: address.phone,
  };
}

/**
 * Maps API Address to our Address type
 */
export function mapAddressFromApi(apiAddress: any): Address {
  return {
    id: apiAddress.id,
    firstName: apiAddress.firstName,
    lastName: apiAddress.lastName,
    street: apiAddress.address, // API 'address' -> Frontend 'street'
    city: apiAddress.city,
    state: apiAddress.state,
    postalCode: apiAddress.zipCode, // API 'zipCode' -> Frontend 'postalCode'
    country: apiAddress.country,
    phone: apiAddress.phone,
    isDefault: apiAddress.isDefault,
  };
}

/**
 * Maps API User to our User type
 */
export function mapUserFromApi(apiUser: any) {
  return {
    id: apiUser.id,
    email: apiUser.email,
    name: `${apiUser.firstName} ${apiUser.lastName}`,
    avatar: undefined, // Add if API provides avatar
    createdAt: apiUser.createdAt,
  };
}
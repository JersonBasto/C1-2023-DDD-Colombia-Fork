import { validate as uuidValidate, version as uuidVersion } from 'uuid';

export const IsUUID4 = (value: string): boolean => {
  return uuidValidate(value) && uuidVersion(value) === 4;
};

import { v4 as uuid } from 'uuid';
import { IsUUID4 } from './is-uuid-v4.validation';
describe('IsUUIDV4', () => {
  it('UUID true', () => {
    //Arrange
    const UUID = uuid();
    //Act
    const result = IsUUID4(UUID);
    //Assert
    expect(result).toBe(true);
  });
  it('UUID true', () => {
    //Arrange
    const UUID = uuid() + 'asdasd';
    //Act
    const result = IsUUID4(UUID);
    //Assert
    expect(result).toBe(false);
  });
});

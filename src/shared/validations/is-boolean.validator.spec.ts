import { IsBoolean } from './is-boolean.validator';

describe('IsBoolean', () => {
  it('validate true in IsBoolean', () => {
    //Arrange
    const validBoolean = true;
    //Act
    const result = IsBoolean(validBoolean);
    //Assert
    expect(result).toBe(true);
  });
  it('validate false in IsBoolean', () => {
    //Arrange
    const validBoolean = false;
    //Act
    const result = IsBoolean(validBoolean);
    //Assert
    expect(result).toBe(true);
  });
});

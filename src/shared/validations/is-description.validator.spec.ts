import { IsDescriptionLength } from './is-description.validator';

describe('IsDescriptionLength', () => {
  it('IsDescriptionLength true', () => {
    //Arrange
    const value = 'Puerta Norte: creada Exito';
    //Act
    const result = IsDescriptionLength(value);
    //Assert
    expect(result).toBe(true);
  });
  it('UUID true', () => {
    //Arrange
    const value =
      'Puerta Norte: Se espera que se hagan muchas cosas pero no se como funciones';
    //Act
    const result = IsDescriptionLength(value);
    //Assert
    expect(result).toBe(false);
  });
});

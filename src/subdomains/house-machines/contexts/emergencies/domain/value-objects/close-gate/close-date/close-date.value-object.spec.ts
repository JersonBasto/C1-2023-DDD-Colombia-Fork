import { CloseGateDateValueObject } from './close.date.value-object';

describe('dateValueObject', () => {
  let dateValueObject: CloseGateDateValueObject;
  beforeEach(() => {
    dateValueObject = new CloseGateDateValueObject(Date.now());
  });
  test('Should be defined', () => {
    //Assert
    expect(dateValueObject).toBeDefined();
  });
  describe('Validaciones', () => {
    test('Return True', () => {
      //Arrange
      const date = Date.now();
      const expected = true;
      //Act
      const dateValueObject = new CloseGateDateValueObject(date);
      const result = dateValueObject.hasErrors();
      console.log(result)
      //Assert
      expect(result).toBe(expected);
    });
  });
});

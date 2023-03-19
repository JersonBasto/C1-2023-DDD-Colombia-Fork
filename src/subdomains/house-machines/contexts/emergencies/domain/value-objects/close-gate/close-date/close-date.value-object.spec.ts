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
    it('Return True', () => {
      //Arrange
      const date = Date.now();
      const expected = true;
      //Act
      const dateValueObject = new CloseGateDateValueObject(date);
      const result = dateValueObject.hasErrors();
      //Assert
      expect(!result).toBe(expected);
    });
    it('Return False', () => {
      //Arrange
      const date = Date.now() + Date.now();
      const expected = false;
      //Act
      const dateValueObject = new CloseGateDateValueObject(date);
      const result = dateValueObject.hasErrors();
      //Assert
      expect(!result).toBe(expected);
    });
    it('Return True Value undefined', () => {
      //Arrange
      const date = undefined;
      const expected = true;
      //Act
      const dateValueObject = new CloseGateDateValueObject(date);
      const result = dateValueObject.hasErrors();
      //Assert
      expect(!result).toBe(expected);
    });
  });
});

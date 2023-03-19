import { OpenGateDateValueObject } from './open.date.value-object';

describe('dateValueObject', () => {
  let openGateDateValueObject: OpenGateDateValueObject;
  beforeEach(() => {
    openGateDateValueObject = new OpenGateDateValueObject(Date.now());
  });
  test('Should be defined', () => {
    //Assert
    expect(openGateDateValueObject).toBeDefined();
  });
  describe('Validaciones', () => {
    it('Return True', () => {
      //Arrange
      const date = Date.now();
      const expected = true;
      //Act
      const openGateDateValueObject = new OpenGateDateValueObject(date);
      const result = openGateDateValueObject.hasErrors();
      //Assert
      expect(!result).toBe(expected);
    });
    it('Return False', () => {
      //Arrange
      const date = Date.now() + Date.now();
      const expected = false;
      //Act
      const openGateDateValueObject = new OpenGateDateValueObject(date);
      const result = openGateDateValueObject.hasErrors();
      //Assert
      expect(!result).toBe(expected);
    });
    it('Return True Value undefined', () => {
      //Arrange
      const date = undefined;
      const expected = true;
      //Act
      const openGateDateValueObject = new OpenGateDateValueObject(date);
      const result = openGateDateValueObject.hasErrors();
      //Assert
      expect(!result).toBe(expected);
    });
  });
});

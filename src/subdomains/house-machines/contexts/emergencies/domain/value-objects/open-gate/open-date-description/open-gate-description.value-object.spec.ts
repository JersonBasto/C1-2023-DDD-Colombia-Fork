import { OpenGateDescriptionValueObject } from './open-gate-description.value-object';

describe('closeGateDescriptionValueObject', () => {
  let openGateDescriptionValueObject: OpenGateDescriptionValueObject;
  beforeEach(() => {
    openGateDescriptionValueObject = new OpenGateDescriptionValueObject(
      'La compuerta norte se ha cerrado',
    );
  });
  it('Should be defined', () => {
    expect(openGateDescriptionValueObject).toBeDefined();
  });
  describe('Validations', () => {
    it('Return True', () => {
      //Arrange
      const description = 'La compuerta norte se ha cerrado';
      const expected = true;
      //Act
      const openGateDescriptionValueObject = new OpenGateDescriptionValueObject(
        description,
      );
      const result = openGateDescriptionValueObject.hasErrors();
      //Assert
      expect(!result).toBe(expected);
    });
    it('Return False', () => {
      //Arrange
      const description = 'La compuerta';
      const expected = false;
      //Act
      const openGateDescriptionValueObject = new OpenGateDescriptionValueObject(
        description,
      );
      const result = openGateDescriptionValueObject.hasErrors();
      //Assert
      expect(!result).toBe(expected);
    });
    it('Return False Value Undefined', () => {
      //Arrange
      const description = undefined;
      const expected = false;
      //Act
      const openGateDescriptionValueObject = new OpenGateDescriptionValueObject(
        description,
      );
      const result = openGateDescriptionValueObject.hasErrors();
      //Assert
      expect(!result).toBe(expected);
    });
  });
});

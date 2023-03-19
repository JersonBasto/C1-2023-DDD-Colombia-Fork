import { EmergencyDateValueObject } from './emergency-date.value-object';

describe('closeGateDescriptionValueObject', () => {
  let emergencyDateValueObject: EmergencyDateValueObject;
  beforeEach(() => {
    emergencyDateValueObject = new EmergencyDateValueObject(Date.now());
  });
  it('Should be defined', () => {
    expect(emergencyDateValueObject).toBeDefined();
  });
  describe('Validations', () => {
    it('Return True', () => {
      //Arrange
      const description = Date.now();
      const expected = true;
      //Act
      const emergencyDateValueObject = new EmergencyDateValueObject(
        description,
      );
      const result = emergencyDateValueObject.hasErrors();
      //Assert
      expect(!result).toBe(expected);
    });
    it('Return False', () => {
      //Arrange
      const description = Date.now() + Date.now();
      const expected = false;
      //Act
      const emergencyDateValueObject = new EmergencyDateValueObject(
        description,
      );
      const result = emergencyDateValueObject.hasErrors();
      //Assert
      expect(!result).toBe(expected);
    });
    it('Return False Value Undefined', () => {
      //Arrange
      const description = undefined;
      const expected = true;
      //Act
      const emergencyDateValueObject = new EmergencyDateValueObject(
        description,
      );
      const result = emergencyDateValueObject.hasErrors();
      //Assert
      expect(!result).toBe(expected);
    });
  });
});

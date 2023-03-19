import { EmergencyValueObject } from './emergency.value-object';
describe('EmergencyValueObejct', () => {
  let emergencyValueObject: EmergencyValueObject;
  beforeEach(() => {
    emergencyValueObject = new EmergencyValueObject(true);
  });
  it('Should be defined', () => {
    expect(emergencyValueObject).toBeDefined();
  });
  describe('Validations', () => {
    it('Return True when value true', () => {
      //Arrange
      const emergency = true;
      const expected = true;
      //Act
      const emergencyValueObject = new EmergencyValueObject(emergency);
      const result = emergencyValueObject.hasErrors();
      //Assert
      expect(!result).toBe(expected);
    });
    it('Return True when value false', () => {
      //Arrange
      const emergency = false;
      const expected = true;
      //Act
      const emergencyValueObject = new EmergencyValueObject(emergency);
      const result = emergencyValueObject.hasErrors();
      //Assert
      expect(!result).toBe(expected);
    });
    it('Return false when value Undefined', () => {                                                                                                                                                                                                                                                                                                                                                                                                                
      //Arrange
      const emergency = undefined;
      const expected = false;
      //Act
      const emergencyValueObject = new EmergencyValueObject(emergency);
      const result = emergencyValueObject.hasErrors();
      //Assert
      expect(!result).toBe(expected);
    });
  });
});

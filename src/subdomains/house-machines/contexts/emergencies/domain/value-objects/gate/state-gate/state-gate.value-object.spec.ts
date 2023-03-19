import { StateGateValueObject } from './state-gate.value-object';

describe('EmergencyValueObejct', () => {
  let stategateValueObject: StateGateValueObject;
  beforeEach(() => {
    stategateValueObject = new StateGateValueObject(true);
  });
  it('Should be defined', () => {
    expect(stategateValueObject).toBeDefined();
  });
  describe('Validations', () => {
    it('Return True when value true', () => {
      //Arrange
      const emergency = true;
      const expected = true;
      //Act
      const stategateValueObject = new StateGateValueObject(emergency);
      const result = stategateValueObject.hasErrors();
      //Assert
      expect(!result).toBe(expected);
    });
    it('Return True when value false', () => {
      //Arrange
      const emergency = false;
      const expected = true;
      //Act
      const stategateValueObject = new StateGateValueObject(emergency);
      const result = stategateValueObject.hasErrors();
      //Assert
      expect(!result).toBe(expected);
    });
    it('Return false when value Undefined', () => {
      //Arrange
      const emergency = undefined;
      const expected = false;
      //Act
      const stategateValueObject = new StateGateValueObject(emergency);
      const result = stategateValueObject.hasErrors();
      //Assert
      expect(!result).toBe(expected);
    });
  });
});

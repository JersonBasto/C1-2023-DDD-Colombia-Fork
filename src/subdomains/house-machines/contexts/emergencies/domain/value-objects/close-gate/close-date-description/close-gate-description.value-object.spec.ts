import { CloseGateDescriptionValueObject } from './close-gate-description.value-object';
describe('closeGateDescriptionValueObject', () => {
  let closeGateDescriptionValueObject: CloseGateDescriptionValueObject;
  beforeEach(() => {
    closeGateDescriptionValueObject = new CloseGateDescriptionValueObject(
      'La compuerta norte se ha cerrado',
    );
  });
  it('Should be defined', () => {
    expect(closeGateDescriptionValueObject).toBeDefined();
  });
  describe('Validations', () => {
    it('Return True', () => {
      //Arrange
      const description = 'La compuerta norte se ha cerrado';
      const expected = true;
      //Act
      const closeGateDescriptionValueObject =
        new CloseGateDescriptionValueObject(description);
      const result = closeGateDescriptionValueObject.hasErrors();
      //Assert
      expect(!result).toBe(expected);
    });
    it('Return False', () => {
      //Arrange
      const description = 'La compuerta';
      const expected = false;
      //Act
      const closeGateDescriptionValueObject =
        new CloseGateDescriptionValueObject(description);
      const result = closeGateDescriptionValueObject.hasErrors();
      //Assert
      expect(!result).toBe(expected);
    });
    it('Return False Value Undefined', () => {
      //Arrange
      const description = undefined;
      const expected = false;
      //Act
      const closeGateDescriptionValueObject =
        new CloseGateDescriptionValueObject(description);
      const result = closeGateDescriptionValueObject.hasErrors();
      //Assert
      expect(!result).toBe(expected);
    });
  });
});

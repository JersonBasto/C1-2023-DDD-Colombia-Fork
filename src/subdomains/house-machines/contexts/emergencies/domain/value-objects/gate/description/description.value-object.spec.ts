import { DescriptionValueObject } from "./description.value-object";

describe('closeGateDescriptionValueObject', () => {
  let descriptionValueObject: DescriptionValueObject;
  beforeEach(() => {
    descriptionValueObject = new DescriptionValueObject(
      'La compuerta norte se ha cerrado',
    );
  });
  it('Should be defined', () => {
    expect(descriptionValueObject).toBeDefined();
  });
  describe('Validations', () => {
    it('Return True', () => {
      //Arrange
      const description = 'La compuerta norte se ha cerrado';
      const expected = true;
      //Act
      const descriptionValueObject =
        new DescriptionValueObject(description);
      const result = descriptionValueObject.hasErrors();
      //Assert
      expect(!result).toBe(expected);
    });
    it('Return False', () => {
      //Arrange
      const description = 'La compuerta';
      const expected = false;
      //Act
      const descriptionValueObject =
        new DescriptionValueObject(description);
      const result = descriptionValueObject.hasErrors();
      //Assert
      expect(!result).toBe(expected);
    });
    it('Return False Value Undefined', () => {
      //Arrange
      const description = undefined;
      const expected = false;
      //Act
      const descriptionValueObject =
        new DescriptionValueObject(description);
      const result = descriptionValueObject.hasErrors();
      //Assert
      expect(!result).toBe(expected);
    });
  });
});

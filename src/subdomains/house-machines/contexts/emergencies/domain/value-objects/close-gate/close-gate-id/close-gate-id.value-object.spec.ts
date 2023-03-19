import { CloseGateIdValueObject } from './close-gate-id.value-object';
describe('CloseGateIdvalue', () => {
  let closeGateIdValue: CloseGateIdValueObject;
  beforeEach(() => {
    closeGateIdValue = new CloseGateIdValueObject(
      '43af7cf4-cead-4271-87e8-3ad1a36bf86a',
    );
  });
  it('Should be defined', () => {
    expect(closeGateIdValue).toBeDefined();
  });
  describe('Validations', () => {
    it('Return True', () => {
      //Arrange
      const Id = '43af7cf4-cead-4271-87e8-3ad1a36bf86a';
      const expected = true;
      //Act
      const closeGateIdValue = new CloseGateIdValueObject(Id);
      const result = closeGateIdValue.hasErrors();
      //Assert
      expect(!result).toBe(expected);
    });
    it('Return False', () => {
      //Arrange
      const Id = '43af7cf4-cead-4271-87e8-3ad1a36bf86aasdasdasd';
      const expected = false;
      //Act
      const closeGateIdValue = new CloseGateIdValueObject(Id);
      const result = closeGateIdValue.hasErrors();
      //Assert
      expect(!result).toBe(expected);
    });
    it('Return True Value Undefined', () => {
      //Arrange
      const Id = undefined;
      const expected = true;
      //Act
      const closeGateIdValue = new CloseGateIdValueObject(Id);
      const result = closeGateIdValue.hasErrors();
      //Assert
      expect(!result).toBe(expected);
    });
  });
});

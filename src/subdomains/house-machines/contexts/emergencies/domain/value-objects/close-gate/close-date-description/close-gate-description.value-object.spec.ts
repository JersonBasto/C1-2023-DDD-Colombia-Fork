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
  describe()
});

import { EventPublisherBase } from '../../../../../../../src/shared/sofka/event-publisher.base';
import { Topic } from '../events';
import {
  ICloseGateDomainService,
  IGateDomainService,
  IOpenGateDomainService,
} from '../services';
import { GateAggregateRoot } from './gate.aggregate';

jest.mock('./helpers');

describe('GateAggregateRoot', () => {
  let aggregateRoot: GateAggregateRoot;
  let gateService: IGateDomainService;
  let openService: IOpenGateDomainService;
  let closeService: ICloseGateDomainService;
  let events: Map<Topic, EventPublisherBase<any>>;
  beforeEach(() => {
    gateService = {} as IGateDomainService;
    openService = {} as IOpenGateDomainService;
    closeService = {} as ICloseGateDomainService;
    events = new Map<Topic, EventPublisherBase<any>>();
    aggregateRoot = new GateAggregateRoot({
      gateService,
      events,
    });
  });

  it('Should be defined', () => {
    expect(aggregateRoot).toBeDefined();
  });
});

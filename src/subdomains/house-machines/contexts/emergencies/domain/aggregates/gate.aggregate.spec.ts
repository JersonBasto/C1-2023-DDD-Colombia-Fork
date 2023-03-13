import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
import { ICloseGateDomainEntity } from '../entities';
import {
  ICloseGateDomainService,
  IGateDomainService,
  IOpenGateDomainService,
} from '../services';
import { GateAggregateRoot } from './gate.aggregate';
import { Topic } from '../events';
import * as helpers from './helpers';

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

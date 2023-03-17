import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common/decorators';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class TurbineData {
  constructor(private readonly httpService: HttpService) {}
  async dataTurbine(): Promise<AxiosResponse<any>> {
    return await this.httpService.axiosRef.get('http://localhost:3001/turbine/all-turbine');
  }
}

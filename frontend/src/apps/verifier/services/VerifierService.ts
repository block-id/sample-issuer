import Axios, { AxiosResponse } from 'axios';
import BaseService from 'common/services/BaseService';

export default class VerifierService extends BaseService {
  async createRequest(data: {
    id_type: string;
    attribute_groups: string[];
  }): Promise<AxiosResponse<VerifierRequest, any>> {
    return Axios.post(
      '/api/verifier-requests/',
      data,
      this.buildAxiosConfig(),
    );
  }
}
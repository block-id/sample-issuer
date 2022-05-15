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

  async getRequest(id: number): Promise<AxiosResponse<VerifierRequestWalletPayload, any>> {
    return Axios.get(
      `/api/verifier-requests/${id}/`,
      this.buildAxiosConfig(),
    );
  }

  async getRequestVp(id: number, token: string):
  Promise<AxiosResponse<{verifiable_presentation: VerifiablePresentation}, any>> {
    return Axios.get(
      `/api/verifier-requests/${id}/?token=${token}`,
      this.buildAxiosConfig(),
    );
  }
}

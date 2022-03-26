import Axios, { AxiosResponse } from 'axios';
import BaseService from 'common/services/BaseService';

import objectToFormData from 'common/utils/objectToFormData';

export default class AdhaarService extends BaseService {
  async apply(data: AdhaarFormData): Promise<AxiosResponse<any, any>> {
    return Axios.post(
      '/api/adhaar',
      objectToFormData(data),
      this.buildAxiosConfig(),
    );
  }
}

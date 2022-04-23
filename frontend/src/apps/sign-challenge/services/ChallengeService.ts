import Axios, { AxiosResponse } from 'axios';

import BaseService from 'common/services/BaseService';

export default class ChallengeService extends BaseService {
  async solve(
    id: number,
    signature: string,
    publicKey: string,
  ): Promise<AxiosResponse<{download_url: string}, any>> {
    return Axios.post(
      `/api/challenges/${id}/solve/`,
      { signature, public_key: publicKey },
      this.buildAxiosConfig(),
    );
  }
}

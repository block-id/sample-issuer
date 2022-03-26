import { AxiosRequestConfig } from 'axios';

import getCookie from 'common/utils/getCookie';

export default class BaseService {
  getDefaultAxiosConfig(): AxiosRequestConfig {
    return {
      headers: {
        'X-CSRFToken': getCookie('csrftoken') || '',
      },
    };
  }

  buildAxiosConfig(config?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...this.getDefaultAxiosConfig(),
      ...(config || {}),
    };
  }
}

import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {MMKV} from 'react-native-mmkv';
import Toast from 'react-native-toast-message';
import {store} from '../../redux/store/store';
import {hideLoader, showLoader} from '../../redux/action/loader/loader.tsx';

interface CustomHttpRequestConfig extends AxiosRequestConfig {
  withLoader?: boolean;
  withFailureToast?: boolean;
  withSuccessToast?: boolean;
  withSuccessLogs?: boolean;
  withFailureLogs?: boolean;
  successMessage?: string;
}

class NetworkService {
  private static instance: NetworkService;
  private axiosInstance: AxiosInstance;
  private mmkv: MMKV;

  private constructor() {
    this.mmkv = new MMKV();

    this.axiosInstance = axios.create({
      baseURL: 'https://dev.backend2.sparow.com/',
      timeout: 100000,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    this.axiosInstance.interceptors.request.use(
      // @ts-ignore
      async (config: CustomHttpRequestConfig) => {
        if (config.withLoader) {
          store.dispatch(showLoader());
        }

        const token = this.mmkv.getString('token');

        if (token) {
          config.headers = {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          };
        }

        return config;
      },
      (error: any) => {
        if (error.config.withLoader) {
          store.dispatch(hideLoader());
        }
        return Promise.reject(error);
      },
    );

    this.axiosInstance.interceptors.response.use(
      // @ts-ignore
      (response: any) => {
        if (response.config.withLoader) {
          store.dispatch(hideLoader());
        }
        if (response.config.withSuccessLogs) {
          console.log('Success:', response);
        }

        if (response.config.withSuccessToast) {
          Toast.show({
            type: 'success',
            text1:
              response.config.successMessage ||
              'Votre opération a été éffectué avec succès',
          });
        }

        return response;
      },
      (error: any) => {
        const {response, config} = error;

        if (config?.withLoader) {
          store.dispatch(hideLoader());
        }

        if (response) {
          let errorMessage = '';
          switch (response.status) {
            case 400:
              console.error('Bad Request: ', response.data);
              break;
            case 401:
              console.error('unothorized: ', response.data);

              break;
            case 403:
              console.error('Forbidden: ', response.data);
              break;
            case 422:
              console.error('Unprocessable Entity: ', response.data);
              break;
            default:
              console.error('Error:', response);
              break;
          }

          if (config?.withFailureToast) {
            const errors = response.data?.data;
            if (errors && typeof errors === 'object') {
              errorMessage += Object.values(errors).flat().join(' ');
            } else {
              errorMessage += response.data?.message || 'An error occurred.';
            }
            Toast.show({
              type: 'error',
              position: 'bottom',
              bottomOffset: 100,
              text1: 'Error',
              text2:
                errorMessage ||
                "Une erreur s'est produite. Veuillez réessayer.",
            });
          }
        } else {
          console.error('Network error or no response:', error);
          if (config?.withFailureToast) {
            Toast.show({
              type: 'error',
              text1: 'Problème de connexion',
              text2: 'Merci de vérifier votre connexion Internet',
              position: 'bottom',
              bottomOffset: 100,
            });
          }
        }

        if (config?.withFailureLogs) {
          console.log('Error:', error);
        }

        return Promise.reject(error);
      },
    );
  }

  public static getInstance(): NetworkService {
    if (!NetworkService.instance) {
      NetworkService.instance = new NetworkService();
    }
    return NetworkService.instance;
  }

  public async sendHttpRequest(
    config: CustomHttpRequestConfig,
  ): Promise<AxiosResponse> {
    return this.axiosInstance.request(config);
  }
}

export default NetworkService;

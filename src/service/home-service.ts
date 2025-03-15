import NetworkService from '../config/interceptor/interceptor.ts';
import {HomeUrl} from '../config/constant/url_list.ts';

export const getRestaurantService = async (page = 1) => {
  const response = await NetworkService.getInstance().sendHttpRequest({
    url: HomeUrl.getRestaurant,
    method: 'GET',
    withLoader: true,
    withFailureToast: false,
    withFailureLogs: false,
    params: {
      page: page,
      limit: 10,
      distance: 5,
      is_admin: true,
    },
  });
  return response.data;
};

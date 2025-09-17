import { FormDataType, UserType } from '../redux/types/User.type';
import { instance } from './axiosInstance';

export type AxiosResponse = {
    data: UserType
}

export const registerAPI: (formData: FormDataType) => Promise<AxiosResponse> = (formData: FormDataType) => {
    return instance.post('/users', formData)
}
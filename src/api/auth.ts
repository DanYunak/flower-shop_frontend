import axios from "axios";
import { instance } from "./axiosInstance";

export type AuthCredentials = {
  username: string;
  password: string;
};

export type LoginResponse = {
  id: number;
  username: string;
  token: string;
};

export async function registerAPI(data: AuthCredentials): Promise<void> {
  await instance.post("/users", data);
}

export async function loginAPI(data: AuthCredentials): Promise<LoginResponse> {
  const res = await instance.post<LoginResponse>("/users/login", data);
  return res.data;
}

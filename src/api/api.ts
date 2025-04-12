export const baseURL = process.env.NEXT_PUBLIC_API_URL; //기본 경로

import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const axios = Axios.create({ baseURL }); //baseURL을 항상 가지고 있는 인스턴스 생성

//기본 config에 Authorization헤더가 있다면 자동 추가하기
const _getHeader = (config?: AxiosRequestConfig) => {
    
  const token = typeof window === 'undefined' ? null : window.localStorage.getItem("accessToken");
  const headers = token ? { Authorization: "Bearer " + token } : {};

  return {
    ...(config || {}),
    headers: {
      ...(config?.headers || {}),
      ...headers,
    },
  };
};

// 매번 axios.get()을 쓰지 않고, 자동으로 토큰 헤더 추가
export function get<T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  const options = _getHeader(config); // config가 있다면 추가해서 getHeader함수 사용
  return axios.get(url, options); // 실제 GET 요청 보내기
}

export function post<T = any>(
  url: string, // 요청 주소
  data: any, // 서버에 보낼 데이터. POST body
  options?: any // 그외 params, timeout, headers 등
): Promise<AxiosResponse> {
  const baseHeaders = _getHeader()["headers"]; // 헤더 중 Authorization 프로퍼티 가져오기
  const extraHeaders = options?.["headers"] ?? {}; //전달한 option에 headers 항목이 있다면 헤더에 추가, 없다면 빈 객체
  const headers = { ...baseHeaders, ...extraHeaders }; //헤더 합치기
  return axios.post(url, data, { ...options, headers });
}


export const deleteCall = (url: string, data?: any) => {
  const options = _getHeader();
  return axios.delete(url, { ...options, data });
};
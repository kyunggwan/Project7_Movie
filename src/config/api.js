// API 설정 및 상수
export const API_CONFIG = {
  KOBIS_API_KEY: process.env.REACT_APP_KOBIS_API_KEY || 'fb1b0d9cbffc43741a75a891b653faae',
  KOBIS_BASE_URL: process.env.REACT_APP_KOBIS_BASE_URL || 'https://kobis.or.kr/kobisopenapi/webservice/rest',
  ENDPOINTS: {
    DAILY_BOXOFFICE: '/boxoffice/searchDailyBoxOfficeList.json',
    MOVIE_INFO: '/movie/searchMovieInfo.json'
  }
};

// API URL 생성 헬퍼 함수
export const createApiUrl = (endpoint, params = {}) => {
  const baseUrl = `${API_CONFIG.KOBIS_BASE_URL}${endpoint}`;
  const searchParams = new URLSearchParams({
    key: API_CONFIG.KOBIS_API_KEY,
    ...params
  });
  return `${baseUrl}?${searchParams}`;
};
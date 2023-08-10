import { AdminLogIn, CandidateSignIn, CandidateSignUp, CandidateUpdateDto, InitializeElectionDTO } from '@/lib/types';
import { setAppState } from '@/redux/slices/appStateReducer';
import { store } from '@/redux/store';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const api = axios.create({ baseURL: 'http://localhost:8080/e-voting' })

api.interceptors.request.use((config: any) => {
  if (localStorage.getItem('evoting-auth')) {
    const role = JSON.parse(localStorage.getItem('evoting-auth') as string)
    console.log(role);

    config.headers.Authorization = role;
  }
  return config;
});

let requestCount = 0; // Track the number of active requests

api.interceptors.request.use((config: any) => {
  requestCount++;
  if (requestCount === 1) {
    // Show loader when the first request is made
    store.dispatch({ type: setAppState, payload: { title: "global_loader", value: true } });
  }
  return config;
});

api.interceptors.response.use(
  function (response) {
    requestCount--;
    if (requestCount === 0) {
      // Hide loader when all requests are completed
      store.dispatch({ type: setAppState, payload: { title: "global_loader", value: false } });
      store.dispatch({ type: setAppState, payload: { title: "global_error", value: "" } });
    }
    return response;
  },
  function (error) {
    requestCount--;
    if (requestCount === 0) {
      // Hide loader when all requests are completed (even if there is an error)
      store.dispatch({ type: setAppState, payload: { title: "global_loader", value: false } });
    }

    // Display the global error message
    store.dispatch({ type: setAppState, payload: { title: "global_error", value: error.message || "An error occurred" } });

    return Promise.reject(error);
  }
);

export const getOtp = (payload: { uid: string }) => api.post('/voters/signin', payload);
export const verifyOtp = (payload: { OTP: string, uid: string }) => api.post('/voters/verify', payload);
export const candiateSignIn = (payload: CandidateSignIn) => api.post('candidate/signin', payload);
export const candiateSignUp = (payload: CandidateSignUp) => api.post('candidate/signup', payload);
export const adminLogIn = (payload: AdminLogIn) => api.post('admin/signin', payload);
export const getAllElection = () => api.get('/admin/election/all');
export const getElectionById = (id: string) => api.get(`/admin/election/${id}`);
export const initializeElection = (payload: InitializeElectionDTO) => api.post(`admin/election/initialize`, payload)
export const registrationElection = () => api.get('/candidate/election')
export const getPartyList = () => api.get('/candidate/party/all')
export const getPartyById = (id: string) => api.get(`/candidate/party/${id}`)
export const updateCandidateById = (id: string, update_payload: CandidateUpdateDto) => api.patch(`/candidate/${id}`, update_payload)
export const getCandidateById = (id: string) => api.get(`/candidate/${id}`)
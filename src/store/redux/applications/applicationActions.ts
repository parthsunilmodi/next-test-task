import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/api';

export const getApplicationsList = createAsyncThunk(
  'getApplicationsList',
  async () => {
    try {
      const response: { data: string[] } = await axiosInstance.get('/applications');
      return response.data;
    } catch (e) {
      return [];
    }
  },
);

export const getApplications = createAsyncThunk(
  'getApplications',
  async ({name}) => {
    try {
      const response: { data: string[] } = await axiosInstance.get(`/applications/${name}`);
      return {data: response.data, name};
    } catch (e) {
      return [];
    }
  },
);


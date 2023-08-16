import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/api';

export const getResourcesList = createAsyncThunk(
  'getResourcesList',
  async () => {
    try {
      const response: { data: string[] } = await axiosInstance.get('/resources');
      return response.data;
    } catch (e) {
      return [];
    }
  },
);

export const getResources = createAsyncThunk(
  'getResources',
  async ({ name }) => {
    try {
      const response: { data: string[] } = await axiosInstance.get(`/resources/${name}`);
      return { data: response.data, name };
    } catch (e) {
      return [];
    }
  },
);



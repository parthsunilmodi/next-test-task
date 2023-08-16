import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/api';
import { IRawResponse } from '@/types/raw.type';

export const getAllCoreData = createAsyncThunk('getAllCoreData', async () => {
  try {
    const response: { data: IRawResponse[] } = await axiosInstance.get('/raw');
    return response.data;
  } catch (e) {
    return [];
  }
});

import { createSlice } from '@reduxjs/toolkit';
import { getApplications, getApplicationsList } from './applicationActions';
import { IRawResponse } from '../../../types/raw.type';

type InitialStateProps = {
  tableHeader: string[],
  applicationList: string[];
  applications: { [key: string]: IRawResponse[] };
  searchValue: string,
  selectApplication: string,
  page: number;
  limit: number;
  isLoading: boolean;
};

const initialState: InitialStateProps = {
  tableHeader: [],
  applicationList: [],
  applications: {},
  searchValue: '',
  selectApplication: '',
  page: 1,
  limit: 10,
  isLoading: false,
};

const applicationSlice = createSlice({
  name: 'Applications',
  initialState,
  reducers: {
    onSearch: (state: InitialStateProps, { payload }: { payload: string }) => {
      state.searchValue = payload;
    },
    handleChangeApplication: ((state: InitialStateProps, { payload }: { payload: string }) => {
      state.selectApplication = payload;
    }),
    handlePageChange: ((state: InitialStateProps, { payload }: { payload: number }) => {
      state.page = payload;
    }),
    handlePageSizeChange: ((state: InitialStateProps, { payload }: { payload: number }) => {
      state.limit = payload;
    }),
  },
  extraReducers(builder) {
    builder
    .addCase(getApplicationsList.pending, (state: InitialStateProps) => {
      state.isLoading = true;
    })
    .addCase(getApplicationsList.fulfilled, (state: InitialStateProps, action) => {
      state.isLoading = false;
      state.applicationList = action.payload;
    })
    .addCase(getApplicationsList.rejected, (state: InitialStateProps) => {
      state.isLoading = false;
      state.applicationList = [];
    })
    .addCase(getApplications.pending, (state: InitialStateProps) => {
      state.isLoading = true;
    })
    .addCase(getApplications.fulfilled, (state: InitialStateProps, action) => {
      state.isLoading = false;
      if (!state.tableHeader.length) {
        state.tableHeader = Object.keys(action.payload.data[0]);
      }
      state.applications = { ...state.applications, [action.payload.name]: action.payload.data };
    })
    .addCase(getApplications.rejected, (state: InitialStateProps) => {
      state.isLoading = false;
      state.applications = [];
    });
  },
});

export const {
  onSearch,
  handleChangeApplication,
  handlePageChange,
  handlePageSizeChange,
} = applicationSlice.actions;
export default applicationSlice.reducer;

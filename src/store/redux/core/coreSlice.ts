import { createSlice } from '@reduxjs/toolkit';
import { getAllCoreData } from './coreActions';
import { IRawResponse } from '@/types/raw.type';

type InitialStateProps = {
  tableHeader: string[];
  coreData: IRawResponse[];
  isLoading: boolean;
  searchValue: string;
  selectApplication: string;
  selectResource: string;
  page: number;
  limit: number;
};

const initialState: InitialStateProps = {
  tableHeader: [],
  coreData: [],
  isLoading: false,
  searchValue: '',
  selectApplication: '',
  selectResource: '',
  page: 1,
  limit: 10,
};

const coreSlice = createSlice({
  name: 'CoreData',
  initialState,
  reducers: {
    onSearch: (state: InitialStateProps, { payload }: { payload: string }) => {
      state.searchValue = payload;
    },
    handleChangeApplication: ((state: InitialStateProps, { payload }: { payload: string }) => {
      state.selectApplication = payload;
    }),
    handelChangeResource: ((state: InitialStateProps, { payload }: { payload: string }) => {
      state.selectResource = payload;
    }),
    pageChange: ((state: InitialStateProps, { payload }: { payload: number }) => {
      state.page = payload;
    }),
    pageSizeChange: ((state: InitialStateProps, { payload }: { payload: number }) => {
      state.limit = payload;
    }),
  },
  extraReducers(builder) {
    builder
    .addCase(getAllCoreData.pending, (state: InitialStateProps) => {
      state.isLoading = true;
    })
    .addCase(getAllCoreData.fulfilled, (state: InitialStateProps, action) => {
      state.isLoading = false;
      state.tableHeader = Object.keys(action.payload[0]);
      state.coreData = action.payload;
    })
    .addCase(getAllCoreData.rejected, (state: InitialStateProps) => {
      state.isLoading = false;
    });
  },
});

export const {
  onSearch,
  handleChangeApplication,
  handelChangeResource,
  pageChange,
  pageSizeChange,
} = coreSlice.actions;
export default coreSlice.reducer;

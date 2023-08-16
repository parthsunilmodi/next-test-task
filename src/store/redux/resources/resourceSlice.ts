import { createSlice } from '@reduxjs/toolkit';
import { getResources, getResourcesList } from './resourceActions';
import { IRawResponse } from '@/types/raw.type';

type InitialStateProps = {
  tableHeader: string[];
  resourceList: string[];
  resources: { [key: string]: IRawResponse[] };
  searchValue: string,
  selectResource: string,
  page: number;
  limit: number;
  isLoading: boolean,
};

const initialState: InitialStateProps = {
  tableHeader: [],
  resourceList: [],
  resources: {},
  searchValue: '',
  selectResource: '',
  page: 1,
  limit: 10,
  isLoading: false,
};

const resourceSlice = createSlice({
  name: 'Resources',
  initialState,
  reducers: {
    onSearch: (state: InitialStateProps, { payload }: { payload: string }) => {
      state.searchValue = payload;
    },
    handleChangeResource: ((state: InitialStateProps, { payload }: { payload: string }) => {
      state.selectResource = payload;
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
    .addCase(getResourcesList.pending, (state: InitialStateProps) => {
      state.isLoading = true;
    })
    .addCase(getResourcesList.fulfilled, (state: InitialStateProps, action) => {
      state.isLoading = false;
      state.resourceList = action.payload;
    })
    .addCase(getResourcesList.rejected, (state: InitialStateProps) => {
      state.isLoading = false;
      state.resourceList = [];
    })
    .addCase(getResources.pending, (state: InitialStateProps) => {
      state.isLoading = true;
    })
    .addCase(getResources.fulfilled, (state: InitialStateProps, action) => {
      state.isLoading = false;
      if (!state.tableHeader.length) {
        // @ts-ignore
        state.tableHeader = Object.keys(action.payload.data[0]);
      }
      // @ts-ignore
      state.resources = { ...state.resources, [action.payload.name]: action.payload.data };
    })
    .addCase(getResources.rejected, (state: InitialStateProps) => {
      state.isLoading = false;
      state.resourceList = [];
    });
  },
});
export const {
  onSearch,
  handleChangeResource,
  handlePageChange,
  handlePageSizeChange,
} = resourceSlice.actions;
export default resourceSlice.reducer;

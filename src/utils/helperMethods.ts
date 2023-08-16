// function to return the data based on the search and filter criteria
import { IRawResponse } from '@/types/raw.type';

interface ISearchedAndFilteredData {
  data: IRawResponse[];
  searchValue?: string;
  selectApplication?: string;
  selectResource?: string;
  page?: number;
  limit?: number;
}

interface ISearchData {
  data: IRawResponse[];
  search: string;
}

export const searchData = ({ data, search }: ISearchData) => {
  return data.filter((data) =>
    Object.entries(data).some(([k, value]) => {
      if (typeof value === 'object') {
        return Object.entries(value).some(([k, val]) => val.includes(search));
      }
      return value.includes(search);
    }));
};

export const getSearchedAndFilteredData = ({
  data,
  searchValue = '',
  selectApplication = '',
  selectResource = ''
}: ISearchedAndFilteredData) => {
  if (!data.length) return [];
  let filteredData: IRawResponse[] = data;

  if (searchValue) {
    filteredData = searchData({ data: filteredData, search: searchValue });
  }

  if (selectApplication) {
    filteredData = filteredData.filter((search: IRawResponse) => search.ResourceGroup === selectApplication);
  }

  if (selectResource) {
    filteredData = filteredData.filter((search: IRawResponse) => search.MeterCategory === selectResource);
  }

  return filteredData;
};

// function to return the paginated data
export const getPaginatedData = (data: IRawResponse[], limit: number, offset: number) => {
  if (!data.length) return [];
  return data.slice(offset, offset + limit);
};

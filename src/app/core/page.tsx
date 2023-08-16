'use client';
import React, { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { useDispatch, useSelector } from 'react-redux';
import FilterSection from '../../components/FilterSection';
import {
  handelChangeResource,
  handleChangeApplication,
  onSearch,
  pageChange,
  pageSizeChange,
} from '@/store/redux/core/coreSlice';
import { getAllCoreData } from '@/store/redux/core/coreActions';
import TBody from '../../components/Table/TBody';
import Table from '../../components/Table/index';
import THead from '../../components/Table/THead';
import { getPaginatedData, getSearchedAndFilteredData } from '@/utils/helperMethods';
import { IRawResponse } from '@/types/raw.type';
import Pagination from '../../components/Pagination';
import { IRootState } from '@/store/redux';
import { AppDispatch } from '@/store';
import { NextPage } from 'next';

const Core: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    searchValue,
    selectApplication,
    selectResource,
    coreData,
    tableHeader,
    page,
    limit
  } = useSelector((state: IRootState) => state.core);
  const [search, setSearch] = useState<string>('');
  const [filteredData, setFilteredData] = useState<IRawResponse[]>([]);
  const [tableList, setTableList] = useState<IRawResponse[]>([]);
  const { applicationList } = useSelector((state: IRootState) => state.applications);
  const { resourceList } = useSelector((state: IRootState) => state.resources);

  const debouncedSearch = debounce((search: string) => {
    dispatch(onSearch(search));
  }, 1000);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectApplication = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(handleChangeApplication(e.target.value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectResource = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(handelChangeResource(e.target.value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!coreData.length) {
      dispatch(getAllCoreData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      const data = getSearchedAndFilteredData({
        data: coreData,
        searchValue,
        selectApplication,
        selectResource,
      });
      setFilteredData(data);
      onPageChange(1);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coreData, searchValue, selectApplication, selectResource]);

  useEffect(() => {
    const data = getPaginatedData(filteredData, limit, page);
    setTableList(data);
  }, [page, limit, filteredData]);

  const onPageChange = (page: number) => {
    dispatch(pageChange(page));
  };

  const onPageSizeChange = (size: number) => {
    dispatch(pageSizeChange(size));
  };

  return (
    <main>
      <FilterSection
        search={search}
        handleSearchChange={handleSearchChange}
        handleSelectApplication={handleSelectApplication}
        handleSelectResource={handleSelectResource}
        applicationList={applicationList}
        resourceList={resourceList}
      />
      <section>
        <div className="flex justify-center mt-[10px]">
          <Table>
            <THead theadList={tableHeader} />
            <TBody tbodyList={tableList} />
          </Table>
        </div>
        {
          (filteredData.length > limit) && (
            <div>
              <Pagination
                totalRecords={filteredData.length}
                currentPage={page}
                pageSize={limit}
                onPageChange={onPageChange}
                setPageSize={onPageSizeChange}
              />
            </div>)
        }
      </section>
    </main>
  );
};

export default Core;
'use client';
import { usePathname, useRouter } from 'next/navigation';
import debounce from 'lodash/debounce';
import { tabsData } from '@/constants';
import { ITabs } from '@/types/tabs.type';
import React, { useCallback, useEffect, useState } from 'react';
import Tabs from '../../../components/Tabs';
import FilterSection from '../../../components/FilterSection';
import Table from '../../../components/Table/index';
import THead from '../../../components/Table/THead';
import TBody from '../../../components/Table/TBody';
import { useDispatch, useSelector } from 'react-redux';
import { IRawResponse } from '@/types/raw.type';
import {
  handleChangeApplication,
  handlePageChange,
  handlePageSizeChange,
  onSearch,
} from '@/store/redux/applications/applicationSlice';
import { getPaginatedData, getSearchedAndFilteredData } from '@/utils/helperMethods';
import { getApplications } from '@/store/redux/applications/applicationActions';
import Pagination from '@/components/Pagination';

export default function Application() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const {
    applicationList,
    applications,
    searchValue,
    selectApplication,
    page,
    limit,
    tableHeader
  } = useSelector((state) => state.applications);
  const { resourceList } = useSelector((state) => state.resources);
  const [search, setSearch] = useState<string>('');
  const [filteredData, setFilteredData] = useState<IRawResponse[]>([]);
  const [tableList, setTableList] = useState<IRawResponse[]>([]);

  const debouncedSearch = debounce(async (search: string) => {
    dispatch(onSearch(search));
  }, 1000);
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  }, []);

  const handleSelectApplication = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(handleChangeApplication(e.target.value));
  }, []);

  useEffect(() => {
    if ((!applications || !selectApplication.hasOwnProperty(selectApplication)) && selectApplication) {
      dispatch(getApplications({ name: selectApplication }));
    }
  }, [selectApplication]);

  useEffect(() => {
    (async () => {
      const filteredData = getSearchedAndFilteredData({
        data: applications[selectApplication] ?? [],
        searchValue,
        selectApplication,
        page,
        limit
      });
      setFilteredData(filteredData);
      onPageChange(1);
    })();
  }, [applications, searchValue, selectApplication]);

  useEffect(() => {
    const data = getPaginatedData(filteredData, limit, page);
    setTableList(data);
  }, [page, limit, filteredData]);

  const handleTabClickEvent = useCallback((name: string) => {
    router.push(`/filter-section/${String(name).toLocaleLowerCase()}`);
  }, []);

  const onPageChange = (page) => {
    dispatch(handlePageChange(page));
  };

  const onPageSizeChange = (size: number) => {
    dispatch(handlePageSizeChange(size));
  };

  return (
    <main>
      <section>
        <ul className="flex border-b">
          {tabsData.map((tab: ITabs, index: number) => {
            const { name } = tab;
            return (
              <Tabs
                active={pathname.includes(String(name).toLocaleLowerCase())}
                name={name}
                handleTabClickEvent={handleTabClickEvent}
                key={index}
              />);
          })}
        </ul>
      </section>
      <FilterSection
        search={search}
        handleSearchChange={handleSearchChange}
        handleSelectApplication={handleSelectApplication}
        applicationList={applicationList}
        resourceList={resourceList}
        isCloseResourceDropDown={false}
      />
      <section>
        <div className="flex justify-center mt-[10px]">
          <Table>
            <THead theadList={tableHeader} />
            <TBody tbodyList={tableList} />
          </Table>
        </div>
        {
          selectApplication && (filteredData.length > limit) && (
            <div>
              <Pagination
                totalRecords={filteredData.length}
                currentPage={page}
                pageSize={limit}
                onPageChange={onPageChange}
                setPageSize={onPageSizeChange}
              />
            </div>
          )
        }
      </section>

    </main>
  );
}

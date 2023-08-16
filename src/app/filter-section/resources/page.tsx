'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import debounce from 'lodash/debounce';
import { tabsData } from '@/constants';
import { ITabs } from '@/types/tabs.type';
import Tabs from '../../../components/Tabs';
import FilterSection from '../../../components/FilterSection';
import Table from '../../../components/Table/index';
import THead from '../../../components/Table/THead';
import TBody from '../../../components/Table/TBody';
import { useDispatch, useSelector } from 'react-redux';
import { IRawResponse } from '@/types/raw.type';
import {
  handleChangeResource,
  handlePageChange,
  handlePageSizeChange,
  onSearch
} from '@/store/redux/resources/resourceSlice';
import { getSearchedAndFilteredData, getPaginatedData } from '@/utils/helperMethods';
import { getResources } from '@/store/redux/resources/resourceActions';
import Pagination from '@/components/Pagination';

export default function Application() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const {
    resourceList,
    resources,
    searchValue,
    selectResource,
    page,
    limit,
    tableHeader
  } = useSelector((state) => state.resources);
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

  const handleSelectResource = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(handleChangeResource(e.target.value));
  }, []);

  useEffect(() => {
    if ((!resources || !resources.hasOwnProperty(selectResource)) && selectResource) {
      dispatch(getResources({ name: selectResource }));
    }
  }, [selectResource]);

  useEffect(() => {

    (async () => {
      const filteredData = getSearchedAndFilteredData({
        data: resources[selectResource] ?? [],
        searchValue,
        selectResource,
        page,
        limit
      });
      setFilteredData(filteredData);
      onPageChange(1);
    })();
  }, [resources, searchValue, selectResource]);

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
        handleSelectResource={handleSelectResource}
        resourceList={resourceList}
        isCloseApplicationDropDown={false}
      />
      <section>
        <div className="flex justify-center mt-[10px]">
          <Table>
            <THead theadList={tableHeader} />
            <TBody tbodyList={tableList} />
          </Table>
        </div>
        {
          selectResource && (
            <div>
              <Pagination
                totalRecords={(resources[selectResource] ?? []).length}
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

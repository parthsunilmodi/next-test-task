import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Dropdown from './Dropdown';
import { getApplicationsList } from '@/store/redux/applications/applicationActions';
import { getResourcesList } from '@/store/redux/resources/resourceActions';

interface IFilterSection {
  search: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectApplication: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSelectResource?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  applicationList?: string[];
  resourceList: string[];
  isCloseApplicationDropDown?: boolean;
  isCloseResourceDropDown?: boolean;
}

const FilterSection: React.FC<IFilterSection> = (props) => {
  const {
    search,
    handleSearchChange,
    applicationList,
    resourceList,
    handleSelectResource,
    handleSelectApplication,
    isCloseApplicationDropDown = true,
    isCloseResourceDropDown = true
  } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    if (applicationList && !applicationList?.length) {
      dispatch(getApplicationsList());
    }

    if (resourceList && !resourceList.length) {
      dispatch(getResourcesList());
    }

  }, []);

  return (
    <section className="">
      <div className="gap-y-4 gap-x-4  font-sans text-black bg-white flex items-center justify-center mt-[10px]">
        <div className="border rounded overflow-hidden flex">
          <input
            type="text"
            className="px-4 py-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        {
          isCloseApplicationDropDown && (
            <div>
              <Dropdown data={applicationList || []} placeholder={'application'} handleChange={handleSelectApplication} />
            </div>
          )
        }
        {
          isCloseResourceDropDown && (
            <div>
              <Dropdown data={resourceList || []} placeholder={'resource'} handleChange={handleSelectResource} />
            </div>
          )
        }
      </div>
    </section>
  );
};
export default FilterSection;
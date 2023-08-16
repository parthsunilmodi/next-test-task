import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import select = Simulate.select;

interface IDropdown {
  data: string[];
  placeholder: string;
  defaultValue: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Dropdown: React.FC<IDropdown> = (props) => {
  const { placeholder, data, defaultValue, handleChange } = props;
  return (
    <select
      defaultValue={defaultValue}
      onChange={handleChange}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none"
    >
      <option value="">Select {placeholder}</option>
      {data.map((value: string) => <option value={value} key={value}>{value}</option>)}
    </select>
  );
};

export default Dropdown;
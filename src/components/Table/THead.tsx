'use client';
import React from 'react';

interface ITHead {
  theadList: [];
}

const THead: React.FC<ITHead> = (props) => {
  const {theadList} = props;
  return (
    <thead>
    <tr>
      {theadList && theadList.map((data, index) => {
        return (
          <th
            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
            key={index}
          >
            {data}
          </th>
        );
      })}
    </tr>
    </thead>
  );
};
export default THead;
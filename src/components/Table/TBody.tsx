'use client';
import React from 'react';
import { IRawResponse } from '@/types/raw.type';

interface ITBody {
  tbodyList: IRawResponse[];
}

interface ITdNormal {
  data: string;
}

const TdNormal: React.FC<ITdNormal> = (props) => {
  return (
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <p className="text-gray-900 whitespace-no-wrap">{props.data}</p>
    </td>
  );
};

interface ITdOption {
  data: object;
}

const TdOption: React.FC<ITdOption> = (props) => {
  return Object.entries(props.data).map(([key, value], index) => {
    return (
      <div
        className="flex justify-center inset-0 bg-green-200 opacity-50 rounded-full px-4 py-1 text-gray-900 whitespace-no-wrap my-[2px]"
        key={index}
      >
        <span>{value}</span>
      </div>
    );
  });
};

const TBody: React.FC<ITBody> = (props) => {
  const {tbodyList} = props;

  const renderData = (data: IRawResponse) => {
    return Object.entries(data).map(([key, value], index) => {
      if (typeof value !== 'object') {
        return (<TdNormal data={value} key={index}/>);
      } else {
        return (
          <td className="flex flex-col px-5 py-5 border-b border-gray-200 bg-white text-sm" key={index}>
            <TdOption data={value} key={index}/>
          </td>
        );
      }
    });
  };

  return (
    <tbody>
    {tbodyList && Array.isArray(tbodyList) && tbodyList.map((data, index) => {
      return (<tr key={index}>{renderData(data)}</tr>);
    })}
    </tbody>
  );
};
export default TBody;
'use client';
import React from 'react';

interface ITable {
  children: React.ReactNode;
}

const Table: React.FC<ITable> = ({children}) => {
  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto w-full">
      <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          {children}
        </table>
      </div>
    </div>
  );
};
export default Table;
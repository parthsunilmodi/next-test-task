import React from 'react';
import { CaretRightSvg } from './SVG/CaretRightSvg';

interface IPagination {
  totalRecords: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  isServerSidePagination?: boolean;
  totalRecordsForServerSidePagination?: number;
  setCurrentPage?: (page: number) => void;
  hideTogglePageNumbers?: boolean;
}

interface IDropdownOptionType {
  id: string;
  label: string;
  value: number;
}

const menuOptions: IDropdownOptionType[] = [
  {
    id: '1',
    label: '10',
    value: 10,
  },
  {
    id: '2',
    label: '15',
    value: 15,
  },
  {
    id: '3',
    label: '20',
    value: 20,
  },
  {
    id: '4',
    label: '30',
    value: 30,
  },
  {
    id: '5',
    label: '50',
    value: 50,
  },
];

const Pagination: React.FC<IPagination> = (props) => {
  const {
    totalRecords,
    currentPage,
    pageSize,
    onPageChange,
    setPageSize,
    isServerSidePagination,
    totalRecordsForServerSidePagination = 0,
    setCurrentPage,
    hideTogglePageNumbers,
  } = props;

  const totalPages: number = Math.floor((isServerSidePagination ? totalRecordsForServerSidePagination : totalRecords) / pageSize);

  const onArrowClick = (operator: string) => () => {
    if (operator === '-' && currentPage === 1) return;
    if (operator === '+' && currentPage === totalPages) return;
    onPageChange(operator === '-' ? currentPage - 1 : currentPage + 1);
  };

  const renderPageNumbersWithEllipses = () => {
    const response: (string | number)[] = [];

    if (totalPages < 4) {
      return Array.from(Array(totalPages).keys()).map(v => v + 1);
    }

    Array.from(Array(totalPages).keys()).forEach((page: number, index: number) => {
      const pageNumber = page + 1;
      if (pageNumber === (currentPage - 1) || pageNumber === (currentPage + 1) || pageNumber === (currentPage + 2) || pageNumber === currentPage || pageNumber === 1 || pageNumber === totalPages) {
        response.push(pageNumber);
      } else if (response.slice(-1)[0] !== '...' && response[index + 1] !== '...') {
        response.push('...');
      }
    });

    return response;
  };

  const onPageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setPageSize(Number(value));
    setCurrentPage?.(1);
  };

  return (
    <div className="w-full flex items-center justify-between mb-5 sm:px-8 px-4">
      <div className="row-selection">
        {
          !hideTogglePageNumbers && (
            <>
              <span>Show</span>
              {' '}
              <select defaultValue={10} onChange={onPageSizeChange}>
                {
                  menuOptions.map((option: IDropdownOptionType) => (
                    <option
                      key={option.value}
                      value={option.value}
                      selected={option.value === pageSize}
                    >
                      {option.label}
                    </option>
                  ))
                }
              </select>
              {' '}
              {'from'}
              {' '}
              <span
                className="total-records font-bold">{isServerSidePagination ? totalRecordsForServerSidePagination : totalRecords}</span>
              {' '}
              {'items'}
            </>
          )
        }
      </div>
      <div className="flex items-center">
        <span className="p-2 flex items-center rotate-180 cursor-pointer" onClick={onArrowClick('-')}><CaretRightSvg /></span>
        {
          renderPageNumbersWithEllipses().map((page: number | string, index: number) => {
            if (page === '...') {
              return (
                <div key={index} className="p-2">
                  <span>{page}</span>
                </div>
              );
            }
            return (
              <div
                key={index}
                className={`p-2 cursor-pointer rounded ${Number(page) === currentPage ? 'bg-green-200' : ''}`}
                onClick={() => onPageChange(Number(page))}
              >
                <span>{page}</span>
              </div>
            );
          })
        }
        <span className="icon cursor-pointer" onClick={onArrowClick('+')}><CaretRightSvg /></span>
      </div>
    </div>
  );
};

export default Pagination;
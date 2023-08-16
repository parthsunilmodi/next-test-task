import React from 'react';

interface ISvgType {
  width?: string;
  height?: string;
  fill?: string;
  className?: string;
}

export const CaretRightSvg = (props: ISvgType) => {
  const {width = '6', height = '10', fill = '#716A79', className} = props;
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 6 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.00025 9.99927C0.74425 9.99927 0.48825 9.90127 0.29325 9.70627C-0.09775 9.31527 -0.09775 8.68327 0.29325 8.29227L3.59825 4.98727L0.41825 1.69427C0.03525 1.29627 0.04625 0.663272 0.44325 0.280272C0.84125 -0.102728 1.47425 -0.0917276 1.85725 0.304272L5.71925 4.30427C6.09825 4.69727 6.09325 5.32027 5.70725 5.70627L1.70725 9.70627C1.51225 9.90127 1.25625 9.99927 1.00025 9.99927Z"
        fill={fill}
      />
    </svg>
  );
};
import React from 'react';

interface ITab {
  name: string;
  active: boolean;
  handleTabClickEvent: (name: string) => void;
}

const Tabs: React.FC<ITab> = (props) => {
  const {active, name, handleTabClickEvent} = props;
  const className = active ? 'border-l border-t border-r rounded-t text-blue-600 bg-slate-600' : 'hover:text-slate-500 text-slate-600 bg-white';
  return (
    <li className="-mb-px mr-1">
      <button
        className={`bg-white inline-block py-2 px-4 font-semibold ${className}`}
        onClick={() => handleTabClickEvent(name)}>
        {name}
      </button>
    </li>
  );
};

export default Tabs;
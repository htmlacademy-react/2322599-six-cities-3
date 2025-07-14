import React, { useState } from 'react';

export type SortOption =
  | 'Popular'
  | 'Price: low to high'
  | 'Price: high to low'
  | 'Top rated first';

type SortingOptionsProps = {
  currentOption: SortOption;
  onOptionChange: (option: SortOption) => void;
};

function SortingOptionsComponent({ currentOption, onOptionChange }: SortingOptionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions: SortOption[] = [
    'Popular',
    'Price: low to high',
    'Price: high to low',
    'Top rated first'
  ];

  const toggleOptions = () => setIsOpen(!isOpen);
  const handleOptionClick = (option: SortOption) => {
    onOptionChange(option);
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={toggleOptions}
      >
        {currentOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {sortOptions.map((option) => (
          <li
            key={option}
            className={`places__option ${option === currentOption ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

export const SortingOptions = React.memo(SortingOptionsComponent);

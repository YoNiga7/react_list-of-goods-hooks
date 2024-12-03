import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  LENGTH = 'L',
  ALPHABET = 'A',
  DEFAULT = '',
}

function getPreparedGoods(
  goods: string[],
  isSorted: string,
  isReversed: boolean,
): string[] {
  const preperedGoods = [...goods];

  switch (isSorted) {
    case SortType.ALPHABET:
      preperedGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case SortType.LENGTH:
      preperedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed) {
    preperedGoods.reverse();
  }

  return preperedGoods;
}

export const App: React.FC = () => {
  const [selectedSort, setSelectedSort] = useState<string>(SortType.DEFAULT);
  const [reversed, setReversed] = useState<boolean>(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    selectedSort,
    reversed,
  );

  const onReset = () => {
    setSelectedSort(SortType.DEFAULT);
    setReversed(false);
  };

  const Alphabet = () => {
    setSelectedSort(SortType.ALPHABET);
  };

  const Length = () => {
    setSelectedSort(SortType.LENGTH);
  };

  const Reversed = () => {
    setReversed(!reversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-success', {
            'is-light': selectedSort !== SortType.ALPHABET,
          })}
          onClick={Alphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': selectedSort !== SortType.LENGTH,
          })}
          onClick={Length}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': !reversed,
          })}
          onClick={Reversed}
        >
          Reverse
        </button>

        {(selectedSort || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={onReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};

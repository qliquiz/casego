import { RefObject } from 'react';
import { ItemProps } from './ItemProps';

export interface SpinnerAttributes {
  winner: ItemProps;
  caseItems: ItemProps[];
  spinnerContainerRef: RefObject<HTMLDivElement>;
  weaponsRef: RefObject<HTMLDivElement>;
  weaponsCount?: number;
  transitionDuration?: number;
  itemWidth?: number;
}

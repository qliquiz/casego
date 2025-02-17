import { RefObject } from 'react';
import { ItemProps } from './ItemProps';
import { Weapon } from './Weapon';
import { SpinnerAttributes } from './SpinnerAttributes';

export class Spinner {
  winner: ItemProps;
  caseItems: ItemProps[];
  spinnerWrapper: RefObject<HTMLDivElement>;
  weaponWrapper: RefObject<HTMLDivElement>;
  weapons: Weapon[];
  weaponsCount: number;
  weaponPrizeId: number;
  transitionDuration: number;
  itemWidth: number;

  constructor(attrs: SpinnerAttributes) {
    this.winner = attrs.winner;
    this.caseItems = attrs.caseItems;
    this.weapons = [];
    this.spinnerWrapper = attrs.spinnerContainerRef;
    this.weaponWrapper = attrs.weaponsRef;
    this.weaponsCount = attrs.weaponsCount || 100;
    this.weaponPrizeId = this.randomRange(this.weaponsCount / 2, this.weaponsCount - 5);
    this.transitionDuration = attrs.transitionDuration || 7;
    this.itemWidth = attrs.itemWidth || 94;
  }

  private randomRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private shuffle = (array: Weapon[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  public setWeapons = () => {
    let weapons: Weapon[] = [];
    const caseItemsLength = this.caseItems.length;

    if (caseItemsLength === 0) {
      throw new Error('Error! No items in case.');
    }

    const setWeaponsActors = (from_i: number, to_i: number) => {
      let j = 0;
      const createdWeapons: Weapon[] = [];
      for (let i = from_i; i <= to_i; i++) {
        createdWeapons.push(new Weapon(i, this.caseItems[j]));
        j = (j === caseItemsLength - 1) ? 0 : j + 1;
      }
      this.shuffle(createdWeapons);
      return createdWeapons;
    };

    weapons = weapons.concat(setWeaponsActors(0, this.weaponPrizeId - 1));
    weapons[this.weaponPrizeId] = new Weapon(this.weaponPrizeId, this.winner);
    weapons = weapons.concat(setWeaponsActors(this.weaponPrizeId + 1, this.weaponsCount - 1));

    this.weapons = weapons;
  };

  public spin = () => {
    const el_weapon_width_1_2 = Math.floor(this.itemWidth / 2);
    const el_weapon_width_1_10 = Math.floor(this.itemWidth / 10);

    const randStop = (this.weaponPrizeId - 2) * this.itemWidth + el_weapon_width_1_2 +
      this.randomRange(el_weapon_width_1_10, (8 * el_weapon_width_1_10)) + 40;

    const wrapper = this.weaponWrapper.current;
    if (wrapper) {
      wrapper.style.transition = 'none';
      wrapper.style.left = '0px';

      requestAnimationFrame(() => {
        if (wrapper) {
          wrapper.style.transition = `left ${this.transitionDuration}s ease-out`;
          wrapper.style.left = `-${randStop}px`;
        }
      });
    }

    return this.weaponPrizeId;
  };
}

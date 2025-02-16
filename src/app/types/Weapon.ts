import { ItemProps } from './ItemProps';

export class Weapon {
  id: number;
  weapon_name: string;
  skin_name: string;
  rarity: string;
  steam_image: string;

  constructor(id: number, attrs: ItemProps) {
    this.id = id;
    this.weapon_name = attrs.weapon_name;
    this.skin_name = attrs.skin_name;
    this.rarity = attrs.rarity;
    this.steam_image = attrs.steam_image;
  }
}

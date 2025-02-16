import { ItemProps } from "../../types/ItemProps";

const rarityClasses: { [key: string]: string } = {
  'milspec': 'bg-blue-500',
  'restricted': 'bg-purple-500',
  'classified': 'bg-pink-500',
  'covert': 'bg-red-500',
  'rare': 'bg-yellow-500',
  'uncommon': 'bg-gray-400',
  'industrial-grade': 'bg-indigo-500',
};

const Item = ({ id, weapon_name, skin_name, rarity, steam_image, isLoser }: ItemProps) => {
  return (
    <div id={id.toString()} className={`relative w-28 h-28 flex items-center justify-center ${isLoser ? 'opacity-50' : 'opacity-100'}`}>
      <div className='relative w-24 h-24 bg-gray-800 rounded-md flex flex-col items-center justify-center shadow-md border border-gray-700'>
        <div className={`absolute bottom-0 left-0 w-full h-1 ${rarityClasses[rarity] || 'bg-gray-500'}`}></div>
        <img src={steam_image} alt={weapon_name} className='w-20 h-auto object-contain mt-2' />
        <div className='w-full bg-gray-900 text-center text-white text-xs py-1 rounded-b-md'>
          <p className='font-semibold'>{weapon_name}</p>
          <p className='text-gray-300'>{skin_name}</p>
        </div>
      </div>
    </div>
  );
};

export default Item;

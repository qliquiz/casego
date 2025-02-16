import { CaseProps } from "../../types/CaseProps";

const Case = ({ id, name, image }: CaseProps) => {
  return (
    <div id={id.toString()} className='w-full h-full rounded-md'>
      <div className='w-full h-full bg-gray-800 rounded-md flex flex-col items-center justify-between p-2'>
        <img className='w-4/5 h-auto mx-auto' src={image} alt={name} />
        <div className='bg-gray-900 w-full h-5 rounded-b-md flex items-center justify-center'>
          <p className='text-xs text-gray-300 truncate'>{name}</p>
        </div>
      </div>
    </div>
  );
};

export default Case;

import { Link } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

const Navbar = () => {
  const { user } = useUser();

  return (
    <div className='fixed bottom-0 left-0 right-0 bg-gray-800 h-14 flex justify-center items-center shadow-lg z-50'>
      <nav className='flex justify-around w-full max-w-md'>
        {user && (
          <>
            <Link to={`/inventory/${user.id}`} className='text-white text-lg px-4 py-2 hover:text-cyan-100 transition'>
              Инвентарь
            </Link>
            <Link to='/cases' className='text-white text-lg px-4 py-2 hover:text-cyan-100 transition'>
              Кейсы
            </Link>
            <Link to={`/profile/${user.id}`} className='text-white text-lg px-4 py-2 hover:text-cyan-100 transition'>
              Профиль
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;

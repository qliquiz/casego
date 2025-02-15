import { useUser } from '../contexts/UserContext';

const Profile = () => {
  const { user } = useUser();

  return <h2 className='text-red-500'>{user?.username ?? 'Пользователь не найден'}</h2>;
};

export default Profile;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { createUser } from '../services/userService';

const Start = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleStart = async () => {
      if (!user) return;
      try {
        await createUser({ id: user.id, username: user.username });
        navigate('/cases');
      } catch (error) {
        setError((error as Error).message);
      }
    };

    handleStart();
  }, [user, navigate]);

  if (error) return <p className="text-red-500">Ошибка: {error}</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold">CaSeGO</h1>
    </div>
  );
};

export default Start;

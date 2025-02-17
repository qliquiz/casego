import { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { useUser } from './app/hooks/useUser';
import { User } from './app/types/User';
import AppRouter from './app/routes/AppRouter';
import './styles/App.css';

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        initDataUnsafe?: {
          user?: User;
        };
      };
    };
  }
}

const App = () => {
  const { setUser } = useUser();

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      const telegramUser = window.Telegram.WebApp.initDataUnsafe?.user;
      if (telegramUser) setUser(telegramUser);
    } else {
      console.error('Telegram WebApp не доступен');
      setUser({id: 1, username: 'qliquiz'});
    }
  }, [setUser]);

  return (
    <HashRouter>
      <AppRouter />
    </HashRouter>
  );
};

export default App;

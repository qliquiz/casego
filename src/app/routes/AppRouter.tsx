import { Route, Routes } from 'react-router-dom';
import Start from '../pages/Start';
import Inventory from '../pages/Inventory';
import Cases from '../pages/Cases';
import Profile from '../pages/Profile';
import Error from '../pages/Error';
import Navbar from '../components/layout/Navbar';

const AppRouter = () => {
  const weaponsCount: number = 100;
  const transitionDuration: number = 10;

  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/inventory/:id" element={<><Inventory /><Navbar /></>} />
      <Route path="/cases" element={
        <>
          <Cases
            weaponsCount={weaponsCount}
            transitionDuration={transitionDuration}
          />
          <Navbar />
        </>
      } />
      <Route path="/profile/:id" element={<><Profile /><Navbar /></>} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default AppRouter;

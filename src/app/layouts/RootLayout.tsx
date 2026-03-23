import { Outlet } from 'react-router';
import { NavigationBar } from '../components/NavigationBar';
import { Footer } from '../components/Footer';

export function RootLayout() {
  return (
    <div className="bg-black min-h-screen">
      <NavigationBar />
      <Outlet />
      <Footer />
    </div>
  );
}

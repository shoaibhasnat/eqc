'use client';

import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import UserNavbar from '@/components/user/navbar/UserNavbar';
import Footer from '@/components/user/footer/Footer';
import Loader from '@/components/common/Loader';

function AppShell({ children }) {
  const { loading } = useLanguage();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <UserNavbar />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}

export default function Providers({ children }) {
  return (
    <LanguageProvider>
      <AppShell>{children}</AppShell>
    </LanguageProvider>
  );
}

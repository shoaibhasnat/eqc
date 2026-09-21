'use client';

import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import UserNavbar from '@/components/user/navbar/UserNavbar';
import Footer from '@/components/user/footer/Footer';
import Loader from '@/components/common/Loader';
import WhatsAppFloat from '@/components/common/WhatsAppFloat';
import PwaRegister from '@/components/pwa/PwaRegister';
import InstallAppPrompt from '@/components/pwa/InstallAppPrompt';

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
      <WhatsAppFloat />
      <PwaRegister />
      <InstallAppPrompt />
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

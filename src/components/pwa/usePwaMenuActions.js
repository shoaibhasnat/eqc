'use client';

import { useEffect, useState } from 'react';
import {
  detectAppInstalled,
  INSTALLED_EVENT,
  isMobileOrTabletViewport,
  isStandaloneDisplay,
} from './pwaUtils';

/**
 * Burger menu PWA actions (mobile/tablet only):
 * - showInstall: app not installed
 * - showOpen: app installed, browsing in a normal browser tab
 */
export default function usePwaMenuActions() {
  const [showInstall, setShowInstall] = useState(false);
  const [showOpen, setShowOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const refresh = async () => {
      if (!isMobileOrTabletViewport() || isStandaloneDisplay()) {
        if (!cancelled) {
          setShowInstall(false);
          setShowOpen(false);
        }
        return;
      }

      const installed = await detectAppInstalled();
      if (cancelled) return;
      setShowInstall(!installed);
      setShowOpen(installed);
    };

    refresh();

    const onInstalled = () => {
      if (cancelled) return;
      setShowInstall(false);
      setShowOpen(!isStandaloneDisplay());
    };

    window.addEventListener('appinstalled', onInstalled);
    window.addEventListener(INSTALLED_EVENT, onInstalled);
    window.addEventListener('resize', refresh);

    const onVisibility = () => {
      if (document.visibilityState === 'visible') refresh();
    };
    document.addEventListener('visibilitychange', onVisibility);

    const media = window.matchMedia('(max-width: 1199px)');
    const onMedia = () => refresh();
    if (media.addEventListener) media.addEventListener('change', onMedia);
    else media.addListener(onMedia);

    return () => {
      cancelled = true;
      window.removeEventListener('appinstalled', onInstalled);
      window.removeEventListener(INSTALLED_EVENT, onInstalled);
      window.removeEventListener('resize', refresh);
      document.removeEventListener('visibilitychange', onVisibility);
      if (media.removeEventListener) media.removeEventListener('change', onMedia);
      else media.removeListener(onMedia);
    };
  }, []);

  return { showInstall, showOpen };
}

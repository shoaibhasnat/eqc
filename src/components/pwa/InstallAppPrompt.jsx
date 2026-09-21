'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GetAppIcon from '@mui/icons-material/GetApp';
import IosShareIcon from '@mui/icons-material/IosShare';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { SITE_NAME } from '@/lib/seo';

const STORAGE_DISMISS_INSTALL = 'eqc-pwa-dismissed-at';
const STORAGE_DISMISS_OPEN = 'eqc-pwa-open-dismissed-at';
const STORAGE_INSTALLED = 'eqc-pwa-installed';
const DISMISS_DAYS = 3;
const PWA_PROTOCOL = 'web+eqc://open';

function isStandaloneDisplay() {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: fullscreen)').matches ||
    window.navigator.standalone === true
  );
}

function isIosDevice() {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent || '';
  const iOS = /iPad|iPhone|iPod/.test(ua) || /CriOS|FxiOS|EdgiOS/.test(ua);
  const iPadOs = window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1;
  return iOS || iPadOs;
}

function isLikelyChromium() {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent || '';
  // Chrome, Edge, Samsung Internet, Opera — exclude Firefox/iOS WebKit-only
  if (/Firefox|FxiOS/i.test(ua)) return false;
  if (isIosDevice()) return false;
  return /Chrome|Chromium|Edg|OPR|SamsungBrowser/i.test(ua);
}

function isAndroidDevice() {
  if (typeof window === 'undefined') return false;
  return /Android/i.test(window.navigator.userAgent || '');
}

function readDismissed(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return false;
    const then = Number(raw);
    if (Number.isNaN(then)) return false;
    return Date.now() - then < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

function markDismissed(key) {
  try {
    localStorage.setItem(key, String(Date.now()));
  } catch {
    /* ignore */
  }
}

function markInstalled() {
  try {
    localStorage.setItem(STORAGE_INSTALLED, '1');
    localStorage.removeItem(STORAGE_DISMISS_INSTALL);
    localStorage.removeItem(STORAGE_DISMISS_OPEN);
  } catch {
    /* ignore */
  }
}

function clearInstalledMark() {
  try {
    localStorage.removeItem(STORAGE_INSTALLED);
  } catch {
    /* ignore */
  }
}

function isMarkedInstalled() {
  try {
    return localStorage.getItem(STORAGE_INSTALLED) === '1';
  } catch {
    return false;
  }
}

async function relatedAppsInstalled() {
  if (typeof navigator === 'undefined' || !navigator.getInstalledRelatedApps) {
    return false;
  }
  try {
    const apps = await navigator.getInstalledRelatedApps();
    return Array.isArray(apps) && apps.length > 0;
  } catch {
    return false;
  }
}

function buildAndroidOpenIntent() {
  if (typeof window === 'undefined') return '';
  const { host, pathname } = window.location;
  const openPath = `${pathname || '/'}?source=pwa-open`;
  const fallback = `${window.location.origin}${openPath}`;

  return (
    `intent://${host}${openPath}` +
    '#Intent;scheme=https;' +
    'action=android.intent.action.VIEW;' +
    'category=android.intent.category.BROWSABLE;' +
    `S.browser_fallback_url=${encodeURIComponent(fallback)};` +
    'end'
  );
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function InstallAppPrompt() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('install'); // install | ios | open
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installing, setInstalling] = useState(false);
  const [opening, setOpening] = useState(false);
  const deferredPromptRef = useRef(null);

  const androidIntentHref = useMemo(() => {
    if (typeof window === 'undefined' || !isAndroidDevice()) return '';
    return buildAndroidOpenIntent();
  }, [open, mode]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    // Opened from home screen / installed app window
    if (isStandaloneDisplay()) {
      markInstalled();
      return undefined;
    }

    let cancelled = false;

    const onBeforeInstall = (event) => {
      // Browser can install again ⇒ app is NOT installed anymore
      event.preventDefault();
      clearInstalledMark();
      deferredPromptRef.current = event;
      setDeferredPrompt(event);
    };

    const onAppInstalled = () => {
      markInstalled();
      deferredPromptRef.current = null;
      setDeferredPrompt(null);
      setMode('open');
      // After install, immediately offer to use/open the app next time;
      // close install UI for now
      setOpen(false);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener('appinstalled', onAppInstalled);

    const ios = isIosDevice();

    const decide = async () => {
      if (cancelled || isStandaloneDisplay()) return;

      // Give Chromium time to fire beforeinstallprompt (only when NOT installed)
      if (!ios && 'serviceWorker' in navigator) {
        try {
          await Promise.race([navigator.serviceWorker.ready, wait(1200)]);
        } catch {
          /* ignore */
        }
      }

      // Wait for beforeinstallprompt — if it never comes, app is likely installed
      await wait(ios ? 400 : 1600);
      if (cancelled) return;

      const bipAvailable = Boolean(deferredPromptRef.current);
      const related = ios ? false : await relatedAppsInstalled();
      const marked = isMarkedInstalled();

      // Definitely not installed: browser offered the native install prompt
      if (bipAvailable) {
        clearInstalledMark();
        if (readDismissed(STORAGE_DISMISS_INSTALL)) return;
        setMode(ios ? 'ios' : 'install');
        setOpen(true);
        return;
      }

      // Installed if:
      // - related-apps API says so, OR
      // - we recorded install / standalone launch, OR
      // - Chromium has an active service worker and never fired beforeinstallprompt
      //   (Chrome suppresses BIP when the PWA is already installed)
      const hasActiveSw = Boolean(navigator.serviceWorker?.controller);
      const chromiumInstalledHint =
        !ios && isLikelyChromium() && !bipAvailable && hasActiveSw;
      const installed = related || marked || chromiumInstalledHint;

      if (installed) {
        markInstalled();
        if (readDismissed(STORAGE_DISMISS_OPEN)) return;
        setMode('open');
        setOpen(true);
        return;
      }

      // Not installed
      if (readDismissed(STORAGE_DISMISS_INSTALL)) return;
      setMode(ios ? 'ios' : 'install');
      setOpen(true);
    };

    const timer = window.setTimeout(decide, ios ? 500 : 800);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('appinstalled', onAppInstalled);
    };
  }, []);

  const handleClose = useCallback(() => {
    markDismissed(mode === 'open' ? STORAGE_DISMISS_OPEN : STORAGE_DISMISS_INSTALL);
    setOpen(false);
  }, [mode]);

  const handleInstall = useCallback(async () => {
    if (deferredPrompt) {
      setInstalling(true);
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice?.outcome === 'accepted') {
          markInstalled();
          setOpen(false);
        } else {
          markDismissed(STORAGE_DISMISS_INSTALL);
          setOpen(false);
        }
      } catch {
        markDismissed(STORAGE_DISMISS_INSTALL);
        setOpen(false);
      } finally {
        deferredPromptRef.current = null;
        setDeferredPrompt(null);
        setInstalling(false);
      }
      return;
    }

    if (isIosDevice()) setMode('ios');
  }, [deferredPrompt]);

  const handleOpenApp = useCallback(
    (event) => {
      if (androidIntentHref && event?.currentTarget?.tagName === 'A') {
        markDismissed(STORAGE_DISMISS_OPEN);
        setOpening(true);
        window.setTimeout(() => setOpen(false), 300);
        return;
      }

      event?.preventDefault?.();
      setOpening(true);

      if (!isIosDevice() && !isAndroidDevice()) {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = PWA_PROTOCOL;
        document.body.appendChild(iframe);
        window.setTimeout(() => {
          iframe.remove();
          window.location.href = PWA_PROTOCOL;
        }, 100);
        markDismissed(STORAGE_DISMISS_OPEN);
        setOpen(false);
        return;
      }

      if (isAndroidDevice()) {
        window.location.href = buildAndroidOpenIntent();
        markDismissed(STORAGE_DISMISS_OPEN);
        window.setTimeout(() => setOpen(false), 300);
        return;
      }

      // iOS: cannot launch home-screen web app from the browser tab
      markDismissed(STORAGE_DISMISS_OPEN);
      setOpen(false);
      setOpening(false);
    },
    [androidIntentHref]
  );

  if (!open) return null;

  const isOpenMode = mode === 'open';
  const isIosMode = mode === 'ios';

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="eqc-install-title"
      sx={{ zIndex: 2000 }}
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxWidth: 400,
          width: 'calc(100% - 32px)',
          mx: 2,
          overflow: 'hidden',
        },
      }}
    >
      <Box
        sx={{
          background: 'linear-gradient(145deg, #B8702F 0%, #8f5520 100%)',
          color: '#fff',
          px: 2.5,
          pt: 2.5,
          pb: 2,
          position: 'relative',
        }}
      >
        <IconButton
          aria-label="Close"
          onClick={handleClose}
          size="small"
          sx={{ position: 'absolute', top: 8, right: 8, color: 'rgba(255,255,255,0.9)' }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pr: 3 }}>
          <Box
            component="img"
            src="/icon-192.png"
            alt=""
            sx={{
              width: 56,
              height: 56,
              borderRadius: '14px',
              bgcolor: '#fff',
              boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
            }}
          />
          <Box>
            <DialogTitle
              id="eqc-install-title"
              sx={{
                p: 0,
                fontWeight: 700,
                fontSize: '1.15rem',
                color: '#fff',
                fontFamily: 'Quicksand, sans-serif',
              }}
            >
              {isOpenMode ? `Open ${SITE_NAME}` : 'Install This As Mobile Application'}
            </DialogTitle>
            <Typography
              variant="body2"
              sx={{ opacity: 0.9, mt: 0.5, fontFamily: 'Quicksand, sans-serif' }}
            >
              {SITE_NAME}
            </Typography>
          </Box>
        </Box>
      </Box>

      <DialogContent sx={{ pt: 2.5, pb: 1 }}>
        {isOpenMode ? (
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Quicksand, sans-serif' }}>
            {isIosDevice()
              ? `${SITE_NAME} is on your home screen. Close this browser and open the app icon for the best experience.`
              : `${SITE_NAME} is installed on this device. Tap Open App to launch it. If Android asks, choose ${SITE_NAME}.`}
          </Typography>
        ) : isIosMode ? (
          <Box sx={{ fontFamily: 'Quicksand, sans-serif' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              Add {SITE_NAME} to your iPhone / iPad home screen:
            </Typography>
            <Box component="ol" sx={{ m: 0, pl: 2.25, color: 'text.secondary', '& li': { mb: 1 } }}>
              <Typography component="li" variant="body2">
                Tap the <IosShareIcon sx={{ fontSize: 16, verticalAlign: 'text-bottom', color: '#B8702F' }} />{' '}
                <strong>Share</strong> button (Safari) or the share icon in Chrome
              </Typography>
              <Typography component="li" variant="body2">
                Scroll and tap <strong>Add to Home Screen</strong>
              </Typography>
              <Typography component="li" variant="body2">
                Tap <strong>Add</strong>, then open it once from your home screen
              </Typography>
            </Box>
          </Box>
        ) : deferredPrompt ? (
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Quicksand, sans-serif' }}>
            Add {SITE_NAME} to your home screen for faster access and an app-like experience.
          </Typography>
        ) : (
          <Box sx={{ fontFamily: 'Quicksand, sans-serif' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              Install {SITE_NAME} from your browser menu:
            </Typography>
            <Box component="ol" sx={{ m: 0, pl: 2.25, color: 'text.secondary', '& li': { mb: 1 } }}>
              <Typography component="li" variant="body2">
                Open the browser menu (⋮ or ⋯)
              </Typography>
              <Typography component="li" variant="body2">
                Tap <strong>Install app</strong> or <strong>Add to Home screen</strong>
              </Typography>
              <Typography component="li" variant="body2">
                Confirm to install it as a mobile application
              </Typography>
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 2.5, pb: 2.5, gap: 1, flexWrap: 'wrap' }}>
        <Button onClick={handleClose} color="inherit" sx={{ fontFamily: 'Quicksand, sans-serif' }}>
          {isOpenMode ? 'Stay in browser' : 'Not now'}
        </Button>

        {isOpenMode ? (
          <Button
            variant="contained"
            component={androidIntentHref ? 'a' : 'button'}
            href={androidIntentHref || undefined}
            onClick={handleOpenApp}
            disabled={opening}
            startIcon={<OpenInNewIcon />}
            sx={{
              bgcolor: '#B8702F',
              fontFamily: 'Quicksand, sans-serif',
              fontWeight: 700,
              '&:hover': { bgcolor: '#9a5c26' },
            }}
          >
            {opening ? 'Opening…' : isIosDevice() ? 'Got it' : 'Open App'}
          </Button>
        ) : isIosMode || !deferredPrompt ? (
          <Button
            variant="contained"
            onClick={handleClose}
            startIcon={isIosMode ? <IosShareIcon /> : <GetAppIcon />}
            sx={{
              bgcolor: '#B8702F',
              fontFamily: 'Quicksand, sans-serif',
              fontWeight: 700,
              '&:hover': { bgcolor: '#9a5c26' },
            }}
          >
            Got it
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleInstall}
            disabled={installing}
            startIcon={<GetAppIcon />}
            sx={{
              bgcolor: '#B8702F',
              fontFamily: 'Quicksand, sans-serif',
              fontWeight: 700,
              '&:hover': { bgcolor: '#9a5c26' },
            }}
          >
            {installing ? 'Installing…' : 'Install App'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

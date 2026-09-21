'use client';

import { useCallback, useEffect, useState } from 'react';
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

const STORAGE_DISMISS = 'eqc-pwa-dismissed-at';
const STORAGE_INSTALLED = 'eqc-pwa-installed';
const DISMISS_DAYS = 7;

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
  const iOS = /iPad|iPhone|iPod/.test(ua);
  const iPadOs = window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1;
  return iOS || iPadOs;
}

function wasDismissedRecently() {
  try {
    const raw = localStorage.getItem(STORAGE_DISMISS);
    if (!raw) return false;
    const then = Number(raw);
    if (Number.isNaN(then)) return false;
    return Date.now() - then < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

function markDismissed() {
  try {
    localStorage.setItem(STORAGE_DISMISS, String(Date.now()));
  } catch {
    /* ignore */
  }
}

function markInstalled() {
  try {
    localStorage.setItem(STORAGE_INSTALLED, '1');
    localStorage.removeItem(STORAGE_DISMISS);
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

async function detectInstalledRelatedApp() {
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

export default function InstallAppPrompt() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('install'); // install | ios | open
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    // Already running inside the installed app
    if (isStandaloneDisplay()) {
      markInstalled();
      return undefined;
    }

    let cancelled = false;
    let deferred = null;

    const onBeforeInstall = (event) => {
      event.preventDefault();
      deferred = event;
      setDeferredPrompt(event);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstall);

    const onAppInstalled = () => {
      markInstalled();
      setDeferredPrompt(null);
      setOpen(false);
    };
    window.addEventListener('appinstalled', onAppInstalled);

    const showPrompt = async () => {
      if (cancelled) return;

      // Wait for SW so Chromium can fire beforeinstallprompt when possible
      if ('serviceWorker' in navigator) {
        try {
          await Promise.race([
            navigator.serviceWorker.ready,
            new Promise((resolve) => setTimeout(resolve, 2500)),
          ]);
        } catch {
          /* ignore */
        }
      }

      // Give beforeinstallprompt a brief moment after SW is ready
      await new Promise((resolve) => setTimeout(resolve, 400));
      if (cancelled) return;

      const relatedInstalled = await detectInstalledRelatedApp();
      const knownInstalled = relatedInstalled || isMarkedInstalled();

      if (knownInstalled) {
        if (relatedInstalled) markInstalled();
        setMode('open');
        setOpen(true);
        return;
      }

      if (wasDismissedRecently()) return;

      if (isIosDevice()) {
        setMode('ios');
      } else {
        setMode('install');
      }
      setOpen(true);
    };

    // Delay so first paint isn't blocked by the dialog
    const timer = window.setTimeout(showPrompt, 1200);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('appinstalled', onAppInstalled);
      // keep deferred for closure safety
      void deferred;
    };
  }, []);

  const handleClose = useCallback(() => {
    markDismissed();
    setOpen(false);
  }, []);

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
          markDismissed();
          setOpen(false);
        }
      } catch {
        markDismissed();
        setOpen(false);
      } finally {
        setDeferredPrompt(null);
        setInstalling(false);
      }
      return;
    }

    // Browser has no native install API (common on iOS / some Android browsers)
    if (isIosDevice()) {
      setMode('ios');
      return;
    }

    // Fallback: open browser install/help UI by focusing address bar isn't possible;
    // guide user to use the browser menu "Install app" / "Add to Home screen"
    setMode('install');
  }, [deferredPrompt]);

  const handleOpenApp = useCallback(() => {
    markDismissed();
    setOpen(false);
    // Browsers do not allow silent launch of an installed PWA from a normal tab.
    // Guide the user back to the home-screen icon (true app window).
  }, []);

  if (!open) return null;

  const isOpenMode = mode === 'open';
  const isIosMode = mode === 'ios';

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="eqc-install-title"
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
              sx={{ p: 0, fontWeight: 700, fontSize: '1.15rem', color: '#fff', fontFamily: 'Quicksand, sans-serif' }}
            >
              {isOpenMode ? `Open ${SITE_NAME}` : 'Install This As Mobile Application'}
            </DialogTitle>
            <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5, fontFamily: 'Quicksand, sans-serif' }}>
              {SITE_NAME}
            </Typography>
          </Box>
        </Box>
      </Box>

      <DialogContent sx={{ pt: 2.5, pb: 1 }}>
        {isOpenMode ? (
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Quicksand, sans-serif' }}>
            {SITE_NAME} is already installed on this device. Please open it from your home screen for the best
            mobile experience.
          </Typography>
        ) : isIosMode ? (
          <Box sx={{ fontFamily: 'Quicksand, sans-serif' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              Install {SITE_NAME} on your iPhone or iPad:
            </Typography>
            <Box component="ol" sx={{ m: 0, pl: 2.25, color: 'text.secondary', '& li': { mb: 1 } }}>
              <Typography component="li" variant="body2">
                Tap the <IosShareIcon sx={{ fontSize: 16, verticalAlign: 'text-bottom', color: '#B8702F' }} /> Share
                button in Safari
              </Typography>
              <Typography component="li" variant="body2">
                Scroll and tap <strong>Add to Home Screen</strong>
              </Typography>
              <Typography component="li" variant="body2">
                Tap <strong>Add</strong> to install the app
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
                Confirm to download it as a mobile application
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
            onClick={handleOpenApp}
            startIcon={<OpenInNewIcon />}
            sx={{
              bgcolor: '#B8702F',
              fontFamily: 'Quicksand, sans-serif',
              fontWeight: 700,
              '&:hover': { bgcolor: '#9a5c26' },
            }}
          >
            Got it
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

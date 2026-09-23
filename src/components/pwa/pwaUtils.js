'use client';

export const STORAGE_INSTALLED = 'eqc-pwa-installed';
export const OPEN_INSTALL_EVENT = 'eqc:open-install-prompt';
export const OPEN_APP_GUIDE_EVENT = 'eqc:open-app-guide';
export const INSTALLED_EVENT = 'eqc:pwa-installed';

export function isStandaloneDisplay() {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: fullscreen)').matches ||
    window.navigator.standalone === true
  );
}

export function isIosDevice() {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent || '';
  const iOS = /iPad|iPhone|iPod/.test(ua) || /CriOS|FxiOS|EdgiOS/.test(ua);
  const iPadOs = window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1;
  return iOS || iPadOs;
}

export function isMarkedInstalled() {
  try {
    return localStorage.getItem(STORAGE_INSTALLED) === '1';
  } catch {
    return false;
  }
}

export function markInstalled() {
  try {
    localStorage.setItem(STORAGE_INSTALLED, '1');
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(INSTALLED_EVENT));
    }
  } catch {
    /* ignore */
  }
}

export async function relatedAppsInstalled() {
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

/** Phones + tablets (iPad included). Desktop / large screens excluded. */
export function isMobileOrTabletViewport() {
  if (typeof window === 'undefined') return false;
  // All iPhone / iPad (including large iPad Pro that may exceed 1024px CSS width)
  if (isIosDevice()) return true;
  // Phones and most Android tablets — aligns with MUI `down('lg')`
  return window.matchMedia('(max-width: 1199px)').matches;
}

/** True when the app is already installed / running as installed PWA. */
export async function detectAppInstalled() {
  if (typeof window === 'undefined') return false;
  if (isStandaloneDisplay()) return true;
  if (isMarkedInstalled()) return true;
  if (isIosDevice()) return false;
  return relatedAppsInstalled();
}

export function openInstallPrompt() {
  if (typeof window === 'undefined') return;
  if (!isMobileOrTabletViewport()) return;
  window.dispatchEvent(new CustomEvent(OPEN_INSTALL_EVENT));
}

function isAndroidDevice() {
  if (typeof window === 'undefined') return false;
  return /Android/i.test(window.navigator.userAgent || '');
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

const PWA_PROTOCOL = 'web+eqc://open';

/** Best-effort launch of the installed PWA from a browser tab (mobile/tablet). */
export function openInstalledApp() {
  if (typeof window === 'undefined') return;
  if (!isMobileOrTabletViewport() || isStandaloneDisplay()) return;

  if (isAndroidDevice()) {
    window.location.href = buildAndroidOpenIntent();
    return;
  }

  if (isIosDevice()) {
    window.dispatchEvent(new CustomEvent(OPEN_APP_GUIDE_EVENT));
    return;
  }

  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = PWA_PROTOCOL;
  document.body.appendChild(iframe);
  window.setTimeout(() => {
    iframe.remove();
    window.location.href = PWA_PROTOCOL;
  }, 100);
}

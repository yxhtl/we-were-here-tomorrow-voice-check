'use strict';
(() => {
  const sitePath = '/we-were-here-tomorrow-voice-check/';
  if (location.hostname !== 'yxhtl.github.io' || !location.pathname.startsWith(sitePath)) return;
  const measurementId = 'G-6SLM8QB63K';
  const debugMode = new URL(location.href).searchParams.get('analytics_debug') === '1';
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    cookie_prefix: 'wwht_voice',
    cookie_path: sitePath,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: location.origin + location.pathname,
    ...(debugMode ? { debug_mode: true } : {})
  });
  let reported = false;
  window.reportRadioUse = () => {
    if (reported) return;
    reported = true;
    window.gtag('event', 'check_start', { send_to: measurementId });
    window.gtag('event', 'recommendation_view', { send_to: measurementId });
  };
  const tag = document.createElement('script');
  tag.async = true;
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(tag);
})();

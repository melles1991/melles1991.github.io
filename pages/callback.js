import { useEffect, useMemo } from 'react';

export default function CallbackPage() {
  const fallbackHref = useMemo(() => {
    if (typeof window === 'undefined') return 'lihvodruida://callback';
    const params = new URLSearchParams(window.location.search);
    const qp = new URLSearchParams();
    ['code', 'state', 'error', 'error_description'].forEach((key) => {
      const value = params.get(key);
      if (value) qp.set(key, value);
    });
    return `lihvodruida://callback?${qp.toString()}`;
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const error = params.get('error');
    const qp = new URLSearchParams();
    ['code', 'state', 'error', 'error_description'].forEach((key) => {
      const value = params.get(key);
      if (value) qp.set(key, value);
    });
    const deepLink = `lihvodruida://callback?${qp.toString()}`;

    if (code || error) {
      const timer = setTimeout(() => {
        window.location.href = deepLink;
      }, 120);
      return () => clearTimeout(timer);
    }
  }, []);

  const hasPayload = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('code') || new URLSearchParams(window.location.search).get('error')
    : true;

  if (!hasPayload) {
    return (
      <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24 }}>
        <div><h2>Error: Authorization code or error payload not found.</h2></div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24 }}>
      <div>
        <h2>Redirecting...</h2>
        <p>If the app did not open automatically, <a href={fallbackHref}>tap here</a>.</p>
      </div>
    </main>
  );
}

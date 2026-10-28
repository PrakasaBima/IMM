import { useEffect, useState } from 'react';

// Router mini berbasis History API, cukup untuk beranda + halaman detail layanan.

export function navigate(to) {
  window.history.pushState(null, '', to);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function usePath() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const update = () => setPath(window.location.pathname);
    window.addEventListener('popstate', update);
    return () => window.removeEventListener('popstate', update);
  }, []);

  return path;
}

export function Link({ to, onClick, ...props }) {
  const handleClick = (e) => {
    onClick?.(e);
    // Ctrl/cmd-klik, shift-klik, dan klik tengah tetap ditangani browser (tab/jendela baru)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };

  return <a {...props} href={to} onClick={handleClick} />;
}

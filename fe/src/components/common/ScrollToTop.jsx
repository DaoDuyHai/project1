import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export function scrollToTargetId(id) {
  const target = document.getElementById(id);
  if (!target) return false;

  const header = document.querySelector('header');
  const headerHeight = header ? header.getBoundingClientRect().height : 164;
  const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;

  window.scrollTo({
    top: Math.max(0, targetTop),
    behavior: 'smooth',
  });
  return true;
}

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const prevPathnameRef = useRef(pathname);
  const prevHashRef = useRef(hash);

  useEffect(() => {
    const pathChanged = prevPathnameRef.current !== pathname;
    const hashChanged = prevHashRef.current !== hash;

    prevPathnameRef.current = pathname;
    prevHashRef.current = hash;

    if (hash && (pathChanged || hashChanged)) {
      const id = hash.replace('#', '');
      scrollToTargetId(id);

      // Bù vị trí lần 2 sau khi các section async (nếu vừa chuyển trang) ổn định chiều cao
      const timer1 = setTimeout(() => scrollToTargetId(id), 180);
      const timer2 = setTimeout(() => scrollToTargetId(id), 450);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }

    // Chỉ cuộn lên đầu trang khi chuyển sang trang khác (pathname đổi)
    if (pathChanged && !hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [pathname, hash]);

  return null;
}

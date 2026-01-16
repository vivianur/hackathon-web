import { useEffect } from 'react';
import { useAccessibilityStore } from '../store/accessibilityStore';

export default function VLibrasWidget() {
  const vlibrasEnabled = useAccessibilityStore((state) => state.vlibrasEnabled);

  useEffect(() => {
    const vlibrasContainer = document.querySelector('[vw]') as HTMLElement;
    
    if (vlibrasContainer) {
      if (vlibrasEnabled) {
        // Mostra o VLibras
        vlibrasContainer.style.display = 'block';
        vlibrasContainer.classList.add('enabled');
      } else {
        // Esconde o VLibras
        vlibrasContainer.style.display = 'none';
        vlibrasContainer.classList.remove('enabled');
      }
    }
  }, [vlibrasEnabled]);

  return null;
}

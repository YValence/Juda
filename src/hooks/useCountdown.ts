import { useEffect, useState } from 'react';
import { timeUntilMoroccoMidnight } from '@/constants/games';

/** Compte à rebours jusqu'à minuit (heure du Maroc), mis à jour chaque seconde. */
export function useMidnightCountdown() {
  const [left, setLeft] = useState(() => timeUntilMoroccoMidnight());
  useEffect(() => {
    const id = setInterval(() => setLeft(timeUntilMoroccoMidnight()), 1000);
    return () => clearInterval(id);
  }, []);
  return left;
}

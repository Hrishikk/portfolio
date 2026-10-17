import { useEffect, useRef } from 'react';
import { TRAVEL_END, TRAVEL_PROGRESS, TRAVEL_START, type TravelProgressDetail } from '@/hooks/useAnchorTravel';
import styles from './TravelBeam.module.css';

/** Hairline aurora beam on the navbar's bottom edge that fills as an in-page trip progresses. Written to directly per frame. */
export function TravelBeam() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const beam = ref.current;
    if (!beam) return;
    const onStart = () => {
      beam.style.setProperty('--beam', '0');
      beam.dataset.state = 'travelling';
    };
    const onProgress = (e: Event) => {
      beam.style.setProperty('--beam', String((e as CustomEvent<TravelProgressDetail>).detail.progress));
    };
    const onEnd = () => {
      if (beam.dataset.state === 'travelling') beam.dataset.state = 'done';
    };
    window.addEventListener(TRAVEL_START, onStart);
    window.addEventListener(TRAVEL_PROGRESS, onProgress);
    window.addEventListener(TRAVEL_END, onEnd);
    return () => {
      window.removeEventListener(TRAVEL_START, onStart);
      window.removeEventListener(TRAVEL_PROGRESS, onProgress);
      window.removeEventListener(TRAVEL_END, onEnd);
    };
  }, []);

  return <div ref={ref} className={styles.beam} aria-hidden="true" />;
}

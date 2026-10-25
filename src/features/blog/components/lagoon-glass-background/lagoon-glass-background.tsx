import styles from '@/features/blog/components/lagoon-glass-background/lagoon-glass-background.module.scss';

export const LagoonGlassBackground = () => {
  return (
    <div className={styles.background} aria-hidden='true'>
      <div className={styles.glow}>
        <div className={styles.foundation} />
        <div className={`${styles.layer} ${styles.cornerAtmosphere}`}>
          <div className={styles.art} />
        </div>
        <div className={`${styles.layer} ${styles.cornerFlare}`}>
          <div className={styles.art} />
        </div>
        <div className={`${styles.layer} ${styles.cornerCore}`}>
          <div className={styles.art} />
        </div>
        <div className={`${styles.layer} ${styles.cornerRay}`}>
          <div className={styles.rayShape}>
            <div className={styles.art} />
          </div>
        </div>
        <div className={`${styles.layer} ${styles.farCornerShade}`}>
          <div className={styles.art} />
        </div>
        <div className={`${styles.layer} ${styles.distantReflection}`}>
          <div className={styles.art} />
        </div>
        <div className={`${styles.layer} ${styles.ambientDrift}`}>
          <div className={styles.art} />
        </div>
        <div className={styles.surfaceEdge} />
        <div className={styles.glassSurface} />
        <div className={styles.innerShadow} />
      </div>
    </div>
  );
};

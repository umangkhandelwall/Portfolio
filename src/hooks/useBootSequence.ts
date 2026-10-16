import { useState, useEffect } from 'react';

const BOOT_TIMINGS = {
  header: 0,
  name: 300,
  portrait: 720,
  meta: 950,
  cta: 1480,
  done: 2100,
};

export const useBootSequence = () => {
  const [bootStage, setBootStage] = useState<number>(1);

  useEffect(() => {
    // Initial stage
    document.documentElement.dataset.boot = '1';

    const tName = setTimeout(() => {
      setBootStage(2);
      document.documentElement.dataset.boot = '2';
    }, BOOT_TIMINGS.name);

    const tPortrait = setTimeout(() => {
      setBootStage(3);
      document.documentElement.dataset.boot = '3';
    }, BOOT_TIMINGS.portrait);

    const tMeta = setTimeout(() => {
      setBootStage(4);
      document.documentElement.dataset.boot = '4';
    }, BOOT_TIMINGS.meta);

    const tCta = setTimeout(() => {
      setBootStage(5);
      document.documentElement.dataset.boot = '5';
    }, BOOT_TIMINGS.cta);

    const tDone = setTimeout(() => {
      setBootStage(6);
      document.documentElement.dataset.boot = '6';
    }, BOOT_TIMINGS.done);

    return () => {
      clearTimeout(tName);
      clearTimeout(tPortrait);
      clearTimeout(tMeta);
      clearTimeout(tCta);
      clearTimeout(tDone);
    };
  }, []);

  return bootStage;
};

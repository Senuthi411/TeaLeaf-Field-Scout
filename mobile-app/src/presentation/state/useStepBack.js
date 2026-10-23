import { useEffect, useRef } from 'react';
import { BackHandler } from 'react-native';
import { usePathname } from 'expo-router';

/** Makes the Android hardware back button run `handler` while the screen at `path` is showing. */
export function useStepBack(path, handler) {
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  const handlerRef = useRef(handler);
  pathnameRef.current = pathname;
  handlerRef.current = handler;

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (pathnameRef.current !== path) return false;
      handlerRef.current();
      return true;
    });
    return () => subscription.remove();
  }, [path]);
}

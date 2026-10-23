/**
 * Asynchronous Third-Party Script Loader
 * Ensures external scripts (e.g., analytics, tracking pixels, calendar embeds)
 * load non-blocking and asynchronously using requestIdleCallback to protect Core Web Vitals.
 */
export function loadAsyncScript(
  src: string,
  options: {
    id?: string;
    defer?: boolean;
    async?: boolean;
    onLoad?: () => void;
    timeout?: number;
  } = {}
): void {
  if (typeof window === 'undefined') return;

  const { id, defer = true, async = true, onLoad, timeout = 2500 } = options;

  if (id && document.getElementById(id)) {
    return;
  }

  const mount = () => {
    const script = document.createElement('script');
    script.src = src;
    script.async = async;
    script.defer = defer;
    if (id) script.id = id;

    if (onLoad) {
      script.onload = () => onLoad();
    }

    document.head.appendChild(script);
  };

  if ('requestIdleCallback' in window) {
    (window as Window & { requestIdleCallback: (cb: () => void, opts: { timeout: number }) => void }).requestIdleCallback(
      mount,
      { timeout }
    );
  } else {
    setTimeout(mount, 500);
  }
}

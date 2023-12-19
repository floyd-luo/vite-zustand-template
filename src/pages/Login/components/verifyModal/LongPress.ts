import React, { useCallback, useState, useRef } from "react";
interface DefaultOptions {
  shouldPreventDefault?: boolean;
  delay?: number;
}
interface LongPress {
  onLongPress: (e: any) => void;
  onClick?: () => void;
  onLongLeave?: (e: any) => void;
  defaultOptions: DefaultOptions;
}
const useLongPress = ({
  onLongPress,
  onClick,
  onLongLeave,
  defaultOptions,
}: LongPress) => {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  let timeout: number | null = null;
  const target = useRef<any>(null);
  const { shouldPreventDefault = true, delay = 300 } = defaultOptions;
  const start = useCallback(
    (event: any) => {
      if (shouldPreventDefault && event.target) {
        event.target.addEventListener("touchend", preventDefault, {
          passive: false,
        });
        target.current = event.target;
      }
      event.persist();
      timeout = window.setTimeout(() => {
        onLongPress(event);
        setLongPressTriggered(true);
      }, delay);
    },
    [onLongPress, delay, shouldPreventDefault]
  );

  const clear = useCallback(
    (event: UIEvent, shouldTriggerClick = true) => {
      timeout && clearTimeout(timeout);
      shouldTriggerClick && !longPressTriggered && onClick?.();
      if (longPressTriggered) {
        onLongLeave?.(event);
      }
      setLongPressTriggered(false);
      if (shouldPreventDefault && target.current) {
        target.current.removeEventListener("touchend", preventDefault);
      }
    },
    [shouldPreventDefault, onClick, longPressTriggered, onLongLeave]
  );

  return {
    onMouseDown: (e: any) => start(e),
    onTouchStart: (e: any) => start(e),
    onMouseUp: (e: any) => clear(e),
    onMouseLeave: (e: any) => clear(e, false),
    onTouchEnd: (e: any) => clear(e),
  };
};

const isTouchEvent = (event: React.TouchEvent) => {
  return "touches" in event;
};

const preventDefault = (event: React.TouchEvent) => {
  if (!isTouchEvent(event)) return;

  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};

export default useLongPress;

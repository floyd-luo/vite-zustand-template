import { useCallback, useState, useRef } from "react";

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
  let timeout = null;
  const target = useRef(null);
  const { shouldPreventDefault = true, delay = 300 } = defaultOptions;
  const start = useCallback(
    (event) => {
      if (shouldPreventDefault && event.target) {
        event.target.addEventListener("touchend", preventDefault, {
          passive: false,
        });
        target.current = event.target;
      }
      event.persist();
      timeout = setTimeout(() => {
        onLongPress(event);
        setLongPressTriggered(true);
      }, delay);
    },
    [onLongPress, delay, shouldPreventDefault]
  );

  const clear = useCallback(
    (event, shouldTriggerClick = true) => {
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
    onMouseDown: (e) => start(e),
    onTouchStart: (e) => start(e),
    onMouseUp: (e) => clear(e),
    onMouseLeave: (e) => clear(e, false),
    onTouchEnd: (e) => clear(e),
  };
};

const isTouchEvent = (event) => {
  return "touches" in event;
};

const preventDefault = (event) => {
  if (!isTouchEvent(event)) return;

  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};

export default useLongPress;

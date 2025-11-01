"use client";
import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import gsap from 'gsap';

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`absolute top-1/2 left-1/2 rounded-xl border border-white bg-black [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap = forwardRef(({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  onActiveChange,
  autoplay = true,
  initialIndex = 0,
  respectReduceMotion = true,
  skewAmount = 6,
  easing = 'elastic',
  children
}, apiRef) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef(null);
  const intervalRef = useRef();
  const container = useRef(null);
  const playState = useRef({ autoplay });
  const startXRef = useRef(null);

  // Swap the front card to the back
  const nextSwap = () => {
    if (order.current.length < 2) return;

    const [front, ...rest] = order.current;
    const elFront = refs[front].current;
    const tl = gsap.timeline();
    tlRef.current = tl;

    tl.to(elFront, {
      y: '+=500',
      duration: config.durDrop,
      ease: config.ease
    });

    tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
    rest.forEach((idx, i) => {
      const el = refs[idx].current;
      const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
      tl.set(el, { zIndex: slot.zIndex }, 'promote');
      tl.to(el, {
        x: slot.x,
        y: slot.y,
        z: slot.z,
        duration: config.durMove,
        ease: config.ease
      }, `promote+=${i * 0.15}`);
    });

    const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
    tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
    tl.call(() => {
      gsap.set(elFront, { zIndex: backSlot.zIndex });
    }, undefined, 'return');
    tl.to(elFront, {
      x: backSlot.x,
      y: backSlot.y,
      z: backSlot.z,
      duration: config.durReturn,
      ease: config.ease
    }, 'return');

    tl.call(() => {
      order.current = [...rest, front];
      onActiveChange?.(order.current[0]);
    });
  };

  // Bring the back card to the front
  const prevSwap = () => {
    if (order.current.length < 2) return;

    const rest = order.current.slice(0, -1);
    const back = order.current[order.current.length - 1];
    const elBack = refs[back].current;
    const tl = gsap.timeline();
    tlRef.current = tl;

    tl.to(elBack, {
      y: '-=500',
      duration: config.durDrop,
      ease: config.ease
    });

    tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
    rest.forEach((idx, i) => {
      const el = refs[idx].current;
      const slot = makeSlot(i + 1, cardDistance, verticalDistance, refs.length);
      tl.set(el, { zIndex: slot.zIndex }, 'promote');
      tl.to(el, {
        x: slot.x,
        y: slot.y,
        z: slot.z,
        duration: config.durMove,
        ease: config.ease
      }, `promote+=${i * 0.15}`);
    });

    const frontSlot = makeSlot(0, cardDistance, verticalDistance, refs.length);
    tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
    tl.call(() => {
      gsap.set(elBack, { zIndex: frontSlot.zIndex });
    }, undefined, 'return');
    tl.to(elBack, {
      x: frontSlot.x,
      y: frontSlot.y,
      z: frontSlot.z,
      duration: config.durReturn,
      ease: config.ease
    }, 'return');

    tl.call(() => {
      order.current = [back, ...rest];
      onActiveChange?.(order.current[0]);
    });
  };

  // expose controls at top-level
  useImperativeHandle(apiRef, () => ({
    next: () => {
      clearInterval(intervalRef.current);
      nextSwap();
      if (playState.current.autoplay) {
        intervalRef.current = window.setInterval(nextSwap, delay);
      }
    },
    prev: () => {
      clearInterval(intervalRef.current);
      prevSwap();
      if (playState.current.autoplay) {
        intervalRef.current = window.setInterval(nextSwap, delay);
      }
    },
    pause: () => {
      playState.current.autoplay = false;
      tlRef.current?.pause();
      clearInterval(intervalRef.current);
    },
    resume: () => {
      playState.current.autoplay = true;
      tlRef.current?.play();
      clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(nextSwap, delay);
    }
  }));

  useEffect(() => {
    const total = refs.length;
    // initialize order with initialIndex
    if (initialIndex > 0 && initialIndex < total) {
      const before = Array.from({ length: total }, (_, i) => i);
      const rotated = [initialIndex, ...before.filter((i) => i !== initialIndex)];
      order.current = rotated;
    }

    refs.forEach(
      (r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount)
    );

    // kick off with one swap so motion starts
    nextSwap();

    // reduced motion support
    let reduceMotion = false;
    if (respectReduceMotion && typeof window !== 'undefined' && 'matchMedia' in window) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      reduceMotion = mq.matches;
    }

    if (autoplay && !reduceMotion) {
      intervalRef.current = window.setInterval(nextSwap, delay);
      playState.current.autoplay = true;
    } else {
      playState.current.autoplay = false;
    }

    if (pauseOnHover) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        if (playState.current.autoplay) {
          intervalRef.current = window.setInterval(nextSwap, delay);
        }
      };
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      // keyboard navigation
      const onKey = (e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          clearInterval(intervalRef.current);
          nextSwap();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          clearInterval(intervalRef.current);
          prevSwap();
        }
      };
      // swipe navigation
      const onPointerDown = (e) => {
        startXRef.current = e.clientX ?? (e.touches ? e.touches[0]?.clientX : null);
      };
      const onPointerUp = (e) => {
        const endX = e.clientX ?? (e.changedTouches ? e.changedTouches[0]?.clientX : null);
        if (startXRef.current == null || endX == null) return;
        const delta = endX - startXRef.current;
        const threshold = 40;
        if (Math.abs(delta) > threshold) {
          clearInterval(intervalRef.current);
          if (delta < 0) nextSwap(); else prevSwap();
        }
        startXRef.current = null;
      };
      node.addEventListener('keydown', onKey);
      node.addEventListener('pointerdown', onPointerDown);
      node.addEventListener('pointerup', onPointerUp);
      node.addEventListener('touchstart', onPointerDown, { passive: true });
      node.addEventListener('touchend', onPointerUp);

      return () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        node.removeEventListener('keydown', onKey);
        node.removeEventListener('pointerdown', onPointerDown);
        node.removeEventListener('pointerup', onPointerUp);
        node.removeEventListener('touchstart', onPointerDown);
        node.removeEventListener('touchend', onPointerUp);
        clearInterval(intervalRef.current);
      };
    }
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, autoplay, initialIndex, respectReduceMotion]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: e => {
            child.props.onClick?.(e);
            onCardClick?.(i);
          }
        })
      : child);

  return (
    <div
      ref={container}
      className="absolute bottom-0 right-0 transform translate-x-[5%] translate-y-[20%] origin-bottom-right perspective-[900px] overflow-visible
      max-[1024px]:translate-x-[15%] max-[1024px]:translate-y-[22%]
      max-[768px]:translate-x-[20%] max-[768px]:translate-y-[24%] max-[768px]:scale-[0.8]
      max-[640px]:right-1/2 max-[640px]:translate-x-1/2 max-[640px]:origin-bottom-center max-[640px]:scale-[0.75] max-[640px]:translate-y-[10%]
      max-[420px]:scale-[0.65] max-[360px]:scale-[0.58]"
      tabIndex={0}
      role="region"
      aria-label="Project cards carousel"
      style={{ width, height }}>
      {rendered}
    </div>
  );
});

export default CardSwap;

"use client";

import { useState } from "react";

/**
 * Functions to call on opacity thresholds
 */
type OpacityThreshold = {
    threshold: number;
    onReached: () => void;
};

type FadingImageButtonProps = {
    /** Image link */
    src: string;
    alt?: string;
    /** Opacity increments */
    step?: number;
    /** Thresholds and callbacks */
    thresholds?: OpacityThreshold[];
    initialOpacity?: number;
    className?: string;
};

export function FadingImageButton({
                                      src,
                                      alt = "",
                                      step = 3,
                                      thresholds = [],
                                      initialOpacity = 10,
                                      className,
                                  }: FadingImageButtonProps) {
    const [opacity, opacitySet] = useState(initialOpacity);
    const [fired, firedSet] = useState<Set<number>>(new Set());

    const handleClick = () => {
        const next = Math.min(opacity + step, 100);
        opacitySet(next);

        // Callback used only once
        const newlyFired = thresholds
            .filter(({ threshold }) => next >= threshold && !fired.has(threshold))
            .map(({ threshold }) => threshold);

        if (newlyFired.length > 0) {
            const merged = new Set(fired);
            newlyFired.forEach(t => merged.add(t));
            firedSet(merged);

            thresholds
                .filter(({ threshold }) => merged.has(threshold))
                .forEach(({ onReached }) => onReached());
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className={className}
            aria-label={alt}
        >
            <img
                src={src}
                alt=""
                draggable={false}
                style={{ opacity: opacity / 100, transition: "opacity 120ms ease" }}
            />
        </button>
    );
}
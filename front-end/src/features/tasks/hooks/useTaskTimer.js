import { useEffect, useMemo, useRef, useState } from "react";

const parseMMSS = (v) => {
    if (!v) return 0;
    const [mm, ss] = String(v).split(":").map((x) => parseInt(x, 10));
    return (Number.isFinite(mm) ? mm : 0) * 60 + (Number.isFinite(ss) ? ss : 0);
};

const formatMMSS = (sec) => {
    const s = Math.max(0, sec | 0);
    const mm = Math.floor(s / 60);
    const ss = s % 60;
    return `${mm}:${String(ss).padStart(2, "0")}`;
};

export function useTaskTimer(initialTimeStr) {
    const initialSeconds = useMemo(() => parseMMSS(initialTimeStr), [initialTimeStr]);
    const [remaining, setRemaining] = useState(initialSeconds);
    const [running, setRunning] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        setRemaining(initialSeconds);
        setRunning(false);
    }, [initialSeconds]);

    useEffect(() => {
        if (!running) return;

        intervalRef.current = setInterval(() => {
            setRemaining((prev) => {
                if (prev <= 1) {
                    setRunning(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, [running]);

    const start = () => remaining > 0 && setRunning(true);
    const pause = () => setRunning(false);
    const restart = () => {
        setRemaining(initialSeconds);
        setRunning(true);
    };
    const stop = () => {
        setRemaining(initialSeconds);
        setRunning(false);
    };

    return {
        timeText: formatMMSS(remaining),
        remainingSeconds: remaining,
        isRunning: running,
        isFinished: remaining === 0,
        start,
        pause,
        restart,
        stop,
    };
}

/**
 * Mock upload simulator that mimics realistic file upload progress.
 * Each file progresses independently with random timing and optional failure.
 */

export interface UploadCallbacks {
  onProgress: (progress: number) => void;
  onComplete: () => void;
  onError: () => void;
}

export function startUploadSimulation(
  itemId: string,
  callbacks: UploadCallbacks
): () => void {
  let progress = 0;
  let animationFrameId: number | null = null;
  let lastTimestamp = performance.now();

  // Random total duration between 2s and 5s for realism
  const totalDuration = 2000 + Math.random() * 3000;
  // Random failure chance: 10%
  const shouldFail = Math.random() < 0.1;
  // Random failure point between 30% and 80%
  const failurePoint = shouldFail ? 0.3 + Math.random() * 0.5 : 1;

  const step = (timestamp: number) => {
    const delta = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    // Variable speed: faster at start, slower near end
    const normalizedProgress = progress / 100;
    const speedFactor = 1 - normalizedProgress * 0.6;
    const increment = (delta / totalDuration) * 100 * speedFactor;

    progress = Math.min(progress + increment, 100);

    if (progress / 100 >= failurePoint && shouldFail) {
      callbacks.onProgress(Math.round(failurePoint * 100));
      callbacks.onError();
      return;
    }

    callbacks.onProgress(Math.round(progress));

    if (progress < 100) {
      animationFrameId = requestAnimationFrame(step);
    } else {
      callbacks.onComplete();
    }
  };

  animationFrameId = requestAnimationFrame(step);

  return () => {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
    }
  };
}

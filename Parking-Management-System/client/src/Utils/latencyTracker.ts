let currentLatency = 0;

export const recordLatency = (latencyMs: number) => {
  currentLatency = latencyMs;
};

export const getLatency = (): number => {
  return currentLatency;
};

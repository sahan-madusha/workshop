import React, { useState, useEffect } from "react";
import { Wifi, WifiOff } from "lucide-react";
import { getLatency } from "../../Utils";

export function NetworkStats() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [ping, setPing] = useState<number>(getLatency());

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    const interval = setInterval(() => {
      setPing(getLatency());
    }, 3000);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
      clearInterval(interval);
    };
  }, []);

  if (!isOnline) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-semibold animate-pulse">
        <WifiOff className="w-3.5 h-3.5" />
        <span>Offline</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-100 text-xs">
      <span className="flex items-center gap-1.5 font-medium text-slate-600">
        <Wifi className="w-3.5 h-3.5 text-emerald-600" />
        Network Online
      </span>
      <span className="text-[10px] text-slate-400 font-mono">
        {ping > 0 ? `${ping}ms` : "Live"}
      </span>
    </div>
  );
}

import { Server } from "socket.io";

export interface TimelineEvent {
  id: string;
  timestamp: string;
  type: "upload" | "detection" | "spread" | "action" | "alert";
  title: string;
  description: string;
  riskScore?: number;
  platform?: string;
  url?: string;
}

let timeline: TimelineEvent[] = [];
let io: Server | null = null;

export const setIo = (serverIo: Server) => {
  io = serverIo;
};

export const logEvent = (event: Omit<TimelineEvent, "id" | "timestamp">) => {
  const newEvent: TimelineEvent = {
    ...event,
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date().toISOString(),
  };
  
  timeline.unshift(newEvent);
  if (timeline.length > 100) timeline.pop(); // Keep last 100 events

  if (io) {
    io.emit("timeline-event", newEvent);
    io.emit("war-room-update", {
      threats_detected: timeline.filter(e => e.type === 'detection').length,
      platforms_affected: new Set(timeline.filter(e => e.platform).map(e => e.platform)).size,
      active_alerts: timeline.filter(e => e.type === 'alert').length,
    });
  }
  
  return newEvent;
};

export const getTimeline = () => timeline;

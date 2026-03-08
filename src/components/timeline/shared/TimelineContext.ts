import { createContext, useContext } from 'react';

export type TimelineItemSpacing = 'normal' | 'loose';

interface TimelineContextValue {
  itemSpacing: TimelineItemSpacing;
}

const TimelineContext = createContext<TimelineContextValue | null>(null);

export const TimelineProvider = TimelineContext.Provider;

export function useTimelineContext(): TimelineContextValue {
  const ctx = useContext(TimelineContext);
  if (!ctx) {
    throw new Error('TimelineItem must be used within Timeline.');
  }
  return ctx;
}

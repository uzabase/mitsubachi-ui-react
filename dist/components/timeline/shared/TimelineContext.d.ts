export type TimelineItemSpacing = 'normal' | 'loose';
interface TimelineContextValue {
    itemSpacing: TimelineItemSpacing;
}
export declare const TimelineProvider: import('react').Provider<TimelineContextValue | null>;
export declare function useTimelineContext(): TimelineContextValue;
export {};
//# sourceMappingURL=TimelineContext.d.ts.map
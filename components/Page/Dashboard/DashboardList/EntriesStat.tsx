import React, { useMemo } from "react";
import { CheckinState } from "cscheckin-js-sdk/dist/types";
import DivItemsCenter from "../../../Layout/DivItemsCenter";
import BaseBadge from "../../../Elements/Badge/BaseBadge";

export interface StudentEntry {
  state: CheckinState;
}

export interface EntriesStatProps {
  entries: StudentEntry[];
}

interface EntriesBadgeProps {
  state: CheckinState;
}

type EntriesLegendProps = EntriesBadgeProps & {
  count: number;
};

const entriesBadgeBackgroundColor: Record<CheckinState, string> = {
  ON_TIME: "bg-accent",
  LATE: "bg-neutral",
  NOT_CHECKED_IN: "bg-negative",
};

const entriesBadgeText: Record<CheckinState, JSX.Element> = {
  ON_TIME: <>已簽到</>,
  LATE: <>遲到</>,
  NOT_CHECKED_IN: <>未簽到</>,
};

function EntriesBadge({ state }: EntriesBadgeProps) {
  const backgroundClass = entriesBadgeBackgroundColor[state];
  const badgeText = entriesBadgeText[state];

  return (
    // https://stackoverflow.com/a/48691819
    // According to the documentation linked to above,
    // max-content does not recognize flex-basis in Chrome.
    // Therefore, we use width instead.
    <BaseBadge backgroundClass={backgroundClass} widthClass="w-max">
      {badgeText}
    </BaseBadge>
  );
}

function EntriesLegend({ state, count }: EntriesLegendProps) {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex-grow">
        <EntriesBadge state={state} />
      </div>
      <div className="text-auxiliary">{count}</div>
    </div>
  );
}

export default function EntriesStat({ entries }: EntriesStatProps) {
  const getLength = (state: CheckinState) =>
    entries.filter((entry) => entry.state === state).length;
  const onTimeEntries = useMemo(
    () => getLength(CheckinState.ON_TIME),
    [entries, getLength]
  );
  const lateEntries = useMemo(
    () => getLength(CheckinState.LATE),
    [entries, getLength]
  );
  const notCheckedInEntries = useMemo(
    () => getLength(CheckinState.NOT_CHECKED_IN),
    [entries, getLength]
  );

  return (
    <div>
      <p className="text-h1 font-header mb-2">共 {entries.length} 位學生</p>
      <DivItemsCenter>
        <EntriesLegend state={CheckinState.ON_TIME} count={onTimeEntries} />
        <EntriesLegend state={CheckinState.LATE} count={lateEntries} />
        <EntriesLegend
          state={CheckinState.NOT_CHECKED_IN}
          count={notCheckedInEntries}
        />
      </DivItemsCenter>
    </div>
  );
}

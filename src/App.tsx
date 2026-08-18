// FIX: file was crashing before data loaded (useState() -> useState([]))
// FIX: signup count was using month-match instead of a real 7-day window

import React, { useEffect, useState } from "react";

export default function SignupsThisWeek() {
  const [signups, setSignups] = useState([]);
  const now = new Date();

  useEffect(() => {
    fetch("/api/events?event=signup")
      .then((r) => r.json())
      .then((data) => setSignups(data));
  }, []);

  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);

  const lastWeekCount = signups.filter((s) => {
    const d = new Date(s.event_ts);
    return d >= sevenDaysAgo && d <= now;
  }).length;

  return (
    <div className="card">
      <h3>Signups this week</h3>
      <p className="big-number">{lastWeekCount}</p>
    </div>
  );
}

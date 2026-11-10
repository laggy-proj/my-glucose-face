// WatchDrip+ data adapter. This file is NOT overwritten when you run the setup command again.
//
// The watchface asks this file for glucose data and nothing else. Return this shape:
//   {
//     bg: 112,                 // glucose in mg/dL, or null when there is no reading
//     trend: 'flat',           // doubleUp | up | fortyFiveUp | flat | fortyFiveDown | down | doubleDown
//     ts: 1731200000000,       // time of the reading, ms since epoch
//     graph: [{ ts, bg }],     // recent readings, oldest first, bg in mg/dL
//     phoneBattery: 61         // percent, or null if the phone does not send it
//   }
//
// WatchDrip+ delivers data through the companion Zepp OS app and its fetch API.
// To fill this in, port the data-fetching code from the open-source watchface:
//   https://github.com/bigdigital/zeppos_watchdrip_timer_wf  (see the utils/ and app-side/ folders)
//   https://github.com/bigdigital/zeppos_watchdrip_app       (the companion app on the watch)
// and map its fields to the shape above.
//
// Until then the adapter returns "no data", so the watch shows "--" instead of a made-up value.

// DEMO shows invented values so you can check the layout on the watch.
// NEVER rely on them for glucose decisions. Keep this false when you wear the watchface.
const DEMO = false

export function getData() {
  if (DEMO) {
    var now = Date.now()
    var graph = []
    for (var i = 0; i < 36; i++) {
      graph.push({ ts: now - (35 - i) * 300000, bg: Math.round(120 + 40 * Math.sin(i / 5)) })
    }
    return { demo: true, bg: graph[35].bg, trend: 'flat', ts: now - 120000, graph: graph, phoneBattery: 61 }
  }
  return {
    bg: null,
    trend: 'flat',
    ts: 0,
    graph: [],
    phoneBattery: null
  }
}

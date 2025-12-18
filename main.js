import { Timeline } from "vis-timeline/standalone";
import { DataSet } from "vis-data";

import "vis-timeline/styles/vis-timeline-graph2d.min.css";

const container = document.getElementById("timeline");

async function loadTimeline() {
  const response = await fetch("/data/timeline.json");
  const data = await response.json();

  const items = new DataSet(data);

  const timeline = new Timeline(container, items, {
    stack: true,
    selectable: true
  });

  timeline.on("select", (props) => {
    if (!props.items.length) return;

    const item = items.get(props.items[0]);

    if (item.url) {
      window.open(item.url, "_blank");
    }
  });
}

loadTimeline();


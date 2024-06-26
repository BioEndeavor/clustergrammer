import { cloneDeep } from "lodash";
import * as _ from "underscore";
import { NamespacedStore } from "../state/store/store";

export default (function make_label_queue(store: NamespacedStore) {
  const labels = store.select("labels");

  const labelsQueue = cloneDeep(labels.labels_queue) || {};
  if (!("high" in labelsQueue)) {
    labelsQueue.high = { row: [], col: [] };
  }
  if (!("low" in labelsQueue)) {
    labelsQueue.low = { row: [], col: [] };
  }
  _.each(["row", "col"], function (inst_axis) {
    // the high priority queue is empty initially
    if (labelsQueue.high) {
      labelsQueue.high[inst_axis] = [];
    }
    // the low priority queue
    const inst_queue: string[] = [];
    const inst_labels: string[] = labels.ordered_labels[inst_axis + "s"];
    _.each(inst_labels, function (inst_label) {
      if (inst_label.indexOf(": ") >= 0) {
        inst_label = inst_label.split(": ")[1];
      }
      inst_queue.push(inst_label);
    });
    if (labelsQueue.low) {
      labelsQueue.low[inst_axis] = inst_queue;
    }
  });

  store.dispatch(
    store.actions.mutateLabelsState({
      labels_queue: labelsQueue,
    })
  );
});

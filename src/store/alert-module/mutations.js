import { Notify } from "quasar";

export function ERROR(state, message) {
  if (message && message.includes("network-request-failed")) {
    message =
      "Network error. please connect with a VPN service or check your VPN connection.";
  }
  Notify.create({
    progress: true,
    color: "system-negative",
    icon: "report_problem",
    message: message || "Action was successful.",
    position: "top",
    timeout: 10000,
    actions: [{ label: "close", color: "yellow-12" }],
  });
}

export function WARNING(state, message) {
  Notify.create({
    progress: true,
    icon: "done",
    color: "system-warning",
    classes: "text-system-semi-dark",
    message: message || "No info provided.",
    position: "top",
    timeout: 10000,
    actions: [{ label: "close", color: "system-grey" }],
  });
}

export function SUCCESS(state, message) {
  Notify.create({
    progress: true,
    icon: "done",
    color: "system-success",
    classes: "text-system-semi-dark",
    message: message || "Something went wrong, please try again later.",
    position: "top",
    timeout: 10000,
    actions: [{ label: "close", color: "amber-9" }],
  });
}

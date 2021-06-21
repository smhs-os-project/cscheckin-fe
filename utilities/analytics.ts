import ReactGA from "react-ga";

export function initGA(): void {
  ReactGA.initialize("G-NM8XG9Q8ST");
}

export function logPageView(): void {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

export function logEvent(category = "", action = ""): void {
  if (category && action) {
    ReactGA.event({ category, action });
  }
}

export function logException(description = "", fatal = false): void {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
}

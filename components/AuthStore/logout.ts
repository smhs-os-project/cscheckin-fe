import AuthStore from "./index";

export default function Logout() {
  AuthStore.remove();
  window.location.href = "/";
}

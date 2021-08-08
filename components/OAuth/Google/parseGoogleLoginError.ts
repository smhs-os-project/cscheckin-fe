export interface GoogleLoginError {
  error: unknown;
  details?: unknown;
}

export const isGoogleLoginError = (obj: unknown): obj is GoogleLoginError =>
  (typeof obj === "object" && obj && "error" in obj) ?? false;

export default function parseGoogleLoginError(
  e: GoogleLoginError
): string | null {
  if (typeof e.error === "string") {
    switch (e.error) {
      case "popup_blocked_by_browser":
        return "您使用的瀏覽器不能正常開啟 Google 登入畫面，請檢查是否有阻擋「彈出視窗」。";
      case "popup_closed_by_user": {
        return "請不要關閉 Google 登入彈出視窗！";
      }
      case "idpiframe_initialization_failed":
        switch (e.details) {
          case "Cookies are not enabled in current environment.":
            return "請在您的瀏覽器啟用 Cookie。";
          default:
            break;
        }
        break;
      default:
        break;
    }
  }

  return null;
}

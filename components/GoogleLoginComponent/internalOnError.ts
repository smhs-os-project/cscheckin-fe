import type { ErrorData } from "../../utilities/useError";

export default function internalOnErrorWrapper(
  setError: (value: ErrorData) => void
) {
  return async (e: unknown) => {
    if (e && typeof e === "object") {
      const castedE = e as { error: unknown; details?: unknown };
      const serialized = JSON.stringify(castedE);
      if (typeof castedE.error === "string") {
        switch (castedE.error) {
          case "popup_blocked_by_browser": {
            setError({
              message:
                "您使用的瀏覽器不能正常開啟 Google 登入畫面，請檢查是否有阻擋「彈出視窗」。",
              details: serialized,
            });
            break;
          }
          case "popup_closed_by_user": {
            setError({
              message: "請不要關閉 Google 登入彈出視窗！",
              details: serialized,
            });
            break;
          }
          case "idpiframe_initialization_failed":
            switch (castedE.details) {
              case "Cookies are not enabled in current environment.":
                setError({
                  message: "請在您的瀏覽器啟用 Cookie。",
                  details: serialized,
                });
                break;
              default:
                setError({
                  message: "系統異常。",
                  details: serialized,
                });
                break;
            }
            break;
          default:
            setError({
              message: "系統異常。",
              details: serialized,
            });
        }
      }
    } else if (e && typeof e === "string") {
      setError({ message: "系統異常。", details: e });
    } else {
      setError({ message: "系統異常。" });
    }

    return undefined;
  };
}

export default function catcherBuilder(
  setMessage: (val: string) => void,
  setFailedStage: () => void
): (error?: Error | string) => void {
  return (error?: Error | string) => {
    if (error) {
      if (typeof error === "string") {
        setMessage(error);
      } else {
        setMessage(error.message);
      }
    } else {
      setMessage("發生未知錯誤。");
    }
    setFailedStage();
  };
}

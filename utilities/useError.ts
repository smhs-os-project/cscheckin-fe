import { useState } from "react";

export interface ErrorData {
  message: string;
  details?: string;
}

export default function useError() {
  return useState<ErrorData | undefined>();
}

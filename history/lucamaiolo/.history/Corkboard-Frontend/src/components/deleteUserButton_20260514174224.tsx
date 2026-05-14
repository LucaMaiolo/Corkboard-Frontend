import { type JSX } from "react";

interface Props {
  username: string;
  onSuccess: () => void;
  onError: (msg: string) => void;
}

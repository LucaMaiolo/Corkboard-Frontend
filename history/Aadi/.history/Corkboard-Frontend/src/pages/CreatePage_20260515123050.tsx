import type { JSX } from "react";
import { AddTask } from "../components/addTask.tsx";

export function CreatePage(): JSX.Element {
  return (
    <>
      <AddTask />
    </>
  );
}

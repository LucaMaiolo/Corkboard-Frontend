import { AllTasks } from "../components/AllTasks";
import type { JSX } from "react";

export function AllTasksPage(): JSX.Element {
  return (
    <>
      <h1> All Tasks </h1>
      <AllTasks />
    </>
  );
}

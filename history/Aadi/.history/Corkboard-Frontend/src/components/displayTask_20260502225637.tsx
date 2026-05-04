import type { JSX } from "react";
import type { Task } from "./task";
import { Card } from "./card";

export function DisplayTask(props: {
  task: Task | undefined;
  heading: string;
}): JSX.Element {
  return (
    <>
      {props.task ? (
        <Card>
          <h1>{props.heading}</h1>
          <h1>Name: {props.task?.name}</h1>
          <h1>Description: {props.task?.description}</h1>
          <h1>Locaation: {props.task?.location}</h1>
          <h1>Pay: {props.task?.pay}</h1>
          <h1>Time in mins: {props.task?.timeInMins}</h1>
          <h1>Status: {props.task?.status}</h1>
        </Card>
      ) : (
        <Card>
          <h1>No Task</h1>
        </Card>
      )}
    </>
  );
}

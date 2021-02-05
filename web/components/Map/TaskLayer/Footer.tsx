import React, { Dispatch, memo, SetStateAction } from "react";
import { Task } from "../../../utils/config";
import DeleteButton from "./DeleteButton";
import DoneButton from "./DoneButton";
import { Spacer } from "@chakra-ui/react";

const Footer = ({ task, setTask }: { task: Task; setTask: Dispatch<SetStateAction<Task>> }) => {
  return (
    <>
      <DeleteButton task={task} />
      <Spacer />
      <DoneButton task={task} setTask={setTask} />
    </>
  );
};

export default memo(Footer);

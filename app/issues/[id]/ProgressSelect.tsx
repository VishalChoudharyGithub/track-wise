"use client";
import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ProgressSelect = ({ issue }: { issue: Issue }) => {
  const statuses: { label: string; value: Status }[] = [
    {
      label: "Open",
      value: "OPEN",
    },
    {
      label: "In Progress",
      value: "IN_PROGRESS",
    },
    {
      label: "Closed",
      value: "CLOSED",
    },
  ];

  const assignProgress = (status: Status) => {
    axios
      .patch("/api/issues/" + issue.id, {
        status: status || "OPEN",
      })
      .catch(() => {
        toast.error("Changes could not be saved.");
      });
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.status || "OPEN"}
        onValueChange={assignProgress}
      >
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            {statuses?.map((status) => (
              <Select.Item key={status.label} value={status.value}>
                {status.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>

      <Toaster />
    </>
  );
};

export default ProgressSelect;

import React from "react";
import { Meter, Separator } from "@heroui/react";

const ApplicationStatus = ({ applications }) => {
  const applied = applications.length;
  const statusCount = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});
  return (
    <div className="bg-white dark:bg-foreground/5 p-6 rounded-lg w-full md:w-fit lg:flex-1 min-w-56 lg:max-w-min xl:max-w-80 border">
      <p className="text-xl font-medium mb-8">Application Status</p>
      <div className="space-y-2">
        <Meter
          aria-label="Storage"
          className="gap-0 mb-3"
          formatOptions={""}
          maxValue={applied}
          minValue={0}
          value={applied}
          size="lg"
          color="default"
        >
          <p className="text-sm pb-2">Applied</p> <Meter.Output />
          <Separator className="dark:bg-white/10" />
        </Meter>
        <Meter
          aria-label="Storage"
          className="gap-0"
          formatOptions={""}
          maxValue={applied}
          minValue={0}
          value={statusCount.applied}
          size="lg"
        >
          <p className="text-xs text-muted">Under Review</p> <Meter.Output />
          <Meter.Output />
          <Meter.Track>
            <Meter.Fill className="bg-[#ffb45d] dark:bg-[#ff9f32]" />
          </Meter.Track>
        </Meter>
        <Meter
          aria-label="Storage"
          className="gap-0"
          formatOptions={""}
          maxValue={applied}
          minValue={0}
          value={statusCount.shortlisted}
          size="lg"
        >
          <p className="text-xs text-muted">Shortlisted</p> <Meter.Output />
          <Meter.Output />
          <Meter.Track>
            <Meter.Fill className=" bg-[#4b4b61] dark:bg-[#ffffff]" />
          </Meter.Track>
        </Meter>
        <Meter
          aria-label="Storage"
          className="gap-0"
          formatOptions={""}
          maxValue={applied}
          minValue={0}
          value={statusCount.interviewing}
          size="lg"
        >
          <p className="text-xs text-muted">Interviewing</p> <Meter.Output />
          <Meter.Output />
          <Meter.Track>
            <Meter.Fill className="bg-blue-400" />
          </Meter.Track>
        </Meter>
        <Meter
          aria-label="Storage"
          className="gap-0"
          formatOptions={""}
          maxValue={applied}
          minValue={0}
          value={statusCount.rejected}
          size="lg"
        >
          <p className="text-xs text-muted">Rejected</p> <Meter.Output />
          <Meter.Output />
          <Meter.Track>
            <Meter.Fill className="bg-red-400 dark:bg-red-500" />
          </Meter.Track>
        </Meter>
        <Meter
          aria-label="Storage"
          className="gap-0"
          formatOptions={""}
          maxValue={applied}
          minValue={0}
          value={statusCount.offered}
          size="lg"
        >
          <p className="text-xs text-muted">Offered</p> <Meter.Output />
          <Meter.Output />
          <Meter.Track>
            <Meter.Fill className="bg-green-300 dark:bg-green-400" />
          </Meter.Track>
        </Meter>
      </div>
    </div>
  );
};

export default ApplicationStatus;

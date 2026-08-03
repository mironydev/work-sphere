import { FileText, Wrench } from "@gravity-ui/icons";
import React from "react";
import { CheckCircle, Upload, X } from "lucide-react";
import { Tooltip } from "@heroui/react";

const Resume = () => {
  return (
    <div className="h-fit rounded-lg border-t-2 dark:border-t border-white dark:border-foreground/10 bg-white/80 dark:bg-foreground/5">
      {/* <div className="p-6">
        <h2 className="text-xl font-semibold">Resume</h2>
        <p className="text-muted">
          Upload your most recent resume to enable one click applications.
        </p>
        <div className="w-full mt-5"> 
       Empty State 
       <div className="border-2 border-dashed border-foreground/20 rounded-lg p-8 text-center hover:border-indigo-600/50 hover:bg-indigo-600/3 cursor-pointer transition-all">
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-indigo-600/10 rounded-lg">
                <Upload className="w-6 h-6 text-indigo-600" />
              </div>

              <div>
                <p className="font-semibold text-sm">
                  Drag and drop your resume
                </p>
                <p className="text-xs text-muted">or click to select</p>
              </div>

              <button className="mt-2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded font-medium cursor-pointer transition-colors">
                Browse Files
              </button>

              <p className="text-xs text-muted mt-2">PDF only • Max 10MB</p>
            </div>
          </div> 

       Uploaded State 
       <div className="border border-green-600/30 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-600/10 rounded-lg">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-sm flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    resume.pdf
                  </p>
                  <p className="text-xs text-muted">2.5 MB</p>
                </div>
              </div>
              <button className="p-2 hover:bg-red-600/10 text-red-500 rounded transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div> 
       </div>
      </div> */}

      <Tooltip delay={0} closeDelay={0}>
        <Tooltip.Trigger aria-label="Export button">
          <div className="p-6 cursor-not-allowed select-none opacity-50">
            <h2 className="text-xl font-semibold">Resume</h2>
            <p className="text-muted">
              Upload your most recent resume to enable one click applications.
            </p>
            <div className="w-full mt-5">
              <div className="border-2 border-dashed border-foreground/20 rounded-lg p-8 text-center cursor-not-allowed transition-all">
                <div className="flex flex-col items-center gap-3">
                  <div className="p-3 bg-indigo-600/10 rounded-lg">
                    <Upload className="w-6 h-6 text-indigo-600" />
                  </div>

                  <div>
                    <p className="font-semibold text-sm">
                      Drag and drop your resume
                    </p>
                    <p className="text-xs text-muted">or click to select</p>
                  </div>

                  <button className="mt-2 px-4 py-1.5 bg-indigo-600 text-white text-sm rounded font-medium cursor-not-allowed transition-colors">
                    Browse Files
                  </button>

                  <p className="text-xs text-muted mt-2">PDF only • Max 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </Tooltip.Trigger>
        <Tooltip.Content
          showArrow
          offset={15}
          className="flex items-center gap-1.5 cursor-not-allowed select-none rounded-md"
        >
          <Tooltip.Arrow />
          <Wrench className="opacity-60" />
          <p className="opacity-60">This feature is under construction</p>
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
};

export default Resume;

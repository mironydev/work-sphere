import {
  Magnifier,
  ChartLineArrowUp,
  Factory,
  Bookmark,
  LayoutHeaderCursor,
  FileText,
  PersonMagnifier,
  SquareChartColumn,
} from "@gravity-ui/icons";

const Careertools = () => {
  return (
    <div className="mt-28 sm:mt-36 bg-white dark:bg-white/5 rounded-lg mx-4 px-4 pt-8 pb-4 sm:px-8 sm:py-14 border">
      <div className="text-center space-y-2">
        <div className="flex justify-center items-center gap-3">
          <span className="bg-black dark:bg-cyan-500 h-2 w-2 rounded-xs"></span>
          <p className="text-lg text-stone-500 dark:text-stone-300">
            CAREER TOOLS
          </p>
          <span className="bg-black dark:bg-cyan-500 h-2 w-2 rounded-xs"></span>
        </div>
        <h2 className="text-4xl font-semibold max-w-2xl mx-auto">
          Tools to Help You Find the Right Job
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 mt-14">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-linear-to-b bg-black/80 text-white dark:from-black dark:to-stone-900 border rounded-md dark:text-cyan-400">
            <Magnifier className="size-8" />
          </div>
          <div>
            <p className="font-medium">Smart Search</p>
            <p className="text-sm opacity-70">
              Find your ideal job with advanced filters.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-linear-to-b bg-black/80 text-white dark:from-black dark:to-stone-900 border rounded-md dark:text-cyan-400">
            <SquareChartColumn className="size-8" />
          </div>
          <div>
            <p className="font-medium">Salary Insights</p>
            <p className="text-sm opacity-70">
              Get real salary data to negotiate confidently.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-linear-to-b bg-black/80 text-white dark:from-black dark:to-stone-900 border rounded-md dark:text-cyan-400">
            <Factory className="size-8" />
          </div>
          <div>
            <p className="font-medium">Top Companies</p>
            <p className="text-sm opacity-70">
              Apply to vetted companies that are hiring.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-linear-to-b bg-black/80 text-white dark:from-black dark:to-stone-900 border rounded-md dark:text-cyan-400">
            <Bookmark className="size-8" />
          </div>
          <div>
            <p className="font-medium">Saved Jobs</p>
            <p className="text-sm opacity-70">
              Manage apps & favorites on your dashboard.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-linear-to-b bg-black/80 text-white dark:from-black dark:to-stone-900 border rounded-md dark:text-cyan-400">
            <LayoutHeaderCursor className="size-8" />
          </div>
          <div>
            <p className="font-medium">One-Click Apply</p>
            <p className="text-sm opacity-70">
              Simplify your job applications for an easier process!
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-linear-to-b bg-black/80 text-white dark:from-black dark:to-stone-900 border rounded-md dark:text-cyan-400">
            <FileText className="size-8" />
          </div>
          <div>
            <p className="font-medium">Resume Builder</p>
            <p className="text-sm opacity-70">
              Create professional resumes with modern templates.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-linear-to-b bg-black/80 text-white dark:from-black dark:to-stone-900 border rounded-md dark:text-cyan-400">
            <PersonMagnifier className="size-8" />
          </div>
          <div>
            <p className="font-medium">Skill-Based Matching</p>
            <p className="text-sm opacity-70">
              Discover jobs that match your skills and experience.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-linear-to-b bg-black/80 text-white dark:from-black dark:to-stone-900 border rounded-md dark:text-cyan-400">
            <ChartLineArrowUp className="size-8" />
          </div>
          <div>
            <p className="font-medium">Career Growth Resources</p>
            <p className="text-sm opacity-70">
              Boost your career with quick interview tips.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careertools;

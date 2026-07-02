const IfNotRecruiter = () => {
  return (
    <div>
      <div className="md:pl-4 flex justify-center items-center min-h-[40vh] sm:min-h-[60vh]">
        <div className="max-w-lg text-center rounded-xl shadow-xs dark:shadow-none border border-white dark:border-foreground/15 bg-background p-8">
          <h1 className="text-2xl font-semibold mb-3 text-red-400">
            Recruiter Account Required
          </h1>
          <p className="text-foreground/70">
            This page is only available to recruiter accounts. Switch to a
            recruiter account to manage companies, post jobs, and review
            applications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IfNotRecruiter;

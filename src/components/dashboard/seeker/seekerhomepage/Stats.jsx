const Stats = ({ savedJobsCount, applications }) => {
  const stat = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  const cards = [
    { title: "Saved Jobs", number: savedJobsCount || 0 },
    {
      title: "Applications Submitted",
      number: applications.length || 0,
    },
    {
      title: "Interviews Scheduled",
      number: stat.interviewing || 0,
    },
    {
      title: "Offers Received",
      number: stat.offered || 0,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((card, i) => {
        return (
          <div
            key={i}
            className="bg-white dark:bg-foreground/5 p-4 rounded-lg flex-1 flex flex-col justify-between gap-2 border"
          >
            <div className="flex justify-between gap-2">
              <p className="text-xs opacity-70 overflow-hidden">{card.title}</p>
            </div>
            <p className="text-3xl font-medium overflow-hidden leading-none">
              {card.number}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Stats;

import { Chip, Tooltip } from "@heroui/react";
import UserFilter from "./UserFilter";
import { Wrench } from "@gravity-ui/icons";

const UserStats = ({ users, filteredUsers, setFilteredUsers }) => {
  const activeUsers = filteredUsers.filter((user) => !user.banned);
  const bannedUsers = filteredUsers.filter((user) => user.banned);
  const totalRecruiters = activeUsers.filter(
    (recruiter) => recruiter.role === "recruiter",
  );
  const newSignups = filteredUsers.filter((user) => {
    const dayAgo = new Date(new Date() - 24 * 60 * 60 * 1000);
    return new Date(user.createdAt) > dayAgo;
  });

  const now = new Date();
  const monthAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
  const twoMonthsAgo = new Date(monthAgo - 30 * 24 * 60 * 60 * 1000);
  const activeThisMonth = filteredUsers.filter(
    (user) => !user.banned && new Date(user.createdAt) > monthAgo,
  ).length;
  const activeLastMonth = filteredUsers.filter(
    (user) =>
      !user.banned &&
      new Date(user.createdAt) > twoMonthsAgo &&
      new Date(user.createdAt) <= monthAgo,
  ).length;
  const percentageChange =
    activeLastMonth > 0
      ? ((activeThisMonth - activeLastMonth) / activeLastMonth) * 100
      : activeThisMonth > 0
        ? 100
        : 0;
  const isPositive = percentageChange >= 0;

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <div>
          <h2 className="text-3xl font-medium whitespace-nowrap">
            User Management
          </h2>
          <p className="text-muted text-sm mt-1">
            Review, filter, and manage platform access for all users.
          </p>
        </div>
        <div className="flex items-end gap-2">
          <UserFilter users={users} setFilteredUsers={setFilteredUsers} />

          <Tooltip delay={0} closeDelay={0}>
            <Tooltip.Trigger aria-label="Export button">
              <button className="px-4 py-2 rounded-sm bg-foreground text-background text-sm font-medium whitespace-nowrap cursor-not-allowed select-none">
                Export List
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content
              showArrow
              className="flex items-center gap-1.5 cursor-not-allowed select-none rounded-md"
            >
              <Tooltip.Arrow />
              <Wrench className="opacity-60" />
              <p className="opacity-60">This feature is under construction</p>
            </Tooltip.Content>
          </Tooltip>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-5 rounded-md border dark:border-white/15 bg-white dark:bg-foreground/5">
          <p className="text-xs opacity-70">Total Active Users</p>
          <p className="font-medium text-3xl mt-1 mb-2">{activeUsers.length}</p>
          <p
            className={`text-xs ${
              percentageChange > 0
                ? "text-green-500"
                : percentageChange < 0
                  ? "text-red-500"
                  : ""
            }`}
          >
            {percentageChange !== 0 && (isPositive ? "+" : "")}
            {percentageChange.toFixed(1)}%{" "}
            <span className="text-foreground opacity-50">(last 30 days)</span>
          </p>
        </div>
        <div className="p-5 rounded-md border dark:border-white/15 bg-white dark:bg-foreground/5">
          <p className="text-xs opacity-70">New Signups (24h)</p>
          <p className="font-medium text-3xl mt-1 mb-2">{newSignups.length}</p>
          <p className="text-xs opacity-50">Steady activity</p>
        </div>
        <div className="p-5 rounded-md border dark:border-white/15 bg-white dark:bg-foreground/5">
          <p className="text-xs opacity-70">Recruiter Growth</p>
          <p className="font-medium text-3xl mt-1 mb-2">
            {totalRecruiters.length}
          </p>
          <p className="text-xs text-green-500 dark:text-green-400">
            High demand
          </p>
        </div>
        <div className="p-5 rounded-md border dark:border-white/15 bg-white dark:bg-foreground/5">
          <p className="text-xs opacity-70">Suspended Accounts</p>
          <p className="font-medium text-3xl mt-1 mb-2">{bannedUsers.length}</p>
          <p className="text-xs opacity-50">
            {((bannedUsers.length / filteredUsers.length) * 100).toFixed(2)}% of
            total
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserStats;

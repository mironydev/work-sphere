"use client";

import { Select, ListBox } from "@heroui/react";

const UserFilter = ({ users, setFilteredUsers }) => {
  const handleSelectFilter = (value) => {
    const filterByRole =
      value === "" ? users : users.filter((user) => user.accountType === value);
    setFilteredUsers(filterByRole);
  };

  return (
    <div>
      <Select
        className="w-24 rounded-sm border border-foreground/20"
        placeholder="Filter"
        aria-label="Filter by Role"
        onChange={(value) => handleSelectFilter(value)}
      >
        <Select.Trigger
          className="rounded-sm hover:bg-foreground/5 dark:hover:bg-foreground/15"
          style={{ outline: "none", boxShadow: "none" }}
        >
          <Select.Value className="whitespace-nowrap text-sm data-[placeholder=true]:text-foreground" />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover className="rounded-lg">
          <ListBox>
            <ListBox.Item
              id=""
              textValue="All"
              style={{
                outline: "none",
                boxShadow: "none",
                borderRadius: "6px",
              }}
            >
              All
              <div className="px-1">
                <ListBox.ItemIndicator />
              </div>
            </ListBox.Item>
            <ListBox.Item
              id="seeker"
              textValue="Seeker"
              style={{
                outline: "none",
                boxShadow: "none",
                borderRadius: "6px",
              }}
            >
              Seeker
              <div className="px-1">
                <ListBox.ItemIndicator />
              </div>
            </ListBox.Item>
            <ListBox.Item
              id="recruiter"
              textValue="Recruiter"
              style={{
                outline: "none",
                boxShadow: "none",
                borderRadius: "6px",
              }}
            >
              Recruiter
              <div className="px-1">
                <ListBox.ItemIndicator />
              </div>
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>
    </div>
  );
};

export default UserFilter;

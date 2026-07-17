"use client";

import { Select, ListBox } from "@heroui/react";

const UserFilter = ({ users, setFilteredUsers }) => {
  const handleSelectFilter = (value) => {
    const filterByRole = users.filter((user) => user.role === value);
    setFilteredUsers(filterByRole);
  };

  return (
    <div>
      <Select
        className="w-fit outline outline-black/15 focus:ring-0 rounded-sm"
        placeholder="Filter by Role"
        aria-label="Filter by Role"
        onChange={(value) => handleSelectFilter(value)}
      >
        <Select.Trigger className="rounded-sm shadow-none focus:ring-foreground focus:ring-1">
          <Select.Value className="whitespace-nowrap text-sm" />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover className="rounded-lg">
          <ListBox>
            <ListBox.Item
              id="seeker"
              textValue="Seeker"
              className="ring-foreground ring-0 rounded-md"
            >
              Seeker
              <div className="px-1">
                <ListBox.ItemIndicator />
              </div>
            </ListBox.Item>
            <ListBox.Item
              id="recruiter"
              textValue="Recruiter"
              className="ring-foreground ring-0 rounded-md"
            >
              Recruiter
              <div className="px-1">
                <ListBox.ItemIndicator />
              </div>{" "}
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>
    </div>
  );
};

export default UserFilter;

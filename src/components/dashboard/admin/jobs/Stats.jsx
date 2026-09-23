import { BarsAscendingAlignLeftArrowDown, Magnifier } from "@gravity-ui/icons";
import { Button, Dropdown, Label, SearchField } from "@heroui/react";
import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const Stats = ({ count, active, addedThisMonth }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const labels = {
    "name-asc": "A to Z",
    "name-desc": "Z to A",
    "date-newest": "Newest",
    "date-oldest": "Oldest",
  };

  const currentSort = searchParams.get("sortby");

  const [sortBy, setSortBy] = useState(labels[currentSort] || "Sort by");

  const stats = [
    { text: "Total Jobs", number: count },
    { text: "Active Jobs", number: active },
    { text: "Added This Month", number: addedThisMonth },
    { text: "Jobs With Applications", number: 0 },
  ];

  const params = new URLSearchParams(searchParams.toString());

  const handleSelectFilter = (key) => {
    if (key === "default") {
      params.delete("sortby");
      setSortBy("Sort by");
    } else {
      setSortBy(labels[key] || "Sort by");
      params.set("sortby", key);
    }

    params.set("page", "1");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const value = formData.get("search");

    if (!value) {
      params.delete("search");
    } else {
      params.set("search", value);
    }

    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat, i) => {
          return (
            <div
              key={i}
              className="flex flex-col justify-between rounded-lg border border-foreground/15 bg-white p-5 dark:bg-foreground/5"
            >
              <p className="text-xs opacity-70">{stat.text}</p>

              <div>
                <p className="mt-1 mb-2 text-3xl font-medium">{stat.number}</p>

                <p className="text-xs text-emerald-500">+0%</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter */}
      <div className="mt-6 mb-4 flex justify-between">
        {/* search */}
        <form className="flex gap-2 sm:gap-1 w-full" onSubmit={onSubmit}>
          <SearchField
            defaultValue={searchParams.get("search") || ""}
            aria-label="Search"
            name="search"
            className="relative sm:w-full sm:max-w-72"
          >
            <SearchField.Group
              className="h-10 rounded-sm border border-foreground/15 shadow-none focus-within:border-foreground/50 dark:border-transparent dark:bg-foreground/10 dark:focus-within:border-foreground/10"
              style={{ boxShadow: "none" }}
            >
              <SearchField.Input
                placeholder="Search jobs..."
                className="w-full text-sm"
              />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>

          <Button
            type="submit"
            className="h-10 rounded-sm bg-linear-to-b from-[#3a3a3a] via-black to-black px-3 dark:from-[#292929] dark:via-[#292929] dark:to-[#292929] sm:px-3.5"
            style={{ outline: "none", boxShadow: "none" }}
          >
            <Magnifier />
          </Button>
        </form>

        {/* sort */}
        <Dropdown>
          <Dropdown.Trigger
            className="text-nowrap sm:pl-4 ml-5 rounded-sm border border-foreground/15 dark:border-none bg-white px-2.5 py-2 text-sm hover:bg-foreground/5 dark:border-foreground/15 dark:bg-foreground/12 dark:hover:bg-foreground/15"
            style={{ outline: "none", boxShadow: "none" }}
          >
            <div className="hidden sm:flex justify-between items-center gap-2">
              <div className={sortBy === "Sort by" ? "opacity-60" : ""}>
                {sortBy}
              </div>
              <ChevronDown size={16} />
            </div>
            <div className="sm:hidden">
              <BarsAscendingAlignLeftArrowDown className="size-5" />
            </div>
          </Dropdown.Trigger>

          <Dropdown.Popover className="w-auto min-w-25 rounded-md">
            <Dropdown.Menu onAction={handleSelectFilter}>
              <Dropdown.SubmenuTrigger>
                <Dropdown.Item
                  id="name"
                  textValue="Name"
                  className="rounded-md"
                  style={{ boxShadow: "none", outline: "none" }}
                >
                  <Label>Name</Label>
                  <Dropdown.SubmenuIndicator />
                </Dropdown.Item>

                <Dropdown.Popover className="w-auto min-w-25 rounded-md">
                  <Dropdown.Menu onAction={handleSelectFilter}>
                    <Dropdown.Item
                      id="name-asc"
                      textValue="A to Z"
                      className="rounded-md"
                      style={{ boxShadow: "none", outline: "none" }}
                    >
                      <Label>A to Z</Label>
                    </Dropdown.Item>

                    <Dropdown.Item
                      id="name-desc"
                      textValue="Z to A"
                      className="rounded-md"
                      style={{ boxShadow: "none", outline: "none" }}
                    >
                      <Label>Z to A</Label>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown.SubmenuTrigger>
              <Dropdown.SubmenuTrigger>
                <Dropdown.Item
                  id="date"
                  textValue="Date"
                  className="rounded-md"
                  style={{ boxShadow: "none", outline: "none" }}
                >
                  <Label>Date</Label>
                  <Dropdown.SubmenuIndicator />
                </Dropdown.Item>

                <Dropdown.Popover className="w-auto min-w-25 rounded-md">
                  <Dropdown.Menu onAction={handleSelectFilter}>
                    <Dropdown.Item
                      id="date-newest"
                      textValue="Newest"
                      className="rounded-md"
                      style={{ boxShadow: "none", outline: "none" }}
                    >
                      <Label>Newest</Label>
                    </Dropdown.Item>

                    <Dropdown.Item
                      id="date-oldest"
                      textValue="Oldest"
                      className="rounded-md"
                      style={{ boxShadow: "none", outline: "none" }}
                    >
                      <Label>Oldest</Label>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown.SubmenuTrigger>
              <Dropdown.Item
                id="default"
                textValue="Default"
                className="rounded-md"
                style={{ boxShadow: "none", outline: "none" }}
              >
                <Label>Default</Label>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </div>
    </div>
  );
};

export default Stats;

"use client";

import { useState, useEffect, useRef } from "react";
import { SearchField, Select, ListBox, Checkbox } from "@heroui/react";
import { useRouter } from "next/navigation";

const JobsFilter = ({ searchQuery, jobs, page, setPage, total }) => {
  const [search, setSearch] = useState(searchQuery.search);
  const [jobType, setJobType] = useState(searchQuery.jobType);
  const [category, setCategory] = useState(searchQuery.jobCategory);
  const [isRemote, setIsRemote] = useState(searchQuery.isRemote === "true");

  const router = useRouter();

  const isFirstRender = useRef(true);

  // Effect 1: whenever a FILTER changes, reset to page 1
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // don't reset page on initial mount
    }
    setPage(1);
  }, [search, jobType, category, isRemote, setPage]);

  useEffect(() => {
    const searchParam = new URLSearchParams();
    if (search) searchParam.set("search", search);
    if (jobType) searchParam.set("jobType", jobType);
    if (category) searchParam.set("jobCategory", category);
    if (isRemote) searchParam.set("isRemote", isRemote);
    if (page) searchParam.set("page", page);

    router.push(`?${searchParam}`);
  }, [search, jobType, category, isRemote, page, router]);

  const selectStyle = "ring-0  rounded-sm ring-offset-0";

  return (
    <div className="my-5">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <SearchField
          aria-label="Search jobs"
          value={search}
          onChange={setSearch}
          className={
            "flex-1 border focus-within:border-foreground/40 rounded-sm duration-100 w-full "
          }
        >
          <SearchField.Group
            className={"shadow-none ring-0 rounded-sm py-5 sm:py-0"}
          >
            <SearchField.SearchIcon />
            <SearchField.Input placeholder="Search by company or job title..." />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>

        <div className="flex flex-col sm:flex-row sm:items-center flex-1 gap-4 w-full">
          <div className="flex flex-1  gap-4 w-full">
            <Select
              aria-label="Job type"
              placeholder="Select job type"
              className="flex-1 rounded-md border bg-white dark:bg-[#18181B]"
              onChange={(value) => setJobType(value)}
              variant="secondary"
              value={jobType}
            >
              <Select.Trigger className={`${selectStyle} bg-transparent `}>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover className="rounded-lg">
                <ListBox>
                  <ListBox.Item
                    id=""
                    textValue="All Job Types"
                    className={selectStyle}
                  >
                    All Job Types
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item
                    id="full-time"
                    textValue="Full-time"
                    className={selectStyle}
                  >
                    Full-time
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item
                    id="part-time"
                    textValue="Part-time"
                    className={selectStyle}
                  >
                    Part-time
                    <ListBox.ItemIndicator />
                  </ListBox.Item>

                  <ListBox.Item
                    id="contract"
                    textValue="Contract"
                    className={selectStyle}
                  >
                    Contract
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item
                    id="internship"
                    textValue="Internship"
                    className={selectStyle}
                  >
                    Internship
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>

            <Select
              aria-label="Job category"
              placeholder="Select category"
              className="flex-1 rounded-md border bg-white dark:bg-[#18181B]"
              onChange={(value) => setCategory(value)}
              variant="secondary"
              value={category}
            >
              <Select.Trigger className={`${selectStyle} bg-transparent `}>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover className="rounded-lg">
                <ListBox>
                  <ListBox.Item
                    id=""
                    textValue="All Categories"
                    className={selectStyle}
                  >
                    All Categories
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item
                    id="technology"
                    textValue="Technology"
                    className={selectStyle}
                  >
                    Technology
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item
                    id="design"
                    textValue="Design"
                    className={selectStyle}
                  >
                    Design
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item
                    id="marketing"
                    textValue="Marketing"
                    className={selectStyle}
                  >
                    Marketing
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item
                    id="sales"
                    textValue="Sales"
                    className={selectStyle}
                  >
                    Sales
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item
                    id="healthcare"
                    textValue="Healthcare"
                    className={selectStyle}
                  >
                    Healthcare
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item
                    id="finance"
                    textValue="Finance"
                    className={selectStyle}
                  >
                    Finance
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          <div className="w-fit">
            <Checkbox isSelected={isRemote} onChange={setIsRemote}>
              <Checkbox.Content className="flex flex-row items-center gap-2 ">
                <Checkbox.Control
                  className="dark:bg-foreground/15 shadow-none ring-0"
                  style={{
                    boxShadow: "none",
                    outline: "none",
                  }}
                >
                  <Checkbox.Indicator />
                </Checkbox.Control>
                Remote
              </Checkbox.Content>
            </Checkbox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsFilter;

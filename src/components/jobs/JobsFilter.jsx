"use client";

import { useState, useEffect } from "react";
import { SearchField, Select, ListBox, Checkbox } from "@heroui/react";
import { useRouter } from "next/navigation";

const JobsFilter = ({ searchQuery, page, setPage }) => {
  const [search, setSearch] = useState(searchQuery.search || "");
  const [jobType, setJobType] = useState(searchQuery.jobType || null);
  const [category, setCategory] = useState(searchQuery.jobCategory || null);
  const [isRemote, setIsRemote] = useState(searchQuery.isRemote === "true");

  const [jobTypeSelected, setJobTypeSelected] = useState(
    searchQuery.jobType ? searchQuery.jobType : null,
  );
  const [categorySelected, setCategorySelected] = useState(
    searchQuery.jobCategory ? searchQuery.jobCategory : null,
  );

  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearch(searchQuery.search || "");

    if (searchQuery.jobType) {
      setJobType(searchQuery.jobType);
      setJobTypeSelected(searchQuery.jobType);
    } else {
      setJobType(null);
      setJobTypeSelected((prev) => (prev === "all" ? "all" : null));
    }

    if (searchQuery.jobCategory) {
      setCategory(searchQuery.jobCategory);
      setCategorySelected(searchQuery.jobCategory);
    } else {
      setCategory(null);
      setCategorySelected((prev) => (prev === "all" ? "all" : null));
    }

    setIsRemote(searchQuery.isRemote === "true");
  }, [
    searchQuery.search,
    searchQuery.jobType,
    searchQuery.jobCategory,
    searchQuery.isRemote,
  ]);

  useEffect(() => {
    const searchParam = new URLSearchParams();

    if (search) searchParam.set("search", search);

    if (jobType) {
      searchParam.set("jobType", jobType);
    }

    if (category) {
      searchParam.set("jobCategory", category);
    }

    if (isRemote) searchParam.set("isRemote", "true");

    if (page) searchParam.set("page", page);

    router.push(`?${searchParam.toString()}`, { scroll: false });
  }, [search, jobType, category, isRemote, page, router]);

  const selectStyle = "ring-0 rounded-sm ring-offset-0";

  return (
    <div className="my-5">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <SearchField
          aria-label="Search jobs"
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          className="flex-1 border focus-within:border-foreground/40 rounded-sm duration-100 w-full"
        >
          <SearchField.Group className="shadow-none ring-0 rounded-sm py-5 sm:py-0 dark:bg-foreground/10 sm:dark:bg-foreground/7">
            <SearchField.SearchIcon />
            <SearchField.Input
              placeholder="Search by company or job title..."
              className="placeholder:text-foreground/40"
            />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>

        <div className="flex flex-col sm:flex-row sm:items-center flex-1 gap-4 w-full">
          <div className="flex flex-1 gap-4 w-full">
            <Select
              aria-label="Job type"
              placeholder="Select job type"
              className="flex-1 rounded-md border bg-white dark:bg-foreground/10 sm:dark:bg-foreground/7 text-nowrap"
              onChange={(value) => {
                setJobTypeSelected(value);

                if (value === "all") {
                  setJobType(null);
                } else {
                  setJobType(value);
                }

                setPage(1);
              }}
              variant="secondary"
              value={jobTypeSelected}
            >
              <Select.Trigger className={`${selectStyle} bg-transparent`}>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover className="rounded-lg">
                <ListBox>
                  <ListBox.Item
                    id="all"
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
              className="flex-1 rounded-md border bg-white dark:bg-foreground/10 sm:dark:bg-foreground/7 text-nowrap"
              onChange={(value) => {
                setCategorySelected(value);

                if (value === "all") {
                  setCategory(null);
                } else {
                  setCategory(value);
                }

                setPage(1);
              }}
              variant="secondary"
              value={categorySelected}
            >
              <Select.Trigger className={`${selectStyle} bg-transparent`}>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover className="rounded-lg">
                <ListBox>
                  <ListBox.Item
                    id="all"
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
            <Checkbox
              isSelected={isRemote}
              onChange={(value) => {
                setIsRemote(value);
                setPage(1);
              }}
            >
              <Checkbox.Content className="flex flex-row items-center gap-1">
                <Checkbox.Control
                  className="bg-white dark:bg-foreground/10 border border-foreground/20 dark:border-foreground/10 ring-0 rounded-xl"
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

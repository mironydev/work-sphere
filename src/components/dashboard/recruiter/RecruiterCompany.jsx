"use client";

import { useState } from "react";
import RecruiterAddCompanyModal from "./RecruiterAddCompanyModal";
import {
  AlertDialog,
  Avatar,
  Dropdown,
  Label,
  Modal,
  Separator,
  Tooltip,
} from "@heroui/react";
import Link from "next/link";
import { Check, ClockFill, Persons, PlanetEarth } from "@gravity-ui/icons";
import { deleteCompany } from "@/lib/actions/company";
import { toast } from "sonner";
import RecruiterEditCompanyModal from "./RecruiterEditCompanyModal";
import { capitalize, useSessionClient } from "@/lib/helpers";
import DashboardSpinner from "../DashboardSpinner";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";

const RecruiterCompany = ({ companies }) => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [deletingCompany, setDeletingCompany] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { isPending } = useSessionClient();

  const handleCompanyDelete = async (companyId, companyName) => {
    const res = await deleteCompany(companyId);

    if (res.companyDeleted.deletedCount) {
      toast.error(`${companyName} & all of its jobs has been deleted`, {
        duration: 5000,
        icon: (
          <div className="p-px bg-red-600 text-white text-sm rounded-full">
            <Check className="scale-75" />
          </div>
        ),
      });

      setDeletingCompany(null);
    } else {
      toast.error("Something went wrong");
    }
  };

  if (isPending) {
    return <DashboardSpinner />;
  }

  if (!companies.length) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="bg-white dark:bg-foreground/5 border rounded-md text-center p-8 sm:p-15">
          <p className="text-2xl sm:text-4xl font-medium text-muted">
            No Companies Found
          </p>

          <p className="text-muted sm:mt-2 mb-4 sm:mb-6">
            You haven&apos;t created any companies yet.
          </p>

          <RecruiterAddCompanyModal />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
        <div>
          <h1 className="text-3xl font-semibold">My Companies</h1>
          <p className="mt-1 opacity-70">
            Manage your registered companies and their verification states.
          </p>
        </div>
        <RecruiterAddCompanyModal />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {companies.map((comp) => (
          <div
            key={comp._id}
            className="relative p-4 rounded-md bg-white dark:bg-foreground/5 flex flex-col justify-between border"
          >
            <div>
              <div className="flex justify-between items-start">
                <div className="flex gap-3 min-w-0">
                  <Avatar className="rounded-lg bg-transparent">
                    <Avatar.Image alt={comp.companyName} src={comp.logo} />

                    <Avatar.Fallback className="rounded-lg">
                      {comp.companyName.charAt(0).toUpperCase()}
                    </Avatar.Fallback>
                  </Avatar>

                  <div className="text-xl font-medium flex flex-col gap-1 min-w-0">
                    <p className="leading-none overflow-hidden">
                      {comp.companyName}
                    </p>

                    <span className="text-xs text-muted">
                      {capitalize(comp.industry)}
                    </span>
                  </div>
                </div>

                {comp.status === "pending" && (
                  <ClockFill className="text-yellow-500 dark:text-yellow-600 absolute scale-150 -top-1.5 -right-1.5" />
                )}

                <Dropdown>
                  <Dropdown.Trigger
                    style={{
                      boxShadow: "none",
                      outline: "none",
                    }}
                  >
                    <p className="p-2 hover:bg-foreground/5 rounded-sm cursor-pointer">
                      <EllipsisVertical className="w-4 h-4" />
                    </p>
                  </Dropdown.Trigger>

                  <Dropdown.Popover className="dark:bg-[#151515] rounded-xl w-fit min-w-32">
                    <Dropdown.Menu
                      onAction={(key) => {
                        if (key === "edit") {
                          setSelectedCompany(comp);
                          setIsEditModalOpen(true);
                        }

                        if (key === "delete") {
                          setDeletingCompany(comp);
                        }
                      }}
                    >
                      <Dropdown.Item
                        id="edit"
                        textValue="Edit"
                        className="gap-2 rounded-lg mb-0.5"
                        style={{
                          boxShadow: "none",
                          outline: "none",
                        }}
                      >
                        <Pencil strokeWidth={2.25} className="w-4 h-4" />
                        <Label>Edit</Label>
                      </Dropdown.Item>

                      <Separator />

                      <Dropdown.Item
                        id="delete"
                        textValue="Delete"
                        className="text-red-500 gap-2 rounded-lg mt-0.5"
                        style={{
                          boxShadow: "none",
                          outline: "none",
                        }}
                      >
                        <Trash2 strokeWidth={2.25} className="w-4 h-4" />
                        <Label className="text-red-500">Delete</Label>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown>
              </div>

              <p className="text-muted text-sm mt-4 mb-7 min-w-0 overflow-hidden">
                {comp.description}
              </p>
            </div>

            <div>
              <Separator />

              <div className="flex justify-between my-5 gap-2">
                <p className="text-xs text-muted min-w-0 overflow-hidden">
                  {comp.location}
                </p>

                <Tooltip delay={500} closeDelay={0}>
                  <Tooltip.Trigger>
                    <button className="text-xs text-muted flex gap-2 items-center cursor-pointer select-none">
                      <Persons />
                      {comp.totalEmployees}
                    </button>
                  </Tooltip.Trigger>

                  <Tooltip.Content
                    showArrow
                    offset={5}
                    placement="top"
                    className="py-1 rounded-sm bg-white/10 dark:bg-foreground/20 backdrop-blur-xs"
                  >
                    <p className="text-stone-700 dark:text-white">
                      Total Employees
                    </p>
                  </Tooltip.Content>
                </Tooltip>
              </div>

              <Link
                href={comp.url}
                target="_blank"
                className="text-xs flex items-center gap-2 w-fit text-foreground/70 font-medium active:text-foreground"
              >
                <PlanetEarth />
                Visit Website
              </Link>
            </div>
          </div>
        ))}
      </div>

      {selectedCompany && (
        <Modal
          isOpen={isEditModalOpen}
          onOpenChange={(open) => {
            setIsEditModalOpen(open);

            if (!open) {
              setSelectedCompany(null);
            }
          }}
        >
          <Modal.Backdrop>
            <Modal.Container placement="auto">
              <Modal.Dialog className="p-0 rounded-lg border max-h-[80vh] w-full sm:max-w-xl">
                <Modal.CloseTrigger />

                <RecruiterEditCompanyModal
                  company={selectedCompany}
                  onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedCompany(null);
                  }}
                />
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      )}

      {deletingCompany && (
        <AlertDialog
          isOpen={true}
          onOpenChange={(open) => {
            if (!open) {
              setDeletingCompany(null);
            }
          }}
        >
          <AlertDialog.Backdrop>
            <AlertDialog.Container>
              <AlertDialog.Dialog className="sm:max-w-100">
                <AlertDialog.CloseTrigger />

                <AlertDialog.Header>
                  <AlertDialog.Icon status="danger" />

                  <AlertDialog.Heading>Delete permanently?</AlertDialog.Heading>
                </AlertDialog.Header>

                <AlertDialog.Body>
                  <p>
                    This will permanently delete{" "}
                    <strong>{deletingCompany.companyName}</strong> and all of
                    its published <strong>jobs</strong>. This action cannot be
                    undone.
                  </p>
                </AlertDialog.Body>

                <AlertDialog.Footer>
                  <button
                    className="rounded-lg px-4 py-2 bg-foreground/10 cursor-pointer active:opacity-70"
                    onClick={() => setDeletingCompany(null)}
                  >
                    Cancel
                  </button>

                  <button
                    className="rounded-lg bg-danger text-white px-4 py-2 cursor-pointer active:opacity-80"
                    onClick={() =>
                      handleCompanyDelete(
                        deletingCompany._id,
                        deletingCompany.companyName,
                      )
                    }
                  >
                    Delete Company
                  </button>
                </AlertDialog.Footer>
              </AlertDialog.Dialog>
            </AlertDialog.Container>
          </AlertDialog.Backdrop>
        </AlertDialog>
      )}
    </div>
  );
};

export default RecruiterCompany;

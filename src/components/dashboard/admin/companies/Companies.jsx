"use client";
import {
  AlertDialog,
  Button,
  Dropdown,
  Label,
  Modal,
  Separator,
} from "@heroui/react";
import { capitalize, formatDate } from "@/lib/helpers";
import { deleteCompany, reviewCompany } from "@/lib/actions/company";
import Stats from "./Stats";
import Image from "next/image";
import { useState } from "react";
import { EllipsisVertical } from "@gravity-ui/icons";

const Companies = ({ allCompanies, total, approved, rejected, pending }) => {
  const [company, setCompany] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleAction = async (key, company) => {
    switch (key) {
      case "view":
        setCompany(company);
        setIsViewDialogOpen(true);
        break;
      case "approve":
        await reviewCompany(company._id, { status: "approved" });
        break;
      case "reject":
        await reviewCompany(company._id, { status: "rejected" });
        break;
      case "delete":
        setIsDeleteDialogOpen(true);
        setCompany(company);
        break;
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-3xl font-semibold">All Companies</h1>
        <p className="text-muted text-sm mt-1">
          Manage companies registered on the platform.
        </p>
      </div>
      <Stats
        total={total}
        approved={approved}
        rejected={rejected}
        pending={pending}
      />

      <div className="overflow-x-auto rounded-lg dark:bg-foreground/3 border">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-foreground/8">
              <th className="px-4 py-4 text-left font-medium text-xs text-muted">
                #
              </th>

              <th className="px-4 py-4 text-left font-medium text-xs text-muted text-nowrap">
                Company Name
              </th>

              <th className="px-4 py-4 text-left font-medium text-xs text-muted">
                Recruiter Email
              </th>

              <th className="px-4 py-4 text-left font-medium text-xs text-muted">
                Status
              </th>

              <th className="px-4 py-4 text-left font-medium text-xs text-muted text-nowrap">
                Created
              </th>

              <th className="px-4 py-4 text-left font-medium text-xs text-muted">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {allCompanies.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <div className="flex flex-col items-center justify-center text-center py-10 bg-white dark:bg-foreground/5 border-t">
                    <span className="text-xl text-muted">
                      No companies found
                    </span>

                    <p className="text-sm text-muted">
                      Companies will show up here.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              allCompanies.map((comp, i) => (
                <tr
                  key={comp._id}
                  className="border-t border-foreground/10 bg-white dark:border-white/10 dark:bg-foreground/3 hover:bg-gray-50 dark:hover:bg-foreground/5 transition-colors text-sm"
                >
                  <td className="px-4 py-3 text-muted">{i + 1}</td>

                  <td className="px-4 py-3 text-nowrap">
                    <p className="font-medium">
                      {comp.companyName || "Not found"}
                    </p>
                  </td>

                  <td className="px-4 py-3 text-muted text-nowrap">
                    {comp.userInfo?.email || "Not found"}
                  </td>

                  <td className="px-4 py-3">
                    {comp.status ? (
                      <span
                        className={`inline-flex items-center gap-1 ${
                          comp.status === "pending"
                            ? "text-yellow-600"
                            : comp.status === "approved"
                              ? "text-emerald-600"
                              : comp.status === "rejected"
                                ? "text-rose-600"
                                : "text-stone-400"
                        }`}
                      >
                        <span>•</span>
                        {capitalize(comp.status)}
                      </span>
                    ) : (
                      <span className="text-muted">Not Available</span>
                    )}
                  </td>

                  <td className="px-4 py-3 text-nowrap text-muted">
                    {comp.createdAt ? (
                      formatDate(comp.createdAt)
                    ) : (
                      <span className="text-muted">Not Available</span>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <Dropdown>
                      <Dropdown.Trigger
                        style={{
                          boxShadow: "none",
                          outline: "none",
                        }}
                      >
                        <div className="flex items-center justify-center hover:bg-foreground/5 active:bg-foreground/5 p-1.5 rounded-full cursor-pointer">
                          <EllipsisVertical className="w-4 h-4" />
                        </div>
                      </Dropdown.Trigger>
                      <Dropdown.Popover className="dark:bg-[#151515] rounded-xl w-fit min-w-32">
                        <Dropdown.Menu
                          onAction={(key) => {
                            handleAction(key, comp);
                          }}
                        >
                          <Dropdown.Item
                            id="view"
                            textValue="View"
                            className="gap-2 rounded-lg mb-0.5"
                            style={{
                              boxShadow: "none",
                              outline: "none",
                            }}
                          >
                            <Label>View</Label>
                          </Dropdown.Item>

                          {comp.status === "pending" ? (
                            <>
                              <Dropdown.Item
                                id="approve"
                                textValue="Approve"
                                className="gap-2 rounded-lg mb-0.5"
                                style={{
                                  boxShadow: "none",
                                  outline: "none",
                                }}
                              >
                                <Label className="text-nowrap">Approve</Label>
                              </Dropdown.Item>
                              <Dropdown.Item
                                id="reject"
                                textValue="Reject"
                                className="gap-2 rounded-lg mb-0.5"
                                style={{
                                  boxShadow: "none",
                                  outline: "none",
                                }}
                              >
                                <Label className="text-nowrap">Reject</Label>
                              </Dropdown.Item>
                            </>
                          ) : comp.status === "approved" ? (
                            <Dropdown.Item
                              id="reject"
                              textValue="Reject"
                              className="gap-2 rounded-lg mb-0.5"
                              style={{
                                boxShadow: "none",
                                outline: "none",
                              }}
                            >
                              <Label className="text-nowrap">Reject</Label>
                            </Dropdown.Item>
                          ) : (
                            <Dropdown.Item
                              id="approve"
                              textValue="Approve"
                              className="gap-2 rounded-lg mb-0.5"
                              style={{
                                boxShadow: "none",
                                outline: "none",
                              }}
                            >
                              <Label className="text-nowrap">Approve</Label>
                            </Dropdown.Item>
                          )}

                          <Separator />

                          <Dropdown.Item
                            id="delete"
                            textValue="Delete"
                            className="rounded-lg mt-0.5"
                            style={{
                              boxShadow: "none",
                              outline: "none",
                            }}
                          >
                            <Label className="text-rose-500 dark:font-bold">
                              Delete
                            </Label>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Popover>
                    </Dropdown>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* View Company Modal */}
      {company && (
        <Modal isOpen={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <Modal.Backdrop>
            <Modal.Container placement="center">
              <Modal.Dialog className="sm:max-w-96 rounded-xl pt-4">
                <div className="flex items-center gap-3">
                  {company.logo ? (
                    <Image
                      src={company.logo}
                      alt={company.companyName || "Company Logo"}
                      width={100}
                      height={100}
                      className="h-11 w-11 rounded-lg select-none object-cover"
                    />
                  ) : (
                    <div className="flex h-11 w-11 shrink-0 select-none items-center justify-center rounded-lg bg-foreground/10 font-semibold">
                      {company.companyName?.[0]?.toUpperCase() || "?"}
                    </div>
                  )}

                  <div className="min-w-0">
                    <Modal.Heading className="text-lg">
                      {company.companyName || "Company Details"}
                    </Modal.Heading>

                    {company.industry && (
                      <div className="mt-0.5 text-sm text-muted capitalize">
                        {company.industry}
                      </div>
                    )}
                  </div>
                </div>

                <Separator className="mt-4" />

                <div className="max-h-[60vh] space-y-5 overflow-y-auto px-1 pt-3 pb-4 text-sm">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    {company.userEmail && (
                      <div className="col-span-2">
                        <div className="text-muted">Recruiter Email</div>
                        <div className="mt-1 break-all font-medium text-foreground">
                          {company.userEmail}
                        </div>
                      </div>
                    )}

                    {company.location && (
                      <div>
                        <div className="text-muted">Location</div>
                        <div className="mt-1 font-medium text-foreground">
                          {company.location}
                        </div>
                      </div>
                    )}

                    {company.totalEmployees && (
                      <div>
                        <div className="text-muted">Employees</div>
                        <div className="mt-1 font-medium text-foreground">
                          {company.totalEmployees.toLocaleString()}
                        </div>
                      </div>
                    )}

                    {company.status && (
                      <div>
                        <div className="text-muted">Status</div>
                        <div
                          className={`mt-1 font-medium capitalize ${
                            company.status === "pending"
                              ? "text-yellow-600"
                              : company.status === "approved"
                                ? "text-green-600 dark:text-green-500"
                                : company.status === "rejected"
                                  ? "text-red-500 dark:text-red-700"
                                  : "text-foreground"
                          }`}
                        >
                          {company.status}
                        </div>
                      </div>
                    )}

                    {company.createdAt && (
                      <div>
                        <div className="text-muted">Created</div>
                        <div className="mt-1 font-medium text-foreground">
                          {formatDate(company.createdAt)}
                        </div>
                      </div>
                    )}

                    {company.url && (
                      <div className="col-span-2">
                        <div className="text-muted">Website</div>
                        <a
                          href={company.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 block break-all font-medium text-foreground hover:underline underline-offset-2"
                        >
                          {company.url}
                        </a>
                      </div>
                    )}
                  </div>

                  {company.description && (
                    <>
                      <Separator />

                      <div>
                        <div className="font-medium text-foreground">
                          About the company
                        </div>

                        <p className="mt-1.5 leading-6 text-muted">
                          {company.description}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <Modal.Footer>
                  <Button
                    variant="tertiary"
                    className="w-full rounded-lg"
                    style={{ outline: "none", boxShadow: "none" }}
                    slot="close"
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      )}

      {/* Delete Company Alert Dialog */}
      {company && (
        <AlertDialog
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialog.Backdrop>
            <AlertDialog.Container placement="center">
              <AlertDialog.Dialog className="rounded-xl sm:max-w-96">
                <AlertDialog.Header>
                  <AlertDialog.Heading className="text-xl">
                    Delete company?
                  </AlertDialog.Heading>
                </AlertDialog.Header>

                <AlertDialog.Body>
                  <p className="text-sm leading-6 text-muted">
                    This will permanently delete{" "}
                    <span className="font-medium text-foreground">
                      {company.companyName}
                    </span>{" "}
                    and all of its associated jobs. This action cannot be
                    undone.
                  </p>
                </AlertDialog.Body>

                <AlertDialog.Footer>
                  <Button
                    slot="close"
                    variant="tertiary"
                    className="w-full rounded-lg"
                    style={{ outline: "none", boxShadow: "none" }}
                  >
                    Cancel
                  </Button>

                  <Button
                    slot="close"
                    variant="danger"
                    className="w-full rounded-lg"
                    style={{ outline: "none", boxShadow: "none" }}
                    onClick={() => deleteCompany(company._id)}
                  >
                    Delete Company
                  </Button>
                </AlertDialog.Footer>
              </AlertDialog.Dialog>
            </AlertDialog.Container>
          </AlertDialog.Backdrop>
        </AlertDialog>
      )}
    </div>
  );
};

export default Companies;

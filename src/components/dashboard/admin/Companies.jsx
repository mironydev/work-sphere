"use client";
import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button, Table } from "@heroui/react";
import { capitalize, formatDate } from "@/lib/helpers";
import { deleteCompany, reviewCompany } from "@/lib/actions/jobs";

const Companies = ({ allCompanies }) => {
  const approveButtonStyle =
    "rounded-sm h-fit py-1.5 bg-emerald-600 dark:bg-green-500/10 dark:border border-green-800 dark:text-green-500";
  const rejectButtonStyle =
    "rounded-sm h-fit py-1.5 bg-red-500/90 dark:bg-red-500/30 dark:border border-red-700";

  return (
    <div>
      <p className="text-3xl font-semibold">All Companies</p>
      <p className="text-sm text-muted mt-1">
        Manage all registered companies and their status states.
      </p>
      <Table
        className="rounded-lg p-0 border border-foreground/15 mt-6 bg-background dark:bg-foreground/3"
        variant="secondary"
      >
        <Table.ScrollContainer>
          <Table.Content aria-label="Team members">
            <Table.Header>
              <Table.Column isRowHeader className={"py-4 rounded-none"}>
                Company Name
              </Table.Column>
              <Table.Column>Recruiter Email</Table.Column>
              <Table.Column>Industry</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Date Submitted</Table.Column>
              <Table.Column className={"rounded-none"}>Actions</Table.Column>
            </Table.Header>
            <Table.Body>
              {allCompanies.map((comp) => (
                <Table.Row key={comp._id}>
                  <Table.Cell className={"rounded-none py-5 font-medium"}>
                    {comp.companyName}
                  </Table.Cell>
                  <Table.Cell className="text-muted">email</Table.Cell>
                  <Table.Cell>
                    <p className="text-xs w-fit px-3 py-1 rounded-full bg-white dark:bg-stone-800">
                      {capitalize(comp.industry)}
                    </p>
                  </Table.Cell>
                  <Table.Cell>
                    {comp.status ? (
                      <span
                        className={`flex items-center gap-1 font- ${comp.status === "pending" ? "text-yellow-600" : comp.status === "approved" ? "text-green-600 dark:text-green-500" : comp.status === "rejected" ? "text-red-500 dark:text-red-700" : "text-stone-400"}`}
                      >
                        <span className="text-xl">•</span>{" "}
                        {capitalize(comp.status)}
                      </span>
                    ) : (
                      <p className="text-muted">Not Available</p>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {comp.createdAt ? (
                      formatDate(comp.createdAt)
                    ) : (
                      <p className="text-muted">Not Available</p>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {" "}
                    <div
                      className={
                        "rounded-none flex justify-between gap-3 lg:gap-0"
                      }
                    >
                      {comp.status === "approved" ? (
                        <Button
                          onClick={() => {
                            reviewCompany(comp._id, { status: "rejected" });
                          }}
                          style={{ boxShadow: "none", outline: "none" }}
                          className={rejectButtonStyle}
                        >
                          Reject
                        </Button>
                      ) : comp.status === "pending" ? (
                        <div className="flex flex-row gap-3">
                          <Button
                            onClick={() => {
                              reviewCompany(comp._id, { status: "approved" });
                            }}
                            style={{ boxShadow: "none", outline: "none" }}
                            className={approveButtonStyle}
                          >
                            Approve
                          </Button>
                          <Button
                            onClick={() => {
                              reviewCompany(comp._id, { status: "rejected" });
                            }}
                            style={{ boxShadow: "none", outline: "none" }}
                            className={rejectButtonStyle}
                          >
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => {
                            reviewCompany(comp._id, { status: "approved" });
                          }}
                          style={{ boxShadow: "none", outline: "none" }}
                          className={approveButtonStyle}
                        >
                          Approve
                        </Button>
                      )}

                      <AlertDialog>
                        <AlertDialog.Trigger>
                          <span className="text-red-500 scale-125 flex p-2 hover:bg-foreground/5 active:bg-foreground/5 rounded-sm duration-75">
                            <TrashBin />
                          </span>
                        </AlertDialog.Trigger>
                        <AlertDialog.Backdrop>
                          <AlertDialog.Container>
                            <AlertDialog.Dialog className="rounded-xl">
                              <AlertDialog.CloseTrigger />
                              <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading>
                                  Delete company permanently?
                                </AlertDialog.Heading>
                              </AlertDialog.Header>
                              <AlertDialog.Body>
                                <p>
                                  This will permanently delete the company{" "}
                                  <strong>{comp.companyName}</strong>. This
                                  action cannot be undone.
                                </p>
                              </AlertDialog.Body>
                              <AlertDialog.Footer>
                                <Button
                                  slot="close"
                                  variant="tertiary"
                                  className="rounded-lg"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  slot="close"
                                  variant="danger"
                                  className="rounded-lg"
                                  onClick={() => deleteCompany(comp._id)}
                                >
                                  Delete Company
                                </Button>
                              </AlertDialog.Footer>
                            </AlertDialog.Dialog>
                          </AlertDialog.Container>
                        </AlertDialog.Backdrop>
                      </AlertDialog>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default Companies;

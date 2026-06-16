"use client";

import RecruiterAddCompanyModal from "./RecruiterAddCompanyModal";
import { AlertDialog, Button, Modal, Popover, Separator } from "@heroui/react";
import Link from "next/link";
import {
  Check,
  Ellipsis,
  MapPin,
  Persons,
  PlanetEarth,
} from "@gravity-ui/icons";
import { deleteCompany } from "@/lib/actions/jobs";
import { toast } from "sonner";
import RecruiterEditCompanyModal from "./RecruiterEditCompanyModal";

const RecruiterCompany = ({ companies }) => {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const handleCompanyDelete = async (companyId) => {
    const res = await deleteCompany(companyId);
    if (res.companyDeleted.deletedCount) {
      toast.error("Company & all of its jobs has been deleted", {
        duration: 5000,
        icon: (
          <div className="p-px bg-red-600 text-white text-sm rounded-full ">
            <Check className="scale-75 " />
          </div>
        ),
      });
    } else {
      toast.error("Something went wrong");
    }
  };
  if (companies.length <= 0) {
    return (
      <div className="sm:px-10">
        <div className="bg-foreground/5 rounded-md text-center py-12">
          <p className="text-4xl font-medium">No Companies Found</p>
          <p className="text-muted mt-2 mb-8">
            You haven&apos;t created any companies yet. Create your first
            company to start posting jobs.
          </p>
          <RecruiterAddCompanyModal />
        </div>
      </div>
    );
  }
  return (
    <div className="sm:px-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div>
          <p className="text-3xl font-semibold">My Companies</p>
          <p className=" mt-2 opacity-70">
            Manage your registered companies and their verification states.
          </p>
        </div>
        <RecruiterAddCompanyModal />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {companies.map((comp) => (
          <div
            key={comp._id}
            className="p-4 rounded-md border border-foreground/5 bg-foreground/6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between ">
                <div className="flex items-center gap-3">
                  <div className="bg-foreground/15 rounded-md p-2">IMG</div>
                  <div className="text-xl font-medium flex flex-col gap-1">
                    <p>{comp.companyName}</p>
                    <span className="text-xs text-muted">
                      {capitalize(comp.industry)}
                    </span>
                  </div>
                </div>

                <Modal>
                  <Button
                    variant="ghost"
                    className="rounded-md"
                    style={{
                      boxShadow: "none",
                      outline: "none",
                    }}
                  >
                    <Ellipsis />
                  </Button>
                  <Modal.Backdrop>
                    <Modal.Container>
                      <Modal.Dialog className="sm:max-w-90 rounded-lg p-0">
                        <Modal.CloseTrigger className="top-2 right-2" />

                        <Modal.Body className="p-0 text-center text-base font-medium">
                          <RecruiterEditCompanyModal company={comp} />
                          <Separator />
                          <AlertDialog>
                            <Button
                              className="bg-transparent text-red-500 text-base py-5.5"
                              style={{
                                boxShadow: "none",
                                outline: "none",
                              }}
                            >
                              Delete Company
                            </Button>
                            <AlertDialog.Backdrop>
                              <AlertDialog.Container>
                                <AlertDialog.Dialog className="sm:max-w-100">
                                  <AlertDialog.CloseTrigger />
                                  <AlertDialog.Header>
                                    <AlertDialog.Icon status="danger" />
                                    <AlertDialog.Heading>
                                      Delete permanently?
                                    </AlertDialog.Heading>
                                  </AlertDialog.Header>
                                  <AlertDialog.Body>
                                    <p>
                                      This will permanently delete{" "}
                                      <strong>{comp.companyName}</strong> and
                                      all of its published <strong>jobs</strong>
                                      . This action cannot be undone.
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
                                      onClick={() => {
                                        handleCompanyDelete(comp._id);
                                      }}
                                    >
                                      Delete Company
                                    </Button>
                                  </AlertDialog.Footer>
                                </AlertDialog.Dialog>
                              </AlertDialog.Container>
                            </AlertDialog.Backdrop>
                          </AlertDialog>
                        </Modal.Body>
                      </Modal.Dialog>
                    </Modal.Container>
                  </Modal.Backdrop>
                </Modal>
              </div>
              <p className="text-muted text-sm mt-4 mb-7">{comp.description}</p>
            </div>
            <div>
              <Separator variant="tertiary" />
              <div className="flex justify-between my-5">
                <p className="text-xs text-muted flex gap-2 items-center">
                  <MapPin />
                  {comp.location}
                </p>
                <div className="flex items-center gap-4 ">
                  <Popover shouldBlockScroll={false}>
                    <Popover.Trigger>
                      <button className="text-xs text-muted flex gap-2 items-center cursor-pointer select-none">
                        <Persons />
                        {comp.totalEmployees}
                      </button>
                    </Popover.Trigger>
                    <Popover.Content className="bg-foreground/5 backdrop-blur-sm ">
                      <Popover.Dialog>
                        <p>Total Employees</p>
                      </Popover.Dialog>
                    </Popover.Content>
                  </Popover>
                </div>
              </div>
              <Link
                href={comp.url}
                target="_blank"
                className="text-xs flex items-center gap-2 w-fit"
              >
                <PlanetEarth />
                Visit Website
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruiterCompany;

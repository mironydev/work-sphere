"use client";

import {
  AlertDialog,
  Button,
  ListBox,
  Modal,
  Separator,
  Select,
  Input,
  FieldError,
  TextField,
  FieldGroup,
  Label,
  Dropdown,
} from "@heroui/react";
import Image from "next/image";
import { capitalize, formatDate } from "@/lib/helpers";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Check, PersonXmark } from "@gravity-ui/icons";
import { toast } from "sonner";
import { updatePlan } from "@/lib/actions/plan";
import UserStats from "./UserStats";
import { useEffect, useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { updateUserRole } from "@/lib/actions/user";

const Users = ({ allUsers, allPlans }) => {
  const router = useRouter();

  const users = allUsers.filter((user) => user.role !== "admin");
  const [filteredUsers, setFilteredUsers] = useState(users);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilteredUsers(allUsers.filter((user) => user.role !== "admin"));
  }, [allUsers]);

  const [isUser, setIsUser] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isBanDialogOpen, setIsBanDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleAction = async (key, user, plan) => {
    switch (key) {
      case "ban":
        setIsUser(user);
        setIsBanDialogOpen(true);
        break;
      case "view":
        setIsUser(user);
        setIsViewDialogOpen(true);
        break;
      case "delete":
        setIsUser(user);
        setIsDeleteDialogOpen(true);
        break;
      case "changeRole":
        setIsUser(user);
        setIsRoleDialogOpen(true);
        break;
      case "changePlan":
        setIsUser(user);
        updateUserPlan(user.id, plan.name);
        break;
    }
  };

  const formatPlanName = (planName) => {
    return planName
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const updateUserPlan = async (userId, plan) => {
    const res = await updatePlan(userId, plan);
    if (res.modifiedCount) {
      router.refresh();
      toast.success(`Plan upgraded to ${formatPlanName(plan)}`);
    }
  };

  const handleUpdateUserRole = async (userId, newRole) => {
    const res = await updateUserRole(userId, newRole);
    if (res.modifiedCount) {
      toast.success(`Role updated to ${capitalize(newRole)}`);
      router.refresh();
    } else {
      toast.error("Failed to update role");
    }
  };

  const banUser = async (userId, reason, time) => {
    const { data, error } = await authClient.admin.banUser({
      userId: userId,
      banReason: reason,
      banExpiresIn: time,
    });
    if (!error) {
      router.refresh();
      toast.success(`${data.user.name} has been banned`);
    }
  };

  const unbanUser = async (userId) => {
    const { data, error } = await authClient.admin.unbanUser({
      userId: userId,
    });
    if (!error) {
      router.refresh();
      toast.success(`${data.user.name} has been unbanned`);
    }
  };

  const onSubmit = async (e, user) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const reason = data.banReason;
    const time = parseInt(data.banPeriod);

    if (user.banned) {
      await unbanUser(user.id);
      setIsBanDialogOpen(false);
      router.refresh();
    } else {
      await banUser(user.id, reason, time);
      setIsBanDialogOpen(false);
      router.refresh();
    }

    router.refresh();
  };

  const handleDelete = async (userId) => {
    const { error } = await authClient.admin.removeUser({
      userId: userId,
    });
    if (!error) {
      toast.success("User Deleted.");
      setIsDeleteDialogOpen(false);
      router.refresh();
    }
  };

  return (
    <div>
      <UserStats
        users={users}
        filteredUsers={filteredUsers}
        setFilteredUsers={setFilteredUsers}
      />
      <div className="mt-6">
        <div className="overflow-x-auto rounded-lg dark:bg-foreground/3 border">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-foreground/8">
                <th className="px-4 py-4 text-left font-medium text-xs text-muted">
                  #
                </th>
                <th className="px-4 py-4 text-left font-medium text-xs text-muted">
                  Name
                </th>
                <th className="px-4 py-4 text-left font-medium text-xs text-muted">
                  Email
                </th>
                <th className="px-4 py-4 text-left font-medium text-xs text-muted pl-7">
                  Role
                </th>
                <th className="px-4 py-4 text-left font-medium text-xs text-muted">
                  Plan
                </th>
                <th className="px-4 py-4 text-left font-medium text-xs text-muted">
                  Joined
                </th>
                <th className="px-4 py-4 text-center font-medium text-xs text-muted">
                  Banned
                </th>
                <th className="px-4 py-4 text-center font-medium text-xs text-muted">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <div className="flex flex-col items-center justify-center text-center py-10 bg-white dark:bg-foreground/5 border-t text-muted">
                      <PersonXmark className="size-6 mb-2" />
                      <p className="text-sm text-muted">No user found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, i) => {
                  const filteredPlans = allPlans.filter((plan) =>
                    plan.name.startsWith(user.accountType),
                  );

                  return (
                    <tr
                      key={user.id}
                      className="border-t border-foreground/10 bg-white dark:border-white/10 dark:bg-foreground/3 hover:bg-gray-50 dark:hover:bg-foreground/5 transition-colors text-sm"
                    >
                      {/* Number */}
                      <td className="px-4 py-3 font-medium text-muted">
                        {i + 1}
                      </td>

                      {/* Name */}
                      <td className="px-4 py-3 font-medium text-nowrap">
                        {user.name}
                      </td>

                      {/* Email */}
                      <td className="px-4 py-3">{user.email}</td>

                      {/* Role */}
                      <td className="px-4 py-3">
                        <span
                          className={`capitalize px-3 py-1 rounded-full text-xs font-semibold ${
                            user.role === "admin"
                              ? "bg-indigo-600/10 dark:bg-indigo-600/20 text-indigo-700 dark:text-indigo-400"
                              : user.accountType === "seeker"
                                ? "bg-foreground/5"
                                : user.accountType === "recruiter"
                                  ? "bg-orange-600/5 text-orange-700 dark:text-orange-300"
                                  : ""
                          }`}
                        >
                          {user.accountType}
                        </span>
                      </td>

                      {/* Plan */}
                      <td className="px-4 py-3 capitalize">
                        {user.plan.slice(user.accountType.length + 1)}
                      </td>

                      {/* Joined */}
                      <td className="px-4 py-3 text-xs text-muted text-nowrap">
                        {formatDate(user.createdAt)}
                      </td>

                      {/* Banned */}
                      <td className="px-4 py-3 text-center">
                        {user.banned ? "Yes" : "No"}
                      </td>
                      <td className="text-center">
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
                                handleAction(key, user);
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

                              <Dropdown.Item
                                id="changeRole"
                                textValue="Change Role"
                                className="gap-2 rounded-lg mb-0.5"
                                style={{
                                  boxShadow: "none",
                                  outline: "none",
                                }}
                              >
                                <Label className="text-nowrap">
                                  Make{" "}
                                  {user.accountType === "seeker"
                                    ? "Recruiter"
                                    : "Seeker"}
                                </Label>
                              </Dropdown.Item>

                              <Dropdown.SubmenuTrigger>
                                <Dropdown.Item
                                  id="changePlan"
                                  textValue="Change Plan"
                                  className="gap-2 rounded-lg mb-0.5"
                                  style={{
                                    boxShadow: "none",
                                    outline: "none",
                                  }}
                                >
                                  <Label className="text-nowrap">
                                    Change Plan
                                  </Label>
                                  <Dropdown.SubmenuIndicator />
                                </Dropdown.Item>
                                <Dropdown.Popover
                                  placement="left top"
                                  className="dark:bg-[#151515] rounded-xl w-fit min-w-32"
                                >
                                  <Dropdown.Menu
                                    onAction={(planId) => {
                                      const selectedPlan = filteredPlans.find(
                                        (plan) => plan._id === planId,
                                      );
                                      handleAction(
                                        "changePlan",
                                        user,
                                        selectedPlan,
                                      );
                                    }}
                                  >
                                    {filteredPlans.map((plan) => (
                                      <Dropdown.Item
                                        key={plan._id}
                                        id={plan._id}
                                        textValue={plan.name}
                                        isDisabled={user.plan === plan.name}
                                        className="gap-2 rounded-lg mb-0.5 flex justify-between"
                                        style={{
                                          boxShadow: "none",
                                          outline: "none",
                                        }}
                                      >
                                        <Label>
                                          {formatPlanName(plan.name)}
                                        </Label>
                                        {user.plan === plan.name && (
                                          <Check className="size-4 text-muted" />
                                        )}
                                      </Dropdown.Item>
                                    ))}
                                  </Dropdown.Menu>
                                </Dropdown.Popover>
                              </Dropdown.SubmenuTrigger>

                              <Separator />

                              <Dropdown.Item
                                id="ban"
                                textValue="Ban"
                                className="gap-2 rounded-lg mt-0.5"
                                style={{
                                  boxShadow: "none",
                                  outline: "none",
                                }}
                              >
                                <Label>{user.banned ? "Unban" : "Ban"}</Label>
                              </Dropdown.Item>

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
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View User Modal */}
      {isUser && (
        <Modal isOpen={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <Modal.Backdrop>
            <Modal.Container placement="center">
              <Modal.Dialog className="rounded-xl pt-4 max-w-sm">
                <div className="flex items-center gap-3">
                  {isUser.image ? (
                    <Image
                      src={isUser.image}
                      alt={isUser.name || "User"}
                      width={100}
                      height={100}
                      className="h-11 w-11 rounded-full select-none object-cover"
                    />
                  ) : (
                    <div className="flex h-11 w-11 shrink-0 select-none items-center justify-center rounded-full bg-foreground/10 font-semibold">
                      {isUser.name?.[0]?.toUpperCase() || "?"}
                    </div>
                  )}

                  <div className="min-w-0">
                    <Modal.Heading className="text-lg">
                      {isUser.name || "User Details"}
                    </Modal.Heading>

                    {isUser.email && (
                      <div className="mt-0.5 break-all text-sm text-muted">
                        {isUser.email}
                      </div>
                    )}
                  </div>
                </div>

                <Separator className="mt-4" />
                <div className="max-h-[60vh] space-y-5 overflow-y-auto px-1 pt-3 pb-4 text-sm">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                      <div className="text-muted">Role</div>
                      <div className="mt-1 font-medium text-foreground capitalize">
                        {isUser.accountType || "Not available"}
                      </div>
                    </div>

                    <div>
                      <div className="text-muted">Plan</div>
                      <div className="mt-1 font-medium text-foreground">
                        {isUser.plan
                          ? formatPlanName(isUser.plan)
                          : "Not available"}
                      </div>
                    </div>

                    <div>
                      <div className="text-muted">Email Status</div>
                      <div
                        className={`mt-1 font-medium ${
                          isUser.emailVerified
                            ? "text-green-600 dark:text-green-500"
                            : "text-red-500 dark:text-red-400"
                        }`}
                      >
                        {isUser.emailVerified ? "Verified" : "Not verified"}
                      </div>
                    </div>

                    <div>
                      <div className="text-muted">Account Status</div>
                      <div
                        className={`mt-1 font-medium ${
                          isUser.banned
                            ? "text-red-500 dark:text-red-400"
                            : "text-green-600 dark:text-green-500"
                        }`}
                      >
                        {isUser.banned ? "Banned" : "Active"}
                      </div>
                    </div>

                    <div>
                      <div className="text-muted">Created</div>
                      <div className="mt-1 font-medium text-foreground">
                        {isUser.createdAt
                          ? formatDate(isUser.createdAt)
                          : "Not available"}
                      </div>
                    </div>

                    <div>
                      <div className="text-muted">Updated</div>
                      <div className="mt-1 font-medium text-foreground">
                        {isUser.updatedAt
                          ? formatDate(isUser.updatedAt)
                          : "Not available"}
                      </div>
                    </div>
                  </div>

                  {isUser.banned && (
                    <>
                      <Separator />

                      <div>
                        <div className="font-medium text-foreground">
                          Ban Information
                        </div>

                        <div className="mt-3 space-y-3">
                          {isUser.banReason && (
                            <div>
                              <div className="text-muted">Reason</div>
                              <div className="mt-1 font-medium text-foreground">
                                {isUser.banReason}
                              </div>
                            </div>
                          )}

                          {isUser.banExpires && (
                            <div>
                              <div className="text-muted">Expires</div>
                              <div className="mt-1 font-medium text-foreground">
                                {formatDate(isUser.banExpires)}
                              </div>
                            </div>
                          )}
                        </div>
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

      {/* Change Role Modal */}
      {isUser && (
        <Modal isOpen={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
          <Modal.Backdrop>
            <Modal.Container placement="center">
              <Modal.Dialog className="rounded-xl pt-4 max-w-sm">
                <Modal.Heading className="text-lg">
                  Change user role
                </Modal.Heading>
                <Separator className="mt-4" />

                <Modal.Body className="pt-3">
                  <p className="text-sm leading-6 text-muted">
                    You are about to change{" "}
                    <span className="font-medium text-foreground">
                      {isUser.name}
                    </span>
                    &apos;s role from{" "}
                    <span className="font-medium text-foreground">
                      {capitalize(isUser.accountType)}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium text-foreground">
                      {capitalize(
                        isUser.accountType === "seeker"
                          ? "recruiter"
                          : "seeker",
                      )}
                    </span>
                    .
                  </p>

                  <div className="mt-4 rounded-lg bg-foreground/5 px-3 py-2.5 text-sm">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-muted">Current role</span>
                      <span className="font-medium text-foreground capitalize">
                        {isUser.accountType}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between gap-4">
                      <span className="text-muted">New role</span>
                      <span className="font-medium text-foreground capitalize">
                        {isUser.accountType === "seeker"
                          ? "Recruiter"
                          : "Seeker"}
                      </span>
                    </div>
                  </div>
                </Modal.Body>

                <Modal.Footer className="gap-2">
                  <Button
                    slot="close"
                    variant="tertiary"
                    className="w-full rounded-lg"
                    style={{ boxShadow: "none", outline: "none" }}
                  >
                    Cancel
                  </Button>

                  <Button
                    slot="close"
                    className="w-full rounded-lg bg-indigo-600"
                    style={{ boxShadow: "none", outline: "none" }}
                    onClick={() =>
                      handleUpdateUserRole(
                        isUser.id,
                        isUser.accountType === "seeker"
                          ? "recruiter"
                          : "seeker",
                      )
                    }
                  >
                    Make{" "}
                    {isUser.accountType === "seeker" ? "Recruiter" : "Seeker"}
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      )}

      {/* Ban User Modal */}
      {isUser && (
        <Modal isOpen={isBanDialogOpen} onOpenChange={setIsBanDialogOpen}>
          <Modal.Backdrop>
            <Modal.Container placement="center">
              <Modal.Dialog className="rounded-xl pt-4 max-w-sm">
                <form
                  className="w-full"
                  onSubmit={(e) => {
                    onSubmit(e, isUser);
                  }}
                >
                  <div className="flex items-center gap-3">
                    {isUser.image ? (
                      <Image
                        src={isUser.image}
                        alt={isUser.name || "User"}
                        width={100}
                        height={100}
                        className="h-10 w-10 rounded-full object-cover select-none"
                      />
                    ) : (
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground/10 font-semibold select-none">
                        {isUser.name?.[0]?.toUpperCase() || "?"}
                      </div>
                    )}

                    <div className="min-w-0">
                      <Modal.Heading className="text-lg">
                        {isUser.banned ? "Unban user" : "Ban user"}
                      </Modal.Heading>

                      <div className="truncate text-sm text-muted">
                        {isUser.name}
                      </div>
                    </div>
                  </div>

                  <Separator className="mt-4" />

                  <Modal.Body className="pt-3">
                    {isUser.banned ? (
                      <p className="text-sm leading-6 text-muted">
                        This will restore{" "}
                        <span className="font-medium text-foreground">
                          {isUser.name}
                        </span>
                        &apos;s access to the platform.
                      </p>
                    ) : (
                      <FieldGroup className="space-y-2">
                        <TextField
                          aria-label="Ban Reason"
                          isRequired
                          variant="secondary"
                          name="banReason"
                          validate={(value) => {
                            if (!value) {
                              return "State the reason for the ban";
                            }

                            if (value.length < 3) {
                              return "At least 3 characters";
                            }

                            return null;
                          }}
                        >
                          <Input
                            placeholder="Ban Reason"
                            className="rounded-md border border-foreground/15 bg-white dark:border-white/15 dark:bg-black/70 focus-within:border-foreground/40 dark:focus-within:border-white/25"
                            style={{ boxShadow: "none" }}
                          />
                          <FieldError />
                        </TextField>

                        <Select
                          isRequired
                          variant="secondary"
                          placeholder="Ban Period"
                          aria-label="Ban Period"
                          name="banPeriod"
                        >
                          <Select.Trigger
                            style={{ boxShadow: "none" }}
                            className="rounded-md border border-foreground/15 bg-white dark:border-white/15 dark:bg-black/70 focus-within:border-foreground/40 dark:focus-within:border-white/25"
                          >
                            <Select.Value className="text-sm" />
                            <Select.Indicator />
                          </Select.Trigger>

                          <Select.Popover className="rounded-md">
                            <ListBox>
                              <ListBox.Item
                                id="86400"
                                textValue="24h"
                                className="rounded-md"
                                style={{ boxShadow: "none", outline: "none" }}
                              >
                                24h
                                <ListBox.ItemIndicator />
                              </ListBox.Item>

                              <ListBox.Item
                                id="259200"
                                textValue="3 Days"
                                className="rounded-md"
                                style={{ boxShadow: "none", outline: "none" }}
                              >
                                3 Days
                                <ListBox.ItemIndicator />
                              </ListBox.Item>

                              <ListBox.Item
                                id="604800"
                                textValue="7 Days"
                                className="rounded-md"
                                style={{ boxShadow: "none", outline: "none" }}
                              >
                                7 Days
                                <ListBox.ItemIndicator />
                              </ListBox.Item>

                              <ListBox.Item
                                id="2592000"
                                textValue="Permanent"
                                className="rounded-md"
                                style={{ boxShadow: "none", outline: "none" }}
                              >
                                Permanent
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            </ListBox>
                          </Select.Popover>

                          <FieldError>Select ban duration</FieldError>
                        </Select>
                      </FieldGroup>
                    )}
                  </Modal.Body>

                  <Modal.Footer className="gap-2">
                    <Button
                      variant="tertiary"
                      slot="close"
                      className="w-full rounded-lg"
                      style={{ boxShadow: "none", outline: "none" }}
                    >
                      Cancel
                    </Button>

                    <Button
                      type="submit"
                      className={`w-full rounded-lg text-white ${
                        isUser.banned
                          ? "bg-emerald-600 dark:bg-emerald-700"
                          : "bg-warning dark:bg-yellow-700"
                      }`}
                      style={{ boxShadow: "none", outline: "none" }}
                    >
                      {isUser.banned ? "Unban User" : "Ban User"}
                    </Button>
                  </Modal.Footer>
                </form>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      )}

      {/* Delete User Modal */}
      {isUser && (
        <AlertDialog
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialog.Backdrop>
            <AlertDialog.Container placement="center">
              <AlertDialog.Dialog className="rounded-xl sm:max-w-100">
                <AlertDialog.Header>
                  <AlertDialog.Heading className="text-xl">
                    Delete User Permanently?
                  </AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body>
                  <p>
                    This will permanently delete{" "}
                    <span className="text-foreground font-medium">
                      {isUser.name}
                    </span>{" "}
                    and all of their data. This action cannot be undone.
                  </p>
                </AlertDialog.Body>
                <AlertDialog.Footer className="justify-between">
                  <Button
                    slot="close"
                    variant="tertiary"
                    className="rounded-lg w-full"
                    style={{ outline: "none", boxShadow: "none" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="danger"
                    className="rounded-lg w-full"
                    style={{ outline: "none", boxShadow: "none" }}
                    onClick={() => handleDelete(isUser.id)}
                  >
                    Delete User
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

export default Users;

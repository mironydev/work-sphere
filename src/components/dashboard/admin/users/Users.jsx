"use client";

import {
  AlertDialog,
  Button,
  ListBox,
  Modal,
  Separator,
  Table,
  Select,
  Input,
  FieldError,
  Fieldset,
  TextField,
  FieldGroup,
  Form,
  EmptyState,
} from "@heroui/react";
import Image from "next/image";
import { capitalize, formatDate } from "@/lib/helpers";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { TrashBin } from "@gravity-ui/icons";
import { toast } from "sonner";
import { updatePlan } from "@/lib/actions/plan";
import UserStats from "./UserStats";
import { useState } from "react";
import { PackageOpen } from "lucide-react";

const Users = ({ allUsers, allPlans }) => {
  const router = useRouter();

  const users = allUsers.filter((user) => user.role !== "admin");

  const [filteredUsers, setFilteredUsers] = useState(users);

  const formatPlanName = (planName) => {
    return planName
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const updateUserPlan = async (userId, plan) => {
    const res = await updatePlan(userId, plan);
    if (res.modifiedCount) {
      toast.success(`Plan upgraded to ${formatPlanName(plan)}`);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    const { error } = await authClient.admin.setRole({
      userId,
      role: newRole,
    });

    if (!error) {
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
      toast.success(`${data.user.name} has been banned`);
    }
  };

  const unbanUser = async (userId) => {
    const { data, error } = await authClient.admin.unbanUser({
      userId: userId,
    });
    if (!error) {
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
    } else {
      await banUser(user.id, reason, time);
    }

    router.refresh();
  };

  const handleDelete = async (userId) => {
    const { error } = await authClient.admin.removeUser({
      userId: userId,
    });
    if (!error) {
      toast.success("User Deleted.");
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
      <Table className="rounded-lg p-0 border border-foreground/15 mt-6 bg-background dark:bg-foreground/3">
        <Table.ScrollContainer>
          <Table.Content aria-label="Users">
            <Table.Header>
              <Table.Column isRowHeader className="py-4 rounded-none">
                Name
              </Table.Column>
              <Table.Column>Email</Table.Column>
              <Table.Column>Role</Table.Column>
              <Table.Column>Joined</Table.Column>
              <Table.Column>Banned</Table.Column>
              <Table.Column className="rounded-none">Actions</Table.Column>
            </Table.Header>
            <Table.Body
              renderEmptyState={() => (
                <EmptyState className="flex h-full w-full flex-col items-center justify-center gap-4 text-center py-16">
                  <PackageOpen />
                  <span className="text-sm text-muted">No results found</span>
                </EmptyState>
              )}
            >
              {filteredUsers.map((user) => {
                const filteredPlans = allPlans.filter((plan) =>
                  plan.name.startsWith(user.role),
                );
                return (
                  <Table.Row key={user.id}>
                    {/* Name */}
                    <Table.Cell className="rounded-none py-5 font-medium">
                      <div className="flex items-center gap-3">
                        {user.image ? (
                          <Image
                            src={user.image}
                            alt={user.name}
                            width={50}
                            height={50}
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center text-xs font-semibold">
                            {user.name?.[0]?.toUpperCase()}
                          </div>
                        )}
                        <p>{user.name}</p>
                      </div>
                    </Table.Cell>

                    {/* Email */}
                    <Table.Cell>{user.email}</Table.Cell>

                    {/* Role */}
                    <Table.Cell>
                      <span
                        className={`capitalize px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-indigo-600/10 dark:bg-indigo-600/20 text-indigo-700 dark:text-indigo-400"
                            : user.role === "seeker"
                              ? "bg-foreground/10 dark:bg-stone-800"
                              : user.role === "recruiter"
                                ? "bg-orange-600/10 text-orange-700 dark:text-orange-400"
                                : ""
                        }`}
                      >
                        {user.role}
                      </span>
                    </Table.Cell>

                    {/* Joined */}
                    <Table.Cell className="text-xs text-muted whitespace-nowrap">
                      {formatDate(user.createdAt)}
                    </Table.Cell>

                    {/* Suspended */}
                    <Table.Cell>{user.banned ? "Yes" : "No"}</Table.Cell>

                    {/* Actions */}
                    <Table.Cell className="rounded-none">
                      <Modal>
                        <Button
                          style={{ boxShadow: "none", outline: "none" }}
                          className="rounded-sm bg-foreground/95 text-background"
                        >
                          View Details
                        </Button>
                        <Modal.Backdrop>
                          <Modal.Container>
                            <Modal.Dialog className="sm:max-w-110">
                              <Modal.CloseTrigger />
                              <Modal.Header>
                                <Modal.Heading className="text-center">
                                  User Details
                                </Modal.Heading>
                                <Separator className="my-2" />
                                {user.image ? (
                                  <Image
                                    src={user.image}
                                    alt={user.name}
                                    width={100}
                                    height={100}
                                    className="w-10 h-10 rounded-full"
                                  />
                                ) : (
                                  <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                                    {user.name?.[0]?.toUpperCase()}
                                  </div>
                                )}
                              </Modal.Header>
                              <div className="sm:text-sm font-medium space-y-1 mt-2">
                                <p>
                                  Name:{" "}
                                  <span className="font-normal">
                                    {user.name}
                                  </span>
                                </p>
                                <p>
                                  Email:{" "}
                                  <span className="font-normal flex flex-wrap">
                                    {user.email}
                                    <span
                                      className={`ml-2 px-2 py-0.5 rounded-sm text-[11px] font-semibold ${
                                        user.emailVerified
                                          ? "bg-green-600/10 dark:bg-green-600/20 text-green-600 dark:text-green-400"
                                          : "bg-red-600/10 dark:bg-red-600/20 text-red-600 dark:text-red-400"
                                      }`}
                                    >
                                      {user.emailVerified
                                        ? "Verified"
                                        : "Not verified"}
                                    </span>
                                  </span>
                                </p>
                                <p>
                                  Role:{" "}
                                  <span className="font-normal capitalize">
                                    {user.role}{" "}
                                  </span>
                                </p>
                                <p>
                                  Plan:{" "}
                                  <span className="font-normal">
                                    {formatPlanName(user.plan)}{" "}
                                  </span>
                                </p>
                                <p>
                                  Created:{" "}
                                  <span className="font-normal">
                                    {formatDate(user.createdAt)}
                                  </span>
                                </p>
                                <p>
                                  Updated:{" "}
                                  <span className="font-normal">
                                    {formatDate(user.updatedAt)}
                                  </span>
                                </p>
                                <p>
                                  Banned:{" "}
                                  <span className="font-normal">
                                    {user.banned ? "Yes" : "No"}
                                  </span>
                                </p>
                                <div
                                  className="space-y-1"
                                  style={{
                                    visibility: user.banned
                                      ? "visible"
                                      : "hidden",
                                  }}
                                >
                                  <p>
                                    Ban reason:{" "}
                                    <span className="font-normal">
                                      {user.banned
                                        ? user.banReason
                                        : "placeholder"}
                                    </span>
                                  </p>
                                  <p>
                                    Ban Expires:{" "}
                                    <span className="font-normal">
                                      {user.banned
                                        ? formatDate(user.banExpires)
                                        : "placeholder"}
                                    </span>
                                  </p>
                                </div>
                              </div>

                              <Separator className="mt-5 mb-6" />

                              <Modal.Footer>
                                <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between sm:items-center">
                                  <div className="flex flex-row flex-wrap justify-between sm:justify-start gap-3 sm:gap-2">
                                    <AlertDialog>
                                      <AlertDialog.Trigger className="flex-1 sm:flex-none">
                                        <button className="bg-background p-2.5 px-3 rounded-sm cursor-pointer text-sm font-semibold w-full whitespace-nowrap">
                                          Make{" "}
                                          {user.role === "seeker"
                                            ? "Recruiter"
                                            : "Seeker"}
                                        </button>
                                      </AlertDialog.Trigger>
                                      <AlertDialog.Backdrop>
                                        <AlertDialog.Container placement="center">
                                          <AlertDialog.Dialog className="sm:max-w-100">
                                            <AlertDialog.CloseTrigger />
                                            <AlertDialog.Header>
                                              <AlertDialog.Icon status="default" />
                                              <AlertDialog.Heading>
                                                Change User Role to{" "}
                                                {capitalize(
                                                  user.role === "seeker"
                                                    ? "recruiter"
                                                    : "seeker",
                                                )}
                                                ?
                                              </AlertDialog.Heading>
                                            </AlertDialog.Header>
                                            <AlertDialog.Body>
                                              <p>
                                                This action will change the role
                                                of{" "}
                                                <span className="bg-foreground/5 text-foreground font-medium my-1 w-fit px-2 py-0.5 rounded-sm">
                                                  User: {user.name}
                                                </span>{" "}
                                                from x to y
                                              </p>
                                            </AlertDialog.Body>
                                            <AlertDialog.Footer>
                                              <Button
                                                slot="close"
                                                variant="tertiary"
                                              >
                                                Cancel
                                              </Button>
                                              <Button
                                                slot="close"
                                                className="bg-indigo-600"
                                                onClick={() =>
                                                  updateUserRole(
                                                    user.id,
                                                    user.role === "seeker"
                                                      ? "recruiter"
                                                      : "seeker",
                                                  )
                                                }
                                              >
                                                Make{" "}
                                                {user.role === "seeker"
                                                  ? "Recruiter"
                                                  : "Seeker"}
                                              </Button>
                                            </AlertDialog.Footer>
                                          </AlertDialog.Dialog>
                                        </AlertDialog.Container>
                                      </AlertDialog.Backdrop>
                                    </AlertDialog>

                                    <Select
                                      className="flex-1 w-full whitespace-nowrap"
                                      onChange={(value) => {
                                        updateUserPlan(user.id, value);
                                      }}
                                      placeholder="Update Plan"
                                      aria-label="update plan"
                                    >
                                      <Select.Trigger
                                        className={
                                          "bg-background rounded-sm py-2.5"
                                        }
                                        style={{
                                          boxShadow: "none",
                                          outline: "none",
                                        }}
                                      >
                                        <Select.Value
                                          className={
                                            "font-medium text-sm text-center"
                                          }
                                        />
                                        <Select.Indicator />
                                      </Select.Trigger>
                                      <Select.Popover
                                        className={
                                          "rounded-lg dark:bg-stone-950"
                                        }
                                      >
                                        <ListBox className="rounded-sm">
                                          {filteredPlans.map((plan) => (
                                            <ListBox.Item
                                              key={plan._id}
                                              isDisabled={
                                                user.plan === plan.name
                                              }
                                              id={plan.name}
                                              textValue={formatPlanName(
                                                plan.name,
                                              )}
                                              className="rounded-lg ring-black ring-0"
                                            >
                                              {formatPlanName(plan.name)}
                                              {user.plan === plan.name && (
                                                <span className="text-xs"></span>
                                              )}
                                              <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                          ))}
                                        </ListBox>
                                      </Select.Popover>
                                    </Select>
                                  </div>

                                  <div className="flex flex-wrap gap-3 sm:gap-2">
                                    <AlertDialog>
                                      <AlertDialog.Trigger className="flex-1 sm:flex-none">
                                        <button
                                          className={`p-2.5 px-3 rounded-sm transition-colors cursor-pointer text-sm font-semibold w-full ${
                                            user.banned
                                              ? "bg-green-600/10 hover:bg-green-600/20 text-green-600 dark:text-green-400"
                                              : "bg-yellow-600/10 hover:bg-yellow-600/20 text-yellow-600 dark:text-yellow-400"
                                          }`}
                                        >
                                          <span>
                                            {user.banned ? "Unban" : "Ban"}
                                          </span>
                                        </button>
                                      </AlertDialog.Trigger>
                                      <AlertDialog.Backdrop>
                                        <AlertDialog.Container placement="center">
                                          <AlertDialog.Dialog className="sm:max-w-100">
                                            <AlertDialog.CloseTrigger />
                                            <AlertDialog.Header>
                                              <AlertDialog.Icon
                                                status={
                                                  user.banned
                                                    ? "default"
                                                    : "warning"
                                                }
                                              />
                                            </AlertDialog.Header>
                                            <AlertDialog.Body>
                                              <Form
                                                className="w-full max-w-96"
                                                onSubmit={(e) => {
                                                  onSubmit(e, user);
                                                }}
                                              >
                                                <Fieldset>
                                                  <Fieldset.Legend>
                                                    {user.banned
                                                      ? "Unban User?"
                                                      : `Ban ${user.name}?`}
                                                  </Fieldset.Legend>
                                                  <p>
                                                    {user.banned
                                                      ? `Do you want to unban ${user.name}?`
                                                      : "State the reason for the ban and its duration."}
                                                  </p>
                                                  {user.banned ? (
                                                    ""
                                                  ) : (
                                                    <FieldGroup>
                                                      <TextField
                                                        aria-label="Ban Reason"
                                                        isRequired
                                                        name="banReason"
                                                        validate={(value) => {
                                                          if (!value) {
                                                            return "State the reason for the ban";
                                                          }
                                                          if (
                                                            value.length < 3
                                                          ) {
                                                            return "At least 3 characters";
                                                          }
                                                          return null;
                                                        }}
                                                      >
                                                        <Input
                                                          placeholder="Ban Reason"
                                                          className="rounded-md focus:ring-0 aria-invalid:focus:ring-red-500 aria-invalid:focus:border-transparent shadow-none bg-stone-100 dark:bg-black/80 border border-transparent focus:border-foreground/50 hover:bg-stone-200"
                                                        />
                                                        <FieldError />
                                                      </TextField>

                                                      <Select
                                                        isRequired
                                                        variant="primary"
                                                        placeholder="Ban Period"
                                                        aria-label="Ban Period"
                                                        name="banPeriod"
                                                        validate={(value) => {
                                                          if (!value) {
                                                            return "State the ban period";
                                                          }
                                                          return null;
                                                        }}
                                                      >
                                                        <Select.Trigger
                                                          className="bg-background rounded-md py-2.5 hover:bg-stone-200 dark:hover:bg-black border border-transparent aria-invalid:border-red-500 aria-invalid:ring-1 aria-invalid:ring-red-500"
                                                          style={{
                                                            boxShadow: "none",
                                                            outline: "none",
                                                          }}
                                                        >
                                                          <Select.Value
                                                            className={
                                                              "text-sm"
                                                            }
                                                          />
                                                          <Select.Indicator />
                                                        </Select.Trigger>
                                                        <Select.Popover
                                                          className={
                                                            "rounded-lg"
                                                          }
                                                        >
                                                          <ListBox className="rounded-sm">
                                                            <ListBox.Item
                                                              style={{
                                                                boxShadow:
                                                                  "none",
                                                                outline: "none",
                                                              }}
                                                              id="86400"
                                                              textValue="24h"
                                                              className="rounded-lg"
                                                            >
                                                              24h
                                                              <ListBox.ItemIndicator />
                                                            </ListBox.Item>
                                                            <ListBox.Item
                                                              style={{
                                                                boxShadow:
                                                                  "none",
                                                                outline: "none",
                                                              }}
                                                              id="259200"
                                                              textValue="3 Days"
                                                              className="rounded-lg"
                                                            >
                                                              3 Days
                                                              <ListBox.ItemIndicator />
                                                            </ListBox.Item>
                                                            <ListBox.Item
                                                              style={{
                                                                boxShadow:
                                                                  "none",
                                                                outline: "none",
                                                              }}
                                                              id="604800"
                                                              textValue="7 Days"
                                                              className="rounded-lg"
                                                            >
                                                              7 Days
                                                              <ListBox.ItemIndicator />
                                                            </ListBox.Item>
                                                            <ListBox.Item
                                                              style={{
                                                                boxShadow:
                                                                  "none",
                                                                outline: "none",
                                                              }}
                                                              id="2592000"
                                                              textValue="permanent"
                                                              className="rounded-lg"
                                                            >
                                                              Permanent
                                                              <ListBox.ItemIndicator />
                                                            </ListBox.Item>
                                                          </ListBox>
                                                        </Select.Popover>
                                                        <FieldError />
                                                      </Select>
                                                    </FieldGroup>
                                                  )}
                                                  <Fieldset.Actions className="flex justify-end">
                                                    <Button
                                                      variant="tertiary"
                                                      slot="close"
                                                      style={{
                                                        boxShadow: "none",
                                                        outline: "none",
                                                      }}
                                                    >
                                                      Cancel
                                                    </Button>
                                                    <Button
                                                      style={{
                                                        boxShadow: "none",
                                                        outline: "none",
                                                      }}
                                                      className={`${!user.banned ? "bg-yellow-500 dark:bg-yellow-600" : "bg-emerald-600 dark:bg-emerald-700"} `}
                                                      type="submit"
                                                    >
                                                      {user.banned
                                                        ? "Unban"
                                                        : "Ban User"}
                                                    </Button>
                                                  </Fieldset.Actions>
                                                </Fieldset>
                                              </Form>
                                            </AlertDialog.Body>
                                            <AlertDialog.Footer></AlertDialog.Footer>
                                          </AlertDialog.Dialog>
                                        </AlertDialog.Container>
                                      </AlertDialog.Backdrop>
                                    </AlertDialog>

                                    <AlertDialog>
                                      <AlertDialog.Trigger className="flex-1">
                                        <button className="bg-red-600/10 hover:bg-red-600/20 text-red-600 dark:text-red-400 rounded-sm p-3 cursor-pointer w-full flex justify-center">
                                          <TrashBin />
                                        </button>
                                      </AlertDialog.Trigger>
                                      <AlertDialog.Backdrop>
                                        <AlertDialog.Container placement="center">
                                          <AlertDialog.Dialog className="sm:max-w-100">
                                            <AlertDialog.CloseTrigger />
                                            <AlertDialog.Header>
                                              <AlertDialog.Icon status="danger" />
                                              <AlertDialog.Heading>
                                                Delete User Permanently?
                                              </AlertDialog.Heading>
                                            </AlertDialog.Header>
                                            <AlertDialog.Body>
                                              <p>
                                                This will permanently delete{" "}
                                                <span className="bg-foreground/5 text-foreground font-medium my-1 w-fit px-2 py-0.5 rounded-sm">
                                                  User: {user.name}
                                                </span>{" "}
                                                and all of their data. This
                                                action cannot be undone.
                                              </p>
                                            </AlertDialog.Body>
                                            <AlertDialog.Footer>
                                              <Button
                                                slot="close"
                                                variant="tertiary"
                                              >
                                                Cancel
                                              </Button>
                                              <Button
                                                variant="danger"
                                                onClick={() =>
                                                  handleDelete(user.id)
                                                }
                                              >
                                                Delete User
                                              </Button>
                                            </AlertDialog.Footer>
                                          </AlertDialog.Dialog>
                                        </AlertDialog.Container>
                                      </AlertDialog.Backdrop>
                                    </AlertDialog>
                                  </div>
                                </div>
                              </Modal.Footer>
                            </Modal.Dialog>
                          </Modal.Container>
                        </Modal.Backdrop>
                      </Modal>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default Users;

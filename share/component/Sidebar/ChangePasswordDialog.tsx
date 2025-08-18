"use client";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useClickOutside } from 'primereact/hooks';

const changePWSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z.string().min(1, "New password is required"),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "New password cannot be the same as the current password",
    path: ["newPassword"],
  });

type ChangePWFormData = z.infer<typeof changePWSchema>;

export default function ChangePasswordDialog() {
  const [changeDialogvisible, setChangeDialogvisible] = useState(false);
  const dialogContentRef = useRef<HTMLDivElement>(null);

  useClickOutside(dialogContentRef, () => {
    setChangeDialogvisible(false);
    reset();
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePWFormData>({
    resolver: zodResolver(changePWSchema),
    defaultValues: {
      username: "",
      oldPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = (data: ChangePWFormData) => {
    const reqData = { ...data };
    console.log("Form submitted:", reqData);
    reset();
    setChangeDialogvisible(false);
  };

  return (
    <div style={{padding:'5px'}}>
      {/* <br/> */}
      <Button
        label="Change Password"
        onClick={() => setChangeDialogvisible(true)}
        type="button"
        style={{ fontSize: "12px" }}
        text
        raised
      />
      <Dialog
        header="Do you want to change your password?"
        visible={changeDialogvisible}
        style={{ width: "35vw", textAlign: "center" }}
        onHide={() => {
          setChangeDialogvisible(false);
          reset();
        }}
        dismissableMask={true}
      >
        <div ref={dialogContentRef}>
          <p className="m-0">
            Fill in your username, old password, and new password.
          </p>
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              render={({ field }) => (
                <span
                  className="p-float-label"
                  style={{ display: "inline-flex" }}
                >
                  <InputText
                    id="username"
                    className="p-inputtext-lg"
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <label htmlFor="username">Username</label>
                </span>
              )}
              name="username"
              control={control}
              defaultValue=""
            />
            {errors.username && <div>{errors.username.message}</div>}

            <br />
            <br />
            <Controller
              render={({ field }) => (
                <span
                  className="p-float-label"
                  style={{ display: "inline-flex" }}
                >
                  <Password
                    id="oldPassword"
                    className="p-inputtext-lg"
                    value={field.value}
                    onChange={field.onChange}
                    feedback={false}
                    toggleMask
                  />
                  <label htmlFor="oldPassword">Old Password</label>
                </span>
              )}
              name="oldPassword"
              control={control}
              defaultValue=""
            />
            {errors.oldPassword && <div>{errors.oldPassword.message}</div>}
            <br />
            <br />

            <Controller
              render={({ field }) => (
                <span
                  className="p-float-label"
                  style={{ display: "inline-flex" }}
                >
                  <Password
                    id="newPassword"
                    className="p-inputtext-lg"
                    value={field.value}
                    onChange={field.onChange}
                    toggleMask
                  />
                  <label htmlFor="newPassword">New Password</label>
                </span>
              )}
              name="newPassword"
              control={control}
              defaultValue=""
            />
            {errors.newPassword && <div>{errors.newPassword.message}</div>}

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button label="Confirm" icon="pi pi-check" type="submit" autoFocus />
              <Button
                label="No"
                icon="pi pi-times"
                onClick={() => {
                  reset();
                  setChangeDialogvisible(false);
                }}
                className="p-button-text"
              />
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
}
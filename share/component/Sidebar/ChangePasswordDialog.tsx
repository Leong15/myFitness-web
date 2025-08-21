"use client";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useClickOutside } from "primereact/hooks";
import styles from "../../css/ChangePasswordDialog.module.css";

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
    <div className={styles.container}>
      <Button
        label="Change Password"
        onClick={() => setChangeDialogvisible(true)}
        type="button"
        className={styles.changePasswordButton}
        text
        raised
      />
      <Dialog
        header="Change Password"
        visible={changeDialogvisible}
        className={styles.dialog}
        onHide={() => {
          setChangeDialogvisible(false);
          reset();
        }}
        dismissableMask={true}
      >
        <div ref={dialogContentRef}>
          <p className="m-0">Please fill in below fields.</p>
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              render={({ field }) => (
                <span className={`${styles.inputContainer} p-float-label`}>
                  <InputText
                    id="username"
                    className={`${styles.input} p-inputtext-lg`}
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <label className={`${styles.inputLabel}`} htmlFor="username">
                    Username
                  </label>
                </span>
              )}
              name="username"
              control={control}
              defaultValue=""
            />
            {errors.username && (
              <div className={styles.error}>{errors.username.message}</div>
            )}

            <br />
            <br />
            <Controller
              render={({ field }) => (
                <span className={`${styles.inputContainer} p-float-label`}>
                  <Password
                    id="oldPassword"
                    className={`${styles.input} p-inputtext-lg`}
                    value={field.value}
                    onChange={field.onChange}
                    feedback={false}
                    toggleMask
                  />
                  <label
                    className={`${styles.inputLabel}`}
                    htmlFor="oldPassword"
                  >
                    Old Password
                  </label>
                </span>
              )}
              name="oldPassword"
              control={control}
              defaultValue=""
            />
            {errors.oldPassword && (
              <div className={styles.error}>{errors.oldPassword.message}</div>
            )}
            <br />
            <br />

            <Controller
              render={({ field }) => (
                <span className={`${styles.inputContainer} p-float-label`}>
                  <Password
                    id="newPassword"
                    className={`${styles.input} p-inputtext-lg`}
                    value={field.value}
                    onChange={field.onChange}
                    toggleMask
                  />
                  <label
                    className={`${styles.inputLabel}`}
                    htmlFor="newPassword"
                  >
                    New Password
                  </label>
                </span>
              )}
              name="newPassword"
              control={control}
              defaultValue=""
            />
            {errors.newPassword && (
              <div className={styles.error}>{errors.newPassword.message}</div>
            )}

            <div className={styles.buttonContainer}>
              <Button
                label="Confirm"
                icon="pi pi-check"
                type="submit"
                autoFocus
              />
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

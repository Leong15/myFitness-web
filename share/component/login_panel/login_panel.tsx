"use client";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Panel } from "primereact/panel";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import React, { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import ForgetPassword_dialog from "../forgetPassword_dialog/ForgetPassword_dialog";

interface FormData {
  username: string;
  password: string;
}



function Login_Panel() {
  const toast = useRef<Toast>(null);
  const [forgetDialogVisible, setForgetDialogVisible] = React.useState(false);
  const { status } = useSession();
  const router = useRouter();

  // Initialize useForm at the top to avoid conditional hook calls
  const defaultValues: FormData = { username: "", password: "" };
  const form = useForm<FormData>({ defaultValues });
  const { control, formState: { errors }, handleSubmit } = form;

  // Redirect if authenticated
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/foodDashboard");
    }
  }, [status, router]);

  const onSubmit = async (data: FormData) => {
    const result = await signIn("credentials", {
      redirect: false,
      username: data.username,
      password: data.password,
    });

    if (result?.error) {
      toast.current?.show({
        severity: "error",
        summary: "Login Failed",
        detail: result?.error,
      });
    } else {
      router.push("/foodDashboard");
    }
  };

  // Handle forget password dialog close
  const handleClose = () => {
    setForgetDialogVisible(false);
  };

  // Get form error message with proper typing
  const getFormErrorMessage = (name: keyof FormData) => {
    return errors[name] ? (
      <small className="p-error">{errors[name]?.message}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  // Render loading state
  if (status === "loading") return <p>Loading...</p>;

  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "10% auto" }}>
      <Toast ref={toast} />
      <Panel header="Login" style={{ fontSize: "13px" }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: "center" }}>
          <Controller
            name="username"
            control={control}
            rules={{ required: "Username is required." }}
            render={({ field }) => (
              <>
                <span className="p-float-label" style={{ display: "inline-flex" }}>
                  <InputText
                    {...field}
                    className="p-inputtext-lg"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  <label htmlFor={field.name}>Username</label>
                </span>
                <br />
                {getFormErrorMessage("username")}
              </>
            )}
          />
          <br />
          <br />
          <Controller
            name="password"
            control={control}
            rules={{ required: "Password is required." }}
            render={({ field, fieldState }) => (
              <>
                <span className="p-float-label" style={{ display: "inline-flex" }}>
                  <Password
                    id={field.name}
                    {...field}
                    style={{ fontSize: "12px" }}
                    inputRef={field.ref}
                    className={classNames("p-inputtext-lg", { "p-invalid": fieldState.error })}
                    feedback={false}
                    toggleMask
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  <label htmlFor={field.name}>Password</label>
                </span>
                <br />
                {getFormErrorMessage("password")}
              </>
            )}
          />
          <br />
          <div style={{ textAlign: "center" }}>
            <Button
              label="Forget Password?"
              onClick={() => setForgetDialogVisible(true)}
              type="button"
              severity="secondary"
              text
              style={{ fontSize: "12px" }}
            />
          </div>
          <br />
          <Button
            label="Login"
            type="submit"
            icon="pi pi-arrow-circle-right"
            className="btn"
            style={{ fontSize: "12px" }}
          />
        </form>
      </Panel>


      <ForgetPassword_dialog open={forgetDialogVisible} onClose={handleClose}/>
    </div>
  );
}

export default Login_Panel;
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from '../../css/ChangePasswordDialog.module.css';

const endpoint = "http://localhost:3000/";

interface FormData {
  username: string;
  email: string;
}

interface ForgetPasswordDialogProps {
    open: boolean;
    onClose: () => void;
  }

  const forgetPWSchema = z
    .object({
      username: z.string().min(1, "Username is required"),
      email: z.string().min(1, "Email is required"),
    })

type ForgetPWFormData = z.infer<typeof forgetPWSchema>;

async function forgetPassword() {

  // try {
  //   const res = await axios.post(`${endpoint}/forget_password`, {
  //     credentials
  //   }, {withCredentials: true});
  //   setUsername('');
  //   setEmail('');
  //   forgetShow();
  //   return res;
  // } catch (error) {
  //   setUsername('');
  //   setEmail('');
  //   forgetErrorShow();
  //   console.log(error); 
  // }
} 
// const forgetShow = () => {
//   toast.current?.show({
//     severity: "success",
//     summary: "New Password will sent to your email",
//   })
// };
// const forgetErrorShow = () => {
//   toast.current?.show({
//     severity: "error",
//     summary: "Account not found",
//   })
// };

// const show = () => {
//   toast.current?.show({
//     severity: "error",
//     summary: "Wrong Username or Password",
//     detail: form.getValues("username"),
//   })
// };

function ForgetPassword_dialog(props: ForgetPasswordDialogProps) {
  const { onClose, open } = props;

  const defaultValues: FormData = { username: "", email: "" };
  const form = useForm<ForgetPWFormData>({ resolver: zodResolver(forgetPWSchema),defaultValues });
  const { control, formState: { errors }, handleSubmit,reset } = form;

  const forgetfooterContent = (
    <div style={{display:'flex',  justifyContent: 'space-between'}}>        
      <Button label="Yes" icon="pi pi-check" type="submit" form="forgetPWform" autoFocus />
      <Button label="No" icon="pi pi-times" onClick={() => {reset();onClose();}} className="p-button-text" />
    </div>
  );

  return(
    <Dialog header="Are you forgot your password?" visible={open} style={{ fontSize: '13px', textAlign:'center'}} onHide={() => onClose()} footer={forgetfooterContent}>
        <p className="m-0">
          Fill in your email and username. <br/>
          New Password will be send to your email.
        </p>
        <br/>
        <form id="forgetPWform" onSubmit={handleSubmit(forgetPassword)} style={{ textAlign: "center" }}>
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
                {errors.username && <div className={styles.error}>{errors.username.message}</div>}
              </>
            )}
          />
          <br />
          <br />
          <Controller
            name="email"
            control={control}
            rules={{ required: "Email is required." }}
            render={({ field }) => (
              <>
                <span className="p-float-label" style={{ display: "inline-flex" }}>
                  <InputText
                    {...field}
                    className="p-inputtext-lg"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  <label htmlFor={field.name}>Email</label>
                </span>
                <br />
                {errors.email && <div className={styles.error}>{errors.email.message}</div>}
              </>
            )}
          />
        </form>
    </Dialog>
  )
}

export default ForgetPassword_dialog


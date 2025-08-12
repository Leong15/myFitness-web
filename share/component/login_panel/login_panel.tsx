"use client";

import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel';
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import React, { useEffect, useRef, useState,useContext  } from "react";
import { Controller, useForm } from "react-hook-form";
import { Dialog } from 'primereact/dialog';
import { useRouter } from "next/navigation";

/* const endpoint = "http://10.10.10.215:8080/order_sla_report_uat"; */
/* const endpoint = "http://localhost:3000"; */

function Login_Panel() {
  const toast = useRef(null);
  const [forgetDialogVisible, setForgetDialogVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
/*   const { isLoggedIn, setIsLoggedIn,loginStaff,setLoginStaff } = useContext(LoginContext); */
  const [loginStaff,setLoginStaff] = useState('');

  const show = () => {
    toast.current.show({
      severity: "error",
      summary: "Wrong Username or Password",
      detail: form.getValues("value"),
    })
  };

  const forgetShow = () => {
    toast.current.show({
      severity: "success",
      summary: "New Password will sent to your email",
    })
  };
  const forgetErrorShow = () => {
    toast.current.show({
      severity: "error",
      summary: "Account not found",
    })
  };

/*   async function loginUser(credentials) {
    try {
      const res = await axios.post(`${endpoint}/login_token`, {
        credentials
      }, {withCredentials: true});
      return res;
    } catch (error) {
      show();
      console.log(error); 
    }
   } */

/*   async function forgetPassword(credentials) {
    try {
      const res = await axios.post(`${endpoint}/forget_password`, {
        credentials
      }, {withCredentials: true});
      setUsername('');
      setEmail('');
      forgetShow();
      return res;
    } catch (error) {
      setUsername('');
      setEmail('');
      forgetErrorShow();
      console.log(error); 
    }
  } */
  

  const defaultValues = { value: "" };
  const form = useForm(defaultValues);
  const errors = form.formState.errors;
  const router = useRouter();

  const handleSubmit = async e => {
    const username = e.username;
    const password = e.password;
    console.log(e)
    router.push('/dashboard');
    
/*     await loginUser({
      username,
      password
    }); */
    
/*     const res = await axios.get(`${endpoint}/check_login`, { withCredentials: true });
    if(res.status==200){
      setIsLoggedIn(true);
      setLoginStaff(res.data.message);
    }else{
      setIsLoggedIn(false);
    } */
  }

/*   const getFormErrorMessage = (name) => {
    return errors[name] ? (
      <small className="p-error">{errors[name].message}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  }; */

  const forgetfooterContent = (
    <div style={{display:'flex',  justifyContent: 'space-between'}}>        
      <Button label="Yes" icon="pi pi-check" onClick={() => {/* forgetPassword({username,email}),setForgetDialogVisible(false)*/}} autoFocus />
      <Button label="No" icon="pi pi-times" onClick={() => {/* setUsername(''),
      setEmail(''),setForgetDialogVisible(false) */}} className="p-button-text" />
    </div>
  );

  return (
    <div style={{display:'flex',justifyContent:'center',margin: '10% auto'}}>
        <Panel header="Login" style={{fontSize:'13px'}}>
            <form onSubmit={form.handleSubmit(handleSubmit)} style={{textAlign:'center'}} >
                <Toast ref={toast} />
                <Controller
                    name="username"
                    control={form.control}
                    rules={{ required: 'Username is required.' }}
                    render={({ field }) => (
                        <>
                            <span className="p-float-label" style={{display:'inline-flex'}}>
                            <InputText {...field} className="p-inputtext-lg"/>
                                <label htmlFor="field.name">Username</label>
                                
                            </span>
                            <br/>
                            {/* {getFormErrorMessage(field.name)} */}
                        </>
                    )}
                />
                <br/><br/>
                <Controller
                    name="password"
                    control={form.control}
                    rules={{ required: 'Password is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <span className="p-float-label" style={{display:'inline-flex'}}>
                                <Password id={field.name} {...field} style={{fontSize:'12px'}} inputRef={field.ref} className={classNames('p-inputtext-lg',{ 'p-invalid': fieldState.error })} feedback={false} toggleMask  />
                                <label htmlFor="field.name">Password</label>
                            </span>
                            <br/>
                            {/* {getFormErrorMessage(field.name)} */}
                        </>
                    )}
                />
                <br/>

                <div style={{textAlign:'center'}}>
                  <Dialog header="Are you forgot your password?" visible={forgetDialogVisible} style={{ fontSize: '13px', textAlign:'center'}} onHide={() => setForgetDialogVisible(false)} footer={forgetfooterContent}>
                      <p className="m-0">
                        Fill in your email and username. <br/>
                        New Password will be send to your email.
                      </p>
                      <br/>
                      <span className="p-float-label"style={{display:'inline-flex'}}>
                          <InputText id="username" className="p-inputtext-lg" value={username} onChange={(e) => setUsername(e.target.value)}/>
                          <label htmlFor="username">Username</label>
                      </span>
                      <br/><br/>
                      <span className="p-float-label"style={{display:'inline-flex'}}>
                          <InputText id="email" className="p-inputtext-lg" value={email} onChange={(e) => setEmail(e.target.value)}/>
                          <label htmlFor="email">Email</label>
                      </span>
                  </Dialog>
                  <Button label="Forget Password?" onClick={() => setForgetDialogVisible(true)} type="button" severity="secondary" text style={{fontSize:'12px'}}  />
                </div>        
                <br/>     
                <Button label="Login" type="submit" icon="pi pi-arrow-circle-right" className="btn" style={{fontSize:'12px'}} />
                
            </form>
        </Panel>
    </div>
  );
}

export default Login_Panel;




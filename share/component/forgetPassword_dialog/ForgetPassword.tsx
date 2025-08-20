  const forgetfooterContent = (
    <div style={{display:'flex',  justifyContent: 'space-between'}}>        
      <Button label="Yes" icon="pi pi-check" onClick={() => {/* forgetPassword({username,email}),setForgetDialogVisible(false)*/}} autoFocus />
      <Button label="No" icon="pi pi-times" onClick={() => {/* setUsername(''),
      setEmail(''),setForgetDialogVisible(false) */}} className="p-button-text" />
    </div>
  );

     async function forgetPassword(credentials) {
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
    } 
      const forgetShow = () => {
    toast.current?.show({
      severity: "success",
      summary: "New Password will sent to your email",
    })
  };
  const forgetErrorShow = () => {
    toast.current?.show({
      severity: "error",
      summary: "Account not found",
    })
  };

    const show = () => {
    toast.current?.show({
      severity: "error",
      summary: "Wrong Username or Password",
      detail: form.getValues("username"),
    })
  };


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
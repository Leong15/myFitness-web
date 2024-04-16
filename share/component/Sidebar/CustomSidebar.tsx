"use client";
import React,{ useState, useRef,Dispatch, SetStateAction } from 'react';

import { Sidebar } from "primereact/sidebar";
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Avatar } from 'primereact/avatar';  
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Password } from "primereact/password";
import { Splitter, SplitterPanel } from 'primereact/splitter';
import {Dropdown} from "primereact/dropdown"

interface IHealth_Info {
    age: number;
    height: number;
    weight: number;
}

const CustomSidebar = (props:{to_visible: boolean, onHide:any}) => {
    const toast = useRef(null);
    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [email, setEmail] = useState('');
    const [changeDialogvisible, setChangeDialogvisible] = useState(false);
    const [bmr, setBmr] = useState<number>(0);
    const [tdee, setTdee] = useState<number>(0);
    const [selectedLifeStyle, setSelectedLifeStyle] = useState(null);
    const [numForlifeStyle,setNumForlifeStyle] = useState<number>(0);

    const [health_Info,setHealth_Info] = useState<IHealth_Info>({
        age:0,
        height:0,
        weight:0
    })

    const lifeStyle = [
        { name: 'Almost no exercise', code: 'zero' },
        { name: 'Exercise 1-3 days a week', code: 'oneToThree' },
        { name: 'Exercise 4-5 days a week', code: 'fourTofive' },
        { name: 'Exercise 6-7 days a week', code: 'sixToSeven' },
        { name: 'Exercise or physical labor work for long periods of time', code: 'tons' }
    ];

    const handleLifeStyleSelection = (value:any)=>{
        setSelectedLifeStyle(value);
        if(value != null){
            switch(value.code){
                case 'zero':{
                    setNumForlifeStyle(1.2); 
                    break;
                }
                case 'oneToThree':{
                    setNumForlifeStyle(1.375);
                    break;
                }
                case 'fourTofive':{
                    setNumForlifeStyle(1.55);
                    break;
                }
                case 'sixToSeven':{
                    setNumForlifeStyle(1.72);
                    break;
                }
                case 'tons':{
                    setNumForlifeStyle(1.9);
                    break;
                }
            }
        }
    }
    const handleAgeChange = (value:any) => {
        // Only update age if the value is not null
        if (value !== null) {
            setHealth_Info((prevInfo) => ({ ...prevInfo, age: value }));
        }
    };
    const handleHeightChange = (value:any) => {
        // Only update age if the value is not null
        if (value !== null) {
            setHealth_Info((prevInfo) => ({ ...prevInfo, height: value }));
        }
    };
    const handleWeightChange = (value:any) => {
        // Only update age if the value is not null
        if (value !== null) {
            setHealth_Info((prevInfo) => ({ ...prevInfo, weight: value }));
        }
    };
    const cal_BMR_TDEE=()=>{
        const b = (13.7*health_Info.weight)+(5*health_Info.height)-(6.8*health_Info.age)+66;
        setBmr(b);
        setTdee(Math.round((b*numForlifeStyle)));
    };

    const customIcons = (
        <React.Fragment>
            <Toast ref={toast} />
            <ConfirmDialog />
            <div className="card flex flex-wrap gap-2 justify-content-center">
                <Button label="Log out" link />
            </div>
        </React.Fragment>
    );

    const changefooterContent = (
        <div style={{display:'flex',  justifyContent: 'space-between'}}>        
        <Button label="Confirm" icon="pi pi-check" onClick={() => {setChangeDialogvisible(false)}} autoFocus />
        <Button label="No" icon="pi pi-times" onClick={() => {setUsername(''),
        setEmail(''),
        setOldPassword(''),
        setNewPassword(''),setChangeDialogvisible(false)}} className="p-button-text" />
        </div>
    );

    return(
        <Sidebar
            visible={props.to_visible}
            onHide={props.onHide}
            header={<div ><Avatar icon="pi pi-user" size="large" shape="circle"/><strong style={{paddingLeft:'8px', fontSize:'14px'}}>Amy</strong></div>}
            icons={customIcons}
        >
            <Button label="Change Password" onClick={() => setChangeDialogvisible(true)}  type="button" style={{fontSize:'12px'}} text raised />
            <Dialog header="Do you want to change your password?" visible={changeDialogvisible} style={{ width: '35vw', textAlign:'center'}} onHide={() => setChangeDialogvisible(false)} footer={changefooterContent}>
                    <p className="m-0">
                    Fill in your username, old password and new password.
                    </p>
                    <br/>
                    <span className="p-float-label"style={{display:'inline-flex'}}>
                        <InputText id="username" className="p-inputtext-lg" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <label htmlFor="username">Username</label>
                    </span>
                    <br/><br/>
                    <span className="p-float-label"style={{display:'inline-flex'}}>
                        <Password id="newPassword" className="p-inputtext-lg" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} feedback={false} toggleMask />
                        <label htmlFor="oldPassword">Old Password</label>
                    </span>
                    <br/><br/>
                    <span className="p-float-label"style={{display:'inline-flex'}}>
                        <Password id="newPassword" className="p-inputtext-lg" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} toggleMask />
                        <label htmlFor="newPassword">newPassword</label>
                    </span>
            </Dialog>
            <div>
            <Splitter style={{ height: '100%', paddingTop:'20px'}} layout="vertical">
                <SplitterPanel><strong>Gender:</strong></SplitterPanel>
                <SplitterPanel><label htmlFor="age" className="font-bold block mb-2">Life Style:</label><Dropdown style={{overflow:'hidden'}} value={selectedLifeStyle} onChange={(e) => handleLifeStyleSelection(e.value)} options={lifeStyle} optionLabel="name" 
                placeholder="Select Your Life Style" className="w-full md:w-14rem" /></SplitterPanel>
                <SplitterPanel><label htmlFor="age" className="font-bold block mb-2">Age:</label><InputNumber style={{overflow:'hidden'}} id="age" value={health_Info.age} onValueChange={(e)=>handleAgeChange(e.value)} disabled/></SplitterPanel>
                <SplitterPanel><strong>Height:</strong><InputNumber style={{overflow:'hidden'}} value={health_Info.height} onValueChange={(e)=>handleHeightChange(e.value)} suffix="cm" disabled/* style={{width:'90%'}} */ /></SplitterPanel>
                <SplitterPanel><strong>Weight:</strong><InputNumber style={{overflow:'hidden'}} value={health_Info.weight} onValueChange={(e)=>handleWeightChange(e.value)} suffix="kg" disabled/></SplitterPanel>
                <SplitterPanel><strong>BMR(基礎代謝率):</strong><br/><div style={{textAlign:'center'}}>{bmr} Cal</div></SplitterPanel>
                <SplitterPanel><strong>TDEE(總熱量消耗):</strong><br/><div style={{textAlign:'center'}}>{tdee} Cal</div></SplitterPanel>
                <SplitterPanel><strong>Recived Cal Today:</strong><br/><div style={{textAlign:'center'}}>{health_Info.weight} Cal</div></SplitterPanel>
                <SplitterPanel><strong>Potein:</strong><br/><div style={{textAlign:'center'}}>xxx Po</div></SplitterPanel>
            </Splitter>
            </div>
            <div style={{display:'flex',justifyContent:'center',paddingTop:'10px'}}>
                <Button label="Calculate" onClick={() => cal_BMR_TDEE()}  type="button" style={{fontSize:'20px'}} />
            </div>
        </Sidebar>
    )
}

export default CustomSidebar;
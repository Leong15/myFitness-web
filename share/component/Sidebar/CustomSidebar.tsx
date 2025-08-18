"use client";
import React, { useState, useRef } from 'react';
import { Sidebar } from "primereact/sidebar";
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from "primereact/dropdown";
import { Avatar } from 'primereact/avatar';  
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import ChangePasswordDialog from './ChangePasswordDialog';
import styles from '../../css/Sidebar.module.css';

interface IHealth_Info {
    age: number;
    height: number;
    weight: number;
}

const CustomSidebar = (props: { to_visible: boolean, onHide: any }) => {
    const toast = useRef(null);

    const [bmr, setBmr] = useState<number>(0);
    const [tdee, setTdee] = useState<number>(0);
    const [selectedLifeStyle, setSelectedLifeStyle] = useState(null);
    const [numForlifeStyle, setNumForlifeStyle] = useState<number>(0);

    const [health_Info, setHealth_Info] = useState<IHealth_Info>({
        age: 0,
        height: 0,
        weight: 0
    });

    const lifeStyle = [
        { name: 'Almost no exercise', code: 'zero' },
        { name: 'Exercise 1-3 days a week', code: 'oneToThree' },
        { name: 'Exercise 4-5 days a week', code: 'fourTofive' },
        { name: 'Exercise 6-7 days a week', code: 'sixToSeven' },
        { name: 'Exercise or physical labor work for long periods of time', code: 'tons' }
    ];

    const handleLifeStyleSelection = (value: any) => {
        setSelectedLifeStyle(value);
        if (value != null) {
            switch (value.code) {
                case 'zero': {
                    setNumForlifeStyle(1.2); 
                    break;
                }
                case 'oneToThree': {
                    setNumForlifeStyle(1.375);
                    break;
                }
                case 'fourTofive': {
                    setNumForlifeStyle(1.55);
                    break;
                }
                case 'sixToSeven': {
                    setNumForlifeStyle(1.72);
                    break;
                }
                case 'tons': {
                    setNumForlifeStyle(1.9);
                    break;
                }
            }
        }
    };

    const handleAgeChange = (value: any) => {
        if (value !== null) {
            setHealth_Info((prevInfo) => ({ ...prevInfo, age: value }));
        }
    };

    const handleHeightChange = (value: any) => {
        if (value !== null) {
            setHealth_Info((prevInfo) => ({ ...prevInfo, height: value }));
        }
    };

    const handleWeightChange = (value: any) => {
        if (value !== null) {
            setHealth_Info((prevInfo) => ({ ...prevInfo, weight: value }));
        }
    };

    const cal_BMR_TDEE = () => {
        const b = (13.7 * health_Info.weight) + (5 * health_Info.height) - (6.8 * health_Info.age) + 66;
        setBmr(b);
        setTdee(Math.round((b * numForlifeStyle)));
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

    return (
        <Sidebar
            visible={props.to_visible}
            onHide={props.onHide}
            header={<div><Avatar icon="pi pi-user" size="large" shape="circle" /><strong className={styles.headerText}>Amy</strong></div>}
            icons={customIcons}
            className={styles.sidebar}
        >
            <ChangePasswordDialog />
            <div>
                <Splitter className={styles.splitter} layout="vertical">
                    <SplitterPanel><strong>Gender:</strong></SplitterPanel>
                    <SplitterPanel>
                        <label htmlFor="lifeStyle" className="font-bold block mb-2">Life Style:</label>
                        <Dropdown 
                            id="lifeStyle"
                            value={selectedLifeStyle} 
                            onChange={(e) => handleLifeStyleSelection(e.value)} 
                            options={lifeStyle} 
                            optionLabel="name" 
                            placeholder="Select Your Life Style" 
                            className={`w-full md:w-14rem ${styles.noOverflow}`}
                        />
                    </SplitterPanel>
                    <SplitterPanel>
                        <label htmlFor="age" className="font-bold block mb-2">Age:</label>
                        <InputNumber 
                            id="age" 
                            value={health_Info.age} 
                            onValueChange={(e) => handleAgeChange(e.value)} 
                            className={styles.noOverflow}
                        />
                    </SplitterPanel>
                    <SplitterPanel>
                        <strong>Height:</strong>
                        <InputNumber 
                            value={health_Info.height} 
                            onValueChange={(e) => handleHeightChange(e.value)} 
                            suffix="cm" 
                            className={styles.noOverflow}
                        />
                    </SplitterPanel>
                    <SplitterPanel>
                        <strong>Weight:</strong>
                        <InputNumber 
                            value={health_Info.weight} 
                            onValueChange={(e) => handleWeightChange(e.value)} 
                            suffix="kg" 
                            className={styles.noOverflow}
                        />
                    </SplitterPanel>
                    <SplitterPanel>
                        <strong>BMR(基礎代謝率):</strong><br />
                        <div className={styles.centeredText}>{bmr} Cal</div>
                    </SplitterPanel>
                    <SplitterPanel>
                        <strong>TDEE(總熱量消耗):</strong><br />
                        <div className={styles.centeredText}>{tdee} Cal</div>
                    </SplitterPanel>
                    <SplitterPanel>
                        <strong>Recived Cal Today:</strong><br />
                        <div className={styles.centeredText}>{health_Info.weight} Cal</div>
                    </SplitterPanel>
                    <SplitterPanel>
                        <strong>Potein:</strong><br />
                        <div className={styles.centeredText}>xxx g</div>
                    </SplitterPanel>
                </Splitter>
            </div>
            <div className={styles.buttonContainer}>
                <Button 
                    label="Calculate" 
                    onClick={() => cal_BMR_TDEE()} 
                    type="button" 
                    className={styles.calculateButton} 
                />
            </div>
        </Sidebar>
    );
};

export default CustomSidebar;
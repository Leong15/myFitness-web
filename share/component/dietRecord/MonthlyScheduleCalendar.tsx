"use client";

import React, { useEffect, useState } from 'react';
import { Calendar } from 'primereact/calendar';
import PlanDialog from './PlanDialog';

interface Plan {
    date: Date;
    description: string;
}

const MonthlyScheduleCalendar: React.FC = () => {
    // Static data for scheduled plans
    const plans: Plan[] = [
        { date: new Date(2025, 6, 20), description: 'Client review session at 4 PM' },
        { date: new Date(2025, 7, 5), description: 'Team meeting at 10 AM' },
        { date: new Date(2025, 7, 12), description: 'Project deadline: Website launch' },
        { date: new Date(2025, 7, 20), description: 'Client review session at 2 PM' },
    ];

    // State for selected date
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [visible, setVisible] = useState<boolean>(false);

    const handleClose = () => {
        setVisible(false);
    };

    // Find plan for selected date
    const selectedPlan = selectedDate
        ? plans.find(plan => {
              const planDate = new Date(plan.date);
              return (
                  planDate.getDate() === selectedDate.getDate() &&
                  planDate.getMonth() === selectedDate.getMonth() &&
                  planDate.getFullYear() === selectedDate.getFullYear()
              );
          })
        : null;

    // Custom date template to show checkmark on scheduled dates
    const dateTemplate = (date: { day: number; month: number; year: number }) => {
        const currentDate = new Date(date.year, date.month, date.day);
        const hasPlan = plans.some(plan => {
            const planDate = new Date(plan.date);
            return (
                planDate.getDate() === currentDate.getDate() &&
                planDate.getMonth() === currentDate.getMonth() &&
                planDate.getFullYear() === currentDate.getFullYear()
            );
        });

        return (
            <div className="relative">
                
                {hasPlan ? (
                    <>
                    <b style={{color:'red'}}>{date.day}</b>
                    <span className="absolute top-0 right-0 text-green-500 text-xs">✓</span></>
                ): (
                    <>{date.day}</>
                )}
            </div>
        );
    };
    useEffect(()=>{
        selectedPlan?setVisible(true):setVisible(false)
    },[selectedPlan])

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Schedule Calendar</h2>
            <div className="card p-4">
                <Calendar
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.value as Date | null)}
                    inline
                    dateTemplate={dateTemplate}
                    className="w-full"
                />
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded">
                <h3 className="text-lg font-semibold">
                    {selectedDate ? 'Plan for ' +selectedDate.toLocaleDateString() : 'Please select a date'}
                </h3>
                {selectedPlan ? (
                    <PlanDialog header={selectedDate ? "Plan for " + selectedDate.toLocaleDateString() : 'Select a date'}
                    open={visible} onClose={handleClose}/>
                    
                ) : (
                    <p className="mt-2 text-gray-500">No plan scheduled for this date.</p>
                )}
            </div>
        </div>
    );
};

export default MonthlyScheduleCalendar;
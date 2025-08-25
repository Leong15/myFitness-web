"use client";

import { Dialog } from "primereact/dialog";
import { useClickOutside } from "primereact/hooks";
import { useRef } from "react";
import PlanPicklist from "./PlanPicklist";

interface PlanDialogProps {
  header: string;
  open: boolean;
  onClose: () => void;
}

const PlanDialog = (props:PlanDialogProps) => {
    const { header, onClose, open } = props;
    const dialogContentRef = useRef<HTMLDivElement>(null);

    useClickOutside(dialogContentRef, () => {
        onClose();
    
    });

    return(
        <Dialog header={header} visible={open} onHide={() => onClose()} dismissableMask={true}>
            <div ref={dialogContentRef}>
                <PlanPicklist />
            </div>
        </Dialog>
    )
}

export default PlanDialog;
import CustomMenubar from "../../../share/component/Menubar/CustomMenubar";

export default function DashLayout ({
    children
}:{
    children:React.ReactNode
}){
    return(
        <>
            <CustomMenubar />
            {children}
        </>
    )
}
import {Sidebar} from "../../layout/Sidebar/Sidebar";
import {PlayList} from "./PlayLists";

export function AllList() {
    return(
        <>
            <div className="container">
                <Sidebar/>
                <PlayList/>
                <AllList/>
            </div>
        </>
    )
}
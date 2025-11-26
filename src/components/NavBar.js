import { Sidebar } from 'primereact/sidebar';
import {useSelector,useDispatch} from "react-redux";
import {updateShowMenu, updateShowSidebar} from "../store/user/userSlice";
import Nav from "./Nav";
export default function NavBar() {
    const currentUser = useSelector(state => state.currentUser)
    const dispatch = useDispatch();
    return(
        <Sidebar style={{width:'260px'}} visible={currentUser.showSidebar} onHide={() => dispatch(updateShowSidebar(false))}>
            <Nav></Nav>
        </Sidebar>
    )
}
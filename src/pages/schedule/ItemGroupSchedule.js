import moment from "moment";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import ItemSchedule from "./ItemSchedule";

export default function ItemGroupSchedule(props) {
    const {item,refresh,close}=props;
    useEffect(()=>{
        console.log("item",item)
    },[])

    const formatDateRelative = (dateString) => {
        console.log("dateString",dateString)
        const targetDate = moment(dateString,'YYYY-MM-DD').startOf('day');
        const today = moment().startOf('day'); // Dùng ngày hiện tại

        const diffInDays = today.diff(targetDate, 'days');

        if (diffInDays === 0) {
            return "Hôm nay";
        } else if (diffInDays === 1) {
            return "1 ngày trước";
        } else if (diffInDays > 1) {
            return `${diffInDays} ngày trước`;
        } else if (diffInDays === -1) {
            return "Ngày mai";
        } else if (diffInDays < -1) {
            return `${Math.abs(diffInDays)} ngày sau`;
        } else {
            return "Ngày không xác định"; // Trường hợp chưa xử lý
        }
    };
    return <div className={`item-group-notification` }>
        <div className={'item-group-notification-header'}>
            <div className={'item-group-notification-header-date'}>{item.date}</div>
            <div className={'item-group-notification-header-datesep'}></div>
            <div className={'item-group-notification-header-date-ago'}>{formatDateRelative(item.date)}</div>
        </div>
        <div className={'item-group-notification-content'}>
            {
                item.items.map((info,index)=>(
                    <ItemSchedule close={close} refresh={refresh} item={info}>
                    </ItemSchedule>
                ))
            }

        </div>
    </div>

}
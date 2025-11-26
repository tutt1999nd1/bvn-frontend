import React, {useEffect, useState} from "react";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import {convertToObjectMisa, getEndDayOfMonth, getFirstDayOfMonth} from "../../constants/utils";

export default function ItemDashBoardCurrent(props) {
    const {title, item,type} = props
    const [percent, setPercent] = useState(0)


    useEffect(() => {
        setPercent(calculatePercentageChange(item.current, item.previous))
    }, [item])

    function calculatePercentageChange(currentValue, previousValue) {
        if (previousValue === 0) {
            if (currentValue === 0) {
                return 0; // Trường hợp cả hai tuần đều có số nhân viên mới là 0
            } else {
                return 0; // Trường hợp số nhân viên mới tuần trước là 0, nhưng tuần này khác 0
            }
        }

        const percentageChange = ((currentValue - previousValue) / previousValue) * 100;
        const roundedPercentageChange = Math.abs(percentageChange).toFixed(2);
        return parseFloat(roundedPercentageChange);
    }


    return (
        <div className={'item-dashboard-employee'}>
            <div className={'item-dashboard-employee-header'}>
                <div className={'item-dashboard-tittle'}>
                    {title}
                </div>
                <div className={'item-dashboard-employee-header-time'}>
                    Tháng này
                </div>
            </div>
            <div className={'item-dashboard-employee-total'}>
                <div className={'total'}>
                    {item.current}
                </div>
                {
                    type!="disablePre"?   <div className={`percent ${item.current < item.previous ? 'down' : item.current > item.previous ? 'up' : ''}`}>
                        <div>
                            {item.current < item.previous ? <TrendingDownIcon/> : item.current > item.previous ?
                                <TrendingUpIcon/> : ''}
                        </div>
                        {
                            percent?<div style={{marginLeft: '3px'}}>
                                {percent}%
                            </div>:""
                        }

                    </div>:""
                }



            </div>
            {
                type!="disablePre"? <div className={'item-dashboard-employee-total-pre'}>
                    <div>
                        Tháng trước:{item.previous}
                    </div>
                </div>:""
            }

        </div>
    )
}
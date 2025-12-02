import axiosClient from "../axiosClient";
import API_MAP from "../../constants/api";
import {convertObjectToParameter} from "../../constants/common";

class ApiSchedule{
    search= (body) => {
        return axiosClient.post(API_MAP.SCHEDULE_SEARCH,body)
    }
    get= (body) => {
        return axiosClient.post(API_MAP.SCHEDULE_GET,body)
    }
    getDetail= (body) => {
        return axiosClient.post(API_MAP.SCHEDULE_GET_DETAIL,body)
    }
    create= (body) => {
        return axiosClient.post(API_MAP.SCHEDULE_CREATE,body)
    }
    update= (body) => {
        return axiosClient.post(API_MAP.SCHEDULE_UPDATE,body)
    }
    updateStatus= (body) => {
        return axiosClient.post(API_MAP.SCHEDULE_UPDATE_STATUS,body)
    }
    delete= (body) => {
        return axiosClient.post(API_MAP.SCHEDULE_DELETE,body)
    }


}

const apiSchedule = new ApiSchedule();

export default apiSchedule;
export const OPTION_TOAST = {
    position: "top-right",
    autoClose: 500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
}
export const clearToken = () => {
    localStorage.clear();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("persist:root");
    localStorage.removeItem("accessTokenExp");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("refreshTokenExp");
}
export const compareDate = (a, b) => {
    if (a == "Empty" || b == "Empty") {
        return false
    } else
        return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
}
export const convertObjectToParameter = (obj) => {
    let result = '?';
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key])
                result += encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]) + "&";
        }
    }
    return result;
}
export const convertToAutoComplete = (arr, name) => {
    for (let i = 0; i < arr.length; i++) {
        arr[i].label = arr[i][name];
    }
    arr.sort((a, b) => a[name].localeCompare(b[name]));
    return arr;
}
export const getNameCaddy = (arr, CaddyNo) => {

    let caddy = arr.find(function (obj) {
        return obj.CaddyNo === CaddyNo;
    });
    return caddy ? caddy.CaddyName : '';
}
export const getIdGuestType = (arr, name) => {
    let type = arr.find(function (obj) {
        return obj.label === name;
    });
    return type ? type.id : '';
}
export const convertCustomToAutoComplete = (arr, id, name) => {
    for (let i = 0; i < arr.length; i++) {
        arr[i].label = arr[i][name];
        arr[i].id = arr[i][id];
    }
    return arr;
}
export const convertCaddyToAutoComplete = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        arr[i].label = arr[i]['CaddyName'] + ' - ' + arr[i]['CaddyNo'];
        arr[i].id = arr[i]['CaddyNo'];
    }
    return arr;
}
export const checkDuplicateMember = (arr) => {
    const idSet = new Set();
    for (let i = 0; i < arr.length; i++) {
        const obj = arr[i];
        if (!isNotEmpty(obj.MemberID)) continue;
        if (idSet.has(obj.MemberID)) {
            return true;
        }
        idSet.add(obj.MemberID);
    }
    return false; // Không tìm thấy đối tượng trùng id
}
export const checkDuplicateCaddy = (arr) => {
    const idSet = new Set();
    for (let i = 0; i < arr.length; i++) {
        const obj = arr[i];
        if (!isNotEmpty(obj.CaddyNo)) continue;
        if (idSet.has(obj.CaddyNo)) {
            return true;
        }
        idSet.add(obj.CaddyNo);
    }
    return false; // Không tìm thấy đối tượng trùng id
}

export function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const convertTeeTimeToAutoComplete = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let date = new Date(arr[i].TeeTime);
        arr[i].label = `${date.getUTCHours()}:${date.getUTCMinutes().toString().padStart(2, '0')}`;
    }
    return arr;
}
export const isNotEmpty = (value) => {
    return value !== null && value !== undefined && value !== '';
}
export const getLabelTeeTime = (value) => {
    let date = new Date(value);
    return `${date.getUTCHours()}:${date.getUTCMinutes().toString().padStart(2, '0')}`;
}

export const getDefaultConfigTable = (tableName) => {
    if (tableName == "dossier") {
        let columns = [
            {index:0,name:"ID",code:"id",visible:true,sort:true},
            {index:1,name:"Tên hồ sơ",code:"name",visible:true,sort:true},
            {index:2,name:"Mã hồ sơ",code:"code",visible:true,sort:true},
            {index:3,name:"Số hồ sơ",code:"dossierNumber",visible:true,sort:true},
            {index:4,name:"Đơn vị",code:"organization",visible:true,sort:false},
            {index:5,name:"Nơi lưu trữ",code:"repository",visible:true,sort:false},
            {index:6,name:"Mô tả",code:"describe",visible:true,sort:true},
            {index:7,name:"Trạng thái",code:"status",visible:false,sort:true},
            {index:8,name:"Người lập",code:"archivist",visible:false,sort:true},
            {index:9,name:"Người tạo",code:"createdBy",visible:true,sort:false},
            {index:10,name:"Người quản lý",code:"managedBy",visible:true,sort:false},
            {index:11,name:"Thời gian bắt đầu",code:"startDate",visible:false,sort:false},
            {index:12,name:"Thời gian kết thúc",code:"endDate",visible:false,sort:false},
            {index:13,name:"Số tờ",code:"totalSheets",visible:false,sort:false},
            {index:14,name:"Nhóm hồ sơ",code:"groupDossier",visible:false,sort:false},
            {index:15,name:"Độ bảo mật",code:"security",visible:false,sort:false},
            {index:16,name:"Thời gian bảo quản",code:"storageTime",visible:false,sort:false},
            {index:17,name:"Ngành",code:"branch",visible:false,sort:false},

            {index:18,name:"Ghi chú",code:"description",visible:false},
        ]
        return columns;
    }
    else if (tableName == "dossierLoan") {
        let columns = [
            {index:0,name:"ID",code:"id",visible:true,sort:true},
            {index:1,name:"Tên hồ sơ",code:"name",visible:true,sort:true},
            {index:2,name:"Nhóm hồ sơ",code:"groupDossier",visible:true,sort:false},
            {index:3,name:"Đơn vị",code:"organization",visible:true,sort:false},
            {index:4,name:"Nơi lưu trữ",code:"repository",visible:true,sort:false},
            {index:5,name:"Mô tả",code:"describe",visible:true,sort:true},
            {index:6,name:"Người quản lý",code:"managedBy",visible:true,sort:false},
        ]
        return columns;
    }  else if (tableName == "dossierLoanSearch") {
        let columns = [
            {index:0,name:"ID",code:"id",visible:true,sort:true},
            {index:1,name:"Trạng thái",code:"statusLoan",visible:true,sort:true},
            {index:2,name:"Tên hồ sơ",code:"name",visible:true,sort:true},
            {index:3,name:"Loại tài liệu",code:"isHardCopy",visible:true,sort:true},
            {index:4,name:"Người mượn",code:"userLoan",visible:true,sort:false},
            {index:5,name:"Người quản lý",code:"managedBy",visible:true,sort:true},
            {index:6,name:"Thời gian mượn",code:"loanDate",visible:true,sort:true},
            {index:7,name:"Thời gian trả",code:"returnDate",visible:true,sort:true},
            {index:8,name:"Lý do",code:"descriptionOfLoanUser",visible:true,sort:true},
            {index:9,name:"Ý kiến",code:"descriptionOfManager",visible:true,sort:true},
        ]
        return columns;
    }
    else if(tableName == "document"){
        let columns = [
            {index:0,name:"ID",code:"id",visible:true,sort:true},
            {index:1,name:"Số, ký hiệu văn bản",code:"symbol",visible:true,sort:true},
            {index:2,name:"Trích yếu nội dung văn bản",code:"name",visible:true,sort:true},
            {index:3,name:"Nội dung",code:"description",visible:true,sort:true},
            {index:4,name:"Số đăng ký",code:"documentNumber",visible:false,sort:true},
            {index:5,name:"Người tạo",code:"createdBy",visible:false,sort:false},
            {index:6,name:"Người quản lý",code:"managedBy",visible:true,sort:false},
            {index:7,name:"Người ký",code:"signer",visible:false,sort:true},
            {index:8,name:"Ngày ký",code:"startDate",visible:true,sort:true},
            {index:9,name:"Ngày đến",code:"endDate",visible:false,sort:true},
            {index:10,name:"Hạn xử lý",code:"deadline",visible:false,sort:true},
            {index:11,name:"Số bản lưu",code:"totalCopies",visible:false,sort:true},
            {index:12,name:"Loại văn bản",code:"typeDocument",visible:false,sort:false},
            {index:13,name:"Độ khẩn",code:"urgency",visible:false,sort:false},
            {index:14,name:"Hình thức văn bản",code:"formDocument",visible:false,sort:false},
            {index:15,name:"Độ bảo mật",code:"security",visible:false,sort:false},
            {index:16,name:"File văn bản",code:"attachment",visible:true,sort:false},
            {index:17,name:"Ngành",code:"branch",visible:false,sort:false},
            {index:18,name:"Cơ quan phát hành",code:"organization",visible:false,sort:false},
            // {index:15,name:"Thời gian bảo quản",code:"attachment",visible:false},
            // {index:16,name:"Ngành",code:"appendix",visible:false},
        ]
        return columns;
    }
    else if(tableName == "publishDocument"){
        let columns = [
            {index:1,name:"ID",code:"id",visible:true},
            {index:2,name:"Trích yếu nội dung văn bản",code:"name",visible:true},
            {index:3,name:"Ngày ban hành",code:"publishDate",visible:true},
            {index:4,name:"Đơn vị ban hành",code:"organization",visible:true},
            {index:5,name:"Người ký",code:"signer",visible:true},
            {index:6,name:"Nơi nhận",code:"sendToOrganizations",visible:true},
            {index:7,name:"File đính kèm",code:"attachment",visible:true},
            {index:8,name:"Ghi chú",code:"description",visible:true},

            {index:9,name:"Ngày đến",code:"createdAt",visible:false},
            {index:10,name:"Ngày có hiệu lực",code:"startDate",visible:false},
            {index:11,name:"Ngày hết hạn",code:"endDate",visible:false},
            {index:12,name:"Độ khẩn",code:"urgency",visible:false},
            {index:13,name:"Hình thức văn bản",code:"formDocument",visible:false},
            {index:14,name:"Trạng thái",code:"status",visible:false},

        ]
        return columns;
    }
    else if(tableName == "shareDocument"){
        let columns = [
            {index:1,name:"ID",code:"id",visible:true},
            {index:2,name:"Thời gian chia sẻ",code:"createAt",visible:true},
            {index:3,name:"Người chia sẻ",code:"shareBy",visible:true},
            {index:4,name:"Trích yếu nội dung văn bản",code:"name",visible:true},
            {index:6,name:"Ghi chú",code:"description",visible:true},


        ]
        return columns;
    }
    else if(tableName == "shareDocumentManage"){
        let columns = [
            {index:1,name:"ID",code:"id",visible:true},
            {index:2,name:"Thời gian chia sẻ",code:"createAt",visible:true},
            {index:3,name:"Trích yếu nội dung văn bản",code:"name",visible:true},
            {index:4,name:"Chia sẻ đến cá nhân",code:"shareToUsers",visible:true},
            {index:5,name:"Chia sẻ đến đơn vị",code:"sendToOrganizations",visible:true},
            {index:6,name:"Ghi chú",code:"description",visible:true},
        ]
        return columns;
    }
    else if(tableName=='boss'){
        let columns = [
            {index:1,name:"ID",code:"id",visible:false},
            {index:1,name:"Tên",code:"name",visible:true},
            {index:1,name:"Số điện thoại",code:"phoneNumber",visible:true},
            {index:1,name:"Email",code:"email",visible:true},
            {index:1,name:"Địa chỉ",code:"address",visible:true},
            {index:1,name:"Ghi chú",code:"description",visible:true},

        ]
        return columns;
    }
    else if(tableName=='expense'){
        let columns = [
            {index:1,name:"ID",code:"id",visible:false},
            {index:1,name:"Thời gian",code:"date",visible:true},
            {index:1,name:"Tên",code:"name",visible:true},
            {index:1,name:"Phương tiện",code:"car",visible:true},
            {index:1,name:"Loại chi phí",code:"typeExpense",visible:true},
            {index:1,name:"Số tiền",code:"amount",visible:true},
            {index:1,name:"Số km",code:"odo",visible:true},
            {index:1,name:"Người tạo",code:"createdBy",visible:true},
            {index:1,name:"Ghi chú",code:"description",visible:true},

        ]
        return columns;
    }
    else if(tableName=='checklistCar'){
        let columns = [
            {index:1,name:"ID",code:"id",visible:false},
            {index:1,name:"Tên",code:"name",visible:true},
            {index:1,name:"Đầu mục",code:"itemChecklistCars",visible:true},
            {index:1,name:"Ghi chú",code:"description",visible:true},

        ]
        return columns;
    }
    else if(tableName=='scheduleTemplate'){
        let columns = [
            {index:1,name:"ID",code:"id",visible:false},
            {index:1,name:"Tên",code:"name",visible:true},
            {index:1,name:"Đầu mục",code:"scheduleTemplateItems",visible:true},
            {index:1,name:"Ghi chú",code:"description",visible:true},

        ]
        return columns;
    }
    else if(tableName=='crash-report'){
        let columns = [
            {index:1,name:"ID",code:"id",visible:false},
            {index:1,name:"Thời gian",code:"date",visible:true},
            {index:1,name:"Tên",code:"name",visible:true},
            {index:1,name:"Xe",code:"car",visible:true},
            {index:1,name:"Ghi chú",code:"description",visible:true},

        ]
        return columns;
    }
    else if(tableName=='schedule'){
        let columns = [
            {index:1,name:"ID",code:"id",visible:false},
            {index:1,name:"Thời gian",code:"date",visible:true},
            {index:1,name:"Tên",code:"name",visible:true},
            {index:1,name:"Xe",code:"carName",visible:true},

        ]
        return columns;
    }
    else if(tableName=='maintenance'){
        let columns = [
            {index:1,name:"ID",code:"id",visible:false},
            {index:1,name:"Thời gian",code:"date",visible:true},
            {index:1,name:"Tên",code:"name",visible:true},
            {index:1,name:"Xe",code:"car",visible:true},
            {index:1,name:"Người gửi",code:"createdBy",visible:true},
            {index:1,name:"Ghi chú",code:"description",visible:true},

        ]
        return columns;
    }
}
export const getDefaultColumnsTableTransfer = () => {
    let columns = [
        {index:0,name:"Thời gian bàn giao",code:"transferAt",visible:true},
        {index:1,name:"Trạng thái",code:"status",visible:true},
        {index:2,name:"Tên hồ sơ",code:"name",visible:true},
        {index:3,name:"Mã hồ sơ",code:"code",visible:true},
        {index:4,name:"Người bàn giao",code:"transferBy",visible:true},
        {index:5,name:"Người nhận bàn giao",code:"transferTo",visible:true},
        {index:6,name:"Nội dung bàn giao",code:"description",visible:true},
        {index:7,name:"Ý kiến phản hồi",code:"reason",visible:true},
    ]
    return columns;
}
export const getDefaultColumnsTableTransferDocument = () => {
    let columns = [
        {index:0,name:"Thời gian bàn giao",code:"transferAt",visible:true},
        {index:1,name:"Trạng thái",code:"status",visible:true},
        {index:2,name:"Trích yếu nội dung văn bản",code:"name",visible:true},
        {index:3,name:"Mã văn bản",code:"code",visible:true},
        {index:4,name:"Người bàn giao",code:"transferBy",visible:true},
        {index:5,name:"Người nhận bàn giao",code:"transferTo",visible:true},
        {index:6,name:"Nội dung bàn giao",code:"description",visible:true},
        {index:7,name:"Ý kiến phản hồi",code:"reason",visible:true},
    ]
    return columns;
}
export const getDefaultColumnsPublish = () => {
    let columns = [
        {index:1,name:"ID",code:"id",visible:true},
        {index:2,name:"Ngày đến",code:"createdAt",visible:true},
        {index:3,name:"Ngày ban hành",code:"publishDate",visible:true},
        {index:4,name:"Ngày có hiệu lực",code:"startDate",visible:true},
        {index:5,name:"Ngày hết hạn",code:"endDate",visible:true},
        {index:6,name:"Trích yếu nội dung văn bản",code:"name",visible:true},
        {index:7,name:"Độ khẩn",code:"urgency",visible:false},
        {index:8,name:"Hình thức văn bản",code:"formDocument",visible:false},
        {index:9,name:"Người ký",code:"signer",visible:true},
        {index:10,name:"File đính kèm",code:"attachment",visible:true},
        {index:11,name:"Ghi chú",code:"description",visible:true},
        {index:11,name:"Trạng thái",code:"status",visible:true},

    ]
    return columns;
}
export function filterChildren(data) {
    const idSet = new Set(data.map(item => item.id));

    return data.filter(item => {
        if (item.parentId === null || !idSet.has(item.parentId)) {
            return true;
        }
        return false;
    });
}
export const convertBookGenresToString = (arr) => {
    let result = "";
    for (let i=0;i<arr.length;i++){
        result=result+arr[i]['name']+(i==arr.length-1?"":", ");
    }
    return result;
}
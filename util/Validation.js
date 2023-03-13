//Khai báo 1 prototype chứa các hàm kiểm tra nhập liệu
function Validation() {
    this.kiemTraRong = function (value,idError,name) {
        if(value.trim() === ''){
            document.getElementById(idError).innerHTML = `${name} không được bỏ trống !`;
            return false;
        }
        document.getElementById(idError).innerHTML = '';
        return true;
    }
    this.kiemTraKyTu = function (value,idError,name) {
        var regexLetter = /^[A-Z a-z]+$/;
        //Nếu chuỗi định dạng test thành công value thì true
        if(regexLetter.test(value)){
            document.getElementById(idError).innerHTML = ''
            return true;
        }
        document.getElementById(idError).innerHTML = `${name} tất cả phải là ký tự`;
        return false;
    }
    this.kiemTraEmail = function (value,idError,name) {
        var regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(regexEmail.test(value)) {
            document.getElementById(idError).innerHTML = '';
            return true;
        }
        document.getElementById(idError).innerHTML = `${name} không hợp lệ!`;
        return false;
    }
    this.kiemTraSo = function (value,idError,name) {
        var regexNumber = /^[0-9]+$/;
        if(regexNumber.test(value)){
            document.getElementById(idError).innerHTML = '';
            return true;
        }
        document.getElementById(idError).innerHTML = `${name} không hợp lệ!`;
        return false;
    }

    this.kiemTraDoDai = function (value,idError,name,minLength,maxLength) {
        // 'abcd'.length = 4
        if(value.length > maxLength || value.length < minLength) {
            document.getElementById(idError).innerHTML = `${name} từ ${minLength} đến ${maxLength} ký tự !`;
            return false;
        }
        document.getElementById(idError).innerHTML = '';
        return true;
    }
    this.kiemTraTK = function(value,idError,name,minLength,maxLength) {
        var regexNumber = /^[0-9]+$/;
        if(regexNumber.test(value)){
            // nếu giá trị là số thì bắt đầu thực hiện kiểm tra độ dài
            if(value.length > maxLength || value.length < minLength) {
                document.getElementById(idError).innerHTML = `${name} từ ${minLength} đến ${maxLength} ký số !`;
                return false;
            }
            document.getElementById(idError).innerHTML = '';
            return true;
        } else {
        document.getElementById(idError).innerHTML = `${name} từ ${minLength} đến ${maxLength} ký số !`;
        return false;
        }
    }
    this.kiemTraMK = function(value,idError,name,minLength,maxLength){
        var regexPassW = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/
        if(value.match(regexPassW)){
            // nếu giá trị vào chứa
            if(value.length > maxLength || value.length < minLength) {
                document.getElementById(idError).innerHTML = `${name} từ ${minLength} đến ${maxLength} ký tự (chứa kí ít nhất 1 tự đặt biệt, 1 chữ in hoa, 1 ký tự số) !`;
                return false;
            }
            document.getElementById(idError).innerHTML = '';
            return true;
        }
        else{
            document.getElementById(idError).innerHTML = `${name} từ ${minLength} đến ${maxLength} ký tự (chứa kí ít nhất 1 tự đặt biệt, 1 chữ in hoa, 1 ký tự số) !`;
                return false;
        }
    }
    this.kiemTraLuong = function(value,idError,name,minLength,maxLength){
        var regexNumber = /^[0-9]+$/;
        if(regexNumber.test(value)){
            // nếu giá trị là số thì bắt đầu thực hiện kiểm tra độ dài
            if(value < minLength) {
                document.getElementById(idError).innerHTML = `${name} từ ${minLength} đến ${maxLength} trở lên!`;
                return false;
            }
            document.getElementById(idError).innerHTML = '';
            return true;
        } else {
            document.getElementById(idError).innerHTML = `${name} từ ${minLength} đến ${maxLength} trở lên!`;
        return false;
        }
    }
    this.kiemTraGioLamTrongThang = function(value,idError,name,minLength,maxLength){
        var regexNumber = /^[0-9]+$/;
        if(regexNumber.test(value)){
            // nếu giá trị là số thì bắt đầu thực hiện kiểm tra độ dài
            if(value > maxLength || value < minLength) {
                document.getElementById(idError).innerHTML = `${name} từ ${minLength} đến ${maxLength} giờ!`;
                return false;
            }
            document.getElementById(idError).innerHTML = '';
            return true;
        } else {
        document.getElementById(idError).innerHTML = `${name} từ ${minLength} đến ${maxLength} giờ!`;
        return false;
        }
    }
    this.kiemTraChucVu = function(value,idError,name){
        if(value === '0'){
            document.getElementById(idError).innerHTML = `${name} không hợp lệ. Vui lòng chọn lại!`;
            return false;
        }else{
            document.getElementById(idError).innerHTML = '';
            return true;
        }
    }
}
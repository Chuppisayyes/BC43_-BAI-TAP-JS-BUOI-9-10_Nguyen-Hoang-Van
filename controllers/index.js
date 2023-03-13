// Tính Tổng Lương Nhân Viên
function tinhTongLuongNhanVien(chucVu,luongCoBan){
    var tongLuongNhanVien = 0;
    switch  (chucVu){        
    case 'Sếp': {
        tongLuongNhanVien = luongCoBan*3;
    } break;
    case 'Trưởng phòng': {
        tongLuongNhanVien = luongCoBan*2;
    } break;
    case 'Nhân viên': {
        tongLuongNhanVien = luongCoBan*1;
    } break;
    }
    return tongLuongNhanVien;
}

// Xếp loại nhân viên
function xepLoaiNhanVien(giolam){
    xepLoai = '';
    if(giolam >= 192){
        xepLoai = 'Nhân Viên Xuất Sắc';
    } 
    else if (giolam >= 176){
        xepLoai = 'Nhân Viên Giỏi';
    } 
    else if (giolam >= 160){
        xepLoai = 'Nhân Viên Khá';
    } 
    else{
        xepLoai = 'Nhân Viên Trung Bình';
    }
    return xepLoai;
}

var mangNhanVien = [];
var kiemTra = new Validation();

document.getElementById('btnThemNV').onclick = function () {
    //input: nv: NhanVien
    var nv = new NhanVien();
    nv.taiKhoan = document.querySelector('#tknv').value;
    nv.hoTenNhanVien = document.querySelector('#name').value;
    nv.email = document.querySelector('#email').value;
    nv.matKhau = document.querySelector('#password').value;
    nv.ngayLam = document.querySelector('#datepicker').value;
    nv.luongCoBan = document.querySelector('#luongCB').value;
    nv.chucVu = document.querySelector('#chucVu').value;
    nv.gioLamTrongThang = document.querySelector('#gioLam').value;
    nv.tongLuong = tinhTongLuongNhanVien(nv.chucVu,nv.luongCoBan);
    nv.loaiNhanVien = xepLoaiNhanVien(nv.gioLamTrongThang);
    console.log(nv);
    //Kiểm tra dữ liệu đầu vào 
    var valid = true;
    valid = kiemTra.kiemTraRong(nv.taiKhoan,'error-required-taiKhoan','Tài Khoản') & kiemTra.kiemTraRong(nv.hoTenNhanVien,'error-required-hoTenNhanVien','Họ tên Nhân Viên') & kiemTra.kiemTraRong(nv.email,'error-required-email','Email') & kiemTra.kiemTraRong(nv.matKhau,'error-required-matKhau','Mật Khẩu') & kiemTra.kiemTraRong(nv.ngayLam,'error-required-ngayLam','Ngày Làm') & kiemTra.kiemTraRong(nv.luongCoBan,'error-required-luongCoBan','Lương Cơ Bản') & kiemTra.kiemTraRong(nv.gioLamTrongThang,'error-required-gioLamTrongThang','Giờ Làm Trong Tháng');
    // Kiểm tra Tài Khoản ( 4 - 6 ký số)
    valid = valid & kiemTra.kiemTraTK(nv.taiKhoan,'error-min-max-length-taiKhoan','Tài Khoản',4,6);
    //Kiểm tra định dạng ký tự 
    valid = valid & kiemTra.kiemTraKyTu(nv.hoTenNhanVien,'error-allLetter-hoTenNhanVien','Họ tên nhân viên');
    //Kiểm tra email
    valid = valid & kiemTra.kiemTraEmail(nv.email,'error-email','Email');
    //Kiểm tra mật khẩu
    valid = valid & kiemTra.kiemTraMK(nv.matKhau,'error-matKhau','Mật Khẩu',6,10)
    //Kiểm tra độ dài lương
    valid = valid & kiemTra.kiemTraLuong(nv.luongCoBan,'error-luongCoBan','Lương Cơ Bản',1000000,20000000)
    //Kiểm tra số giờ làm trong tháng
    valid = valid & kiemTra.kiemTraGioLamTrongThang(nv.gioLamTrongThang,'error-gioLamTrongThang','Giờ làm trong tháng',80,200)
    //Kiểm tra chức vụ
    valid = valid & kiemTra.kiemTraChucVu(nv.chucVu,'error-chucVu','Chức Vụ')
   
    if(!valid){
        return;
    }
    //output: 
    //Mỗi lần click thêm nhân viên => thêm vào mảng nhân viên
    mangNhanVien.push(nv);
    console.log('mangNhanVien', mangNhanVien)
    //Từ mảng tạo ra giao diện
    renderTableNhanVien(mangNhanVien);
    //Lưu mảng nhân viên vào store
    luuLocalStrage();
}

//  In Ra Table danh sách nhân viên
function renderTableNhanVien(arrNhanVien) { //input là mangNhanVien = [{taiKhoan:1,hoTenNhanVien:'A'},{taiKhoan:1,hoTenNhanVien:'B'},{}]
    var htmlString = '';
    for (var index = 0; index < arrNhanVien.length; index++) {
        var nv = arrNhanVien[index];
        htmlString += `
            <tr>
                <td>${nv.taiKhoan}</td>
                <td>${nv.hoTenNhanVien}</td>
                <td>${nv.email}</td>
                <td>${nv.ngayLam}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.tongLuong}</td>
                <td>${nv.loaiNhanVien}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaNhanVien('${index}')">Xoá</button>
                    <button class="btn btn-primary mx-2" data-toggle="modal"
                    data-target="#myModal" onclick="layThongTin('${nv.taiKhoan}')">Chỉnh sửa</button>
                </td>
            </tr>
        `
    }
    document.getElementById('tableDanhSach').innerHTML = htmlString;
    return htmlString; ///'<tr>.....</tr>'
}

function layThongTin(taiKhoanClick) {
    // alert(maNhanVienClick);
    for (var index = 0; index < mangNhanVien.length; index++) {
        if (mangNhanVien[index].taiKhoan === taiKhoanClick) {
            //in thông tin nhân viên tìm thấy lên giao diện
            document.getElementById('tknv').value = mangNhanVien[index].taiKhoan;
            document.getElementById('name').value = mangNhanVien[index].hoTenNhanVien;
            document.getElementById('email').value = mangNhanVien[index].email;
            document.getElementById('password').value = mangNhanVien[index].matKhau;
            document.getElementById('datepicker').value = mangNhanVien[index].ngayLam;
            document.getElementById('luongCB').value = mangNhanVien[index].luongCoBan;
            document.getElementById('chucVu').value = mangNhanVien[index].chucVu;
            document.getElementById('gioLam').value = mangNhanVien[index].gioLamTrongThang;
            break;
        }
    }
}



document.getElementById('btnCapNhat').onclick = function () {
    //Input: Lấy thông tin người dùng từ giao diện đã thay đổi đưa vào object

    var nhanVienEdit = new NhanVien();
    nhanVienEdit.taiKhoan = document.getElementById('tknv').value;
    nhanVienEdit.hoTenNhanVien = document.getElementById('name').value;
    nhanVienEdit.email = document.getElementById('email').value;
    nhanVienEdit.matKhau = document.getElementById('password').value;
    nhanVienEdit.ngayLam = document.getElementById('datepicker').value;
    nhanVienEdit.luongCoBan = document.getElementById('luongCB').value;
    nhanVienEdit.chucVu = document.getElementById('chucVu').value;
    nhanVienEdit.gioLamTrongThang = document.getElementById('gioLam').value;
    console.log('nhanVienEdit', nhanVienEdit);
    //Tìm ra nhân viên trong mảng => duyệt mảng lấy mã so sánh
    for (var index = 0; index < mangNhanVien.length; index++) {
        if (mangNhanVien[index].taiKhoan === nhanVienEdit.taiKhoan) {
            //Tìm thấy object nhân viên trong mảng => gán các giá trị của object trong mảng = object edit
            mangNhanVien[index].hoTenNhanVien = nhanVienEdit.hoTenNhanVien;
            mangNhanVien[index].email = nhanVienEdit.email;
            mangNhanVien[index].matKhau = nhanVienEdit.matKhau;
            mangNhanVien[index].ngayLam = nhanVienEdit.ngayLam;
            mangNhanVien[index].luongCoBan = nhanVienEdit.luongCoBan;
            mangNhanVien[index].chucVu = nhanVienEdit.chucVu;
            mangNhanVien[index].gioLamTrongThang = nhanVienEdit.gioLamTrongThang;
            break;
        }
    }
    //Gọi hàm render nhân viên dựa trên mảng có phần tử đã thay đổi
    renderTableNhanVien(mangNhanVien);
    //Lưu store sau khi thay đổi
    luuLocalStrage();



}


//                 0  1  2
//mangNhanVien = [{},{},{}]
function xoaNhanVien(indexDel) {
    //Xử lý xoá object nhân viên trên mảng dựa vào index
    mangNhanVien.splice(indexDel, 1);
    //Gọi hàm tạo lại table nhan viên
    renderTableNhanVien(mangNhanVien);
    // lưu vào localstorage
    luuLocalStrage();
}
//mangNhanVien = [{taiKhoan:1},{taiKhoan:2},{taiKhoan:3}]

//Viết hàm lưu trữ dữ liệu vào localstorage
function luuLocalStrage() {
    //Lưu mangNhanVien vào localstorage
    //B1: Biến đổi mangNhanVien thành string
    var stringMangNhanVien = JSON.stringify(mangNhanVien);
    //B2: Lưu vào localstorage
    localStorage.setItem('mangNhanVien', stringMangNhanVien);
}
function layStore() {

    if (localStorage.getItem('mangNhanVien')) {
        var stringMangNhanVien = localStorage.getItem('mangNhanVien');
        console.log(stringMangNhanVien);
        //Chuyển dữ string liệu về dạng object
        mangNhanVien = JSON.parse(stringMangNhanVien);

        console.log(mangNhanVien);
        //Gọi hàm tạo giao diện từ mảng
        renderTableNhanVien(mangNhanVien);
    }
}

layStore();
//Định nghĩa sự kiện gõ chữ vào ô input
document.getElementById('searchName').oninput = function () {
    //input: từ khoá
    var tuKhoa = document.getElementById('searchName').value;
    tuKhoa = stringToSlug(tuKhoa);
    //output: mangNhanVienTimKiem = [];
    var mangNhanVienTimKiem = [];
    for (var index = 0; index < mangNhanVien.length; index++) {
        //Mỗi lần duyệt lấy ra 1 nhân viên trong mảng
        var nv = mangNhanVien[index];
        //Biến đổi tên nhân viên thành chữ không dấu
        var hoTen = stringToSlug(nv.loaiNhanVien);
        //Lấy ra tên so sánh với từ khoá
        if (hoTen.search(tuKhoa) !== -1) {
            //tìm thấy
            mangNhanVienTimKiem.push(nv);
        }
    }

    renderTableNhanVien(mangNhanVienTimKiem);
}
function stringToSlug(title) { 
    //Đổi chữ hoa thành chữ thường
    slug = title.toLowerCase();

    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, "-");
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');

    return slug;
}
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nhom_da_tao : 0,
            nhom_tham_gia: 0,
            tong_so_lan_dat_giai : 3, 
            ten_sinh_vien: "",
            ten_khoa: "",
            ten_lop: "",
            mat_khau_moi : "",
            nhap_lai_mat_khau_moi : "",
        }
    }
    componentDidMount(){
        fetch("../Control/php/profile.php",{
            method: "post",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                "ma_sinh_vien" : this.props.ma_sinh_vien
            })
        })
        .then(response => response.json())
        .then(data => this.setState({
            nhom_da_tao : data.nhom_da_tao,
            nhom_tham_gia : data.nhom_tham_gia,
            tong_so_lan_dat_giai : data.tong_so_lan_dat_giai,
            ten_sinh_vien : data.ten_lop_khoa[0].ten_sinh_vien, 
            ten_khoa : data.ten_lop_khoa[0].ten_khoa,
            ten_lop : data.ten_lop_khoa[0].ten_lop 
        }));
    }
    handleSubmit = () => {
        const{nhap_lai_mat_khau_moi, mat_khau_moi} = this.state;
        fetch("../Control/php/profile.php",{
            method: "post",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                "doi_mat_khau" : true,
                "ma_sinh_vien" : this.props.ma_sinh_vien,
                "mat_khau_moi" : mat_khau_moi,
                "nhap_lai_mat_khau_moi" : nhap_lai_mat_khau_moi
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.result) alert("Thành Công");
            else alert("Không thành công");
        });
    }
    render() {
        return (
            this.state.ten_sinh_vien != "" && <div className="container px-2 lg:px-16 mx-auto">
                <main className="rounded-md shadow-xl border border-gray-200 px-4 py-4 mt-24 relative pb-8">
                    <p className="text-center flex justify-center absolute left-2/4 top-0 bg-white -translate-y-2/4 -translate-x-2/4 rounded-full border px-2 py-2">
                        <img className="w-28" src="../assets/img/logo.png" />
                    </p>
                    <p className="mt-16 uppercase text-center font-semibold text-2xl lg:text-3xl">trường đại học công nghiệp việt trì</p>

                    <p className="mt-2 text-center text-2xl uppercase font-semibold">Sinh Viên: {this.state.ten_sinh_vien}</p>
                    <p className="mt-2 text-center text-lg uppercase font-semibold">Mã sinh viên: {this.props.ma_sinh_vien}</p>
                    <p className="mt-2 text-center text-lg uppercase font-semibold">Khoa {this.state.ten_khoa} - Lớp {this.state.ten_lop}</p>
                    <div className="grid grid-cols-3 text-center mt-2 lg:px-32 py-2">
                        <p>Số nhóm đã tạo: {this.state.nhom_da_tao}</p>
                        <p>Thành viên của: {this.state.nhom_tham_gia} nhóm</p>
                        <p>Số lần đạt giải: {this.state.tong_so_lan_dat_giai}</p>
                    </div>
                    <div className="mx-auto flex w-6/6 lg:w-3/6 relative border-b border-gray-400 mt-5 mb-5">
                        <p className="text-center absolute  top-0 left-2/4 -translate-y-2/4 
                -translate-x-2/4 bg-bodygreen px-5 text-sm
                bg-white text-black font-semibold uppercase">Đổi Mật Khẩu</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                        <div>
                            <Input
                                handleChange={(e) => this.setState(prev => ({
                                    ...prev,
                                    mat_khau_moi : e.target.value
                                }))}
                                value={this.state.mat_khau_moi} text="Mật khẩu mới"/>
                        </div>
                        <div>
                            <Input
                                handleChange={(e) => this.setState(prev => ({
                                    ...prev,
                                    nhap_lai_mat_khau_moi : e.target.value
                                }))} 
                                value={this.state.nhap_lai_mat_khau_moi} text="Nhập lại mật khẩu mới"/>
                        </div>
                        <div className="lg:col-span-2 text-center mt-4">
                            <Button obj={this.handleSubmit} cssClass="bg-sky-500" text="Đổi Mật Khẩu"/>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}
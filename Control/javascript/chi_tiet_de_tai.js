class ChiTietDeTai extends React.Component {  
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            giang_vien: [],
            thanh_vien_nhom:[],
            nguoi_tao: []
        }
    }
    componentDidMount(){
        fetch("../Control/php/home.php",{
            method: "post",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                "detail" : true,
                "ma_nhom" : this.props.ma_nhom
            })
        })
        .then(response => response.json())
        .then(data => this.setState({
            data : data.result,
            thanh_vien_nhom : data.thanh_vien_nhom,
            giang_vien: data.giang_vien,
            nguoi_tao: data.nguoi_tao
        }));
    }
    displayThanh_vien_Nhom = (thanh_vien_nhom) =>{
        let html = [];
        thanh_vien_nhom.map((item,index) => {
            html.push(
                <p key={index}>{index+1}. {item.ten_sinh_vien} - {item.ten_lop}</p>
            )
        })
        return(
            <>
                <p>Thành viên nhóm: </p>
                <div className="pl-8">
                    {html}
                </div>
            </>
        )
    }
    render(){
        const {data, thanh_vien_nhom, nguoi_tao} = this.state;
        return (
            data  &&  <div className="container px-1 mx-auto">
                <p className="text-xl text-center font-medium uppercase">
                    Bài thi giải {data.ten_giai_thuong}
                </p>
                <p className="text-2xl text-center font-medium uppercase">
                    {data.ten_de_tai}
                </p>
                <div className="grid grid-cols-1 px-8 mt-3 gap-1">
                    <p>Tên nhóm: {data.ten_nhom}</p>
                    <p>Người tạo: {nguoi_tao.ten_sinh_vien} - {nguoi_tao.ten_lop}</p>
                    {(1 + parseInt(data.total_thanh_vien)) > 1 && this.displayThanh_vien_Nhom(thanh_vien_nhom)}
                    <p>Giảng viên HD: {data.ten_giang_vien} - <span className="underline text-sky-600">{data.sdt_giang_vien}</span></p>
                    <p>Tổng số thành viên: {1 + parseInt(data.total_thanh_vien)}</p>
                    <p>Nội dung: {data.noi_dung}</p>
                </div>
                <img style={{zIndex: '-99'}}
                    src="../assets/img/logo.png" className="absolute opacity-10 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"/>
            </div>
        )
    }
}
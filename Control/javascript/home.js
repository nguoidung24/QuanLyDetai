class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            ma_nhom : 0,
            detail : false
        }
    }
    componentDidMount() {
        this.api();
    }
    api = () => {
        fetch("../Control/php/home.php", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})
        }).then(response => response.json())
            .then(data =>
                this.setState((prev)=>({ ...prev, data: data }))
            )
    }
    getCard = (data, giai_thuong) => {
        let srcImage = "";
        let textColor = "";
        if(giai_thuong == 1){
            srcImage = "../assets/img/logo_yellow.png";
            textColor = "text-yellow-900 bg-gray-200 px-2 py-2 truncate";
        }
        else if(giai_thuong == 2){
            srcImage = "../assets/img/logo_gray.png";
            textColor = "text-gray-800 bg-gray-200 px-2 py-2 truncate";
        }
        else{
            srcImage = "../assets/img/logo_copper.png";
            textColor = "text-gray-600 bg-gray-200 px-2 py-2 truncate";
        }
        const html = []
        data.map((value, index) => {
            html.push(
                <div key={index} className="truncate rounded shadow">
                    <img className="w-100 bg-gray-100" src={srcImage} />
                    <div className={textColor}>
                        <p className="font-semibold w-100 py-1 truncate">{value.ten_de_tai}</p>
                        <p className="text-sm truncate">Người tạo: {value.ten_sinh_vien}</p>
                        <p className="text-sm py-1 truncate">GV hướng dẫn: {value.ten_giang_vien}</p>
                        <p className="text-sm truncate">Năm: {value.ngay_tao}</p>
                        <button onClick={() => this.hendleClick_detail(value.ma_nhom)} className="border border-sky-700 text-sky-700 px-4 py-1 mt-1 hover:bg-gray-300 rounded">Chi tiết</button>
                    </div>
                </div>
            )
        })
        return (
            <div className="grid mt-1 lg:grid-cols-5 grid-cols-2 gap-2">
                {html}
            </div>
        )
    }
    hendleClick_detail = (ma_nhom) =>{
        this.setState((prev) => ({
            ...prev,
            detail : true,
            ma_nhom: ma_nhom
        }))
    }
    handleClick_back = () => {
        this.setState((prev) => ({
            ...prev,
            detail : false
        }))      
    }
    getGrid = (text,callBack) =>{
        return (
            <div className="container mx-auto px-2">
                <div className="mx-auto flex w-6/6 lg:w-3/6 relative border-b border-gray-400 mt-3 mb-5">
                <p className="text-center absolute  top-0 left-2/4 -translate-y-2/4 
                -translate-x-2/4 bg-bodygreen px-5 text-sm
                bg-white text-black font-semibold uppercase">Các bài thi được giải {text}</p>
                </div>
            {callBack}
            </div>
        )
    }
    renderDefault(data){
        return (
            (data.length != 0) && 
            <>
                {this.getGrid("nhất",this.getCard(data["giainhat"], 1))}
                {this.getGrid("nhì",this.getCard(data["giainhi"], 2))}
                {this.getGrid("ba",this.getCard(data["giaiba"], 3))}
            </>
        )
    }
    renderDetail(componentDetail){
        return(
            <div className="container px-2 mx-auto">
            <div>
                <button onClick={this.handleClick_back} className="flex gap-2 border-b hover:scale-90">
                    <i className="my-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                            <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                        </svg>
                    </i>
                    <span>Quay lại</span>
                </button>
            </div>
            {componentDetail}
        </div>
        )
    }
    render() {
        const { data,detail,ma_nhom } = this.state;
        return (
            detail == false ?
                this.renderDefault(data):this.renderDetail(<ChiTietDeTai ma_nhom={ma_nhom} />)
        )
    }
}
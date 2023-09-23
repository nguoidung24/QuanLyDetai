class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
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
                this.setState({ data: data })
            )
    }
    getCard = (data, giai_thuong) => {
        let srcImage = "";
        let textColor = "";
        if(giai_thuong == 1){
            srcImage = "../assets/img/logo_yellow.png";
            textColor = "text-yellow-900";
        }
        else if(giai_thuong == 2){
            srcImage = "../assets/img/logo_gray.png";
            textColor = "text-gray-800 ";
        }
        else{
            srcImage = "../assets/img/logo_yellow.png";
            textColor = "text-gray-600 ";
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
                        <button className="border border-sky-700 text-sky-700 px-4 py-1 mt-1 hover:bg-gray-500 rounded">Chi tiết</button>
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
    render() {
        const { data } = this.state;
        return (
           data.length !=0 && <>
                {this.getGrid("nhất",this.getCard(data["giainhat"], 1))}
                {this.getGrid("nhì",this.getCard(data["giainhi"], 2))}
                {this.getGrid("ba",this.getCard(data["giaiba"], 3))}
            </>
        )
    }
}
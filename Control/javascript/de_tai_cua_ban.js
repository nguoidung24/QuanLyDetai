class DeTaiCuaBan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : []
        }
    }
    componentDidMount(){
        fetch("../Control/php/de_tai_cua_ban.php",{
            method: "post",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                "ma_sinh_vien" : this.props.ma_sinh_vien
            })
        })
        .then(response => response.json())
        .then(data=> this.setState({data :  data.data}));
    }
    get_td = (arr) => {
        let html = [];
        Object.keys(arr).forEach(index => {
            html.push(<td className="border-b border-gray-400 py-2" key={index}>{arr[index]}</td>)
        })
        return html;
    }
    getTbody = (arr) =>{
        let html = [];
        arr.map((item, index) => {
            html.push(<tr key={index}>{this.get_td(item)}</tr>)
        })
        return html;
    }
    render(){
        if(this.state.data.length != 0)console.log(this.state.data);
     return (
        <div className="container px-3 lg:px-2 mx-auto">
            <p className="uppercase font-semibold text-center text-xl py-3">Đề Tài Của Bạn</p>
            <div className="grid">
                <table className="text-center w-12/12">
                    <thead>
                        <tr>
                            <th className="border-b border-gray-400">Mã đề tài</th>
                            <th className="border-b border-gray-400">Tên đề tài</th>
                            <th className="border-b border-gray-400">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getTbody(this.state.data)}
                    </tbody>
                </table>
            </div>
        </div>
     )   
    }
}
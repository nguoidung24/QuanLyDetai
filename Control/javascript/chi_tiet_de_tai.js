class ChiTietDeTai extends React.Component {  
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            giang_vien: [],
            thanh_vien_nhom:[]
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
            giang_vien: data.giang_vien
        }));
    }
    render(){
        const {data} = this.state;
        return (
            data  &&  <div className="container px-1 mx-auto">
                <p>{data.ten_nhom}</p>
            </div>
        )
    }
}
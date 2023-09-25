class Dang_Ky_De_Tai extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ten_de_tai: "",
            noi_dung: ""
        }
    }
    handleSubmit = () => {
        const {ten_de_tai, noi_dung} = this.state;
        fetch("../Control/php/dang_ky_de_tai.php",{
            method: "post",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                "ten_de_tai" : ten_de_tai,
                "noi_dung": noi_dung,
                "ma_sinh_vien": this.props.ma_sinh_vien
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.result) alert("Đã gửi yêu cầu");
            else alert("Không thành công");
        });
    }
    render(){
        console.log(this.state);
        return (
            <div className="container mx-auto px-1">
                <div className="grid grid-cols-1 gap-y-2">
                    <>
                        <p className="text-center text-lg font-semibold
                        text-gray-400 uppercase py-2
                        ">Đăng ký đề tài</p>
                    </>
                    <div className="md:w-3/6">
                        <Input value={this.state.ten_de_tai} handleChange={(e) => this.setState((prev)=>({
                            ...prev,
                            ten_de_tai : e.target.value 
                        }))} text="Tên đề tài"/>
                    </div>
                    <>
                        <p className="h5 uppercase text-gray-400
                         font-semibold">
                            Giới thiệu đề tài
                        </p>
                    </>
                    <>
                        <textarea className="w-full h-96
                        rounded outline-none px-2 py-2 border
                        bg-transparent text-gray-400 border-gray-400
                        " rows="4" cols="100"
                        value={this.state.noi_dung}
                        onChange={(e) => this.setState((prev)=>({
                            ...prev,
                            noi_dung : e.target.value
                        }))}
                        >
                        </textarea>
                    </>
                    <>
                        <Button obj={() => this.handleSubmit()} cssClass="bg-cyan-700 w-2/6 md:w-3/12 mx-auto" text="Đăng ký đề tài"/>
                    </>
                </div>
            </div>
        )
    }
}
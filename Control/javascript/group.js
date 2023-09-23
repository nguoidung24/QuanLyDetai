class Select extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return (
            <div className="relative mt-1 lg:mt-2">
                  <select
                  onChange={this.props.onChange}
                    className="w-full
                        outline-none bg-gray-400
                        pt-6 pb-2 rounded-md
                        border px-4 border-gray-400
                        peer text-black truncate">
                            {this.props.options}
                  </select>
                  <label className="absolute top-1 left-4 text-sm
                        italic peer-focus:text-sm
                        text-black transition-all ducation-500
                     ">{this.props.text}</label>
               </div>
        )
    }
}
class Group extends React.Component{
    constructor(props){
        super(props);
        this.state={
            options_Khoa: [],
            options_BoMon:[],
            options_GiangVien: [],
            formSubmit : {
                ten_nhom : "",
                ma_giang_vien : "",
                ma_de_tai : ""
            }
        }
    }
    componentDidMount(){
        fetch("../Control/php/group.php",{})
        .then(response => response.json())
        .then(data => this.setState(
            (prev) => ({
                ...prev,
                options_Khoa: data.getOptions_Khoa,
                options_BoMon: data.getOptions_BoMon,
                options_GiangVien: data.getOptions_GiangVien
            })
        ))
    }
    handleCreatGroup = () =>{
        alert("Creat Group");
    }
    get_Option = (text,options,value,display) => {
        let html = [];
        options.map((item,index)=>{
            html.push(<option key={index} value={item[value]}>{item[display]}</option>)
        })
        return (
            <Select onChange={ (e) => {text!="Giảng Viên" && this.handleOnChangeOption(e)}} text={text} options={(html)}/>
        )
    }
    handleOnChangeOption = (e) => {
        let display =  e.target.parentElement.children[1].innerText;
        display = display == 'Khoa' ?
            "ma_khoa" : "ma_bo_mon"
        const value =  e.target.value;
        alert(display+" : "+value)
        // fetch("../Control/php/group.php",{
        //     method: "post",
        //     headers: {"Content-Type": "application/json"},
        //     body: JSON.stringify({
        //         display : value 
        //     })
        // })
        // .then(response => response.json())
        // .then(data => this.setState(
        //     (prev) => ({
        //         ...prev,
        //         options_Khoa: data.getOptions_Khoa,
        //         options_BoMon: data.getOptions_BoMon,
        //         options_GiangVien: data.getOptions_GiangVien
        //     })
        // ))
    }
    render(){
        const {options_BoMon, options_Khoa,options_GiangVien} = this.state;
        return (
            <div className="container px-3 lg:px-1 mx-auto">
                <p className="text-gray-400 text-2xl text-center uppercase
                font-semibold py-2"
                >Tạo Nhóm</p>
                <div className="grid">
                    <div className="md:w-3/6">
                        <Input text="Tên nhóm"/>
                    </div>
                    <div className="md:w-12/12 mt-2 text-gray-400 ">
                        <p className="py-1 font-medium">Chọn giảng viên hướng dẫn:</p>
                        <div className="grid grid-cols-3 gap-2">
                            {options_Khoa && this.get_Option("Khoa",options_Khoa,"ma_khoa","ten_khoa")}
                            {options_BoMon && this.get_Option("Bộ Môn",options_BoMon,"ma_bo_mon","ten_bo_mon")}
                            {options_GiangVien && this.get_Option("Giảng Viên",options_GiangVien,"ma_giang_vien","ten_giang_vien")}
                        </div>
                    </div>
                    <div className="md:w-12/12 mt-2 text-gray-400 ">
                        <p className="py-1 font-medium">Chọn đề tài:</p>
                        <div className="md:3/6">
                            <Select text="Mã đề tài" options={(
                                <>
                                    <option value="asdf">Đề tài 1</option>
                                    <option value="asdf">Đề tài 2</option>
                                </>
                                
                            )}/>
                        </div>
                    </div>
                    <div className="mt-3">
                        <Button text="Tạo nhóm" obj={() => this.handleCreatGroup()} cssClass="bg-cyan-600"/>
                    </div>
                </div>
            </div>
        );
    }
}
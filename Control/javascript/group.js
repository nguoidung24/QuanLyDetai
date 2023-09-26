class Select extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="relative mt-1 lg:mt-2">
                <select
                    onChange={this.props.onChange}
                    className="w-full
                        outline-none bg-white
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
class Group extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options_Khoa: [],
            options_BoMon: [],
            options_GiangVien: [],
            formSubmit: {
                ten_nhom: "",
                ma_giang_vien: "",
                ma_de_tai: ""
            },
            inputSearch: "",
            table_MaDeTai: []
        };
        this.trActive = "";
        this.isSearch = false;
        this.totalPage = 0;
        this.currentPage = 1;
    }
    componentDidMount() {
        fetch("../Control/php/group.php", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "ma_khoa": "1",
                "getTable_MaDetai": true
            })
        })
            .then(response => response.json())
            .then(data => {
                this.totalPage = data.totalPage;
                this.setState({
                    options_Khoa: data.getOptions_Khoa,
                    options_BoMon: data.getOptions_BoMon,
                    options_GiangVien: data.getOptions_GiangVien,
                    formSubmit: {
                        ma_de_tai: "",
                        ten_nhom: "",
                        ma_giang_vien: data.getOptions_GiangVien[0] && data.getOptions_GiangVien[0].ma_giang_vien
                    },
                    table_MaDeTai: data.getTable_MaDeTai
                })
            }
            )
    }
    handleCreatGroup = () => {
        const { formSubmit } = this.state;
        fetch("../Control/php/group.php", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...formSubmit,
                "creatGroup": true,
                "ma_sinh_vien": this.props.ma_sinh_vien
            })
        })
            .then(response => response.json())
            .then(data => alert(data.result))
    }
    get_Option = (text, options, value, display) => {
        let html = [];
        options.map((item, index) => {
            html.push(<option key={index} value={item[value]}>{item[display]}</option>)
        })
        return (
            <Select onChange={(e) => { text != "Giảng Viên" ? this.handleOnChangeOption(e) : this.handleSelect_Giang_vien(e) }} text={text} options={(html)} />
        )
    }
    handleSelect_Giang_vien = (e) => {
        this.setState(prev => ({
            ...prev,
            formSubmit: {
                ...prev.formSubmit,
                ma_giang_vien: e.target.value
            }
        }))
    }
    handleOnChangeOption = (e) => {
        let display = e.target.parentElement.children[1].innerText;
        const value = e.target.value;
        if (display == 'Khoa') {
            fetch("../Control/php/group.php", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "ma_khoa": value })
            })
                .then(response => response.json())
                .then(data => this.setState(
                    (prev) => ({
                        ...prev,
                        options_Khoa: data.getOptions_Khoa,
                        options_BoMon: data.getOptions_BoMon,
                        options_GiangVien: data.getOptions_GiangVien,
                        formSubmit: {
                            ...prev.formSubmit,
                            ma_giang_vien: data.getOptions_GiangVien[0] && data.getOptions_GiangVien[0].ma_giang_vien
                        }
                    })
                ))
        }
        else {
            fetch("../Control/php/group.php", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "ma_bo_mon": value })
            })
                .then(response => response.json())
                .then(data => this.setState(
                    (prev) => ({
                        ...prev,
                        options_GiangVien: data.getOptions_GiangVien,
                        formSubmit: {
                            ...prev.formSubmit,
                            ma_giang_vien: data.getOptions_GiangVien[0] && data.getOptions_GiangVien[0].ma_giang_vien
                        }
                    })
                ))
        }
    }
    handleChange_MaDeTai = (e) => {
        this.setState((prev) => ({
            ...prev,
            formSubmit: {
                ...prev.formSubmit,
                ma_de_tai: e.target.value
            }
        }))
    }
    handleChange_TenNhom = (e) => {
        this.setState(prev => ({
            ...prev,
            formSubmit: {
                ...prev.formSubmit,
                ten_nhom: e.target.value
            }
        }))
    }
    get_tdTable_MaDeTai = (arr) => {
        let cssClass = this.isSearch == true ? "py-3 underline underline-offset-4 decoration-green-500" : "py-3";
        let html = [];
        Object.keys(arr).forEach(item => {
            html.push(<td className={cssClass} key={item}>{arr[item]}</td>)
        })
        return html
    }
    handle_trClick = (e) => {
        this.setState((prev) => ({
            ...prev,
            formSubmit: {
                ...prev.formSubmit,
                ma_de_tai: e.target.parentElement.children[0].innerText
            }
        }));
        this.trActive = e.target.parentElement.children[0].innerText;
    }
    getTable_MaDeTai = (data = []) => {
        let html = [];
        data.map((item, index) => {
            let cssClass = `hover:bg-cyan-600 cursor-pointer border-gray-400
            text-sm font-medium text-black border-b `
            cssClass += item.ma_de_tai == this.trActive ? "bg-cyan-500" : "";
            html.push(<tr
                onClick={(e) => this.handle_trClick(e)}
                className={cssClass}
                key={index} >{this.get_tdTable_MaDeTai(item)}</tr>)
        })
        return (
            <table className="mt-3 w-full text-center divide-y divide-gray-400 ">
                <thead>
                    <tr>
                        <th className="px-2 py-3 text-xs font-medium text-black uppercase ">Mã Đề Tài</th>
                        <th className="px-2 py-3 text-xs font-medium text-black uppercase ">Tên Đề Tài</th>
                    </tr>
                </thead>
                <tbody>
                    {html}
                </tbody>
            </table>
        )
    }
    handleSearch = () => {
        const { inputSearch } = this.state;
        fetch("../Control/php/group.php", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "search": true,
                "ten_de_tai": inputSearch
            })
        })
            .then(response => response.json())
            .then(data => {
                this.totalPage = data.totalPage;
                this.isSearch = true;
                this.currentPage = 1;
                this.setState((prev) => ({
                    ...prev,
                    table_MaDeTai: data.result
                }))
            });
    }
    get_liPagination = (text) => {
        let cssClass = (text == this.currentPage) ?
            "text-sky-500" : "";
        return (
            <li onClick={this.handle_ClickPagiantion} className="
              px-4 py-2 cursor-pointer text-black
           ">
                <a className={cssClass} >
                    {text}
                </a>
            </li>
        )
    }
    getPagination = () => {
        return (
            <form onSubmit={this.handle_ClickPagiantion} >
                <ul className="flex justify-center">
                    {this.currentPage > 1 && this.get_liPagination("First")}
                    {this.currentPage > 1 && this.get_liPagination(this.currentPage - 1)}
                    {this.get_liPagination(this.currentPage)}
                    {this.currentPage < this.totalPage && this.get_liPagination(this.currentPage + 1)}
                    {this.currentPage < this.totalPage && this.get_liPagination("Last")}
                </ul>
            </form>

        );
    }
    handle_ClickPagiantion = (e) => {
        e.preventDefault();
        fetch("../Control/php/group.php", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "pageSubmit": e.target.innerText,
                "isSearch":this.isSearch,
                "inputSearch": this.state.inputSearch
            })
        })
            .then(response => response.json())
            .then(data => {
                this.isSearch = data.isSearch;
                this.totalPage = Number(data.totalPage);
                this.currentPage = Number(data.currentPage);
                this.setState((prev) => ({
                    ...prev,
                    table_MaDeTai: data.result
                }))
            })
    }
    tat_ca_de_tai = () => {
        fetch("../Control/php/group.php", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "tat_ca_de_tai": true
            })
        })
            .then(response => response.json())
            .then(data => {
                this.isSearch = data.isSearch;
                this.totalPage = Number(data.totalPage);
                this.currentPage = Number(data.currentPage);
                this.setState((prev) => ({
                    ...prev,
                    table_MaDeTai: data.getTable_MaDeTai,
                    inputSearch: ""
                }))
            });
    }
    render() {
        console.log(this.isSearch)
        const { options_BoMon, options_Khoa, options_GiangVien, table_MaDeTai } = this.state;
        return (
            <div className="container px-3 lg:px-2 mx-auto">
                <p className="text-gray-400 text-2xl text-center uppercase
                font-semibold py-2"
                >Tạo Nhóm</p>
                <div className="grid grid-cols-1">
                    <div className="md:w-3/6">
                        <Input text="Tên nhóm" value={this.state.formSubmit.ten_nhom} handleChange={(e) => this.handleChange_TenNhom(e)} />
                    </div>
                    <div className="md:w-12/12 mt-2 text-gray-400 ">
                        <p className="py-1 font-medium">Chọn giảng viên hướng dẫn:</p>
                        <div className="grid grid-cols-3 gap-2">
                            {options_Khoa && this.get_Option("Khoa", options_Khoa, "ma_khoa", "ten_khoa")}
                            {options_BoMon && this.get_Option("Bộ Môn", options_BoMon, "ma_bo_mon", "ten_bo_mon")}
                            {options_GiangVien && this.get_Option("Giảng Viên", options_GiangVien, "ma_giang_vien", "ten_giang_vien")}
                        </div>
                    </div>
                    <div className="md:w-12/12 mt-2 text-gray-400 ">
                        <p className="py-1 font-medium">Chọn đề tài:</p>
                        <div className="md:3/6">
                            <Input text="Mã đề tài" value={this.state.formSubmit.ma_de_tai} handleChange={(e) => this.handleChange_MaDeTai(e)} />
                        </div>
                    </div>
                    <div className="mt-3 relative">
                        <Button text="Tạo nhóm" obj={() => this.handleCreatGroup()} cssClass="bg-cyan-600 absolute left-0 top-2" />
                        <FormSearch valueInput={this.state.inputSearch} onChange={
                            (e) => this.setState((prev) => ({
                                ...prev,
                                inputSearch: e.target.value
                            }))
                        } onClick={() => this.handleSearch()}
                            placeholder="Tên đề tài" />
                    </div>
                </div>

                <div className="flex justify-between w-full">
                    <p className="px-2 italic">Nhập mã đề tài hoặc click để chọn</p>
                    <button onClick={() => this.tat_ca_de_tai()} className='text-sky-400 underline italic'>Tất cả</button>
                </div>
                {this.getTable_MaDeTai(table_MaDeTai)}
                {this.totalPage > 0 && this.getPagination()}
            </div>
        );
    }
}
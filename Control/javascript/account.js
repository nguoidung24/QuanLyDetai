
class Message extends React.Component {
   constructor(props) {
      super(props)
   }
   getLabel(){
      let html = [];
      this.props.value.map((item,index)=>{
         html.push(<label key={index} className="font-semibold text-black hover:cursor-pointer my-2">
         <strong>Thông báo: </strong>
         {item} !!</label>);
      });
      return html;
   }
   render() {
      let cssClass = this.props.color
         + "py-4 px-10 fixed top-2 right-4 rounded-md hover:scale-110 hover:cursor-pointer ease-out duration-500 uppercase text-sm grid grid-cols-1";
      return (
         <div onClick={this.props.obj}
            className={cssClass}>
               {this.getLabel()}
         </div>
      )
   }
}
class Input extends React.Component {
   getInput = (text, type = "text", name, pattern, value, handleChange) => {
      return (
         <div className="relative mt-1 lg:mt-2 ">
            <input
               id={name}
               readOnly={name == "id" && true}
               value={value}
               onChange={handleChange}
               required
               pattern={pattern}
               title="Nhập sai định dạng"
               className="w-full
                     outline-none bg-white
                     pt-6 pb-2 rounded-md
                     border px-4 border-gray-400
                     peer text-black
                     "
               type={type}
               name={name}
               placeholder=" "
               autoComplete="off"></input>
            <label className="absolute top-1 left-4 text-sm
                     peer-placeholder-shown:top-5
                     peer-placeholder-shown:text-base
                     peer-placeholder-shown:not-italic
                     peer-focus:top-1 italic
                     peer-focus:text-sm
                     text-black transition-all ducation-500
                  " htmlFor={name}>{text}</label>
         </div>
      )
   }
   render() {
      return (this.getInput(
         this.props.text,
         this.props.type,
         this.props.name,
         this.props.pattern,
         this.props.value,
         this.props.handleChange
      ))
   }
}
class Button extends React.Component {
   constructor(props) {
      super(props);
   }
   getButton(text, icon, cssClass = "", obj) {
      let className = `px-4 py-2
      hover:scale-90
      hover:bg-cyan-900
      transition-all
      ducation-500
      rounded-md ` + cssClass;
      return (
         <button onClick={obj}
            className={className}>
            <i className={icon}></i>
            <span className="ml-2 text-sm text-black font-medium uppercase">{text}</span>
         </button>
      );
   }
   render() {
      return (
         this.getButton(this.props.text,
            this.props.icon,
            this.props.cssClass,
            this.props.obj)
      );
   }
}
class FormSearch extends React.Component {
   constructor(props) {
      super(props);
   }
   getFormSearch = (placeholder,handleClick,handleChange,valueInput) =>{
      return(
         <div className="lg:mt-0 mt-3">
         <form className="flex justify-end mt-3 pb-3 gap-2">
            <input className=" border border-gray-400 text-gray-400
            px-4 py-1 outline-none rounded-md bg-transparent
            focus:ring ring-cyan-700 placeholder:italic
            " type="search" placeholder={placeholder} 
            value={valueInput}
            onChange={handleChange}
            />
            <button type="button" className="px-4 py-1 border border-gray-400
            rounded-md text-gray-400"
            onClick={handleClick}
            >Tìm</button>
         </form>
      </div>
      )
   }
   render() {
      return this.getFormSearch(
         this.props.placeholder,
         this.props.onClick,
         this.props.onChange,
         this.props.valueInput
      )
   }
}
class Account extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         data: [],
         showMessage: {
            state: false,
            value: "",
            color: "",
         },
         infoAccount: {
            id: "",
            username: "",
            fullname: "",
            phone: "",
            gender: "Nam",
            birthday: "",
            password: ""
         }
      }
      this.expect = "";
      this.totalPage = 1;
      this.currentPage = 1;
   }
   componentDidMount() {
      this.getDataTable({ page: this.currentPage });
   }
   getDataTable(currentPage) {
      this.request("../Model/test.php", currentPage)
         .then(reponse => reponse.json())
         .then(reponseData => {
            if (reponseData) {
               this.setState({
                  data: reponseData
               })
               this.totalPage = reponseData["totalPage"];
            }
         });
   }
   request(action = "", objData = {}) {
      return fetch(action, {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            ...objData
         })
      });
   }
   handleSubmit = (event) => {
      event.preventDefault();
      this.request("../Model/test2.php", { "expect": this.expect, "data": this.state.infoAccount })
         .then(response => response.json())
         .then(data => {
            console.log(data);
            if (data.result) {
               this.setState({ showMessage: { state: true, value: data.errors, color: "bg-green-800 " } })
               this.getDataTable(this.expect != "insert" ?
                  { page: this.currentPage } : { page: this.totalPage }
               );
            } else {
               this.setState({ showMessage: { state: true, value: data.errors, color: "bg-red-800 " } });
            }
         })
   }
   handle_trClick(e) {
      let index = e.target.parentNode.rowIndex;
      this.setState({ infoAccount: { ...this.state.data["table"][index - 1] } });
   }
   getTable = (data) => {
      return (
         <table className="mt-3 w-full text-center divide-y divide-gray-400 ">
            <thead>
               <tr>
                  <th className="px-2 py-3 text-xs font-medium text-gray-400 uppercase ">ID</th>
                  <th className="px-2 py-3 text-xs font-medium text-gray-400 uppercase ">Tên Hiển Thị</th>
                  <th className="px-2 py-3 text-xs font-medium text-gray-400 uppercase ">Tài Khoản</th>
                  <th className="px-2 py-3 text-xs font-medium text-gray-400 uppercase ">Mật Khẩu</th>
                  <th className="px-2 py-3 text-xs font-medium text-gray-400 uppercase ">Ngày Sinh</th>
                  <th className="px-2 py-3 text-xs font-medium text-gray-400 uppercase ">Giới Tính</th>
                  <th className="px-2 py-3 text-xs font-medium text-gray-400 uppercase ">SĐT</th>
               </tr>
            </thead>
            <tbody>
               {data["table"].map((item) => (
                  <tr className="hover:bg-sky-900 cursor-pointer border-gray-400
                   text-sm font-medium text-gray-500 border-b"
                     onMouseDown={(e) => this.handle_trClick(e)} key={item.id}>
                     {Object.values(item).map((value, index) => (
                        <td className=" py-3 " key={index}>{value}</td>
                     ))}
                  </tr>
               ))}
            </tbody>
         </table>
      );
   }
   handleChange = (e) => this.setState(prev => ({
      infoAccount: {
         ...prev.infoAccount,
         [e.target.name]: e.target.value
      }
   }))
   getForm() {
      return (
         <form onSubmit={this.handleSubmit} >
            <div className="grid grid-cols-2 gap-3 lg:gap-8  mt-3">
               <Input text="ID" type="text" name="id" pattern="" value={this.state.infoAccount["id"]} handleChange={this.handleChange} />
               <Input text="Tên tài khoản" type="text" name="username" pattern="^[0-9A-Za-z]{8,16}$" value={this.state.infoAccount["username"]} handleChange={this.handleChange} />
               <Input text="Mật khẩu" type="text" name="password" pattern="^[0-9A-Za-z]{8,16}$" value={this.state.infoAccount["password"]} handleChange={this.handleChange} />
               <Input text="Tên hiển thị" type="text" name="fullname" pattern="^[A-Z a-z à-ỹ À-Ỹ \s]{1,100}$" value={this.state.infoAccount["fullname"]} handleChange={this.handleChange} />
               <Input text="Số điện thoại" type="text" name="phone" pattern="^[0-9]{10,10}$" value={this.state.infoAccount["phone"]} handleChange={this.handleChange} />
               <div className="relative mt-1 lg:mt-2">
                  <select
                     onChange={e => this.setState(prev => ({
                        infoAccount: {
                           ...prev.infoAccount,
                           [e.target.name]: e.target.value
                        }
                     }))}
                     value={this.state.infoAccount.gender} name="gender"
                     className="w-full
                        outline-none bg-gray-400
                        pt-6 pb-2 rounded-md
                        border px-4 border-gray-400
                        peer text-black">
                     <option value="Nam">Nam</option>
                     <option value="Nữ">Nữ</option>
                  </select>
                  <label className="absolute top-1 left-4 text-sm
                        italic peer-focus:text-sm
                        text-black transition-all ducation-500
                     ">Giới tính</label>
               </div>
               <Input text="Ngày sinh" type="date" name="birthday" pattern="" value={this.state.infoAccount["birthday"]} handleChange={this.handleChange} />
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 mt-3">
               <div className="flex justify-between">
                  <Button text="Insert" cssClass="bg-sky-500" icon="bi text-black bi-plus-circle" obj={() => this.expect = "insert"} />
                  <Button text="Update" cssClass="bg-orange-500" icon="bi text-black bi-pencil-square" obj={() => this.expect = "update"} />
                  <Button text="Delete" cssClass="bg-red-500" icon="bi text-black bi-trash" obj={() => this.expect = "delete"} />
               </div>
            </div>
         </form>
      );
   }
   get_liPagination = (text) => {
      let cssClass = (text == this.currentPage) ?
         "text-sky-500" : "";
      return (
         <li onClick={this.handle_ClickPagiantion} className="
            px-4 py-2 cursor-pointer text-gray-400
         ">
            <a className={cssClass} >
               {text}
            </a>
         </li>
      )
   }
   getPagination = (data) => {
      const dataTotal = data["totalPage"];
      this.currentPage = data["currentPage"];

      return (
         <form onSubmit={this.handle_ClickPagiantion} >
            <ul className="flex justify-center">
               {this.get_liPagination("First")}
               {this.currentPage > 1 && this.get_liPagination(this.currentPage - 1)}
               {this.get_liPagination(this.currentPage)}
               {this.currentPage < dataTotal && this.get_liPagination(this.currentPage + 1)}
               {this.get_liPagination("Last")}
            </ul>
         </form>

      );
   }
   handle_ClickPagiantion = (e) => {
      e.preventDefault();
      this.getDataTable({ page: e.target.innerText });
   }

   render() {
      const { data, showMessage } = this.state;
      return (
         <div className="container px-4 py-2 mx-auto bg-opacity-10">
            <h2 className="text-center font-bold text-2xl uppercase
            text-gray-400 py-4">
               Bảng Tài Khoản
            </h2>
            {this.getForm()}
            <FormSearch placeholder="Tên sinh viên"/>
            {(data["table"] != undefined) && this.getTable(data)}
            {(data["table"] != undefined) && this.getPagination(data)}
            {showMessage.state && <Message value={showMessage.value} color={showMessage.color} obj={() => this.setState({ showMessage: false })} />}
         </div>
      )
   }
}

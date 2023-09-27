class MyGroup extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         inputSearch: "",
         group: [],
         myGroup: [],
         groupAll: [],
         trActive: ""
      }
      this.totalPage = 0, 
      this.currentPage = 1 
   }
   componentDidMount = () => {
      fetch("../Control/php/mygroup.php", {
         method: "post",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            "ma_sinh_vien": this.props.ma_sinh_vien
         })
      }).then(responose => responose.json())
         .then(data => {
            this.totalPage = data.totalPage;
            this.setState({
               group: data.group,
               myGroup: data.myGroup,
               groupAll: data.groupAll
            })
         });
   }
   handelButtonGetOut = (ma_nhom) => {
      fetch("../Control/php/mygroup.php", {
         method: "post",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            "ma_sinh_vien": this.props.ma_sinh_vien,
            "ma_nhom": ma_nhom,
            "roi_nhom": true
         })
      }).then(responose => responose.json())
         .then(data => {
            if (data.result) {
               this.setState({
                  group: data.group
               })
               alert("Đã Rời Nhóm")
            }
            else alert('Không Thành Công')
         });
   }
   getTbody = (obj, showbutton) => {
      const ma_nhom = obj.ma_nhom
      let html = [];
      Object.keys(obj).map(k => {
         html.push(<td key={k} className="text-sm py-3 lg:py-2">{obj[k]}</td>)
      })
      html.push(showbutton == 2 && <td key="_a" className="text-sm py-3 lg:py-2">
         <Button text="Rời" cssClass="bg-sky-500 hover:bg-red-500"
            obj={() => this.handelButtonGetOut(ma_nhom)} />
      </td>)
      html.push(showbutton == 1 && <td key="_a" className="text-sm py-3 lg:py-2">
            <Button text="Xóa" cssClass="bg-orange-500 hover:bg-red-700"
               obj={() => this.handleDeleteGroup(ma_nhom)} />
         </td>)
      return html;
   }
   handleDeleteGroup = (ma_nhom) =>{
      if(confirm("Bạn có muốn xóa nhóm của bạn?")){
         fetch("../Control/php/mygroup.php",{
            method: "post",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
               "deleteGroup" : true,
               "ma_nhom" : ma_nhom,
               "ma_sinh_vien" : this.props.ma_sinh_vien
            })
         })
         .then(response => response.json())
         .then(data => {
            if(data.result) {
               alert("Thành công")
               this.setState( prev => ({
                  ...prev,
                  myGroup : data.myGroup
               }))
            }
            else alert("Không thành công")
         })}
   }
   handle_trClick = (e) => {
      const ma_nhom = e.target.parentElement.children[0].innerText;
      this.setState((prev) => ({
         ...prev,
         trActive: ma_nhom
      }))
   }
   getGroup = (array, addClick, showButton = 0) => {
      const { trActive } = this.state;
      let html = [];
      array.map((item, index) => {
         let cssClass = `border-b border-gray-400 hover:bg-sky-600
         hover:cursor-pointer `;
         cssClass += addClick && (trActive == item.ma_nhom) ?
            "bg-sky-600" : "";
         html.push(
            <tr key={index}
               className={cssClass}
               onClick={addClick ? this.handle_trClick : null}>
               {this.getTbody(item, showButton)}
            </tr>
         )
      });
      return html;
   }

   getTable = (tbody) => {
      return (
         <table className="text-black w-full">
            <thead className='text-xs uppercase font-semibold
            border-gray-400 border-b-2 lg:text-sm'>
               <tr>
                  <th className="py-2">Mã nhóm </th>
                  <th className="py-2">Tên nhóm </th>
                  <th className="py-2">Ngày tạo</th>
                  <th className="py-2">Tên đề tài</th>
                  <th className="py-2">Tên người tạo</th>
                  <th className="py-2">Giảng viên HD</th>
                  <th className="py-2">Giải thưởng</th>
               </tr>
            </thead>
            <tbody className='text-sm text-center text-xs lg:text-base'>
               {tbody}
            </tbody>
         </table>
      )
   }
   handleClick = () => {
      const { trActive } = this.state;
      if (trActive) {
         fetch("../Control/php/mygroup.php", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               "ma_sinh_vien": this.props.ma_sinh_vien,
               "ma_nhom": trActive,
               "join": "join"
            })
         })
            .then(response => response.json())
            .then(data => {
               if (data.join) {
                  this.setState((prev) => ({
                     ...prev,
                     group: data.group
                  }))
                  alert("Tham gia thành công");
               } else alert("Bạn đã trong nhóm, Hoặc nhóm đã được trao thưởng !!");
            })
      }
   }
   handleSubmitSearch = () => {
      const { inputSearch } = this.state;
      if(Number(inputSearch)){
         fetch("../Control/php/mygroup.php", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               "inputSearch": inputSearch,
            })
         })
            .then(response => response.json())
            .then(data => {
               this.setState((prev) => ({
                  ...prev,
                  groupAll: data.dataSearch
               }))
      })} else alert("Mã đề tài không hợp lệ");
   }
   handleChangeSearch = (e) => {
      this.setState(prev => ({
         ...prev,
         inputSearch: e.target.value
      }))
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
      fetch("../Control/php/mygroup.php", {
         method: "post",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            "pageSubmit": e.target.innerText,
         })
      })
         .then(response => response.json())
         .then(data => {
            this.currentPage = data.currentPage*1;
            this.setState((prev) => ({
               ...prev,
               groupAll: data.groupAll
            }))
         })
   }
   render() {
      // console.log(this.totalPage);
      const { group, myGroup, groupAll } = this.state;
      return (
         <div className="container px-2 mx-auto">
            <div className="grid grid-cols-1">
               <div className="w-full">
                  <p className="text-black font-semibold py-3 underline italic">Nhóm bạn tạo: </p>
               </div>
               <div className="w-full">
                  {this.getTable(this.getGroup(myGroup, false,1))}
               </div>
               <div className="w-full">
                  <p className="text-black font-semibold py-3 underline italic">Nhóm bạn là thành viên: </p>
               </div>
               <div className="w-full">
                  {this.getTable(this.getGroup(group, false, 2))}
               </div>
            </div>
            <div className="grid grid-cols-1">
            <p className="text-black font-semibold py-3 underline italic">Chọn nhóm để tham gia: </p>
               <div className="mt-3 w-full">
                  <FormSearch placeholder="Nhập mã nhóm"
                     onClick={this.handleSubmitSearch}
                     onChange={this.handleChangeSearch}
                     valueInput={this.state.inputSearch}
                  />
               </div>
               <div className="mt-1 w-full">
                  <Button obj={this.handleClick}
                     cssClass="bg-cyan-500" text="Tham Gia" />
               </div>
               <div className="mt-2 w-full">
                  {this.getTable(this.getGroup(groupAll, true))}
               </div>
               <div className="mt-3 flex justify-center gap-x-2">
                  {this.getPagination()}
               </div>
            </div>
         </div>
      )
   }
}
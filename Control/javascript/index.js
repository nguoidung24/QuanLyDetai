class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHoverMenu: false,
            isSubMenuOpen: "",
            main: "home"
        }
    }
    handleMouseEnter = (event) => {
        this.setState({ isHoverMenu: true });
    }
    handleMouseLeave = (event) => {
        this.setState({ isHoverMenu: false });
    }
    handle_LiClick = (str) => {
        this.setState({ main: str });
    }
    handle_SubLiClick = (str) => {
        this.setState({ main: str });
    }
    getLiSub(array) {
        const html = [];
        array.map((item, index) => {
            html.push(
                <ul key={index} className="is_sub">
                    <li onClick={() => this.handle_SubLiClick(item[1])}>
                        <a className="text-gray-800  hover:bg-gray-400" href="#">
                            <span className="nav_text">{item[0]}</span>
                        </a>
                    </li>
                </ul>

            );
        })
        return html;
    }
    getLi(isSub, text, icon, sub = [],profile = false) {
        const { isSubMenuOpen } = this.state;
        if (!isSub) {
            return (
                <li className={text == "Menu" ? "pb-2 " : " "}
                    onClick={() => { if (text != "Menu") this.handle_LiClick(sub[0]) }}>
                    <a className={text == "Menu" ? 
                        "text-gray-800":
                        "text-gray-800 hover:cursor-pointer hover:bg-gray-400"
                    }>
                        {icon}
                        <span className="nav_text text-gray-800 w-full">{text}</span>
                    </a>
                </li>
            );
        }
        else {
            let cssClass = "has_sub";
            return (
                <li className={cssClass}>
                    <a onClick={() => this.handleClick_subMenu(text, event)}
                        className="text-gray-800 hover:cursor-pointer  hover:bg-gray-400">
                        {icon}
                        <span className="nav_text text-gray-800 w-full">{text}</span>
                    </a>
                    {isSubMenuOpen == text && this.getLiSub(sub)}
                </li>
            );
        }
    }
    handleClick_subMenu = (text, event) => {
        event.stopPropagation();
        const { isSubMenuOpen } = this.state;
        if (isSubMenuOpen == text)
            this.setState(() => (
                { isSubMenuOpen: "" }));
        else
            this.setState(() => (
                { isSubMenuOpen: text }));
    }
    render() {
        const { isHoverMenu, main } = this.state;
        return (
            <React.Fragment>
                <nav
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                    style={{ width: isHoverMenu ? "250px" : "60px" }}
                    id="main_menu"
                    // className="main_menu bg-mygreen shadow "
                    className="main_menu bg-gray-50 drop-shadow-lg  flex flex-col"
                >
                    <ul className="content_menu relative mb-auto">
                        {this.getLi(false, "Menu",(
                            <div className='relative' style={{width :" 60px", height: "36px"}}>
                                <img src="../assets/img/logo_gray.png" className="absolute top-0 left-3 animate-bounce" style={{width:"36px"}}/>
                            </div>
                        ), [])}
                        {this.getLi(false, "Trang chủ", (
                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="36" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
                                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z"/>
                            </svg>
                        ), ["home"])}
                        {this.getLi(true, "Nhóm", (
                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="36" fill="currentColor" className="bi bi-mortarboard" viewBox="0 0 16 16">
                                <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5ZM8 8.46 1.758 5.965 8 3.052l6.242 2.913L8 8.46Z"/>
                                <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46l-3.892-1.556Z"/>
                            </svg>
                        ), [["Tạo ", "creat"], ["Của bạn", "mygroup"]])}
                        {this.getLi(false, "Tài khoản", (
                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="36" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                            </svg>
                        ), ["account"])}
                        {this.getLi(true, "Đề tài", (
                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="36" fill="currentColor" className="bi bi-database" viewBox="0 0 16 16">
                                <path d="M4.318 2.687C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4c0-.374.356-.875 1.318-1.313ZM13 5.698V7c0 .374-.356.875-1.318 1.313C10.766 8.729 9.464 9 8 9s-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777A4.92 4.92 0 0 0 13 5.698ZM14 4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16s3.022-.289 4.096-.777C13.125 14.755 14 14.007 14 13V4Zm-1 4.698V10c0 .374-.356.875-1.318 1.313C10.766 11.729 9.464 12 8 12s-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10s3.022-.289 4.096-.777A4.92 4.92 0 0 0 13 8.698Zm0 3V13c0 .374-.356.875-1.318 1.313C10.766 14.729 9.464 15 8 15s-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13s3.022-.289 4.096-.777c.324-.147.633-.323.904-.525Z"/>
                            </svg>
                        ), [["Đăng ký", "dang_ky_de_tai"]])}

                    </ul>
                    <ul className="content_menu relative pb-4">
                    {this.getLi(true, this.props.ten_sinh_vien, (
                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="36" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                            </svg>
                        ), [])}
                    </ul>
                </nav>
                <main id="main_content" className="main_content">
                    <div className="content" id="main_trang_chu">
                        {main == "home" && <Home />}
                        {main == "creat" && <Group ma_sinh_vien={this.props.ma_sinh_vien}/>}
                        {main == "account" && <Account />}
                        {main == "dang_ky_de_tai" && <Dang_Ky_De_Tai />}
                        {main == "mygroup" && <MyGroup ma_sinh_vien={this.props.ma_sinh_vien} />}
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

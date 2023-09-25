class Profile extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container px-2 mx-auto">
                <main className="rounded-md shadow-xl border border-gray-200 px-4 py-4 mt-24 relative pb-8">
                    <p className="text-center flex justify-center absolute left-2/4 top-0 bg-white -translate-y-2/4 -translate-x-2/4 rounded-full border px-2 py-2">
                        <img className="w-28" src="../assets/img/logo.png" />
                    </p>
                    <p className="mt-16 uppercase text-center font-semibold text-2xl lg:text-3xl">trường đại học công nghiệp việt trì</p>

                    <p className="mt-2 text-center text-2xl uppercase font-semibold">Sinh Viên: Nguyễn Văn Tùng</p>
                    <p className="mt-2 text-center text-lg uppercase font-semibold">Mã sinh viên: 3</p>
                    <p className="mt-2 text-center text-lg uppercase font-semibold">Khoa Công Nghệ thông tin - Lớp TT2D20</p>
                    <div className="grid grid-cols-3 text-center mt-2 py-2">
                        <p>Số nhóm đã tạo: 3</p>
                        <p>Thành viên của: 2 nhóm</p>
                        <p>Số lần đạt giải: 1</p>
                    </div>
                    <div className="mx-auto flex w-6/6 lg:w-3/6 relative border-b border-gray-400 mt-5 mb-5">
                        <p className="text-center absolute  top-0 left-2/4 -translate-y-2/4 
                -translate-x-2/4 bg-bodygreen px-5 text-sm
                bg-white text-black font-semibold uppercase">Đổi Mật Khẩu</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                        <div>
                            <Input text="Mật khẩu"/>
                        </div>
                        <div>
                            <Input text="Nhập lại mật khẩu"/>
                        </div>
                        <div className="lg:col-span-2 text-center mt-4">
                            <Button cssClass="bg-sky-500" text="Đổi Mật Khẩu"/>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}
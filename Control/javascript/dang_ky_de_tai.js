class Dang_Ky_De_Tai extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="container mx-auto px-1">
                <div className="grid grid-cols-1 gap-y-2">
                    <>
                        <p className="text-center text-lg font-semibold
                        text-gray-400 uppercase py-2
                        ">Đăng ký đề tài</p>
                    </>
                    <div className="md:w-3/6">
                        <Input text="Tên đề tài"/>
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
                        " rows="4" cols="100">
                        </textarea>
                    </>
                    <>
                        <Button cssClass="bg-cyan-700 w-2/6 md:w-3/12 mx-auto" text="Đăng ký đề tài"/>
                    </>
                </div>
            </div>
        )
    }
}
export const Homepage = () => {
    return(
        <div className="min-h-screen pt-60">
            <div className="absolute top-0 left-0 w-full h-10 header"></div>
            <div className="h-full flex max-w-[50vw] bg-translate mx-auto border relative">
                <div className="left-side bg-transparent absolute top-0 left-0 border border-red-500 h-full">
                    wekrlkw
                    </div>
                <div className="min-h-2 w-full bg-translate mx-12">
                    <div className="body-header h-24 w-full -mt-30 relative">
                        <div className="text-4xl text-amber-100 uppercase w-full bottom-5 text-center absolute ">
                            <p>Ücretsiz Oyna</p>
                        </div>
                    </div>
                    <div className="body min-h-screen mx-9">
                        BODY
                    </div>
                </div>
                <div className="border mt-12 bg-red-800 py-6 px-12 h-24 w-max absolute top-0 right-0">
                    Sıralama
                </div>
            </div>
        </div>
    )
}
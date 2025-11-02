function Appname(){
    return (
        <div className="py-12 text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 group">
                    <svg className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                </div>
                <h1 className="text-5xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent tracking-tight">
                    TaskFlow
                </h1>
            </div>
            <p className="text-gray-600 text-xl font-medium mb-2">
                Organize your tasks with style
            </p>
            <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
                A modern, intuitive todo manager designed for productivity and elegance
            </p>
        </div>
    )
}

export default Appname;
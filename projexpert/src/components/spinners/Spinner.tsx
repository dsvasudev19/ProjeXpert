const Spinner = ({ className ="w-12 h-12"}: { className?: string }) => {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className={`animate-spin rounded-full ${className} border-t-2 border-b-2 border-emerald-500`}></div>
        </div>
    )
}

export default Spinner
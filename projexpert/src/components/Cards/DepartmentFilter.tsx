import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DepartmentFilter = ({ departments, filterDepartment, setFilterDepartment }: any) => {
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Check scroll position to show/hide arrows
    const checkScroll = () => {
        const container = scrollContainerRef.current;
        if (container) {
            const maxScrollLeft = container.scrollWidth - container.clientWidth;
            setShowLeftArrow(container.scrollLeft > 0);
            setShowRightArrow(container.scrollLeft < maxScrollLeft - 1); // -1 for rounding errors
        }
    };

    // Handle scroll on mount and resize
    useEffect(() => {
        checkScroll();
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScroll);
            window.addEventListener('resize', checkScroll);
            return () => {
                container.removeEventListener('scroll', checkScroll);
                window.removeEventListener('resize', checkScroll);
            };
        }
    }, [departments]);

    // Scroll left
    const scrollLeft = () => {
        const container = scrollContainerRef.current;
        if (container) {
            container.scrollBy({ left: -150, behavior: 'smooth' }); // Adjust scroll distance as needed
        }
    };

    // Scroll right
    const scrollRight = () => {
        const container = scrollContainerRef.current;
        if (container) {
            container.scrollBy({ left: 150, behavior: 'smooth' }); // Adjust scroll distance as needed
        }
    };

    return (
        <div className="relative flex items-center mb-6 w-full">
            {/* Left Arrow */}
            {showLeftArrow && (
                <button
                    onClick={scrollLeft}
                    className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
                >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
            )}

            {/* Scrollable Container */}
            <div
                ref={scrollContainerRef}
                className="flex gap-4 w-full overflow-x-hidden scroll-smooth"
                style={{ scrollBehavior: 'smooth' }}
            >

                <button
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${filterDepartment === "All"
                            ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                    onClick={() => setFilterDepartment("All")}
                >
                    All
                </button>
                {departments.map((department: any) => (
                    <button
                        key={department.id}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${filterDepartment === department
                                ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md'
                                : 'bg-white text-gray-600 hover:bg-gray-100'
                            }`}
                        onClick={() => setFilterDepartment(department)}
                    >
                        {department?.name}
                    </button>
                ))}
            </div>

            {/* Right Arrow */}
            {showRightArrow && (
                <button
                    onClick={scrollRight}
                    className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
                >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
            )}
        </div>
    );
};

export default DepartmentFilter;
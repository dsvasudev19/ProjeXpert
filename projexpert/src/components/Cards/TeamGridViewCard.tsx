import { Award, BarChart2, ChevronRight, Users } from "lucide-react"

const TeamGridViewCard = (team: any) => {

    const getPerformanceColor = (score: any) => {
        if (score >= 90) return 'from-green-500 to-green-600';
        if (score >= 80) return 'from-blue-500 to-blue-600';
        if (score >= 70) return 'from-yellow-500 to-yellow-600';
        return 'from-orange-500 to-orange-600';
    };

    return (
        <div>
            <div
                key={team?.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
            >
                <div className="h-2 bg-gradient-to-r from-blue-500 to-green-500"></div>
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{team?.name}</h2>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                            {team?.Department?.name}
                        </span>
                    </div>

                    <p className="text-gray-600 mb-6 line-clamp-2">{team?.description}</p>

                    <div className="mb-6">
                        <div className="flex justify-between text-sm text-gray-500 mb-1">
                            <span>Performance</span>
                            <span>{team?.performance}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className={`bg-gradient-to-r ${getPerformanceColor(team?.performance)} h-2 rounded-full`}
                                style={{ width: `${team?.performance}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center">
                            <div className="p-2 rounded-full bg-blue-100 mr-3">
                                <Users className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Members</p>
                                <p className="font-semibold">{team?.TeamMembers?.length}</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="p-2 rounded-full bg-green-100 mr-3">
                                <BarChart2 className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Projects</p>
                                <p className="font-semibold">{team?.activeProjects + team?.completedProjects}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center">
                            <Award className="h-4 w-4 text-blue-600 mr-2" />
                            <span className="text-sm font-medium text-gray-700">Lead: {team?.Lead?.name}</span>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium">
                            View Team
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamGridViewCard;
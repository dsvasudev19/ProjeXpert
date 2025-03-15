import { Award, BarChart2, Briefcase, Calendar, ChevronRight, Users } from 'lucide-react'

const dataListViewCard=(data:any)=>{
    console.log(data)
    const getPerformanceColor = (score:any) => {
        if (score >= 90) return 'from-green-500 to-green-600';
        if (score >= 80) return 'from-blue-500 to-blue-600';
        if (score >= 70) return 'from-yellow-500 to-yellow-600';
        return 'from-orange-500 to-orange-600';
      };

  return (
    <div>
        <div key={data?.id}>
                <div className="p-6 hover:bg-blue-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <div className="flex items-center">
                          <h2 className="text-xl font-bold text-gray-800 mr-3">{data?.name}</h2>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                            {data?.Department?.name}
                          </span>
                        </div>
                        <div className="mt-2 sm:mt-0">
                          <div className="flex items-center">
                            <Award className="h-4 w-4 text-blue-600 mr-2" />
                            <span className="text-sm font-medium text-gray-700">Lead: {data?.Lead?.name}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{data?.description}</p>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center">
                          <div className="p-2 rounded-full bg-blue-100 mr-3">
                            <Users className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Members</p>
                            <p className="font-semibold">{data?.TeamMembers?.length}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="p-2 rounded-full bg-green-100 mr-3">
                            <BarChart2 className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Active Projects</p>
                            <p className="font-semibold">{data?.activeProjects}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="p-2 rounded-full bg-purple-100 mr-3">
                            <Calendar className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Completed</p>
                            <p className="font-semibold">{data?.completedProjects}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="p-2 rounded-full bg-amber-100 mr-3">
                            <Briefcase className="h-4 w-4 text-amber-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Created</p>
                            <p className="font-semibold">{new Date(data?.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:w-48">
                      <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>Performance</span>
                        <span>{data?.performance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div 
                          className={`bg-gradient-to-r ${getPerformanceColor(data?.performance)} h-2 rounded-full`}
                          style={{ width: `${data?.performance}%` }}
                        ></div>
                      </div>
                      
                      <button className="text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 py-2 px-4 rounded-md flex items-center justify-center transition-all">
                        View data
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* {index < filtereddatas.length - 1 && <div className="border-b border-gray-100"></div>} */}
              </div>
    </div>
  )
}


export default dataListViewCard
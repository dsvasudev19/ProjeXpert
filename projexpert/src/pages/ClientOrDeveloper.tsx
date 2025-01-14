import { useState, useEffect } from "react";
import { Plus, Mail, Trash2 } from "lucide-react";
import AddClient from "../modals/AddClient";
import { axiosInstance } from "../axiosIntance";
import toast from "react-hot-toast";


const ClientOrDeveloper = () => {
    const [clients, setClients] = useState<any>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [expandedClientId, setExpandedClientId] = useState<number | null>(null);

    const getAllClients = async () => {
        try {
            const res=await axiosInstance.get("/admin/client")
            console.log(res)
            if(res.status===200){
                console.log(res.data)
                setClients(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    };

    

    useEffect(() => {
        getAllClients();
    }, []);

    // const toggleClient = (clientId: number) => {
    //     setExpandedClientId(expandedClientId === clientId ? null : clientId);
    // };

    

    const deleteClient = async (id: number) => {
        try {
            const res=await axiosInstance.delete("/admin/client/"+id)
            if(res.status===200){
                toast.success("Client Deleted Successfully")
                getAllClients()
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="p-6 bg-gradient-to-br min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-xl font-semibold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Team Management</h1>
                        <p className="text-sm text-gray-500">Manage your team members and clients</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-1 bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-4 py-2 rounded-md hover:from-emerald-600 hover:to-blue-600 transition-all shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Add Member
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {clients?.map((client: any) => (
                        <div
                            key={client.id}
                            className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative group"
                        >
                            <button
                                onClick={() => deleteClient(client.id)}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 className="w-5 h-5 border m-1 rounded transition-transform transform hover:scale-110" />
                            </button>

                            <div className="p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                        {client?.name?.split(" ").map((n: string) => n[0]).join("").slice(0,2)}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-800">{client.name}</h3>
                                        <p className="text-xs text-emerald-600">{String(client?.Roles[0]?.name).charAt(0).toUpperCase() + String(client?.Roles[0]?.name).slice(1)} • ProjeXpert.in</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 px-3 py-2 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg transition-all hover:shadow-sm">
                                        <Mail className="w-4 h-4 text-emerald-600" />
                                        <a href={`mailto:${client.email}`} className="text-sm text-gray-700 hover:text-emerald-600 transition-colors">
                                            {client.email}
                                        </a>
                                    </div>
                                   
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

                <AddClient isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </div>
    );
};

export default ClientOrDeveloper;

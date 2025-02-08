import { useEffect, useState } from "react"
import { axiosInstance } from "../../axiosIntance"
import { format } from "date-fns"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ConfirmationModal from "../../modals/ConfirmationDialog";
import toast from "react-hot-toast";
import Spinner from "../spinners/Spinner";

interface UserRole {
    name: string;
    UserRole: {
        userId: number;
        roleId: number;
        createdAt: string;
        updatedAt: string;
    };
}

interface TeamMember {
    id: number;
    name: string;
    email: string;
    status: string;
    lastLogin: string;
    phone: string | null;
    githubUsername: string | null;
    avatar: string | null;
    userType: string;
    createdAt: string;
    updatedAt: string;
    Roles: UserRole[];
}

interface InviteMemberForm {
    name: string;
    email: string;
    phone: string;
    githubUsername: string;
    roleId: string;
}

const TeamManagement = () => {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
    const [showInviteModal, setShowInviteModal] = useState(false)
    const [roles, setRoles] = useState<any[]>([])
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

    const [inviteForm, setInviteForm] = useState<InviteMemberForm>({
        name: "",
        email: "",
        phone: "",
        githubUsername: "",
        roleId: ""
    })
    const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({
        invite: false,
        remove: false,
        getRoles: false,
        getTeamMembers: false
    })


    const getRoles = async () => {
        try {
            setLoadingStates(prev => ({ ...prev, getRoles: true }))
            const res = await axiosInstance.get("/admin/role")
            if (res.status === 200) {
                setRoles(res.data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingStates(prev => ({ ...prev, getRoles: false }))
        }
    }

    useEffect(() => {
        getRoles()
    }, [showInviteModal])

    const getTeamMembers = async () => {
        try {
            setLoadingStates(prev => ({ ...prev, getTeamMembers: true }))
            const res = await axiosInstance.get("/admin/client/team/admins")
            if (res.status === 200) {
                setTeamMembers(res.data.data)
            }
        } catch (error) {
            console.error("Failed to fetch team members:", error)
        } finally {
            setLoadingStates(prev => ({ ...prev, getTeamMembers: false }))
        }
    }

    const handleInviteMember = async (values: any) => {
        setLoadingStates(prev => ({ ...prev, invite: true }))
        try {
            const res = await axiosInstance.post("/admin/client", values)
            if (res.status === 201) {
                toast.success("Member invited successfully")
                setShowInviteModal(false)
                resetInviteForm()
                getTeamMembers()
            }
        } catch (error) {
            console.error("Failed to invite member:", error)
        } finally {
            setLoadingStates(prev => ({ ...prev, invite: false }))
        }
    }

    const resetInviteForm = () => {
        setInviteForm({
            name: "",
            email: "",
            phone: "",
            githubUsername: "",
            roleId: ""
        })
    }

    const handleRoleChange = async (userId: number, newRole: string) => {
        try {
            await axiosInstance.put(`/admin/client/team/role/${userId}`, { role: newRole })
            getTeamMembers() // Refresh the list
        } catch (error) {
            console.error("Failed to update role:", error)
        }
    }

    const handleRemoveMember = async (userId: number | undefined) => {
        setLoadingStates(prev => ({ ...prev, remove: true }))
        try {
            const res = await axiosInstance.delete(`/admin/client/${userId}`)
            if (res.status === 200) {
                toast.success("Member removed successfully")
                setTeamMembers((prev: any) => prev.filter((member: any) => member.id !== selectedMember?.id))
            }
        } catch (error) {
            console.error("Failed to remove member:", error)
        } finally {
            setLoadingStates(prev => ({ ...prev, remove: false }))
        }

    }

    useEffect(() => {
        getTeamMembers()
    }, [])


    const InviteModal = () => {


        const validationSchema = Yup.object({
            name: Yup.string().required("Name is required"),
            email: Yup.string().email("Invalid email format").required("Email is required"),
            phone: Yup.string().matches(/^\d{10}$/, "Phone number must be 10 digits"),
            githubUsername: Yup.string(),
            roleId: Yup.string().required("Role is required")
        });

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Invite Team Member</h3>
                        <button
                            onClick={() => setShowInviteModal(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ×
                        </button>
                    </div>
                    <Formik
                        initialValues={inviteForm}
                        validationSchema={validationSchema}
                        onSubmit={(values: any, { resetForm }: any) => {
                            handleInviteMember(values);
                            resetForm();
                            setShowInviteModal(false);
                        }}
                    >
                        {({ isValid, dirty }) => (
                            <Form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name <span className="text-red-500">*</span>
                                    </label>
                                    <Field
                                        type="text"
                                        name="name"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                                        placeholder="Enter name"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <Field
                                        type="email"
                                        name="email"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                                        placeholder="Enter email"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone
                                    </label>
                                    <Field
                                        type="tel"
                                        name="phone"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                                        placeholder="Enter phone number"
                                    />
                                    <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        GitHub Username
                                    </label>
                                    <Field
                                        type="text"
                                        name="githubUsername"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                                        placeholder="Enter GitHub username"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Role <span className="text-red-500">*</span>
                                    </label>
                                    <Field
                                        as="select"
                                        name="roleId"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                                    >
                                        <option value="">Select Role</option>
                                        {roles.map((role) => (
                                            <option key={role.id} value={role.id}>{role.name}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="roleId" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div className="mt-6 flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowInviteModal(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={!isValid || !dirty}
                                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    >
                                        Invite Member
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        );
    };



    if (loadingStates.getTeamMembers || loadingStates.getRoles) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading team members...</p>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800">Team Members</h3>
                    <button
                        onClick={() => setShowInviteModal(true)}
                        disabled={loadingStates.invite}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500"
                    >
                        {loadingStates.invite ? (
                            <div className="flex items-center gap-2">
                                <span>Sending Invite</span>
                                <Spinner className="w-4 h-4" />
                            </div>
                        ) : "Invite Member"}
                    </button>
                </div>
                <div className="space-y-4">
                    <div className="border rounded-lg overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Member</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Role</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Last Login</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {teamMembers.map((member) => (
                                    <tr key={member.id}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                {member.avatar ? (
                                                    <img
                                                        src={member.avatar}
                                                        alt={member.name}
                                                        className="h-8 w-8 rounded-full"
                                                    />
                                                ) : (
                                                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                                        {member.name.charAt(0)}
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="font-medium">{member.name}</div>
                                                    <div className="text-sm text-gray-500">{member.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                className="border border-gray-300 rounded px-2 py-1 text-sm"
                                                value={member.Roles[0]?.name || ""}
                                                onChange={(e) => handleRoleChange(member.id, e.target.value)}
                                            >
                                                {roles.map((role) => (
                                                    <option key={role.id} value={role.name}>{role.name}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                                ${member.status === "active"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-gray-100 text-gray-800"
                                                    }`}
                                            >
                                                {member.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {member.lastLogin
                                                ? format(new Date(member.lastLogin), "MMM d, yyyy HH:mm")
                                                : "Never"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => {
                                                    setSelectedMember(member)
                                                    setShowConfirmationModal(true)
                                                }}
                                                className="text-red-600 hover:text-red-800 text-sm"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showInviteModal && <InviteModal />}

            {showConfirmationModal && <ConfirmationModal
                isOpen={showConfirmationModal}
                title="Remove Member"
                confirmationText="Are you sure you want to remove this team member?"
                actionText="Sure"
                action={() => handleRemoveMember(selectedMember?.id)}
                onClose={() => setShowConfirmationModal(false)}
            />}
        </div>
    )
}

export default TeamManagement;
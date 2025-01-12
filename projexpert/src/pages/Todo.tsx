import { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { CheckCircle, Circle, Plus, Trash2, Clock, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import ClockLoader from "react-spinners/ClockLoader";
import { axiosInstance } from "../axiosIntance";

const Todo = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);


  const getAllTodos=async()=>{
    setLoading(true)
    try{
      const res=await axiosInstance.get("/todo")
      if(res.status===200){
        setTodos(res.data)
      }
    }catch(error){
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllTodos()
    // setTodos(dummyTodos)
  }, []);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    priority: Yup.string().required("Priority is required"),
    dueDate: Yup.date().required("Due date is required"),
  });

  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      
      const res=await axiosInstance.post("/todo",{...values,status:"pending"})
      if(res.status===201){
        toast.success("Todo added successfully!");
        resetForm();
        getAllTodos();
      }
      
    } catch (error) {
      toast.error("Failed to add todo");
    }
  };

  

  const toggleStatus = async (id: number) => {
    try {
      const res=await axiosInstance.patch(`/todo/${id}/change-status`)
      if(res.status===200){
        toast.success("Status Changes successfully")
        getAllTodos();
      }

    } catch (error) {
      console.log(error)
    }
  };

  const deleteTodo =async (id: number) => {
    try {
      const res=await axiosInstance.delete("/todo/"+id)
      if(res.status===200){
        toast.success("Todo deleted successfully!");
        getAllTodos();
      }
    } catch (error) {
      console.log(error)
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority.toLowerCase()) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-6 pb-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          Todo Management
        </h1>
        <p className="text-gray-600 mt-2">
          Track and manage your team's tasks efficiently
        </p>
      </div>

      {loading ? (
        <div className="flex-1 flex justify-center items-center">
          <ClockLoader color="#085387" size={100} />
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 pt-0">
          {/* Todo List */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            <div className="p-6 pb-4">
              <h2 className="text-xl font-semibold">Todo List</h2>
            </div>
            <div className="flex-1 overflow-y-auto px-6 pb-6 max-h-[calc(100vh-300px)]">
              <div className="space-y-4">
                {todos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`p-4 rounded-lg border ${
                      todo.status === "completed" ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <button
                          onClick={() => toggleStatus(todo.id)}
                          className="mt-1"
                        >
                          {todo.status === "completed" ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                        <div>
                          <h3 className={`font-medium ${
                            todo.status === "completed" ? "line-through text-gray-500" : ""
                          }`}>
                            {todo.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {todo.description}
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-sm">
                            <span className={`flex items-center ${getPriorityColor(todo.priority)}`}>
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {todo.priority}
                            </span>
                            <span className="flex items-center text-gray-500">
                              <Clock className="w-4 h-4 mr-1" />
                              {new Date(todo.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Add Todo Form */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Add New Todo</h2>
            <Formik
              initialValues={{
                title: "",
                description: "",
                priority: "",
                dueDate: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="space-y-4">
                  <div>
                    <Field
                      name="title"
                      type="text"
                      placeholder="Todo Title"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                    />
                    {errors.title && touched.title && (
                      <div className="text-red-500 text-sm mt-1">{errors.title}</div>
                    )}
                  </div>

                  <div>
                    <Field
                      name="description"
                      as="textarea"
                      placeholder="Description"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                    />
                    {errors.description && touched.description && (
                      <div className="text-red-500 text-sm mt-1">{errors.description}</div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Field
                        name="priority"
                        as="select"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                      >
                        <option value="">Select Priority</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </Field>
                      {errors.priority && touched.priority && (
                        <div className="text-red-500 text-sm mt-1">{errors.priority}</div>
                      )}
                    </div>

                    <div>
                      <Field
                        name="dueDate"
                        type="date"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                      />
                      {errors.dueDate && touched.dueDate && (
                        <div className="text-red-500 text-sm mt-1">{errors.dueDate}</div>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200 shadow-md"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Todo
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;

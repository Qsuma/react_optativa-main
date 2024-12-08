import React, { useState } from "react";

export default function Home() {
    const [tasks, setTasks] = useState([
        { id: 1, name: "Tarea 1", description: "Descripción 1", completed: false },
        { id: 2, name: "Tarea 2", description: "Descripción 2", completed: true },
    ]);
    const [newTaskName, setNewTaskName] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");

    const toggleTaskCompletion = (id) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const updateTask = (id, name, description) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, name, description } : task
        ));
    };

    const addTask = () => {
        const newTask = {
            id: tasks.length + 1,
            name: newTaskName,
            description: newTaskDescription,
            completed: false
        };
        setTasks([...tasks, newTask]);
        setNewTaskName("");
        setNewTaskDescription("");
    };

    const TaskCard = ({ title, tasks, onToggle, onDelete, onUpdate }) => {
        const [editTaskId, setEditTaskId] = useState(null);
        const [name, setName] = useState("");
        const [description, setDescription] = useState("");

        const handleEdit = (task) => {
            setEditTaskId(task.id);
            setName(task.name);
            setDescription(task.description);
        };

        const handleSave = (id) => {
            onUpdate(id, name, description);
            setEditTaskId(null);
        };

        return (
            <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h2>
                <ul>
                    {tasks.map(task => (
                        <li key={task.id} className="mb-4 p-4 bg-gray-100 rounded-md">
                            {editTaskId === task.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full p-2 mb-4 border rounded"
                                        required
                                    />
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full p-2 mb-4 border rounded"
                                        required
                                    ></textarea>
                                </>
                            ) : (
                                <>
                                    <h3 className="font-bold text-lg">{task.name}</h3>
                                    <p className="text-gray-600 mb-2">{task.description}</p>
                                </>
                            )}
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => onToggle(task.id)}
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm transition duration-300"
                                >
                                    {task.completed ? "Descompletar" : "Completar"}
                                </button>
                                {editTaskId === task.id ? (
                                    <button
                                        onClick={() => handleSave(task.id)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm transition duration-300"
                                    >
                                        Guardar
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleEdit(task)}
                                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded text-sm transition duration-300"
                                    >
                                        Editar
                                    </button>
                                )}
                                <button
                                    onClick={() => onDelete(task.id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm transition duration-300"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">Gestor de Tareas</h1>
                    <div className="flex space-x-4 mb-8">
                        <TaskCard
                            title="Tareas Pendientes"
                            tasks={tasks.filter(t => !t.completed)}
                            onToggle={toggleTaskCompletion}
                            onDelete={deleteTask}
                            onUpdate={updateTask}
                        />
                        <TaskCard
                            title="Tareas Completadas"
                            tasks={tasks.filter(t => t.completed)}
                            onToggle={toggleTaskCompletion}
                            onDelete={deleteTask}
                            onUpdate={updateTask}
                        />
                    </div>
                    <div className="flex space-x-4 mb-8">
                        <input
                            type="text"
                            value={newTaskName}
                            onChange={(e) => setNewTaskName(e.target.value)}
                            className="w-full p-2 mb-4 border rounded"
                            placeholder="Nombre de la tarea"
                            required
                        />
                        <textarea
                            value={newTaskDescription}
                            onChange={(e) => setNewTaskDescription(e.target.value)}
                            className="w-full p-2 mb-4 border rounded"
                            placeholder="Descripción de la tarea"
                            required
                        ></textarea>
                        <button
                            onClick={addTask}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm transition duration-300"
                        >
                            Agregar Tarea
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

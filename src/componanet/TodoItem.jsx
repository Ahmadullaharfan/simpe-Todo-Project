import { useState } from 'react';

function TodoItem({ todo, onDelete, onToggleComplete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(todo.name);
    const [editDate, setEditDate] = useState(todo.date);

    const handleEdit = () => {
        if (isEditing) {
            onEdit(todo.id, editName, editDate);
            setIsEditing(false);
        } else {
            setIsEditing(true);
        }
    };

    const handleCancel = () => {
        setEditName(todo.name);
        setEditDate(todo.date);
        setIsEditing(false);
    };

    return (
        <div className={`p-8 ${todo.completed ? 'bg-gradient-to-r from-green-50/50 to-emerald-50/50' : 'bg-white'} transition-all duration-300`}>
            {isEditing ? (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center space-x-2">
                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <span>Todo Name</span>
                            </label>
                            <input 
                                type="text" 
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="w-full px-4 py-4 border-2 border-blue-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center space-x-2">
                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>Due Date</span>
                            </label>
                            <input 
                                type="date" 
                                value={editDate}
                                onChange={(e) => setEditDate(e.target.value)}
                                className="w-full px-4 py-4 border-2 border-blue-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button 
                            onClick={handleCancel} 
                            className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span>Cancel</span>
                        </button>
                        <button 
                            onClick={handleEdit} 
                            className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-2xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Save Changes</span>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 flex-1">
                        {/* Status Indicator */}
                        <button 
                            onClick={() => onToggleComplete(todo.id)}
                            className={`w-16 h-16 rounded-2xl font-bold text-2xl transition-all duration-300 transform hover:scale-110 shadow-lg ${
                                todo.completed 
                                    ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-green-200' 
                                    : 'bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600 hover:from-yellow-400 hover:to-orange-500 hover:text-white shadow-gray-200'
                            }`}
                        >
                            {todo.completed ? '✓' : '○'}
                        </button>

                        {/* Todo Content */}
                        <div className="flex-1 min-w-0">
                            <h3 className={`text-xl font-bold mb-2 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                                {todo.name}
                            </h3>
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className={`text-sm font-medium ${todo.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                                        {new Date(todo.date).toLocaleDateString('en-US', { 
                                            weekday: 'short', 
                                            year: 'numeric', 
                                            month: 'short', 
                                            day: 'numeric' 
                                        })}
                                    </span>
                                </div>
                                {todo.completed && (
                                    <span className="px-3 py-1.5 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-xs font-bold rounded-full border border-green-200">
                                        ✓ Completed
                                    </span>
                                )}
                                {!todo.completed && (
                                    <span className="px-3 py-1.5 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 text-xs font-bold rounded-full border border-yellow-200">
                                        ⏳ Pending
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-3">
                        <button 
                            onClick={handleEdit} 
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 transform hover:scale-110 hover:shadow-md"
                            title="Edit todo"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                        <button 
                            onClick={() => onDelete(todo.id)} 
                            className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 transform hover:scale-110 hover:shadow-md"
                            title="Delete todo"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TodoItem;


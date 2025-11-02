
import { useState, useMemo } from 'react';
import './App.css'
import Appname from './componanet/Appname'
import Apptodo from './componanet/App-todo'
import TodoItem from './componanet/TodoItem'
import SearchFilter from './componanet/SearchFilter'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, name: "Milk", date: "2025-12-03", completed: false },
    { id: 2, name: "Magi", date: "2025-01-03", completed: false },
    { id: 3, name: "Buy groceries", date: "2025-01-15", completed: false },
    { id: 4, name: "Call mom", date: "2025-01-20", completed: true },
    { id: 5, name: "Finish project", date: "2025-02-01", completed: false }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const addTodo = (name, date) => {
    const newTodo = {
      id: Date.now(),
      name,
      date,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const editTodo = (id, newName, newDate) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, name: newName, date: newDate } : todo
    ));
  };

  // Filter todos based on search term and date filter
  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesSearch = searchTerm === '' || 
        todo.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDate = dateFilter === '' || 
        todo.date === dateFilter;
      
      return matchesSearch && matchesDate;
    });
  }, [todos, searchTerm, dateFilter]);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleDateFilterChange = (date) => {
    setDateFilter(date);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setDateFilter('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Appname />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Search and Filter Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden hover:shadow-2xl transition-all duration-300">
            <SearchFilter 
              onSearchChange={handleSearchChange}
              onDateFilterChange={handleDateFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Add Todo Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden hover:shadow-2xl transition-all duration-300">
            <Apptodo onAddTodo={addTodo} />
          </div>
          
          {/* Results Summary */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-sm"></div>
                <p className="text-sm font-medium text-gray-700">
                  Showing <span className="font-bold text-gray-900">{filteredTodos.length}</span> of <span className="font-bold text-gray-900">{todos.length}</span> todos
                  {(searchTerm || dateFilter) && (
                    <span className="ml-2 px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-xs font-semibold rounded-full border border-blue-200">
                      filtered
                    </span>
                  )}
                </p>
              </div>
              {filteredTodos.length > 0 && (
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-sm"></div>
                    <span className="text-sm text-gray-600">
                      <span className="font-bold text-green-600">{filteredTodos.filter(todo => todo.completed).length}</span> completed
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full shadow-sm"></div>
                    <span className="text-sm text-gray-600">
                      <span className="font-bold text-yellow-600">{filteredTodos.filter(todo => !todo.completed).length}</span> pending
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Todo List */}
          <div className="space-y-4">
            {filteredTodos.length > 0 ? (
              filteredTodos.map(todo => (
                <div key={todo.id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 hover:border-gray-300/50 group">
                  <TodoItem 
                    todo={todo}
                    onDelete={deleteTodo}
                    onToggleComplete={toggleComplete}
                    onEdit={editTodo}
                  />
                </div>
              ))
            ) : (
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-16 text-center hover:shadow-2xl transition-all duration-300">
                <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center shadow-inner">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No todos found</h3>
                <p className="text-gray-600 max-w-md mx-auto text-lg leading-relaxed">
                  {searchTerm || dateFilter 
                    ? "Try adjusting your search or filter criteria to find what you're looking for." 
                    : "Get started by adding your first todo above!"
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App

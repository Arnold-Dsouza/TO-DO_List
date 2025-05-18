import React, { useState, useRef } from 'react';
import TeamMemberSelection from './TeamMemberSelection';

const AddTaskForm = ({
  addTask,
  setIsSearchModalOpen,
  confirmDeleteAllTasks,
  teamMembers,
  openTeamMembersModal,
}) => {
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState(1);
  const [taskNote, setTaskNote] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [errors, setErrors] = useState({});

  const taskNameInputRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};

    if (!taskName.trim()) {
      newErrors.taskName = 'Task name is required';
    }

    if (priority < 1 || priority > 5) {
      newErrors.priority = 'Priority must be between 1 and 5';
    }

    if (
      dueDate &&
      new Date(dueDate) < new Date(new Date().setHours(0, 0, 0, 0))
    ) {
      newErrors.dueDate = 'Due date cannot be in the past';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setTaskName('');
    setPriority(1);
    setTaskNote('');
    setDueDate('');
    setSelectedMembers([]);
    setErrors({});
  };

  const handleAddTask = () => {
    if (validateForm()) {
      const success = addTask(taskName, priority, taskNote, dueDate, selectedMembers);
      if (success) {
        resetForm();
      }
    } else {
      if (errors.taskName) {
        taskNameInputRef.current.focus();
      }
    }
  };

  const toggleMember = (member) => {
    if (selectedMembers.some(m => m.id === member.id)) {
      setSelectedMembers(selectedMembers.filter(m => m.id !== member.id));
    } else {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  // Generate priority color based on the level
  const getPriorityColor = (level) => {
    const colors = {
      1: { bg: 'bg-green-500', text: 'text-green-500', hover: 'hover:bg-green-100', border: 'border-green-500' },
      2: { bg: 'bg-blue-500', text: 'text-blue-500', hover: 'hover:bg-blue-100', border: 'border-blue-500' },
      3: { bg: 'bg-yellow-500', text: 'text-yellow-500', hover: 'hover:bg-yellow-100', border: 'border-yellow-500' },
      4: { bg: 'bg-orange-500', text: 'text-orange-500', hover: 'hover:bg-orange-100', border: 'border-orange-500' },
      5: { bg: 'bg-red-500', text: 'text-red-500', hover: 'hover:bg-red-100', border: 'border-red-500' },
    };
    return colors[level] || colors[1];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 transition-colors duration-200">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">TO-DO List</h2>

      <div className="flex flex-col gap-3 mb-4">
        <div className="flex flex-wrap gap-3">
          <div className="flex-grow">
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Task name"
              className={`w-full px-4 py-2 border ${
                errors.taskName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white`}
              ref={taskNameInputRef}
            />
            {errors.taskName && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.taskName}</p>
            )}
          </div>
          <div className="flex items-center">
            <label className="mr-2 text-sm text-gray-600 dark:text-gray-300">Priority:</label>
            <div className="relative group">
              <select 
                value={priority} 
                onChange={(e) => setPriority(parseInt(e.target.value))}
                className={`appearance-none w-32 px-4 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white pr-8 transition-all duration-300 transform hover:scale-105 ${getPriorityColor(priority).border} ${getPriorityColor(priority).text}`}
              >
                <option value={1} className="text-green-500">Low</option>
                <option value={2} className="text-blue-500">Normal</option>
                <option value={3} className="text-yellow-500">Medium</option>
                <option value={4} className="text-orange-500">High</option>
                <option value={5} className="text-red-500">Urgent</option>
              </select>
              <div className={`absolute top-1/2 right-2.5 transform -translate-y-1/2 w-3 h-3 rounded-full ${getPriorityColor(priority).bg} transition-all duration-300 group-hover:scale-125`}></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4 transition-transform duration-300 group-hover:rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            value={taskNote}
            onChange={(e) => setTaskNote(e.target.value)}
            placeholder="Note (optional)"
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
          <div>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={`px-4 py-2 border ${
                errors.dueDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white`}
            />
            {errors.dueDate && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.dueDate}</p>
            )}
          </div>
        </div>        {/* Team Member Selection */}
        <TeamMemberSelection 
          teamMembers={teamMembers}
          selectedMembers={selectedMembers}
          onChange={setSelectedMembers}
          onManageMembers={openTeamMembersModal}
        />        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={handleAddTask}
            className="relative px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-md transition-all duration-200 transform hover:-translate-y-1.5 hover:shadow-[0_8px_0_0_rgba(59,130,246,0.3)] active:translate-y-0 active:shadow-[0_4px_0_0_rgba(59,130,246,0.3)] before:absolute before:inset-0 before:bg-white/20 before:rounded-md before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200 border-b-4 border-blue-600 dark:border-blue-700 w-full"
          >
            Add Item
          </button>
          <button
            type="button"
            onClick={() => setIsSearchModalOpen(true)}
            className="relative px-4 py-2 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded-md transition-all duration-200 transform hover:-translate-y-1.5 hover:shadow-[0_8px_0_0_rgba(34,197,94,0.3)] active:translate-y-0 active:shadow-[0_4px_0_0_rgba(34,197,94,0.3)] before:absolute before:inset-0 before:bg-white/20 before:rounded-md before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200 border-b-4 border-green-600 dark:border-green-700 w-full"
          >
            Search
          </button>
          <button
            type="button"
            onClick={confirmDeleteAllTasks}
            className="relative px-4 py-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-md transition-all duration-200 transform hover:-translate-y-1.5 hover:shadow-[0_8px_0_0_rgba(239,68,68,0.3)] active:translate-y-0 active:shadow-[0_4px_0_0_rgba(239,68,68,0.3)] before:absolute before:inset-0 before:bg-white/20 before:rounded-md before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200 border-b-4 border-red-600 dark:border-red-700 w-full"
          >
            Delete All
          </button>
          <button
            type="button"
            onClick={openTeamMembersModal}
            className="relative px-4 py-2 bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white rounded-md transition-all duration-200 transform hover:-translate-y-1.5 hover:shadow-[0_8px_0_0_rgba(168,85,247,0.3)] active:translate-y-0 active:shadow-[0_4px_0_0_rgba(168,85,247,0.3)] before:absolute before:inset-0 before:bg-white/20 before:rounded-md before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200 border-b-4 border-purple-600 dark:border-purple-700 w-full"
          >
            Manage Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskForm;
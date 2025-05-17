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
      1: 'bg-green-500',
      2: 'bg-blue-500',
      3: 'bg-yellow-500',
      4: 'bg-orange-500',
      5: 'bg-red-500',
    };
    return colors[level] || colors[1];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 transition-colors duration-200">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Todo list</h2>

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
            <div className="relative">
              <select 
                value={priority} 
                onChange={(e) => setPriority(parseInt(e.target.value))}
                className="appearance-none w-32 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white pr-8"
              >
                <option value={1}>Low</option>
                <option value={2}>Normal</option>
                <option value={3}>Medium</option>
                <option value={4}>High</option>
                <option value={5}>Urgent</option>
              </select>
              <div className={`absolute top-1/2 right-2 transform -translate-y-1/2 w-3 h-3 rounded-full ${getPriorityColor(priority)}`}></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
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
        />

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleAddTask}
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300"
          >
            Add Item
          </button>
          <button
            type="button"
            onClick={() => setIsSearchModalOpen(true)}
            className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded-md transition duration-300"
          >
            Search
          </button>
          <button
            type="button"
            onClick={confirmDeleteAllTasks}
            className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300"
          >
            Delete All
          </button>
          <button
            type="button"
            onClick={openTeamMembersModal}
            className="bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white px-4 py-2 rounded-md transition duration-300"
          >
            Manage Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskForm;
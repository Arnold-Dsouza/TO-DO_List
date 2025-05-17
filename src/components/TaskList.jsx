import React, { useState, useMemo } from 'react';
import TaskItem from './TaskItem';
import TaskFilter from './TaskFilter';

const TaskList = ({
  tasks,
  dragAndDropProps,
  toggleTaskCheck,
  openEditModal,
  confirmDeleteTask,
  teamMembers,
}) => {
  // Filter state
  const [selectedPriorities, setSelectedPriorities] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);

  // Available priorities based on existing tasks
  const availablePriorities = useMemo(() => {
    const prioritySet = new Set(tasks.map((task) => task.priority));
    return Array.from(prioritySet).sort();
  }, [tasks]);

  // Filter tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Priority filter
      if (
        selectedPriorities.length > 0 &&
        !selectedPriorities.includes(task.priority)
      ) {
        return false;
      }

      // Member filter
      if (selectedMembers.length > 0) {
        if (!task.assignedMembers || task.assignedMembers.length === 0) {
          return false;
        }

        // Check if any assigned member is in the selected members list
        const hasSelectedMember = task.assignedMembers.some((member) =>
          selectedMembers.includes(member.id)
        );

        if (!hasSelectedMember) return false;
      }

      // Completion status filter
      if (!showCompleted && task.checked) {
        return false;
      }

      return true;
    });
  }, [tasks, selectedPriorities, selectedMembers, showCompleted]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          List of items
        </h2>
        <span className="text-sm text-gray-500">
          {filteredTasks.length} of {tasks.length} tasks
        </span>
      </div>

      {/* Filters */}
      <TaskFilter
        priorities={availablePriorities}
        teamMembers={teamMembers}
        selectedPriorities={selectedPriorities}
        selectedMembers={selectedMembers}
        showCompleted={showCompleted}
        onPriorityChange={setSelectedPriorities}
        onMemberChange={setSelectedMembers}
        onCompletedChange={setShowCompleted}
      />

      <ul className="divide-y divide-gray-200 dark:divide-gray-700 mt-4">        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            draggedTask={dragAndDropProps.draggedTask}
            draggedOverTask={dragAndDropProps.draggedOverTask}
            handleDragStart={dragAndDropProps.handleDragStart}
            handleDragOver={dragAndDropProps.handleDragOver}            handleDragEnd={dragAndDropProps.handleDragEnd}
            toggleTaskCheck={toggleTaskCheck}
            openEditModal={openEditModal}
            confirmDeleteTask={confirmDeleteTask}
          />
        ))}
        {filteredTasks.length === 0 && (
          <li className="py-3 text-gray-500 dark:text-gray-400 text-center">
            {tasks.length === 0
              ? 'No tasks added yet'
              : 'No tasks match the selected filters'}
          </li>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
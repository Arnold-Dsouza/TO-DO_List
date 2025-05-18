import React, { useState } from 'react';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import SearchModal from './components/SearchModal';
import EditTaskModal from './components/EditTaskModal';
import ConfirmModal from './components/ConfirmModal';
import TeamMembersModal from './components/TeamMembersModal';
import ManageTaskModal from './components/ManageTaskModal';
import TaskStatistics from './components/TaskStatistics';
import ThemeToggle from './components/ThemeToggle';
import AnimatedBackground from './components/AnimatedBackground';
import useTasks from './hooks/useTasks';
import useDragandDrop from './hooks/useDragandDrop';
import useTeamMembers from './hooks/useTeamMembers';

const App = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isTeamMembersModalOpen, setIsTeamMembersModalOpen] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [managingTask, setManagingTask] = useState(null);

  const {
    tasks,
    setTasks,
    teamMembers,
    editingTask,
    setEditingTask,
    taskToDelete,
    deleteAllConfirm,
    isEditModalOpen,
    setIsEditModalOpen,
    isConfirmModalOpen,
    addTask,
    deleteTask,
    deleteAllTasks,
    saveEditedTask,
    toggleTaskCheck,
    openEditModal,
    confirmDeleteTask,
    confirmDeleteAllTasks,
    closeConfirmModal,
  } = useTasks();

  const {
    teamMembers: allTeamMembers,
    addTeamMember, 
    updateTeamMember, 
    deleteTeamMember
  } = useTeamMembers();

  const openManageModal = (task) => {
    setManagingTask(task);
    setIsManageModalOpen(true);
  };

  const closeManageModal = () => {
    setIsManageModalOpen(false);
    setManagingTask(null);
  };

  const dragAndDropProps = useDragandDrop(tasks, setTasks);

  return (
    <div className="container mx-auto p-4 max-w-3xl min-h-screen relative text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <AnimatedBackground />
      <div className="relative z-10">
        <AddTaskForm
          addTask={addTask}
          setIsSearchModalOpen={setIsSearchModalOpen}
          confirmDeleteAllTasks={confirmDeleteAllTasks}
          teamMembers={allTeamMembers}
          openTeamMembersModal={() => setIsTeamMembersModalOpen(true)}
        />

        <TaskStatistics
          tasks={tasks}
          teamMembers={allTeamMembers}
        />

        <TaskList
          tasks={tasks}
          dragAndDropProps={dragAndDropProps}
          toggleTaskCheck={toggleTaskCheck}
          openEditModal={openEditModal}
          confirmDeleteTask={confirmDeleteTask}
          teamMembers={allTeamMembers}
        />

        <SearchModal
          isOpen={isSearchModalOpen}
          onClose={() => setIsSearchModalOpen(false)}
          tasks={tasks}
          toggleTaskCheck={toggleTaskCheck}
        />

        <EditTaskModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          saveEditedTask={saveEditedTask}
          teamMembers={allTeamMembers}
          openTeamMembersModal={() => setIsTeamMembersModalOpen(true)}
          confirmDeleteTask={confirmDeleteTask}
        />

        <ConfirmModal
          isOpen={isConfirmModalOpen}
          onClose={closeConfirmModal}
          onConfirm={deleteAllConfirm ? deleteAllTasks : deleteTask}
          taskToDelete={taskToDelete}
          deleteAllConfirm={deleteAllConfirm}
        />

        <TeamMembersModal
          isOpen={isTeamMembersModalOpen}
          onClose={() => setIsTeamMembersModalOpen(false)}
          teamMembers={allTeamMembers}
          onAdd={addTeamMember}
          onUpdate={updateTeamMember}
          onDelete={deleteTeamMember}
        />

        <ManageTaskModal
          isOpen={isManageModalOpen}
          onClose={closeManageModal}
          task={managingTask}
          toggleTaskCheck={toggleTaskCheck}
          openEditModal={openEditModal}
          confirmDeleteTask={confirmDeleteTask}
          teamMembers={allTeamMembers}
        />

        <div className="z-10 relative">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default App;
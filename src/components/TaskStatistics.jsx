import React from 'react';
import PriorityTag from './PriorityTag';
import Avatar from './Avatar';

const TaskStatistics = ({ tasks, teamMembers }) => {
  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.checked).length;
  const incompleteTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Group tasks by priority
  const tasksByPriority = [1, 2, 3, 4, 5].map(priority => ({
    priority,
    count: tasks.filter(task => task.priority === priority).length,
    completed: tasks.filter(task => task.priority === priority && task.checked).length
  }));
  
  // Get top assignees
  const assigneesMap = new Map();
  tasks.forEach(task => {
    if (task.assignedMembers) {
      task.assignedMembers.forEach(member => {
        const currentCount = assigneesMap.get(member.id) || { total: 0, completed: 0, member };
        currentCount.total += 1;
        if (task.checked) currentCount.completed += 1;
        assigneesMap.set(member.id, currentCount);
      });
    }
  });
  
  const topAssignees = Array.from(assigneesMap.values())
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Task Statistics</h2>
      
      {/* Overall progress */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600 dark:text-gray-300">Overall Progress</span>
          <span className="font-medium">{completedTasks} / {totalTasks} ({completionRate}%)</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>{incompleteTasks} remaining</span>
          <span>{completedTasks} completed</span>
        </div>
      </div>
      
      {/* Tasks by priority */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">Tasks by Priority</h3>
        <div className="space-y-3">
          {tasksByPriority.map(item => (
            item.count > 0 && (
              <div key={item.priority} className="flex items-center">
                <div className="w-20">
                  <PriorityTag priority={item.priority} />
                </div>
                <div className="flex-grow ml-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-500">{item.completed} / {item.count}</span>
                    <span className="text-xs text-gray-500">
                      {item.count > 0 ? Math.round((item.completed / item.count) * 100) : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                    <div 
                      className={`h-1.5 rounded-full ${
                        item.priority >= 4 ? 'bg-red-500' : 
                        item.priority >= 3 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${item.count > 0 ? (item.completed / item.count) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
                <div className="ml-3 w-10 text-right text-sm font-medium">
                  {item.count}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
      
      {/* Top assignees */}
      {topAssignees.length > 0 && (
        <div>
          <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">Top Assignees</h3>
          <div className="space-y-3">
            {topAssignees.map(({ member, total, completed }) => (
              <div key={member.id} className="flex items-center">
                <div className="flex items-center w-32">
                  <Avatar name={member.name} size="sm" />
                  <span className="ml-2 text-sm truncate">{member.name}</span>
                </div>
                <div className="flex-grow ml-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-500">{completed} / {total}</span>
                    <span className="text-xs text-gray-500">
                      {total > 0 ? Math.round((completed / total) * 100) : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                    <div 
                      className="bg-blue-500 h-1.5 rounded-full" 
                      style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
                <div className="ml-3 w-10 text-right text-sm font-medium">
                  {total}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskStatistics;

import { useState, useEffect } from 'react';

// Sample team members data
const defaultTeamMembers = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Mike Johnson' },
  { id: 4, name: 'Sarah Wilson' },
  { id: 5, name: 'Alex Taylor' },
];

const useTeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState(() => {
    const savedMembers = localStorage.getItem('teamMembers');
    return savedMembers ? JSON.parse(savedMembers) : defaultTeamMembers;
  });

  useEffect(() => {
    localStorage.setItem('teamMembers', JSON.stringify(teamMembers));
  }, [teamMembers]);

  const addTeamMember = (name) => {
    if (!name.trim()) return false;
    
    const newMember = {
      id: Date.now(),
      name: name.trim(),
    };
    
    setTeamMembers([...teamMembers, newMember]);
    return true;
  };

  const updateTeamMember = (id, name) => {
    if (!name.trim()) return false;
    
    setTeamMembers(
      teamMembers.map((member) => 
        member.id === id ? { ...member, name: name.trim() } : member
      )
    );
    
    return true;
  };

  const deleteTeamMember = (id) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id));
    return true;
  };

  return {
    teamMembers,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
  };
};

export default useTeamMembers;

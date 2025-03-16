import { useAuth } from '@/context/AuthContext';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import NoteIcon from '@mui/icons-material/Note';

const useMenu = () => {
  const { user } = useAuth();
  const subjects = user?.userDetails?.subjects || [];

  // Map subjects to menu structure
  const menu = subjects.map((subject, index) => ({
    key: `${index + 1}`,
    title: subject, // Subject as the main menu
    icon: <NoteIcon />,
    submenus: [
      {
        key: `${index + 1}.1`,
        route: `/notes/create?subject=${encodeURIComponent(subject)}`, // Passing subject as a query param
        title: 'Create Note',
        icon: <NoteAddIcon />,
      },
      {
        key: `${index + 1}.2`,
        route: `/notes/allNotes?subject=${encodeURIComponent(subject)}`, // Passing subject for filtering
        title: 'View Notes',
        icon: <NoteIcon />,
      },
    ],
  }));

  return menu;
};

export default useMenu;

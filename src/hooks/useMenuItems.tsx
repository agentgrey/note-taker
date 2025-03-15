import React, { useContext } from 'react';
import {
  AdminPanelSettings,
  ChecklistRtl,
  ConfirmationNumber,
  CrisisAlert,
  CurrencyBitcoin,
  Dashboard,
  DriveFolderUpload,
  Email,
  FactCheck,
  Help,
  KeyboardAlt,
  Notifications,
  Password,
  Person,
  Public,
  Rule,
  SupportAgent
} from '@mui/icons-material';
import PeopleIcon from '@mui/icons-material/People';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MoneyIcon from '@mui/icons-material/Money';
import NoteIcon from "@mui/icons-material/Note";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useAuth } from '@/context/AuthContext';
import { ROLE } from '@/constants/role.constants';

const useMenu = () => {
  const { user } = useAuth();
  const role = user?.role;

  const adminMenu = [
    {
      key: '1',
      title: 'Dashboard',
      icon: <Dashboard />,
      route: '/',
    },
    {
      key: '6',
      title: 'Team Managment',
      icon: <PeopleIcon />,
      submenus: [
        // {
        //   key: '6.1',
        //   route: '/users/dashboard',
        //   title: 'Dashboard',
        //   icon: <Dashboard />,
        // },

        {
          key: '6.2',
          route: '/users',
          title: 'View Team Members',
          icon: <PeopleIcon /> ,
        },
      ],
    },
    {
      key: '7',
      title: 'Products',
      icon: <CreditCardIcon />,
      submenus: [
        {
          key: '7.1',
          route: '/products',
          title: 'Dashboard',
          icon: <Dashboard />,
        },
        {
          key: '7.2',
          route: '/products/create-product',
          title: 'Create Product',
          icon: <PostAddIcon/>,
        },
      ],
    },
    
    {
      key: '8',
      title: 'Orders',
      icon: <NoteIcon />,
      submenus: [
        
        {
          key: '8.2',
          route: '/orders',
          title: 'View Orderss',
          icon: <ReceiptLongIcon /> ,
        },
        // {
        //   key: '8.3',
        //   route: '/orders/create-orders',
        //   title: 'Create Orders',
        //   icon: <NoteAddIcon /> ,
        // },
      ],
    },
  ]

  const managerMenu = [
    { key: '1', title: 'Dashboard', icon: <Dashboard />, route: '/' },
    {
      key: '2',
      title: 'Products',
      icon: <CreditCardIcon />,
      submenus: [
        { key: '2.1', route: '/products', title: 'Dashboard', icon: <Dashboard /> },
        { key: '2.2', route: '/products/create-product', title: 'Create Product', icon: <PostAddIcon /> },
      ],
    },
    {
      key: '3',
      title: 'Orders',
      icon: <NoteIcon />,
      submenus: [
        { key: '3.1', route: '/orders', title: 'View Orders', icon: <ReceiptLongIcon /> },
        { key: '3.2', route: '/orders/create-orders', title: 'Create Orders', icon: <NoteAddIcon /> },
      ],
    },
  ];

  const employeeMenu = [
    { key: '1', title: 'Dashboard', icon: <Dashboard />, route: '/' },
    {
      key: '2',
      title: 'Orders',
      icon: <NoteIcon />,
      submenus: [
        { key: '2.1', route: '/orders', title: 'View Orders', icon: <ReceiptLongIcon /> },
      ],
    },
  ];

  if (role === ROLE.ADMIN) return adminMenu;
  if (role === ROLE.MANAGER) return managerMenu;
  if (role === ROLE.EMPLOYEE) return employeeMenu;
  return [];
};

export default useMenu;
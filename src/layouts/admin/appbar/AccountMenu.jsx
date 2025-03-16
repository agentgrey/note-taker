"use client";
import { ErrorOutline } from '@mui/icons-material';
import Logout from '@mui/icons-material/Logout';
import Person from '@mui/icons-material/Person';
import Settings from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { NOTIFICATIONBELL, USER } from '../../../assets/home';
import PhotoViewerSmall from '../../../core/PhotoViewer';
import { useAuth } from '@/context/AuthContext';
const bgcolor = `#${Math.random().toString().slice(2, 8)}`
export default function AccountMenu() {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState(null)
  const [prevLimit, setPrevLimit] = useState();
  const [logout, setLogout] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const url = process.env.NEXT_PUBLIC_URL;
  const { } = useAuth();
  const [role, setRole] = useState();
  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);
  const logoutFun = () => {
    setLogout(true);
  };



  return (
    <>


      <div className="flex items-center  gap-6">
        <div className="flex gap-6 items-center">
          
          
          <Link href={"/notification"}>
            <Tooltip title="Notifications">
              <Badge
                badgeContent={10}
                color="warning"
              >
                <p className="cursor-pointer group rounded-lg bg-[#bbcbff87] hover:bg-white transition-all ease-in-out duration-200 md:p-2 p-1 shadow-md">
                  <img
                    className="md:h-5 h-7 object-contain group-hover:scale-105 transition-all ease-in-out duration-200"
                    src={NOTIFICATIONBELL.src}
                    alt=""
                  />
                </p>
              </Badge>
            </Tooltip>
          </Link>
        </div>
        <Tooltip >
          <div className="flex w-fit  items-center justify-start gap-2 overflow-hidden bg-white">
            <div
              onClick={handleClick}
              className="flex gap-2 items-center cursor-pointer"
            >
              {/* <PhotoViewerSmall
              size="2.5rem"
              photo={role === "Admin" ? "/logo1.png" : profileImage || USER.src}
              name={customerName}
              /> */}
            </div>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 40,
                    height: 40,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {/* <MenuItem>
                <Avatar src={role === "Admin" ? "/logo1.png" : profileImage || USER.src} alt={''} />
                <ListItemText
                  primary={role === "Admin" ? "Admin" : customerName}
                  // secondary={role === "Admin" ? "Admin" : customerName}
                />
              </MenuItem>
              <Divider />
              <Link
                href={
                  ''
                }
              >
                <MenuItem>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
              </Link>
              <Link
                href={`/profile`}
              >
                <MenuItem>
                  <ListItemIcon>
                    <Person fontSize="small" />
                  </ListItemIcon>
                  Profile
                </MenuItem>
              </Link>
              <MenuItem onClick={logoutFun}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem> */}
            </Menu>
          </div>
        </Tooltip>
      </div>

     
    </>
  )
}
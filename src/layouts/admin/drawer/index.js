'use client'
import { Fragment, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";

import ExitToApp from "@mui/icons-material/ExitToApp";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Menu from "@mui/icons-material/Menu";
import { CustomDrawer, CustomDrawerHeader } from "./custom";
import { useRouter } from "next/navigation";
import axios from "axios";
import useMenuItems from "../../../hooks/useMenuItems";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
// import { useAuthValue } from "../../../context/AuthContext";

const Drawer = ({ open, onToggle }) => {
  const router = useRouter();
  const [selectedSubMenu, setSelectedSubMenu] = useState("");
  const [selectedSubSubMenu, setSelectedSubSubMenu] = useState("");
  const MenuItems = useMenuItems();
  const logo = process.env.NEXT_PUBLIC_LOGO;
  const { logout } = useAuth();
  const url = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    // Load saved submenu states on component mount
    const savedSubMenu = localStorage.getItem("selectedSubMenu");
    const savedSubSubMenu = localStorage.getItem("selectedSubSubMenu");

    if (savedSubMenu) setSelectedSubMenu(savedSubMenu);
    if (savedSubSubMenu) setSelectedSubSubMenu(savedSubSubMenu);
  }, []);

  const handleSubMenuClick = (key) => {
    const newSelectedSubMenu = selectedSubMenu === key ? "" : key;
    setSelectedSubMenu(newSelectedSubMenu);
    localStorage.setItem("selectedSubMenu", newSelectedSubMenu);
  };

  const handleSubSubMenuClick = (key) => {
    const newSelectedSubSubMenu = selectedSubSubMenu === key ? "" : key;
    setSelectedSubSubMenu(newSelectedSubSubMenu);
    localStorage.setItem("selectedSubSubMenu", newSelectedSubSubMenu);
  };

  const logoutFun = () => {
    logout();
  };

  return (
    <>
      <ProtectedRoute>
        <CustomDrawer variant="permanent" open={open}>
          <CustomDrawerHeader className="flex flex-col items-center mt-3">
            <div className="flex h-16 w-full items-center justify-center gap-4">
              <img
                src={logo}
                alt="Logo"
                loading="lazy"
                width={160}
                height={40}
                className={`${open ? "h-12 w-[60%] object-contain" : "hidden"}`}
              />
              <IconButton onClick={onToggle}>
                {open ? <ChevronLeft /> : <Menu />}
              </IconButton>
            </div>
            <p className="text-lg mr-5 font-semibold text-gray-600 text-right">
              {/* {companyType === "shipper" && "Carrier"}
            {(companyType === "supplier" || companyType === "buyer") && "Corporate"}
            {companyType === "chamber" && "Chamber"}
            {companyType === "bank" && "Financial Firms"}
            {email==="info@credore.xyz" && "Admin"} */}
              {/* {companyType} */}
            </p>
          </CustomDrawerHeader>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 3,
              flexDirection: "column",
              height: "100%",
            }}
          >
            <List sx={{ mt: 1 }}>
              {MenuItems.map((item) => (
                <Fragment key={item.key}>
                  <Tooltip title={item.title} followCursor arrow placement="top-end">
                    <ListItemButton
                      onClick={() => {
                        if (item?.route) return router.push(item?.route);
                        if (item?.submenus) handleSubMenuClick(item.key);
                      }}
                      selected={
                        item?.submenus
                          ? selectedSubMenu === item?.key
                          : router?.pathname === item.route
                      }
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.title} />
                      {item?.submenus && (
                        <div className="h-5 w-5 rounded-full bg-gray-200 p-0 flex mx-auto justify-center items-center">
                          {selectedSubMenu === item?.key ? (
                            <ExpandLess fontSize="small" />
                          ) : (
                            <ExpandMore fontSize="small" />
                          )}
                        </div>
                      )}
                    </ListItemButton>
                  </Tooltip>

                  {item?.submenus && (
                    <Collapse
                      in={selectedSubMenu === item?.key}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {item?.submenus.map((submenu) => (
                          <Fragment key={submenu.key}>
                            <ListItemButton
                              sx={{ pl: 4 }}
                              onClick={() => {
                                if (submenu?.route) return router.push(submenu.route);
                                if (submenu?.subSubMenus) handleSubSubMenuClick(submenu.key);
                              }}
                              selected={
                                submenu?.subSubMenus
                                  ? selectedSubSubMenu === submenu.key
                                  : router?.pathname === submenu.route
                              }
                            >
                              <ListItemIcon>{submenu.icon}</ListItemIcon>
                              <ListItemText primary={submenu.title} sx={{ whiteSpace: "break-spaces" }} />
                              {submenu?.subSubMenus && (
                                <div className="h-5 w-5 rounded-full bg-gray-200 p-0 flex mx-auto justify-center items-center">
                                  {selectedSubSubMenu === submenu.key ? (
                                    <ExpandLess fontSize="small" />
                                  ) : (
                                    <ExpandMore fontSize="small" />
                                  )}
                                </div>
                              )}
                            </ListItemButton>

                            {submenu?.subSubMenus && (
                              <Collapse
                                in={selectedSubSubMenu === submenu.key}
                                timeout="auto"
                                unmountOnExit
                              >
                                <List component="div" disablePadding>
                                  {submenu.subSubMenus.map((subSubMenu) => (
                                    <ListItemButton
                                      key={subSubMenu.key}
                                      sx={{ pl: 6 }}
                                      onClick={() => router.push(subSubMenu.route)}
                                      selected={router.pathname === subSubMenu.route}
                                    >
                                      <ListItemIcon>{subSubMenu.icon}</ListItemIcon>
                                      <ListItemText
                                        primary={subSubMenu.title}
                                        sx={{ whiteSpace: "break-spaces" }}
                                      />
                                    </ListItemButton>
                                  ))}
                                </List>
                              </Collapse>
                            )}
                          </Fragment>
                        ))}
                      </List>
                    </Collapse>
                  )}
                  <Divider className="!w-[90%] !mx-auto" />
                </Fragment>
              ))}
            </List>

            <Box hidden={!open} sx={{ textAlign: "center" }}>
              <div className="py-5">
                <Button
                  variant="contained"
                  startIcon={<ExitToApp />}
                  color="error"
                  className="bg-theme-red"
                  onClick={logoutFun}
                >
                  Logout
                </Button>
              </div>

              <div className="mt-2 flex gap-5 mx-auto text-center justify-center text-sm">
                <div className="text-blue-500">
                  <a href="#" target="_blank">
                    Privacy Policy
                  </a>
                </div>
                |
                <div className="text-blue-500">
                  <a href="#" target="_blank">
                    Terms Of Use
                  </a>
                </div>
              </div>
              <div className="text-blue-500 text-sm">
                <a href="#" target="_blank">
                  Refund Policy
                </a>
              </div>
            </Box>
          </Box>
        </CustomDrawer>
      </ProtectedRoute>
    </>
  );
};

export default Drawer;

import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChalkboard,faComputer,faChevronDown,faAnglesLeft, faUserGear,faBook,faList,faPlus,faPaperPlane,faClockRotateLeft,faHandHolding,faRotateLeft, faThumbsUp, faThumbsDown,  faUsersGear, faEnvelope, faUserShield} from '@fortawesome/free-solid-svg-icons';
import { faComments, faFileLines } from '@fortawesome/free-regular-svg-icons';
import lmd from './resources/img/logo.png'
import profile from './resources/profile/p14.png';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import ListAsset from './pages/ListAsset';
import AddAsset from './pages/AddAsset';
import Return from './pages/Return';
import Lease from './pages/Lease';
import Submitted from './pages/Submitted';
import History from './pages/History';
import ManageUser from './pages/ManageUser';
import Login from './Login';
import Notfound from './pages/Notfound';
import MyReport from './pages/MyReport';
import Test from './pages/Test';
import Qrgen from './pages/Qrgen';
import Offline from './pages/Offline';
import { AuthProvider, useAuth } from './AuthContext';
import { Bounce,  ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Drawer,
} from "@material-tailwind/react";


const Home = () =>  {
  const { loggedIn, logout, username, Role, Roles, email, Notification, setNotification, setNotificationStatus, NotificationStatus, NotificationInfo, setNotificationInfo } = useAuth();
  const [openSidebar, setOpenSidebar] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState(0);
  const [isDesktopView, setIsDesktopView] = useState(window.innerWidth > 768);
  const [rotateButton, setRotateButton] = useState(false);

  const handleOpenSidebar = () => {
    setOpenSidebar((prev) => !prev);
    setRotateButton(!rotateButton);
  };
 
  const handleOpenDrawer = () => {
    setOpenDrawer((prev) => !prev);
    setRotateButton(!rotateButton);
  };

  const handleOpenSubmenu = (value) => {
    setOpenSubmenu(openSubmenu === value ? 0 : value);
  };

  const handleResizeHehe = () => {
      setIsDesktopView(window.innerWidth > 768);
  }; 
  
  const handleResizeApp = () => {
    if (window.innerWidth <= 768) {
      setOpenSidebar(false);
    } else {
      setOpenSidebar(true);
    }
  };
  
  useEffect(() => {
      window.addEventListener('resize', handleResizeHehe);

      return () => {
      window.removeEventListener('resize', handleResizeHehe);
      };
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResizeApp);
    return () => {
      window.removeEventListener('resize', handleResizeApp);
    };
  }, []);

  const notify = () => {
    toast.success("Wow so easy !", {
      icon: "❤️"
    })
    toast.error("Wow so easy !", {
      icon: "😁"
    })
    toast.warning("Wow so easy !", {
      icon: "😎"
    })
  }

  // Notifikasi
  if (NotificationStatus) {
    setTimeout(() => {
      setNotificationStatus(false);
      setNotification('');
      setNotificationInfo('');
    }, 4000);
  } else {
    setNotificationStatus(false);
    setNotification('');
    setNotificationInfo('');
  }  

  // popover profile
  const [showPopoverProfile, setShowPopoverProfile] = useState(false);
  const togglePopoverProfile = () => {
    setShowPopoverProfile(!showPopoverProfile);
  };

  return (
    <Router>
      {/* NAVBAR */}
      {loggedIn ? (
        <div className='flex fixed text-white items-center w-full justify-between z-50 bg-gray-800 h-[60px] px-7'>
          <div className='flex justify-between items-center'>
            <div className='logo pl-6'>
              <img src={lmd} alt='logohe' className='w-[150px] h-auto flex m-auto items-center' />
            </div>
          </div>

          <div className='flex items-center'>
            {/* Profile */}
            {loggedIn ? (
              <div className='flex items-center cursor-default' onMouseEnter={togglePopoverProfile} onMouseLeave={togglePopoverProfile}>
                <img src={profile} alt='profile' className='w-9 h-9 rounded-full' />
                <div className='font-semibold ml-1.5 overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[60px]'>
                  {username}
                  {showPopoverProfile && (
                    <div className="flex flex-col opacity-90 justify-center p-4 shadow-md rounded-xl lg:w-[300px] md:w-[250px] sm:w-[220px] bg-gray-900 dark:text-gray-100 absolute top-16 right-1">
                      <img src={profile} alt='profile' className="w-14 h-14 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
                      <div className="space-y-2 text-center divide-y divide-gray-700">
                        <div className="my-1 space-y-1 break-all">
                          <h2 className=" font-semibold text-sm break-all">{username}</h2>
                        </div>
                        <div className="flex justify-center item-center content-center text-gray-400 pt-1 align-center">
                          <div className='tex-gray-400 text-xs pr-2'>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <h3 className='text-xs'>{email}</h3>
                          </div>
                          <div className='text-gray-400 text-xs pl-2'>
                            <FontAwesomeIcon icon={faUserShield} />
                            <h3 className='text-xs'>{Roles}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className='flex items-center cursor-default' onMouseEnter={togglePopoverProfile} onMouseLeave={togglePopoverProfile}>
                <img src={profile} alt='profile' className='w-9 h-9 rounded-full' />
                <div className='font-semibold ml-1.5 overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[60px]'>
                  Guest
                  {showPopoverProfile && (
                    <div className="flex flex-col opacity-90 justify-center p-4 shadow-md rounded-xl lg:w-[300px] md:w-[250px] sm:w-[220px] bg-gray-900 dark:text-gray-100 absolute top-16 right-1">
                      <img src={profile} alt='profile' className="w-14 h-14 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
                      <div className="space-y-2 text-center divide-y divide-gray-700">
                        <div className="my-1 space-y-1 break-all">
                          <h2 className=" font-semibold text-sm break-all">Guest</h2>
                        </div>
                        <div className="flex justify-center item-center content-center text-gray-400 pt-1 align-center">
                          <div className='tex-gray-400 text-xs pr-2'>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <h3 className='text-xs'>guest@gmail.com</h3>
                          </div>
                          <div className='text-gray-400 text-xs pl-2'>
                            <FontAwesomeIcon icon={faUserShield} />
                            <h3 className='text-xs'>Guest</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          <div>
            <button onClick={notify}>Notify !</button>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              transition={Bounce}
            />
          </div>
            {NotificationStatus ? (
              <div className={`notification flex flex-col max-h-screen absolute top-16 right-1 gap-1 ${NotificationStatus ? 'slide-in' : 'slide-out'}`}>
                <div class="flex items-center lg:w-[300px] md:w-[250px] sm:w-[200px] p-4 opacity-90 rounded-lg shadow bg-gray-900">
                  {NotificationInfo === 'Error' ? (
                    <div class="flex bg-red-500 items-center justify-center flex-shrink-0 w-8 h-8 text-white rounded-lg">
                      <FontAwesomeIcon icon={faThumbsDown} />
                    </div>
                  ) : (
                    <div class="flex bg-green-500 items-center justify-center flex-shrink-0 w-8 h-8 text-white rounded-lg">
                      <FontAwesomeIcon icon={faThumbsUp} />
                    </div>
                  )}
                  <div class="ml-3 text-left text-sm font-normal break-all text-white">{Notification}</div>
                </div>
              </div>
            ) : null }
          </div>
        </div>
      ) : null }

      {/* CONTAINER */}
      {loggedIn ? (
      <div className='flex'>
        {isDesktopView && (
          <Card 
            className={`h-screen text-white z-50 fixed mt-[60px] w-full bg-gray-800 rounded-none max-w-[296px] ${openSidebar ? 'sidebar-opened' : 'sidebar-closed'}`} 
            id='sidebar' 
            style={{left: openSidebar ? '0' : '-296px', 
                    transition: 'left 0.5s ease-in-out',
                  }}
          >
            <div className="mb-8 p-8">
              <Typography variant="h5" className='uppercase text-center font-semibold text-2xl' color="white">
                asset<br />management
              </Typography>
                <div className="relative">
                  <button 
                    onClick={handleOpenSidebar} 
                    className="absolute bottom-10 -right-14 w-10 h-8 bg-gray-800 border-[#efefef] border-2 rounded-full text-[#efefef]" 
                  >
                    <FontAwesomeIcon
                      icon={faAnglesLeft} 
                      size='xs' 
                      style={{transform: openSidebar ? 'rotate(0deg)' : 'rotate(180deg)', 
                              transition: 'transform 0.8s ease', 
                            }}
                    />
                  </button>
                </div>
            </div>
            <List className='px-6'>
              {/* DASHBOARD */}
              <Link to='/'>
                <ListItem className='px-4 text-white hover:bg-[#323b49] hover:text-white focus:bg-[#323b49] focus:text-white active:bg-gray-600 active:text-white'>
                  <ListItemPrefix className='mr-3 w-6 h-6'>
                    <FontAwesomeIcon icon={faChalkboard}/>
                  </ListItemPrefix>
                  <Typography>
                    Dashboard
                  </Typography>
                </ListItem>
              </Link>
              {/* CHAT */}
              <Link to='/chat'>
                <ListItem className='px-4 text-white hover:bg-[#323b49] hover:text-white focus:bg-[#323b49] focus:text-white active:bg-gray-600 active:text-white'>
                  <ListItemPrefix className='mr-3 w-6 h-6'>
                    <FontAwesomeIcon icon={faComments} />
                  </ListItemPrefix>
                  <Typography>
                    Chat
                  </Typography>
                  <ListItemSuffix>
                    <Chip value="14" size="sm" variant="white" color="blue-gray" className="rounded-full" />
                  </ListItemSuffix>
                </ListItem>
              </Link>
              {/* ASSET */}
              <Accordion
                open={openSubmenu === 1}
                icon={
                  <FontAwesomeIcon icon={faChevronDown} size=''
                    className={`mx-auto items-center flex h-3 w-4 transition-transform ${openSubmenu === 1 ? "rotate-180" : ""}`}
                  />
                }
              >
                <ListItem className="p-0 px-1 hover:bg-[#323b49] active:bg-gray-600 focus:bg-gray-800 bg-gray-800" selected={openSubmenu === 1}>
                  <AccordionHeader onClick={() => handleOpenSubmenu(1)} className="border-b-0 p-3 bg-none text-white hover:text-white">
                    <ListItemPrefix className='mr-3 w-6 h-6'>
                      <FontAwesomeIcon icon={faComputer} />
                    </ListItemPrefix>
                    <Typography color="white" className="mr-auto font-normal">
                      Assets
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="p-0 bg-gray-600">
                  <List className="p-0 gap-0">
                    <Link to='/listasset'>
                      <ListItem className='px-4 text-white hover:bg-[#374151] hover:text-white hover:rounded-none focus:rounded-none focus:bg-[#323b49] focus:text-white active:bg-gray-600 active:text-white'>
                        <ListItemPrefix className='mr-3 w-6 h-6'>
                          <FontAwesomeIcon icon={faList} />
                        </ListItemPrefix>
                        List of Asset
                      </ListItem>
                    </Link>
                    {Role === 2 || Role === 1 ? (
                      <Link to='/addasset'>
                        <ListItem className='px-4 text-white hover:bg-[#374151] hover:text-white hover:rounded-none focus:rounded-none focus:bg-[#323b49] focus:text-white active:bg-gray-600 active:text-white'>
                          <ListItemPrefix className='mr-3 w-6 h-6'>
                            <FontAwesomeIcon icon={faPlus} />
                          </ListItemPrefix>
                          Add an Asset
                        </ListItem>
                      </Link>
                    ) : null}
                    {loggedIn ? (
                      <Link to='/lease'>
                        <ListItem className='px-4 text-white hover:bg-[#374151] hover:text-white hover:rounded-none focus:rounded-none focus:bg-[#323b49] focus:text-white active:bg-gray-600 active:text-white'>
                          <ListItemPrefix className='mr-3 w-6 h-6'>
                            <FontAwesomeIcon icon={faHandHolding} />
                          </ListItemPrefix>
                          Lease
                        </ListItem>
                      </Link>
                    ) : null}
                    {loggedIn ? (
                      <Link to='/return'>
                        <ListItem className='px-4 text-white hover:bg-[#374151] hover:text-white hover:rounded-none focus:rounded-none focus:bg-[#323b49] focus:text-white active:bg-gray-600 active:text-white'>
                          <ListItemPrefix className='mr-3 w-6 h-6'>
                            <FontAwesomeIcon icon={faRotateLeft} />
                          </ListItemPrefix>
                          Return
                        </ListItem>
                      </Link>
                    ) : null}
                    {Role === 2 || Role === 1 ? (
                      <Link to='/submitted'>
                        <ListItem className='px-4 text-white hover:bg-[#374151] hover:text-white hover:rounded-none focus:rounded-none focus:bg-[#323b49] focus:text-white active:bg-gray-600 active:text-white'>
                          <ListItemPrefix className='mr-3 w-6 h-6'>
                            <FontAwesomeIcon icon={faPaperPlane} />
                          </ListItemPrefix>
                          Submitted
                        </ListItem>
                      </Link>
                    ) : null}
                  </List>
                </AccordionBody>
              </Accordion>
              {/* REPORT */}
              <Accordion
                open={openSubmenu === 2}
                icon={
                  <FontAwesomeIcon icon={faChevronDown} size=''
                    className={`mx-auto items-center flex h-3 w-4 transition-transform ${openSubmenu === 1 ? "rotate-180" : ""}`}
                  />
                }
              >
                <ListItem className="p-0 px-1 hover:bg-[#323b49] active:bg-gray-600 focus:bg-gray-800 bg-gray-800" selected={openSubmenu === 2}>
                  <AccordionHeader onClick={() => handleOpenSubmenu(2)} className="border-b-0 p-3 bg-none text-white hover:text-white">
                    <ListItemPrefix className='mr-3 w-6 h-6'>
                      <FontAwesomeIcon icon={faBook} />
                    </ListItemPrefix>
                    <Typography color="white" className="mr-auto font-normal">
                      Reports
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="p-0 bg-gray-600">
                  <List className="p-0 gap-0">
                    {Role === 2 || Role === 1 ? (
                      <Link to='/history'>
                        <ListItem className='px-4 text-white hover:bg-[#374151] hover:text-white hover:rounded-none focus:rounded-none focus:bg-[#323b49] focus:text-white active:bg-gray-600 active:text-white'>
                          <ListItemPrefix className='mr-3 w-6 h-6'>
                            <FontAwesomeIcon icon={faClockRotateLeft}/>
                          </ListItemPrefix>
                          History
                        </ListItem>
                      </Link>
                    ) : null}
                    <Link to='myreport'>
                      <ListItem className='px-4 text-white hover:bg-[#374151] hover:text-white hover:rounded-none focus:rounded-none focus:bg-[#323b49] focus:text-white active:bg-gray-600 active:text-white'>
                        <ListItemPrefix className='mr-3 w-6 h-6'>
                          <FontAwesomeIcon icon={faFileLines} />
                        </ListItemPrefix>
                        My Report
                      </ListItem>
                    </Link>
                  </List>
                </AccordionBody>
              </Accordion>
              {/* MANAGE USER */}
              {Role === 2 && (
                <Link to='manageuser'>
                  <ListItem className='px-4 text-white hover:bg-[#323b49] hover:text-white focus:bg-[#323b49] focus:text-white active:bg-gray-600 active:text-white'>
                    <ListItemPrefix className='mr-3 w-6 h-6'>
                      <FontAwesomeIcon icon={faUserGear}/>
                    </ListItemPrefix>
                    <Typography>
                      Manage User
                    </Typography>
                  </ListItem>
                </Link>
              )}
              {loggedIn && (
                <Link to='/Login'>
                  <ListItem onClick={logout} className=' py-2 mt-4 flex justify-center items-center text-sm text-white bg-gray-600 hover:text-white hover:bg-[#323b49] focus:text-white focus:bg-gray-600 active:bg-gray-600 active:text-white'>
                      Log Out
                  </ListItem>
                </Link>
              )}
            </List>
          </Card>
          )}

          {/* DRAWER */}
          {!isDesktopView && (
          <Drawer 
          open={openDrawer} 
          className='mt-[62px] w-full bg-gray-800' 
          onClose={handleOpenDrawer}
          // overlay={false}
          overlayProps={{
            className:' z-40 mt-[62px]'
          }}
        >
            <div className="mb-8 p-8">
              <Typography variant="h5" className='uppercase text-center font-semibold text-2xl' color="white">
                asset<br />management
              </Typography>
              <div className="relative">
                  <button 
                    onClick={handleOpenDrawer} 
                    className={`absolute bottom-10 -right-14 bg-gray-800 border-2 rounded-full w-10 h-8 text-white ${openDrawer ? 'border-[#606060]' : 'border-[#efefef]'}`}
                  >
                    <FontAwesomeIcon 
                      icon={faAnglesLeft}
                      size='xs'
                      style={{transform: openDrawer ? 'rotate(0deg)' : 'rotate(180deg)', 
                              transition: 'transform 0.8s ease', 
                            }}
                    />
                  </button>
              </div>
            </div>
            <List className='px-6'>
              {/* DASHBOARD */}
              <Link to='/'>
                <ListItem className='px-4 text-white hover:bg-[#323b49] hover:text-white focus:bg-[#323b49] focus:text-white active:bg-gray-600 active:text-white'>
                  <ListItemPrefix className='mr-3 w-6 h-6'>
                    <FontAwesomeIcon icon={faChalkboard}/>
                  </ListItemPrefix>
                  <Typography>
                    Dashboard
                  </Typography>
                </ListItem>
              </Link>
              {/* CHAT */}
              <Link to='/chat'>
                <ListItem className='px-4 text-white hover:bg-[#323b49] hover:text-white focus:bg-[#323b49] focus:text-white active:bg-gray-600 active:text-white'>
                  <ListItemPrefix className='mr-3 w-6 h-6'>
                    <FontAwesomeIcon icon={faComments} />
                  </ListItemPrefix>
                  <Typography>
                    Chat
                  </Typography>
                  <ListItemSuffix>
                    <Chip value="14" size="sm" variant="white" color="blue-gray" className="rounded-full" />
                  </ListItemSuffix>
                </ListItem>
              </Link>
              {/* ASSET */}
              <Accordion
                open={openSubmenu === 1}
                icon={
                  <FontAwesomeIcon icon={faChevronDown} size=''
                    className={`mx-auto items-center flex h-3 w-4 transition-transform ${openSubmenu === 1 ? "rotate-180" : ""}`}
                  />
                }
              >
                <ListItem className="p-0 px-1 hover:bg-[#323b49] active:bg-gray-600 focus:bg-gray-800 bg-gray-800" selected={openSubmenu === 1}>
                  <AccordionHeader onClick={() => handleOpenSubmenu(1)} className="border-b-0 p-3 bg-none text-white hover:text-white">
                    <ListItemPrefix className='mr-3 w-6 h-6'>
                      <FontAwesomeIcon icon={faComputer} />
                    </ListItemPrefix>
                    <Typography color="white" className="mr-auto font-normal">
                      Assets
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="p-0 bg-gray-600">
                  <List className="p-0 gap-0">
                    <Link to='/listasset'>
                      <ListItem className='px-4 text-white hover:bg-[#374151] hover:text-white hover:rounded-none focus:rounded-none focus:bg-[#323b49] focus:text-white active:bg-gray-600 active:text-white'>
                        <ListItemPrefix className='mr-3 w-6 h-6'>
                          <FontAwesomeIcon icon={faList} />
                        </ListItemPrefix>
                        List of Asset
                      </ListItem>
                    </Link>
                    {Role === 2 || Role === 1 ? (
                      <Link to='/addasset'>
                        <ListItem className='px-4 text-white hover:bg-[#374151] hover:text-white hover:rounded-none focus:rounded-none focus:bg-[#323b49] focus:text-white active:bg-gray-600 active:text-white'>
                          <ListItemPrefix className='mr-3 w-6 h-6'>
                            <FontAwesomeIcon icon={faPlus} />
                          </ListItemPrefix>
                          Add an Asset
                        </ListItem>
                      </Link>
                    ) : null}
                    {loggedIn ? (
                      <Link to='/lease'>
                        <ListItem className='px-4 text-white hover:bg-[#374151] hover:text-white hover:rounded-none focus:rounded-none focus:bg-[#323b49] focus:text-white active:bg-gray-600 active:text-white'>
                          <ListItemPrefix className='mr-3 w-6 h-6'>
                            <FontAwesomeIcon icon={faHandHolding} />
                          </ListItemPrefix>
                          Lease
                        </ListItem>
                      </Link>
                    ) : null}
                    {loggedIn ? (
                      <Link to='/return'>
                        <ListItem className='px-4 text-white hover:bg-[#374151] hover:text-white hover:rounded-none focus:rounded-none focus:bg-[#323b49] focus:text-white active:bg-gray-600 active:text-white'>
                          <ListItemPrefix className='mr-3 w-6 h-6'>
                            <FontAwesomeIcon icon={faRotateLeft} />
                          </ListItemPrefix>
                          Return
                        </ListItem>
                      </Link>
                    ) : null}
                    {Role === 2 || Role === 1 ? (
                      <Link to='/submitted'>
                        <ListItem className='px-4 text-white hover:bg-[#374151] hover:text-white hover:rounded-none focus:rounded-none focus:bg-[#323b49] focus:text-white active:bg-gray-600 active:text-white'>
                          <ListItemPrefix className='mr-3 w-6 h-6'>
                            <FontAwesomeIcon icon={faPaperPlane} />
                          </ListItemPrefix>
                          Submitted
                        </ListItem>
                      </Link>
                    ) : null}
                  </List>
                </AccordionBody>
              </Accordion>
              {/* REPORT */}
              <Accordion
                open={openSubmenu === 2}
                icon={
                  <FontAwesomeIcon icon={faChevronDown} size=''
                    className={`mx-auto items-center flex h-3 w-4 transition-transform ${openSubmenu === 1 ? "rotate-180" : ""}`}
                  />
                }
              >
                <ListItem className="p-0 px-1 hover:bg-[#323b49] active:bg-gray-600 focus:bg-gray-800 bg-gray-800" selected={openSubmenu === 2}>
                  <AccordionHeader onClick={() => handleOpenSubmenu(2)} className="border-b-0 p-3 bg-none text-white hover:text-white">
                    <ListItemPrefix className='mr-3 w-6 h-6'>
                      <FontAwesomeIcon icon={faBook} />
                    </ListItemPrefix>
                    <Typography color="white" className="mr-auto font-normal">
                      Reports
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="p-0 bg-gray-600">
                  <List className="p-0 gap-0">
                    {Role === 2 || Role === 1 ? (
                      <Link to='/history'>
                        <ListItem className='px-4 text-white hover:bg-[#374151] hover:text-white hover:rounded-none focus:rounded-none focus:bg-[#323b49] focus:text-white active:bg-gray-600 active:text-white'>
                          <ListItemPrefix className='mr-3 w-6 h-6'>
                            <FontAwesomeIcon icon={faClockRotateLeft}/>
                          </ListItemPrefix>
                          History
                        </ListItem>
                      </Link>
                    ) : null}
                    <Link to='/myreport'>
                      <ListItem className='px-4 text-white hover:bg-[#374151] hover:text-white hover:rounded-none focus:rounded-none focus:bg-[#323b49] focus:text-white active:bg-gray-600 active:text-white'>
                        <ListItemPrefix className='mr-3 w-6 h-6'>
                          <FontAwesomeIcon icon={faFileLines} />
                        </ListItemPrefix>
                        My Report
                      </ListItem>
                    </Link>
                  </List>
                </AccordionBody>
              </Accordion>
              {/* MANAGE USER */}
              {Role === 2 || Role === 1 ? (
              <Link to='/manageuser'>
                <ListItem className='px-4 text-white hover:bg-[#323b49] hover:text-white focus:bg-[#323b49] focus:text-white active:bg-gray-600 active:text-white'>
                  <ListItemPrefix className='mr-3 w-6 h-6'>
                    <FontAwesomeIcon icon={faUserGear}/>
                  </ListItemPrefix>
                  <Typography>
                    Manage User
                  </Typography>
                </ListItem>
              </Link>
              ) : null}
              {loggedIn && (
                <Link to='/Login'>
                  <ListItem onClick={logout} className=' py-2 mt-4 flex justify-center items-center text-sm text-white bg-gray-600 hover:text-white hover:bg-[#323b49] focus:text-white focus:bg-gray-600 active:bg-gray-600 active:text-white'>
                      Log Out
                  </ListItem>
                </Link>
              )}
            </List>
          </Drawer>
          )}

        
        {/* MAIN CONTENT */}
        <div 
          className='bg-[#efefef] p-[20px] flex flex-col min-h-screen w-screen mt-[60px]' 
          style={{marginLeft: isDesktopView ? (openSidebar ? '296px' : '0') : '0', 
                        width: isDesktopView ? (openSidebar ? 'calc(100% - 296px)' : '100%') : '100%', 
                        transition: 'margin 0.5s ease-in-out, width 0.5s ease-in-out',
                      }}
        >
          <Routes>
          {loggedIn ? (
            <Route path="/" element={<Dashboard />} />
          ) : (
            <Route path="/" element={<Login />} />
          )}
            <Route path="/chat" element={<Chat />} />
            <Route path="/listasset" element={<ListAsset />} />
            <Route 
              path="/addasset" 
              element={Role === 2 || Role === 1 ? <AddAsset /> : <Dashboard />}
            />
            <Route 
              path="/lease" 
              element={loggedIn ? <Lease /> : <Login />} />
            <Route 
              path="/return" 
              element={loggedIn ? <Return /> : <Login />} />
            <Route 
              path="/submitted" 
              element={Role === 2 || Role === 1 ? <Submitted /> : <Dashboard />} />
            <Route 
              path="/history" 
              element={Role === 2 || Role === 1 ? <History /> : <Dashboard />} />
            <Route 
              path="/manageuser" 
              element={Role === 2 ? <ManageUser /> : <Dashboard />}
            />
            <Route
              path="/login"
              element={loggedIn ? <Navigate to="/" /> : <Login />}
            />  
            <Route path="/myreport" element={<MyReport />} />
            <Route path="*" element={<Notfound />} />
            <Route path="/test" element={<Test />} />
            <Route path="/qrgen" element={<Qrgen />} />
            <Route path="/offline" element={<Offline />} />
          </Routes>
        </div>
      </div>
    ) : <Login /> }
    </Router>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
}

export default App;
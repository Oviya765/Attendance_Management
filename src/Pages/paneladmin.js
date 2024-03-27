import React from 'react';
import { FaUserFriends, FaCalendarAlt, FaCheckSquare, FaCog, FaBars } from 'react-icons/fa';
import { IoPersonSharp } from "react-icons/io5";
import { MdStreetview } from "react-icons/md";
import CollegeCalendar from './Calendar';
import AttendanceMark from './Attenfancemark';
import AttendanceView from './Attendanceview';
import Img from './Ima';
import AdminUsers from './AdminEditUser';
import { FaUserEdit } from "react-icons/fa";

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: null,
      sideMenuOpen: false
    };
  }

  handleClick = (page) => {
    console.log(`Redirecting to ${page} page...`);
    this.setState({ activePage: page });
  }

  toggleSideMenu = () => {
    this.setState((prevState) => ({ sideMenuOpen: !prevState.sideMenuOpen }));
  }

  renderPage = () => {
    const { activePage } = this.state;
    switch (activePage) {
      case 'View Attendance':
        return <AttendanceView/>;
      case 'Mark Attendance':
        return <AttendanceMark/>;
      case 'calendar':
        return <CollegeCalendar/>;
      case 'logout':
        return <AdminUsers/>;
      default:
        return <Img/>;
    }
  }

  render() {
    const { sideMenuOpen } = this.state;

    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <div style={styles.sideMenuIcon} onClick={this.toggleSideMenu}>
          <FaBars style={{ fontSize: '30px', cursor: 'pointer' }} />
        </div>
        <div style={sideMenuOpen ? { ...styles.panel, ...styles.panelOpen } : styles.panel}>
          {/* <h2>Topics</h2> */}
          <ul style={styles.iconList}>
            <li onClick={() => this.handleClick("View Attendance")} className={this.state.activePage === "View Attendance" ? "active" : ""}>
              <MdStreetview style={styles.icon} />
              <span className='bel' style={{  width: sideMenuOpen ? '100px' : '1px',transition: 'width 0.6s ease',display: 'inline-block', whiteSpace: 'nowrap', color: sideMenuOpen ? 'black' : 'transparent',fontSize: sideMenuOpen ? '19px': '0px' }}>View Attendance</span>
              {/* <span className='bel' style={{ color: sideMenuOpen ? 'black' : 'transparent',size: sideMenuOpen ? '1px' : '1000px' }}>t1</span> */}
            </li>
            <li onClick={() => this.handleClick("Mark Attendance")} className={this.state.activePage === "Mark Attendance" ? "active" : ""}>
              <FaCheckSquare style={styles.icon} />
              <span className='bel' style={{  width: sideMenuOpen ? '100px' : '1px',transition: 'width 0.6s ease',display: 'inline-block', whiteSpace: 'nowrap', color: sideMenuOpen ? 'black' : 'transparent',fontSize: sideMenuOpen ? '19px': '0px' }}>Mark Attendance</span>
            </li>
            <li onClick={() => this.handleClick("calendar")} className={this.state.activePage === "calendar" ? "active" : ""}>
              <FaCalendarAlt style={styles.icon} />
              <span className='bel' style={{  width: sideMenuOpen ? '100px' : '1px',transition: 'width 0.6s ease',display: 'inline-block', whiteSpace: 'nowrap', color: sideMenuOpen ? 'black' : 'transparent',fontSize: sideMenuOpen ? '19px': '0px' }}>Calendar</span>
            </li>
            <li onClick={() => this.handleClick("logout")} className={this.state.activePage === "logout" ? "active" : ""}>
              <FaUserEdit style={styles.icon} />
              <span className='bel' style={{  width: sideMenuOpen ? '100px' : '1px',transition: 'width 0.6s ease',display: 'inline-block', whiteSpace: 'nowrap', color: sideMenuOpen ? 'black' : 'transparent',fontSize: sideMenuOpen ? '19px': '0px' }}>Edit/Delete User</span>
            </li>
          </ul>
        </div>
        <div style={styles.content}>
          {this.renderPage()}
        </div>
      </div>
    );
  }
}

const styles = {
  panel: {
    backgroundColor: '#ADD8E6',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '5%',
    transition: 'width 0.3s ease',
  },
  panelOpen: {
    width: '13%',
    // padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sideMenuIcon: {
    position: 'absolute',
    top: '20px',
    left: '20px',
  },
  iconList: {
    listStyleType: 'none',
    padding: 0,
    fontSize: '2em',
    textAlign: 'center',
  },
  icon: {
    cursor: 'pointer',
    fontSize:'30px',
    // padding:'10px'
    // marginLeft:'-40px'
  },
  content: {
    flex: 1,
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default AdminPage;

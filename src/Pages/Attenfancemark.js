import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Assets/Style/Attendancemark.css';

const AttendanceMark = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedSection, setSelectedSection] = useState('All');
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  const departments = ['All', 'CSE', 'IT', 'EEE', 'Mech', 'ECE', 'Civil', 'CSE-IOT', 'CSE-AIML', 'CSE-CS'];
  const years = ['All', 'I', 'II', 'III', 'IV'];
  const sections = ['All', 'A', 'B', 'C'];

  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(response => {
        let filteredStudents = response.data.filter(user => user.category === 'student');
        
        // Apply filters based on selected department, year, and section
        filteredStudents = filteredStudents.filter(student => {
          return (
            (selectedDepartment === 'All' || student.department === selectedDepartment) &&
            (selectedYear === 'All' || student.year === selectedYear) &&
            (selectedSection === 'All' || student.sec === selectedSection)
          );
        });

        setStudents(filteredStudents);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  }, [selectedDepartment, selectedYear, selectedSection]);

  useEffect(() => {
    axios.get('http://localhost:3000/attendance')
      .then(response => {
        setAttendanceData(response.data);
      })
      .catch(error => {
        console.error('Error fetching attendance data:', error);
      });
  }, []);

  const getCurrentDate = () => {
    const date = new Date();
    return date.toISOString().split('T')[0];
  };

  const isDuplicateAttendanceRecord = () => {
    const currentDate = getCurrentDate();

    return attendanceData.some(session => {
      if (session.date === currentDate) {
        return session.records.some(record => {
          return students.some(student => {
            return (
              student.RegisterNo === record.studentId &&
              student.username === record.name &&
              student.department === record.department &&
              student.year === record.year &&
              student.sec === record.sec
            );
          });
        });
      }
      return false;
    });
  };

  const handleSaveAttendance = () => {
    if (isDuplicateAttendanceRecord()) {
      alert('The attendance has already been marked.');
      return;
    }

    const currentDate = getCurrentDate();
    
    const formattedAttendance = students.map(student => {
      return {
        studentId: student.RegisterNo,
        name: student.username,
        department: student.department,
        year: student.year,
        sec: student.sec,
        date: currentDate,
        attendances: student.attendance || 'Not Marked',
      };
    });

    axios.post('http://localhost:3000/attendance', { date: currentDate, records: formattedAttendance })
      .then(response => {
        console.log('Attendance data saved successfully:', response.data);
        setAttendanceData([...attendanceData, response.data]);
      })
      .catch(error => {
        console.error('Error saving attendance data:', error);
      });
  };

  const markAttendance = (RegisterNo, status) => {
    const updatedStudents = students.map(student => {
      if (student.RegisterNo === RegisterNo) {
        return { ...student, attendance: status };
      }
      return student;
    });
    setStudents(updatedStudents);
  };

  return (
    <div className="attendance-container">
      <h1>Attendance Page</h1>
      <div className="filter">
        <label  className="fil" htmlFor="department">Department:</label>
        <select
          id="department"
          value={selectedDepartment}
          onChange={e => setSelectedDepartment(e.target.value)}
        >
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        <label  className="fil" htmlFor="year">Year:</label>
        <select
          id="year"
          value={selectedYear}
          onChange={e => setSelectedYear(e.target.value)}
        >
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <label className="fil" htmlFor="section">Section:</label>
        <select
          id="section"
          value={selectedSection}
          onChange={e => setSelectedSection(e.target.value)}
        >
          {sections.map(section => (
            <option key={section} value={section}>{section}</option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.RegisterNo}>
              <td>{student.RegisterNo}</td>
              <td>{student.username}</td>
              <td>
                <select className='filter'
                  value={student.attendance || 'Not Marked'}
                  onChange={(e) => markAttendance(student.RegisterNo, e.target.value)}
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Not Marked">Not Marked</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="button1" onClick={handleSaveAttendance}>Save Attendance</button>
    </div>
  );
};

export default AttendanceMark;

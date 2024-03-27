import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserId, editUser } from '../Services/Api.js';
import { CircleUserRound } from 'lucide-react';
import atten from '../Assets/Images/attendance.png';

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isButtonHovered, setIsButtonHovered] = useState(false);

    const [data, setData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        department: '',
        year: '',
        dob: '',
        category: ''
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getUserId(id);
                setData(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        setData({ ...data, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await editUser(id, data);
            if (res.status === 200) {
                alert('User details are updated');
                setTimeout(() => navigate('-1'), 1000); // Navigate to admin page after 1 second
            } else {
                throw new Error('Failed to update user');
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleChangeSelect = (e) => {
        setData({ ...data, category: e.target.value });
    };

    return (
        <>
            <div style={{ position: 'fixed' }}>
                <img style={styles.image} src={atten} alt="attendance" />
                <svg style={styles.svg} width="100%" height="100%" id="svg" viewBox="0 0 1440 390" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150">
                    <defs>
                        <linearGradient id="gradient" x1="85%" y1="14%" x2="15%" y2="86%">
                            <stop offset="5%" stop-color="#0693e3"></stop>
                            <stop offset="95%" stop-color="#a2d9ff"></stop>
                        </linearGradient>
                    </defs>
                    <path d="M 0,400 L 0,150 C 64.26794258373207,141.41626794258374 128.53588516746413,132.8325358851675 242,144 C 355.46411483253587,155.1674641148325 518.1244019138755,186.08612440191388 618,217 C 717.8755980861245,247.91387559808612 754.9665071770336,278.82296650717706 840,310 C 925.0334928229664,341.17703349282294 1058.0095693779904,372.62200956937795 1166,396 C 1273.9904306220096,419.37799043062205 1356.9952153110048,434.688995215311 1440,450 L 1440,400 L 0,400 Z" stroke="none" stroke-width="0" fill="url(#gradient)" fill-opacity="1" class="transition-all duration-300 ease-in-out delay-150 path-0"></path>
                </svg>
                <div style={styles.container}>
                    <div style={styles.content}>
                        <CircleUserRound size={50} color='rgba(0,172,238,1)' />
                        <form onSubmit={handleSubmit}>
                            <div style={styles.formGroup}>
                                <input type="text" style={styles.input} value={data.username} id="username" placeholder="Username" onChange={handleChange} required />
                            </div>
                            <div style={styles.formGroup}>
                                <input type="password" style={styles.input} value={data.password} id="password" placeholder="Password" onChange={handleChange} required />
                            </div>
                            <div style={styles.formGroup}>
                                <input type="password" style={styles.input} value={data.confirmPassword} id="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required/>
                            </div>
                            <div style={styles.formGroup}>
                                <input type="email" style={styles.input} value={data.email} id="email" placeholder="Email" onChange={handleChange} required/>
                            </div>
                            <div style={styles.formGroup}>
                                <input type="text" style={styles.input} value={data.department} id="department" placeholder="Department" onChange={handleChange} required/>
                            </div>
                            <div style={styles.formGroup}>
                                <input type="text" style={styles.input} value={data.year} id="year" placeholder="Year" onChange={handleChange} required/>
                            </div>
                            <div style={styles.formGroup}>
                                <input type="date" style={styles.input} value={data.dob} id="dob" placeholder="Date of Birth" onChange={handleChange} required/>
                            </div>
                            <div style={styles.formGroup}>
                                <select style={styles.inp} value={data.category} onChange={handleChangeSelect} required>
                                    <option value="">Select category</option>
                                    <option value="staff">Staff</option>
                                    <option value="student">Student</option>
                                </select>
                            </div>
                            <div style={styles.formGroup}>
                                <button
                                    style={{ ...styles.button, ...(isButtonHovered ? styles.buttonHover : {}) }}
                                    type="submit"
                                    className="submit-btn"
                                    onMouseEnter={() => setIsButtonHovered(true)}
                                    onMouseLeave={() => setIsButtonHovered(false)}
                                >
                                    <span style={{ ...styles.buttonText, ...(isButtonHovered ? styles.buttonTextHover : {}) }}>Update User</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

const styles = {
    image:{
        marginTop:'100px',
        marginLeft:'120px',
    },
    svg: {
        // marginTop: '-1000px',
        width: '100%'
    },
    container: {
        textAlign: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        display: 'inline-block',
        background: '#fff',
        padding: '20px 30px',
        width: '300px',
        textAlign: 'center',
        boxShadow: '0px 0px 15px 5px rgba(0, 0, 0, 0.3)',
        borderRadius: '3px',
        position: 'relative',
        marginLeft:'57%'
    },
    formGroup: {
        margin: '15px 0',
    },
    input: {
        padding: '15px',
        margin: '2px 0',
        width: '260px',
        maxWidth: '150%',
        border: '2px solid #a2d9ff',
        borderRadius: '3px',
    },
    inp: {
        padding: '15px',
        // margin: '2px 0',
        width: '300px',
        // maxWidth: '90%',
        border: '2px solid #a2d9ff',
        borderRadius: '3px',
    },
    button: {
        display: 'inline-block',
        padding: '10px 40px',
        background: 'linear-gradient(0deg, rgba(0,172,238,1) 0%, rgba(2,126,251,1) 100%)',
        margin: '10px 0 10px 0',
        userSelect: 'none',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background-color 0.3s ease',
        borderRadius: '3px',
        border: 'none',
    },
    buttonText:{
        color: '#fff',
    },
    buttonTextHover: {
        position: 'relative',
        zIndex: 1,
        color:'black'
    },
    buttonHover: {
        background: 'transparent',
        border: '2px solid',
        borderImage: 'linear-gradient(0deg, rgba(0,172,238,1) 0%, rgba(2,126,251,1) 100%)',
        borderImageSlice: '1',
    }
};

export default EditUser;

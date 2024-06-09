import React, {useState, useEffect} from "react";
import axios from 'axios';
import styles from './UserFile.module.css';

const UserFile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bgColor, setBgColor] = useState('#95f9f4');
  
    useEffect(() => {
      fetchUser();
    }, []);
  
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://randomuser.me/api/');
        const userData = response.data.results[0]; 
       
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = "#"
        for ( let i = 0; i < 6; i++){
            color += letters[Math.floor(Math.random() * 16)];
        }
    
return color;
    };

    const handleColorChange = () => {
        setBgColor (getRandomColor());
    };
    

    return (
      <div className={styles.userFile} style={{ backgroundColor: bgColor}}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          user && (
            <div onClick={handleColorChange}>
              <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
              <h1>{`${user.name.first} ${user.name.last}`}</h1>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
              <button onClick={fetchUser}>Load New User</button>
            </div>
          )
        )}
      </div>
    );
  };
  
  export default UserFile;
import axios from "axios";


const fetchUserData = async () => {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  try {
    const response = await axios.get('http://127.0.0.1:8000/api/me');
    const userData = response.data;
    
    console.log('User Data:', userData);
    // Handle the user data as needed
  } catch (error) {
    console.error('User data fetch error:', error);
    // Handle the error
  }
};

fetchUserData();
const account = {
  displayName: 'Malama Chiluwe',
  email: 'demo@minimals.cc',
  photoURL: '/assets/images/avatars/avatar_14.jpg',
};

export default account;

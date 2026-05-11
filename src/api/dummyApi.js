import axios from 'axios';
import { ALL_SKILLS, STATUSES, COLLEGES } from '../utils/helpers.js';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
});

export const fetchUsers = async () => {
  const res = await api.get('/users?limit=20');
  return res.data.users;
};

export function transformUser(user) {
  const randomSkills = [...ALL_SKILLS]
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 3) + 2);
  return {
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    college: COLLEGES[Math.floor(Math.random() * COLLEGES.length)],
    skills: randomSkills,
    status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
    appliedDate: new Date(
      Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .split('T')[0],
    phone: user.phone,
    location: `${user.address.city}, ${user.address.state}`,
    experience: ['Fresher', '1 year', '2 years'][Math.floor(Math.random() * 3)],
  };
}

export default api;

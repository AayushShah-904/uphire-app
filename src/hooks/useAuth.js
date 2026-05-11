import useAuthStore from '../store/authStore.js';

function useAuth() {
  return {
    isAuthenticated: useAuthStore((s) => s.isAuthenticated),
    user: useAuthStore((s) => s.user),
    login: useAuthStore((s) => s.login),
    logout: useAuthStore((s) => s.logout),
  };
}

export default useAuth;

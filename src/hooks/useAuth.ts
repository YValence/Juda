import { useAuthStore } from '@/stores/authStore';

export const useAuth = () => {
  const store = useAuthStore();

  return {
    user: store.user,
    profile: store.profile,
    session: store.session,
    isLoading: store.isLoading,
    isGuest: store.isGuest,
    isAuthenticated: Boolean(store.user || store.isGuest),
    error: store.error,
    login: store.login,
    register: store.register,
    loginAsGuest: store.loginAsGuest,
    logout: store.logout,
    refreshProfile: store.refreshProfile,
    clearError: store.clearError,
  };
};

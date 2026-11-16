import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  username: string;
  avatar_url?: string | null;
  role: 'player' | 'admin';
  points: number;
  total_points_earned: number;
  level: number;
  currentXp: number;
  nextLevelXp: number;
}

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  isGuest: boolean;
  error: string | null;

  // Actions
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (
    username: string,
    email: string,
    password: string,
    activationCode: string
  ) => Promise<{ success: boolean; error?: string }>;
  loginAsGuest: () => void;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  clearError: () => void;
}

const DEFAULT_GUEST_PROFILE: UserProfile = {
  id: 'guest-hunter-01',
  username: 'Hunter_01',
  avatar_url: null,
  role: 'player',
  points: 350,
  total_points_earned: 678,
  level: 1,
  currentXp: 678,
  nextLevelXp: 2160,
};

const calculateLevel = (totalXp: number) => {
  // Chaque niveau demande 1500 + (level * 500)
  let level = 1;
  let remaining = totalXp;
  let nextThreshold = 1500;

  while (remaining >= nextThreshold) {
    remaining -= nextThreshold;
    level++;
    nextThreshold = 1500 + (level - 1) * 500;
  }

  return {
    level,
    currentXp: remaining,
    nextLevelXp: nextThreshold,
  };
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  session: null,
  isLoading: true,
  isGuest: false,
  error: null,

  clearError: () => set({ error: null }),

  initialize: async () => {
    try {
      set({ isLoading: true });
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        set({ session, user: session.user, isGuest: false });
        await get().refreshProfile();
      } else {
        // Par défaut au démarrage si aucune session, on laisse non connecté
        set({ user: null, profile: null, session: null, isGuest: false });
      }

      // Écouter les changements d'auth
      supabase.auth.onAuthStateChange(async (_event, newSession) => {
        if (newSession?.user) {
          set({ session: newSession, user: newSession.user, isGuest: false });
          await get().refreshProfile();
        } else if (!get().isGuest) {
          set({ user: null, profile: null, session: null });
        }
      });
    } catch (err: any) {
      console.warn('Erreur lors de l\'initialisation auth:', err?.message);
    } finally {
      set({ isLoading: false });
    }
  },

  refreshProfile: async () => {
    const { user, isGuest } = get();
    if (isGuest || !user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        // Si le profil n'a pas encore été généré par le trigger Supabase
        const fallbackXp = calculateLevel(0);
        set({
          profile: {
            id: user.id,
            username: user.user_metadata?.username || user.email?.split('@')[0] || 'Joueur',
            avatar_url: user.user_metadata?.avatar_url || null,
            role: 'player',
            points: 0,
            total_points_earned: 0,
            ...fallbackXp,
          },
        });
        return;
      }

      if (data) {
        const xpInfo = calculateLevel(data.total_points_earned || 0);
        set({
          profile: {
            id: data.id,
            username: data.username,
            avatar_url: data.avatar_url,
            role: data.role || 'player',
            points: data.points || 0,
            total_points_earned: data.total_points_earned || 0,
            ...xpInfo,
          },
        });
      }
    } catch (err: any) {
      console.warn('Impossible de charger le profil:', err?.message);
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        set({ error: error.message, isLoading: false });
        return { success: false, error: error.message };
      }

      set({ session: data.session, user: data.user, isGuest: false, isLoading: false });
      await get().refreshProfile();
      return { success: true };
    } catch (err: any) {
      const msg = err?.message || 'Erreur lors de la connexion';
      set({ error: msg, isLoading: false });
      return { success: false, error: msg };
    }
  },

  register: async (username, email, password, activationCode) => {
    set({ isLoading: true, error: null });
    try {
      // 1. Validation du code d'activation
      //
      // TEMPORAIRE (phase de test) : le code est vérifié ici, côté client,
      // contre une liste en dur. Le PRD impose de le valider côté serveur
      // dans une Edge Function (table `config`, non lisible par le client).
      // À remplacer avant toute vraie mise en service.
      const trimmedCode = activationCode.trim().toUpperCase();
      const FALLBACK_CODES = ['MANGA2026', 'ARCADEV1', 'CHAMAH99'];
      const isValidCode = FALLBACK_CODES.includes(trimmedCode);

      if (!isValidCode) {
        const errMsg = 'Code d\'activation incorrect ou expiré. Demande un code valide à l\'administrateur.';
        set({ error: errMsg, isLoading: false });
        return { success: false, error: errMsg };
      }

      // 2. Vérification de l'unicité du pseudo
      try {
        const { data: existingUser } = await supabase
          .from('profiles')
          .select('id')
          .eq('username', username.trim())
          .maybeSingle();

        if (existingUser) {
          const errMsg = 'Ce pseudo est déjà réservé par un autre joueur.';
          set({ error: errMsg, isLoading: false });
          return { success: false, error: errMsg };
        }
      } catch {
        // En cas de soucis de connexion DB, continuer
      }

      // 3. Inscription via Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            username: username.trim(),
          },
        },
      });

      if (error) {
        set({ error: error.message, isLoading: false });
        return { success: false, error: error.message };
      }

      set({ session: data.session, user: data.user, isGuest: false, isLoading: false });
      await get().refreshProfile();
      return { success: true };
    } catch (err: any) {
      const msg = err?.message || 'Erreur lors de l\'inscription';
      set({ error: msg, isLoading: false });
      return { success: false, error: msg };
    }
  },

  loginAsGuest: () => {
    set({
      user: null,
      session: null,
      isGuest: true,
      profile: DEFAULT_GUEST_PROFILE,
      isLoading: false,
      error: null,
    });
  },

  logout: async () => {
    try {
      await supabase.auth.signOut();
    } catch {
      // Ignorer
    }
    set({
      user: null,
      profile: null,
      session: null,
      isGuest: false,
      error: null,
    });
  },
}));

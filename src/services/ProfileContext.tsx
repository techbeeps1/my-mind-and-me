"use client";
 
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { GetProfile, imagePath } from "@/services/api";

// ------------------------
// TYPES
// ------------------------
type UserData = {
  id: string | number;
  role: string;
  user_name?: string;
  is_active: boolean;
};

type ProfileResponse = {
  success: boolean;
  data: {
    user_name?: string;
    profile_image?: string;
  };
};

type ProfileContextType = {
  profile: string;
  username: string;
  MMMUserData: UserData | null;
  setProfile: (value: string) => void;
  setUsername: (value: string) => void;
  setMMMUserData: (value: UserData | null) => void;
  updateUser: (data: UserData) => void;
  logoutUser: () => void;
 
};

const ProfileContext = createContext<ProfileContextType | undefined>(
  undefined
);

// ------------------------
// PROVIDER
// ------------------------
type ProviderProps = { children: ReactNode };

export const ProfileProvider = ({ children }: ProviderProps) => {
  const [profile, setProfile] = useState<string>("/profile-img.png");
  const [username, setUsername] = useState<string>("");

  const [MMMUserData, setMMMUserData] = useState<UserData | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const data = localStorage.getItem("MMMDT");
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  });

  // fetch profile from API
  useEffect(() => {
    if (MMMUserData ) {
      GetProfile(MMMUserData.role, String(MMMUserData.id))
        .then((res: ProfileResponse) => {
          if (res.success) {
            const data = res.data;
            setProfile(
              data.profile_image
                ? imagePath + data.profile_image
                : "/profile-img.png"
            );
            setUsername(data.user_name || "");
          }
        })
        .catch((err: unknown) => {
          console.error("Profile fetch error:", err);
        });
    }
  }, [MMMUserData, username]);

  // ------------------------
  // HELPER FUNCTIONS
  // ------------------------
  const updateUser = (data: UserData) => {
    localStorage.setItem("MMMDT", JSON.stringify(data));
    setMMMUserData(data);
  };
// logout
const logoutUser = () => {
  localStorage.removeItem("MMMDT");
  setMMMUserData(null);
  setProfile("/profile-img.png");
  setUsername("");
}

  return (
    <ProfileContext.Provider
      value={{
        profile,
        username,
        MMMUserData,
        setProfile,
        setUsername,
        setMMMUserData,
        updateUser,
        logoutUser,
        
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

// ------------------------
// CUSTOM HOOK
// ------------------------
export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within ProfileProvider");
  }
  return context;
};
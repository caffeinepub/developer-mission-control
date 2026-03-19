import { useState } from "react";

export interface Profile {
  name: string;
  avatarDataUrl: string | null;
}

const STORAGE_KEY = "dmc-profile";

const defaultProfile: Profile = { name: "", avatarDataUrl: null };

function loadProfile(): Profile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProfile;
    return JSON.parse(raw) as Profile;
  } catch {
    return defaultProfile;
  }
}

export function useProfile(): [Profile, (p: Profile) => void] {
  const [profile, setProfileState] = useState<Profile>(loadProfile);

  function setProfile(p: Profile) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    setProfileState(p);
  }

  return [profile, setProfile];
}

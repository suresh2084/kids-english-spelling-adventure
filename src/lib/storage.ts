export interface Profile {
  name: string;
  avatarId: string;
  createdAt: number;
}

export interface Progress {
  currentLevel: number;
  levelProgress: Record<number, { correct: number; unlocked: boolean }>;
  totalCorrect: number;
  totalAttempted: number;
  coins: number;
  timeSpent: number; // in seconds
}

export interface Settings {
  muted: boolean;
  dyslexicFont: boolean;
  highContrast: boolean;
  darkMode: boolean;
}

export interface Daily {
  lastDate: string;
  completed: boolean;
  words: string[];
}

export const getStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const val = localStorage.getItem(`spellingAdventure_${key}`);
    return val ? JSON.parse(val) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const setStorage = <T>(key: string, value: T) => {
  try {
    localStorage.setItem(`spellingAdventure_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error("Failed to save to localStorage", e);
  }
};

export const defaultProgress: Progress = {
  currentLevel: 1,
  levelProgress: { 1: { correct: 0, unlocked: true } },
  totalCorrect: 0,
  totalAttempted: 0,
  coins: 0,
  timeSpent: 0
};

export const defaultSettings: Settings = {
  muted: false,
  dyslexicFont: false,
  highContrast: false,
  darkMode: false
};

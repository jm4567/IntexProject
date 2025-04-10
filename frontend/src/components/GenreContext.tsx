import { createContext, useContext, useState } from 'react';

type GenreContextType = {
  selectedGenres: string[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>;
};

// Create the context
const GenreContext = createContext<GenreContextType | undefined>(undefined);

// Wrap your app in this provider
export const GenreProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  return (
    <GenreContext.Provider value={{ selectedGenres, setSelectedGenres }}>
      {children}
    </GenreContext.Provider>
  );
};

// Hook to use the context easily
export const useGenre = () => {
  const context = useContext(GenreContext);
  if (!context) {
    throw new Error('useGenre must be used within a GenreProvider');
  }
  return context;
};

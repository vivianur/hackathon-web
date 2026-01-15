import { createContext, useContext } from 'react';

interface SpacingContextType {
  multiplier: number;
}

const SpacingContext = createContext<SpacingContextType | undefined>(undefined);

export function useSpacingMultiplier() {
  const context = useContext(SpacingContext);
  // Retorna 1 como padrão se não estiver dentro do provider
  return context?.multiplier ?? 1;
}

export function SpacingProvider({ children, multiplier }: { children: React.ReactNode; multiplier: number }) {
  return (
    <SpacingContext.Provider value={{ multiplier }}>
      {children}
    </SpacingContext.Provider>
  );
}

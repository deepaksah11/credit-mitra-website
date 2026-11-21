'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Card } from '@/types/card';

interface CompareContextType {
  selectedCards: Card[];
  addToCompare: (card: Card) => boolean;
  removeFromCompare: (cardId: string) => void;
  isInCompare: (cardId: string) => boolean;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('credit_mitra_compare');
      if (stored) {
        setSelectedCards(JSON.parse(stored));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const saveToStorage = (cards: Card[]) => {
    try {
      localStorage.setItem('credit_mitra_compare', JSON.stringify(cards));
    } catch {
      // Ignore storage errors
    }
  };

  const addToCompare = (card: Card): boolean => {
    if (selectedCards.some((c) => c._id === card._id)) {
      return false;
    }
    if (selectedCards.length >= 3) {
      alert('You can compare a maximum of 3 cards at a time.');
      return false;
    }
    const updated = [...selectedCards, card];
    setSelectedCards(updated);
    saveToStorage(updated);
    return true;
  };

  const removeFromCompare = (cardId: string) => {
    const updated = selectedCards.filter((c) => c._id !== cardId);
    setSelectedCards(updated);
    saveToStorage(updated);
  };

  const isInCompare = (cardId: string) => {
    return selectedCards.some((c) => c._id === cardId);
  };

  const clearCompare = () => {
    setSelectedCards([]);
    saveToStorage([]);
  };

  return (
    <CompareContext.Provider
      value={{
        selectedCards,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}

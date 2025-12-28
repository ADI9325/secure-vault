import { useState, useEffect, useCallback } from 'react';
import { Secret } from '@/types';
import { CryptoService } from '@/lib/crypto';
import { StorageService } from '@/lib/storage';

export const useVault = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsLocked(true);
    setSecrets([]);
  }, []);

  const unlock = useCallback(async (password: string, forceNew: boolean = false): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const encryptedVault = StorageService.loadEncryptedVault();

      if (!encryptedVault || forceNew) {
        if (forceNew) {
          StorageService.clearVault();
        }
        setSecrets([]);
        setIsLocked(false);
        setLoading(false);
        return true;
      }

      try {
        const decryptedSecrets = await CryptoService.decryptData(
          encryptedVault,
          password
        );

        setSecrets(decryptedSecrets);
        setIsLocked(false);
        setLoading(false);
        return true;
      } catch (decryptError) {
        setError('Invalid password or corrupted data');
        setLoading(false);
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to unlock vault');
      setLoading(false);
      return false;
    }
  }, []);

  const lock = useCallback(async (password: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const encryptedVault = await CryptoService.encryptData(
        secrets.length > 0 ? secrets : [],
        password
      );
      StorageService.saveEncryptedVault(encryptedVault);

      setSecrets([]);
      setIsLocked(true);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to lock vault');
      setLoading(false);
    }
  }, [secrets]);

  const addSecret = useCallback((secret: Omit<Secret, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newSecret: Secret = {
      ...secret,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setSecrets((prev) => [...prev, newSecret]);
  }, []);

  const updateSecret = useCallback((id: string, updates: Partial<Omit<Secret, 'id' | 'createdAt'>>) => {
    setSecrets((prev) =>
      prev.map((secret) =>
        secret.id === id
          ? { ...secret, ...updates, updatedAt: Date.now() }
          : secret
      )
    );
  }, []);

  const deleteSecret = useCallback((id: string) => {
    setSecrets((prev) => prev.filter((secret) => secret.id !== id));
  }, []);

  const hasVault = useCallback(() => {
    return StorageService.hasVault();
  }, []);

  return {
    isLocked,
    secrets,
    error,
    loading,
    unlock,
    lock,
    addSecret,
    updateSecret,
    deleteSecret,
    hasVault,
  };
};
import { EncryptedVault } from '@/types';

const VAULT_STORAGE_KEY = 'secure_vault_encrypted_data';

export class StorageService {
  static saveEncryptedVault(vault: EncryptedVault): void {
    try {
      localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(vault));
    } catch (error) {
      throw new Error('Failed to save vault to storage');
    }
  }

  static loadEncryptedVault(): EncryptedVault | null {
    try {
      const data = localStorage.getItem(VAULT_STORAGE_KEY);
      if (!data) return null;
      return JSON.parse(data) as EncryptedVault;
    } catch (error) {
      throw new Error('Failed to load vault from storage');
    }
  }

  static clearVault(): void {
    localStorage.removeItem(VAULT_STORAGE_KEY);
  }

  static hasVault(): boolean {
    return localStorage.getItem(VAULT_STORAGE_KEY) !== null;
  }
}

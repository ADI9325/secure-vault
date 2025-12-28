export interface Secret {
  id: string;
  name: string;
  username: string;
  password: string;
  notes?: string;
  createdAt: number;
  updatedAt: number;
}

export interface EncryptedVault {
  salt: string;
  iv: string;
  data: string;
}

export interface VaultState {
  isLocked: boolean;
  secrets: Secret[];
}

import { useState, useEffect } from 'react';
import { useVault } from '@/hooks/useVault';
import { UnlockScreen } from '@/components/UnlockScreen';
import { Header } from '@/components/Header';
import { SecretList } from '@/components/SecretList';
import { SecretForm } from '@/components/SecretForm';
import { Secret } from '@/types';

function App() {
  const {
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
  } = useVault();

  const [showForm, setShowForm] = useState(false);
  const [editingSecret, setEditingSecret] = useState<Secret | undefined>(undefined);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [masterPassword, setMasterPassword] = useState('');

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isLocked && hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Please lock your vault to save them before leaving.';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isLocked, hasUnsavedChanges]);

  const handleUnlock = async (password: string, forceNew: boolean = false) => {
    const success = await unlock(password, forceNew);
    if (success) {
      setMasterPassword(password);
      setHasUnsavedChanges(false);
    }
    return success;
  };

  const handleLock = async (password: string) => {
    await lock(password);
    setHasUnsavedChanges(false);
    setMasterPassword('');
  };

  const handleAddSecret = (secret: Omit<Secret, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingSecret) {
      updateSecret(editingSecret.id, secret);
    } else {
      addSecret(secret);
    }
    setShowForm(false);
    setEditingSecret(undefined);
    setHasUnsavedChanges(true);
  };

  const handleEditSecret = (secret: Secret) => {
    setEditingSecret(secret);
    setShowForm(true);
  };

  const handleDeleteSecret = (id: string) => {
    deleteSecret(id);
    setHasUnsavedChanges(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingSecret(undefined);
  };

  if (isLocked) {
    return (
      <UnlockScreen
        onUnlock={handleUnlock}
        hasExistingVault={hasVault()}
        error={error}
        loading={loading}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onLock={handleLock} 
        secretCount={secrets.length}
        hasUnsavedChanges={hasUnsavedChanges}
        masterPassword={masterPassword}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Your Secrets</h2>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              All data is encrypted and stored locally in your browser
              {hasUnsavedChanges && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Unsaved changes
                </span>
              )}
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-sm transition duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Secret</span>
          </button>
        </div>

        <SecretList
          secrets={secrets}
          onDelete={handleDeleteSecret}
          onEdit={handleEditSecret}
        />
      </main>

      {showForm && (
        <SecretForm
          onSubmit={handleAddSecret}
          onCancel={handleCancelForm}
          initialData={editingSecret}
        />
      )}
    </div>
  );
}

export default App;
import { useState } from 'react';

interface HeaderProps {
  onLock: (password: string) => Promise<void>;
  secretCount: number;
  hasUnsavedChanges: boolean;
  masterPassword: string;
}

export const Header = ({ onLock, secretCount, hasUnsavedChanges, masterPassword }: HeaderProps) => {
  const [showLockModal, setShowLockModal] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLock = async () => {
    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    if (password !== masterPassword) {
      setError('Incorrect master password');
      return;
    }
    
    setLoading(true);
    setError('');
    await onLock(password);
    setLoading(false);
    setPassword('');
    setShowLockModal(false);
  };

  const handleQuickLock = async () => {
    if (!hasUnsavedChanges) {
      setLoading(true);
      await onLock(masterPassword);
      setLoading(false);
      return;
    }
    setShowLockModal(true);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">Secure Vault</h1>
                <p className="text-xs sm:text-sm text-gray-500">
                  {secretCount} {secretCount === 1 ? 'secret' : 'secrets'}
                  {hasUnsavedChanges && (
                    <span className="ml-2 text-yellow-600 font-medium">• Not saved</span>
                  )}
                </p>
              </div>
            </div>

            <button
              onClick={handleQuickLock}
              disabled={loading}
              className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-300 text-gray-700 rounded-lg transition duration-200 text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="font-medium hidden sm:inline">
                {hasUnsavedChanges ? 'Save & Lock' : 'Lock Vault'}
              </span>
              <span className="font-medium sm:hidden">Lock</span>
            </button>
          </div>
        </div>
      </header>

      {showLockModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {hasUnsavedChanges ? 'Save & Lock Vault' : 'Lock Vault'}
              </h2>
              {hasUnsavedChanges && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Unsaved
                </span>
              )}
            </div>

            {hasUnsavedChanges && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex">
                  <svg className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-sm text-yellow-800">
                    You have unsaved changes. Enter your master password to save and lock your vault.
                  </p>
                </div>
              </div>
            )}

            <p className="text-gray-600 mb-4 text-sm">
              Enter your master password to {hasUnsavedChanges ? 'save and ' : ''}lock your vault.
            </p>

            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Master password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none mb-2"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleLock()}
            />

            {error && (
              <div className="mb-4 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowLockModal(false);
                  setPassword('');
                  setError('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleLock}
                disabled={!password.trim() || loading}
                className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white rounded-lg transition duration-200"
              >
                {loading ? 'Locking...' : hasUnsavedChanges ? 'Save & Lock' : 'Lock'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
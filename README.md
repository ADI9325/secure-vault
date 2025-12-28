# 🔐 Secure Vault - Password Manager

A production-ready, frontend-only password manager built with React, TypeScript, and the Web Crypto API. All data is encrypted client-side before being stored in localStorage.

## 🎥 Demo

**Video Demo:** [Watch on Google Drive](https://drive.google.com/file/d/1FNiz699m6Ge7OusjYIMtf3q6knU74F54/view?usp=sharing)

**Developer Portfolio:** [https://aditya.codeclout.in/](https://aditya.codeclout.in/)

## 🔐 Security Features

- **AES-256-GCM Encryption**: All secrets are encrypted using industry-standard encryption
- **PBKDF2 Key Derivation**: Master password is derived using 100,000 iterations
- **Client-Side Only**: No backend, no server, no API calls
- **Zero Knowledge**: Master password never leaves the browser and is never stored
- **Auto-Lock**: Vault automatically locks on page refresh
- **Encrypted Storage**: Only encrypted data is stored in localStorage

## ✨ Features

- ✅ Create, view, edit, and delete secrets
- ✅ Password generator with customizable options
- ✅ Copy to clipboard functionality
- ✅ Search through secrets (decrypt in memory only)
- ✅ Clean, responsive UI with Tailwind CSS
- ✅ TypeScript for type safety
- ✅ Production-ready code structure
- ✅ Unsaved changes warning
- ✅ Master password confirmation
- ✅ Data loss prevention dialogs

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ADI9325/secure-vault.git
cd secure-vault
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Build for Production
```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

## 🔧 Git Setup

If you want to push to your own repository:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/secure-vault.git
git push -u origin main
```

## 📁 Project Structure
```
secure-vault/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx       # App header with lock button
│   │   ├── SecretCard.tsx   # Individual secret display
│   │   ├── SecretForm.tsx   # Add/edit secret form
│   │   ├── SecretList.tsx   # List of secrets with search
│   │   └── UnlockScreen.tsx # Initial unlock screen
│   ├── hooks/
│   │   └── useVault.ts      # Vault state management hook
│   ├── lib/
│   │   ├── crypto.ts        # Web Crypto API utilities
│   │   ├── storage.ts       # localStorage utilities
│   │   └── passwordGenerator.ts # Password generation
│   ├── types/
│   │   └── index.ts         # TypeScript type definitions
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles with Tailwind
├── public/
│   └── vite.svg             # App icon
├── index.html               # HTML entry point
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## 🏗️ Architecture Decisions

### 1. **Web Crypto API**
- Used for all cryptographic operations
- Provides secure, browser-native encryption
- No third-party crypto libraries needed

### 2. **Encryption Strategy**
- **Algorithm**: AES-256-GCM (authenticated encryption)
- **Key Derivation**: PBKDF2 with SHA-256, 100,000 iterations
- **Random IV**: New initialization vector for each encryption
- **Salt**: Random 16-byte salt for key derivation

### 3. **Data Flow**
```
Master Password → PBKDF2 → Encryption Key → AES-GCM → Encrypted Vault → localStorage
                    ↑                          ↓
                  Random Salt           Random IV + Encrypted Data
```

### 4. **State Management**
- Custom React hook (`useVault`) for centralized state
- No external state management library needed
- Secrets only exist in memory when vault is unlocked

### 5. **Storage Strategy**
- Only encrypted data stored in localStorage
- Master password NEVER persisted
- Encryption key derived on-demand and discarded after use

### 6. **Component Architecture**
- Separation of concerns (UI vs logic)
- Reusable, typed components
- Clear prop interfaces

### 7. **TypeScript Configuration**
- Strict mode enabled for maximum type safety
- Path aliases (@/) for cleaner imports
- Proper type definitions for all functions

## 🔒 Security Considerations

### What We Do
- ✅ Encrypt all secrets before storage
- ✅ Use cryptographically secure random number generation
- ✅ Derive keys using PBKDF2 with high iteration count
- ✅ Never store plaintext passwords
- ✅ Auto-lock on page refresh
- ✅ Clear encryption keys from memory after use
- ✅ Warn before data loss
- ✅ Password confirmation on vault creation

### What We Don't Do
- ❌ No backend or server communication
- ❌ No third-party analytics or tracking
- ❌ No master password recovery (by design)
- ❌ No plaintext storage anywhere

### Limitations
- **No Password Recovery**: If you forget your master password, your data is permanently encrypted
- **Browser-Bound**: Data is tied to the browser's localStorage
- **Local Only**: No sync across devices
- **Trust Required**: Users must trust their browser and device security

## 🎯 Assumptions Made

1. **Modern Browser**: Assumes support for Web Crypto API (Chrome 37+, Firefox 34+, Safari 11+)
2. **Single User**: Designed for single-user, single-device usage
3. **localStorage Available**: Requires localStorage to be enabled
4. **Secure Environment**: Assumes user's device and browser are not compromised
5. **User Responsibility**: Users are responsible for choosing strong master passwords

## 🧪 Technical Stack

- **Framework**: React 18
- **Build Tool**: Vite 5
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3
- **Encryption**: Web Crypto API
- **Storage**: localStorage

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Developer

**Aditya**
- Portfolio: [https://aditya.codeclout.in/](https://aditya.codeclout.in/)
- GitHub: [@ADI9325](https://github.com/ADI9325)

## 📄 License

MIT License - feel free to use this project as a learning resource or starting point.

## ⚠️ Disclaimer

This is a demonstration project. While it implements strong encryption, it has not undergone professional security audit. For critical password management, consider using established solutions like Bitwarden, 1Password, or KeePass.

## 🔍 How Encryption Works

1. **Unlock/Create Vault**:
   - User enters master password
   - Random salt generated (or retrieved from storage)
   - PBKDF2 derives encryption key from password + salt

2. **Storing Secrets**:
   - Secrets collected in memory
   - When locking, all secrets serialized to JSON
   - Random IV generated
   - Data encrypted with AES-GCM
   - Encrypted data + salt + IV stored in localStorage

3. **Retrieving Secrets**:
   - User enters master password
   - Salt and IV retrieved from localStorage
   - Encryption key re-derived using PBKDF2
   - Data decrypted using AES-GCM
   - Secrets loaded into memory

4. **Lock Vault**:
   - Secrets re-encrypted with current password
   - Saved to localStorage
   - Memory cleared
   - User returns to lock screen

## 🎨 UI/UX Highlights

- Clean, modern interface
- Responsive design (mobile-friendly)
- Intuitive password generator
- Copy-to-clipboard with visual feedback
- Secure password visibility toggle
- Search functionality for large vaults
- Confirmation dialogs for destructive actions
- Unsaved changes tracking
- Browser refresh warning

## 🌟 Features in Detail

### Password Generator
- Customizable length (8-32 characters)
- Toggle uppercase, lowercase, numbers, symbols
- Cryptographically secure random generation

### Vault Management
- Create new vault with master password
- Unlock existing vault
- Auto-lock on page refresh
- Manual lock with password verification

### Secret Management
- Add, edit, delete secrets
- Each secret contains: name, username, password, notes
- Show/hide password toggle
- Copy to clipboard functionality

### Security Features
- All data encrypted with AES-256-GCM
- PBKDF2 key derivation (100,000 iterations)
- No plaintext storage
- Master password never persisted
- Unsaved changes warning

---

**Built with security and user experience in mind** 🔐

## 📸 Screenshots

Coming soon...

## 🐛 Known Issues

None currently. Please report any issues on GitHub.

## 🗺️ Roadmap

- [ ] Export/Import vault functionality
- [ ] Dark mode support
- [ ] Password strength indicator
- [ ] Browser extension version
- [ ] Mobile app version
- [ ] Encrypted cloud backup option

---

⭐ **Star this repository if you found it helpful!**# secure-vault

// // import { createContext, useContext, useState } from 'react';
// // import type { ReactNode } from 'react';


// // interface User {
// //   id: number;
// //   name: string;
// //   email: string;
// // }

// // interface AuthContextType {
// //   user: User | null;
// //   login: (user: User) => void;
// //   logout: () => void;
// //   isAuthenticated: boolean;
// // }

// // const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // export function AuthProvider({ children }: { children: ReactNode }) {
// //   const [user, setUser] = useState<User | null>(null);

// //   const login = (userData: User) => {
// //     setUser(userData);
// //     localStorage.setItem('user', JSON.stringify(userData));
// //   };

// //   const logout = () => {
// //     setUser(null);
// //     localStorage.removeItem('user');
// //   };

// //   const isAuthenticated = !!user;

// //   // Check for saved user on mount
// //   React.useEffect(() => {
// //     const savedUser = localStorage.getItem('user');
// //     if (savedUser) {
// //       setUser(JSON.parse(savedUser));
// //     }
// //   }, []);

// //   return (
// //     <AuthContext.Provider value={{
// //       user,
// //       login,
// //       logout,
// //       isAuthenticated
// //     }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // }

// // export function useAuth() {
// //   const context = useContext(AuthContext);
// //   if (context === undefined) {
// //     throw new Error('useAuth must be used within an AuthProvider');
// //   }
// //   return context;
// // }

// import { createContext, useContext, useState, useEffect } from 'react';
// import type { ReactNode } from 'react';

// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (user: User) => void;
//   logout: () => void;
//   isAuthenticated: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);

//   const login = (userData: User) => {
//     setUser(userData);
//     localStorage.setItem('user', JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//   };

//   const isAuthenticated = !!user;

//   // Check for saved user on mount
//   useEffect(() => {
//     const savedUser = localStorage.getItem('user');
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }

// import React, { createContext, useContext, useState, ReactNode } from 'react';

// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (user: User) => void;
//   logout: () => void;
//   isAuthenticated: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);

//   const login = (userData: User) => {
//     setUser(userData);
//     // Store user data in localStorage for persistence
//     localStorage.setItem('user', JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     // Clear user data from localStorage
//     localStorage.removeItem('user');
//   };

//   // Check for existing user session on mount
//   React.useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       try {
//         const userData = JSON.parse(storedUser);
//         setUser(userData);
//       } catch (error) {
//         console.error('Error parsing stored user data:', error);
//         localStorage.removeItem('user');
//       }
//     }
//   }, []);

//   const value: AuthContextType = {
//     user,
//     login,
//     logout,
//     isAuthenticated: !!user,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };


import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('user');
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

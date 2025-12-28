// import React, { useState } from 'react';
// import { ShoppingCart, Search, User, LogOut, Package, Settings } from 'lucide-react';
// import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';
// import { Card, CardContent } from '../components/ui/card';
// import { useAuth } from '../context/AuthContext';

// interface HeaderProps {
//   cartItemCount: number;
//   onCartClick: () => void;
//   onSearch: (term: string) => void;
//   searchTerm: string;
//   selectedCategory: string;
//   onCategoryChange: (category: string) => void;
//   onOrdersClick: () => void;
//   onSettingsClick: () => void;
// }

// export function Header({
//   cartItemCount,
//   onCartClick,
//   onSearch,
//   searchTerm,
//   selectedCategory,
//   onCategoryChange,
//   onOrdersClick,
//   onSettingsClick,
// }: HeaderProps) {
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const { user, login, logout } = useAuth();
//   const categories = ['all', 'Roses', 'Lilies', 'Bouquets', 'Tulips'];

//   return (
//     <header className="sticky top-0 z-40 bg-white shadow-sm">
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between mb-4">
//           <h1 className="text-2xl font-bold text-pink-600">🌸 Bloom & Blossom</h1>
          
//           <div className="flex items-center gap-3">
//             {/* Cart Button */}
//             <Button
//               onClick={onCartClick}
//               variant="outline"
//               className="relative"
//             >
//               <ShoppingCart className="w-5 h-5" />
//               {cartItemCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
//                   {cartItemCount}
//                 </span>
//               )}
//             </Button>

//             {/* Profile Button */}
//             <div className="relative">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => setIsProfileOpen(!isProfileOpen)}
//                 className="flex items-center gap-2"
//               >
//                 <User className="w-4 h-4" />
//                 {user ? user.name : 'Profile'}
//               </Button>
              
//               {/* Profile Dropdown */}
//               {isProfileOpen && (
//                 <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50">
//                   {user ? (
//                     <CardContent className="p-0">
//                       <div className="p-4 border-b">
//                         <div className="flex items-center gap-3">
//                           <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
//                             <User className="w-5 h-5 text-pink-600" />
//                           </div>
//                           <div>
//                             <p className="font-medium">{user.name}</p>
//                             <p className="text-sm text-gray-500">{user.email}</p>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="p-2">
//                         <Button
//                           variant="ghost"
//                           className="w-full justify-start gap-2"
//                           onClick={() => {
//                             setIsProfileOpen(false);
//                             onOrdersClick();
//                           }}
//                         >
//                           <Package className="w-4 h-4" />
//                           My Orders
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           className="w-full justify-start gap-2"
//                           onClick={() => {
//                             setIsProfileOpen(false);
//                             onSettingsClick();
//                           }}
//                         >
//                           <Settings className="w-4 h-4" />
//                           Settings
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           className="w-full justify-start gap-2 text-red-600 hover:text-red-700"
//                           onClick={() => {
//                             logout();
//                             setIsProfileOpen(false);
//                           }}
//                         >
//                           <LogOut className="w-4 h-4" />
//                           Logout
//                         </Button>
//                       </div>
//                     </CardContent>
//                   ) : (
//                     <CardContent className="p-4">
//                       <p className="text-sm text-gray-600 mb-4">Sign in to access your orders and saved items</p>
//                       <Button
//                         className="w-full bg-pink-500 hover:bg-pink-600"
//                         onClick={() => {
//                           // Mock login - in real app would open login modal
//                           login({
//                             id: 1,
//                             name: 'John Doe',
//                             email: 'john@example.com'
//                           });
//                           setIsProfileOpen(false);
//                         }}
//                       >
//                         Sign In
//                       </Button>
//                     </CardContent>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="relative mb-4">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//           <Input
//             type="text"
//             placeholder="Search flowers..."
//             value={searchTerm}
//             onChange={(e) => onSearch(e.target.value)}
//             className="pl-10"
//           />
//         </div>

//         <div className="flex gap-2 overflow-x-auto pb-2">
//           {categories.map(category => (
//             <Button
//               key={category}
//               variant={selectedCategory === category ? 'default' : 'outline'}
//               size="sm"
//               onClick={() => onCategoryChange(category)}
//               className="whitespace-nowrap"
//             >
//               {category === 'all' ? 'All' : category}
//             </Button>
//           ))}
//         </div>
//       </div>

//       {/* Close dropdown when clicking outside */}
//       {isProfileOpen && (
//         <div
//           className="fixed inset-0 z-40"
//           onClick={() => setIsProfileOpen(false)}
//         />
//       )}
//     </header>
//   );
// }

import React, { useState } from 'react';
import { ShoppingCart, Search, User, LogOut, Package, Settings } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onSearch: (term: string) => void;
  searchTerm: string;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onOrdersClick: () => void;
  onSettingsClick: () => void;
}

export function Header({
  cartItemCount,
  onCartClick,
  onSearch,
  searchTerm,
  selectedCategory,
  onCategoryChange,
  onOrdersClick,
  onSettingsClick,
}: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, login, logout } = useAuth();
  const categories = ['all', 'Roses', 'Lilies', 'Bouquets', 'Tulips'];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-pink-600">🌸 Bloom & Blossom</h1>
          
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <Button
              onClick={onCartClick}
              variant="outline"
              className="relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>

            {/* Profile Button */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                {user ? user.name : 'Profile'}
              </Button>
              
              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50">
                  {user ? (
                    <CardContent className="p-0">
                      <div className="p-4 border-b">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-pink-600" />
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-2"
                          onClick={() => {
                            setIsProfileOpen(false);
                            onOrdersClick();
                          }}
                        >
                          <Package className="w-4 h-4" />
                          My Orders
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-2"
                          onClick={() => {
                            setIsProfileOpen(false);
                            onSettingsClick();
                          }}
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-2 text-red-600 hover:text-red-700"
                          onClick={() => {
                            logout();
                            setIsProfileOpen(false);
                          }}
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </Button>
                      </div>
                    </CardContent>
                  ) : (
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-600 mb-4">Sign in to access your orders and saved items</p>
                      <Button
                        className="w-full bg-pink-500 hover:bg-pink-600"
                        onClick={() => {
                          // Mock login - in real app would open login modal
                          login({
                            id: 1,
                            name: 'John Doe',
                            email: 'john@example.com'
                          });
                          setIsProfileOpen(false);
                        }}
                      >
                        Sign In
                      </Button>
                    </CardContent>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search flowers..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange(category)}
              className="whitespace-nowrap"
            >
              {category === 'all' ? 'All' : category}
            </Button>
          ))}
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {isProfileOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </header>
  );
}
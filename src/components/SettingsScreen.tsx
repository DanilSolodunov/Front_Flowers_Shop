import React, { useState } from 'react';
import { ArrowLeft, User, Lock, MapPin, Save, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface ProfileData {
  name: string;
  email: string;
  address: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export function SettingsScreen({ onBack }: { onBack: () => void }) {
  const { user, login } = useAuth();
  const { toast } = useToast();
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  const [profileData, setProfileData] = useState<ProfileData>({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = async () => {
    if (!profileData.name.trim() || !profileData.email.trim()) {
      toast('Name and email are required', 'error');
      return;
    }

    if (!profileData.email.includes('@')) {
      toast('Please enter a valid email address', 'error');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update user in context
      if (user) {
        login({
          ...user,
          name: profileData.name,
          email: profileData.email
        });
      }
      
      toast('Profile updated successfully!', 'success');
      setIsLoading(false);
    }, 1000);
  };

  const handleChangePassword = async () => {
    if (!profileData.currentPassword) {
      toast('Current password is required', 'error');
      return;
    }

    if (!profileData.newPassword) {
      toast('New password is required', 'error');
      return;
    }

    if (profileData.newPassword.length < 6) {
      toast('Password must be at least 6 characters', 'error');
      return;
    }

    if (profileData.newPassword !== profileData.confirmPassword) {
      toast('Passwords do not match', 'error');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast('Password changed successfully!', 'success');
      setProfileData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      setIsLoading(false);
    }, 1000);
  };

  const handleSaveAddress = async () => {
    if (!profileData.address.trim()) {
      toast('Address is required', 'error');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast('Address saved successfully!', 'success');
      setIsLoading(false);
    }, 1000);
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <User className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Пожалуйста, войдите в систему</h2>
          <p className="text-gray-600 mb-6">Для доступа к настройкам необходимо войти в систему</p>
          <Button onClick={onBack} className="bg-pink-500 hover:bg-pink-600">
            На главный экран
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>
        <h1 className="text-2xl font-bold">Настройки</h1>
      </div>

      <div className="space-y-6">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Информация о пользователе
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Введите имя"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Введите email"
              />
            </div>
            <Button 
              onClick={handleSaveProfile}
              disabled={isLoading}
              className="bg-pink-500 hover:bg-pink-600"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Saving...' : 'Сохранить профиль'}
            </Button>
          </CardContent>
        </Card>

        {/* Delivery Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Адрес доставки
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="address">Укажите адрес доставки</Label>
              <Input
                id="address"
                value={profileData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Введите адрес доставки"
              />
            </div>
            <Button 
              onClick={handleSaveAddress}
              disabled={isLoading}
              variant="outline"
              className="w-full"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Saving...' : 'Сохранить адрес'}
            </Button>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Сменить пароль
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Старый пароль</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPasswords.current ? 'text' : 'password'}
                  value={profileData.currentPassword}
                  onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                  placeholder="Введите старый пароль"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                >
                  {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="newPassword">Новый пароль</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPasswords.new ? 'text' : 'password'}
                  value={profileData.newPassword}
                  onChange={(e) => handleInputChange('newPassword', e.target.value)}
                  placeholder="Введите новый пароль"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                >
                  {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="confirmPassword">Повторите новый пароль</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={profileData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Введите новый пароль еще раз"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                >
                  {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <Button 
              onClick={handleChangePassword}
              disabled={isLoading}
              variant="outline"
              className="w-full"
            >
              <Lock className="w-4 h-4 mr-2" />
              {isLoading ? 'Changing...' : 'Сменить пароль'}
            </Button>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Действия с учетной записью</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              После удаления учетной записи пути назад нет. Пожалуйста, будьте уверены
            </p>
            <Button variant="destructive" className="w-full">
            Удалить аккаунт
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
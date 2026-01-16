'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Admin {
  _id: string;
  email: string;
  name: string;
  role: 'superadmin' | 'admin';
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

export default function AdminSettings() {
  const router = useRouter();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [changePasswordId, setChangePasswordId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'admin' as 'admin' | 'superadmin',
  });
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/verify');
      if (!response.ok) {
        router.push('/admin/login');
        return;
      }
      setAuthLoading(false);
      fetchAdmins();
    } catch (error) {
      router.push('/admin/login');
    }
  };

  const fetchAdmins = async () => {
    try {
      const response = await fetch('/api/admins');
      const data = await response.json();
      if (data.success) {
        setAdmins(data.data);
      }
    } catch (error) {
      console.error('Error fetching admins:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.name) {
      alert('Please fill all fields');
      return;
    }

    try {
      const response = await fetch('/api/admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Admin added successfully!');
        setShowAddForm(false);
        setFormData({ email: '', password: '', name: '', role: 'admin' });
        fetchAdmins();
      } else {
        alert(data.error || 'Failed to add admin');
      }
    } catch (error) {
      console.error('Error adding admin:', error);
      alert('Error adding admin');
    }
  };

  const handleChangePassword = async (adminId: string) => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    try {
      const response = await fetch(`/api/admins/${adminId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordData.newPassword }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Password changed successfully!');
        setChangePasswordId(null);
        setPasswordData({ newPassword: '', confirmPassword: '' });
      } else {
        alert(data.error || 'Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Error changing password');
    }
  };

  const handleToggleActive = async (admin: Admin) => {
    try {
      const response = await fetch(`/api/admins/${admin._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !admin.isActive }),
      });

      const data = await response.json();

      if (data.success) {
        alert(`Admin ${admin.isActive ? 'deactivated' : 'activated'}!`);
        fetchAdmins();
      } else {
        alert(data.error || 'Failed to update admin');
      }
    } catch (error) {
      console.error('Error updating admin:', error);
      alert('Error updating admin');
    }
  };

  const handleDelete = async (adminId: string) => {
    if (!confirm('Are you sure you want to delete this admin?')) return;

    try {
      const response = await fetch(`/api/admins/${adminId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        alert('Admin deleted!');
        fetchAdmins();
      } else {
        alert(data.error || 'Failed to delete admin');
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
      alert('Error deleting admin');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (authLoading || loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-light text-gray-800">Настройки</h1>
              <p className="text-sm text-gray-500 mt-1">Управление администраторами</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/admin')}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Admin Button */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-medium text-gray-800">Администраторы</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            {showAddForm ? 'Отмена' : '+ Добавить Админа'}
          </button>
        </div>

        {/* Add Admin Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Добавить нового администратора</h3>
            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Имя</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Пароль</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    required
                    minLength={6}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Роль</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'superadmin' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Добавить Администратора
              </button>
            </form>
          </div>
        )}

        {/* Admins List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Администратор
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Роль
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Последний вход
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {admins.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      Нет администраторов
                    </td>
                  </tr>
                ) : (
                  admins.map((admin) => (
                    <tr key={admin._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                        <div className="text-sm text-gray-500">{admin.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          admin.role === 'superadmin' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {admin.role === 'superadmin' ? 'Super Admin' : 'Admin'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          admin.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {admin.isActive ? 'Активен' : 'Неактивен'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {admin.lastLogin ? (
                          <div>
                            <div className="text-sm text-gray-900">
                              {new Date(admin.lastLogin).toLocaleDateString('ru-RU')}
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(admin.lastLogin).toLocaleTimeString('ru-RU', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">Никогда</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                        {changePasswordId === admin._id ? (
                          <div className="space-y-2">
                            <input
                              type="password"
                              placeholder="Новый пароль"
                              value={passwordData.newPassword}
                              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                            />
                            <input
                              type="password"
                              placeholder="Подтвердите пароль"
                              value={passwordData.confirmPassword}
                              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleChangePassword(admin._id)}
                                className="text-green-600 hover:text-green-800"
                              >
                                Сохранить
                              </button>
                              <button
                                onClick={() => {
                                  setChangePasswordId(null);
                                  setPasswordData({ newPassword: '', confirmPassword: '' });
                                }}
                                className="text-red-600 hover:text-red-800"
                              >
                                Отмена
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <button
                              onClick={() => setChangePasswordId(admin._id)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Сменить пароль
                            </button>
                            <button
                              onClick={() => handleToggleActive(admin)}
                              className="text-orange-600 hover:text-orange-800"
                            >
                              {admin.isActive ? 'Деактивировать' : 'Активировать'}
                            </button>
                            <button
                              onClick={() => handleDelete(admin._id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Удалить
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

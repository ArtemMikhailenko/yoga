'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Booking {
  _id: string;
  serviceType: 'group' | 'private' | 'coaching' | 'training' | 'retreat';
  retreatId?: {
    _id: string;
    title: {
      ru: string;
      en: string;
    };
    dates: string;
  };
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  date: string;
  time?: string;
  participants?: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalPrice?: number;
  notes?: string;
  createdAt: string;
}

export default function AdminBookings() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterService, setFilterService] = useState<string>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<string>('');

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [bookings, filterStatus, filterService]);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/verify');
      if (!response.ok) {
        router.push('/admin/login');
        return;
      }
      setAuthLoading(false);
      fetchBookings();
    } catch (error) {
      router.push('/admin/login');
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings');
      const data = await response.json();
      if (data.success) {
        setBookings(data.data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...bookings];

    if (filterStatus !== 'all') {
      filtered = filtered.filter(b => b.status === filterStatus);
    }

    if (filterService !== 'all') {
      filtered = filtered.filter(b => b.serviceType === filterService);
    }

    setFilteredBookings(filtered);
  };

  const handleUpdateStatus = async (bookingId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Status updated!');
        setEditingId(null);
        fetchBookings();
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating booking:', error);
      alert('Error updating booking');
    }
  };

  const handleDelete = async (bookingId: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;

    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        alert('Booking deleted!');
        fetchBookings();
      } else {
        alert('Failed to delete booking');
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Error deleting booking');
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

  const getServiceLabel = (type: string) => {
    const labels: any = {
      group: 'Групповое занятие',
      private: 'Индивидуальное',
      coaching: 'Ведическая психология',
      training: 'Физические тренировки',
      retreat: 'Ретрит',
    };
    return labels[type] || type;
  };

  const getStatusColor = (status: string) => {
    const colors: any = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const labels: any = {
      pending: 'Ожидает',
      confirmed: 'Подтверждено',
      cancelled: 'Отменено',
      completed: 'Завершено',
    };
    return labels[status] || status;
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
              <h1 className="text-2xl font-light text-gray-800">Управление Бронированиями</h1>
              <p className="text-sm text-gray-500 mt-1">Просмотр и управление всеми бронированиями</p>
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
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">Всего</p>
            <p className="text-2xl font-light text-gray-800">{bookings.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">Ожидают</p>
            <p className="text-2xl font-light text-yellow-600">
              {bookings.filter(b => b.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">Подтверждено</p>
            <p className="text-2xl font-light text-green-600">
              {bookings.filter(b => b.status === 'confirmed').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">Завершено</p>
            <p className="text-2xl font-light text-blue-600">
              {bookings.filter(b => b.status === 'completed').length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Статус</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">Все статусы</option>
                <option value="pending">Ожидает</option>
                <option value="confirmed">Подтверждено</option>
                <option value="cancelled">Отменено</option>
                <option value="completed">Завершено</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Тип услуги</label>
              <select
                value={filterService}
                onChange={(e) => setFilterService(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">Все услуги</option>
                <option value="group">Групповое</option>
                <option value="private">Индивидуальное</option>
                <option value="coaching">Ведическая психология</option>
                <option value="training">Физические тренировки</option>
                <option value="retreat">Ретрит</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Клиент
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Услуга
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Дата
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      Бронирования не найдены
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{booking.clientName}</div>
                        <div className="text-sm text-gray-500">{booking.clientEmail}</div>
                        {booking.clientPhone && (
                          <div className="text-sm text-gray-500">{booking.clientPhone}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{getServiceLabel(booking.serviceType)}</div>
                        {booking.retreatId && (
                          <div className="text-xs text-gray-500">{booking.retreatId.title.ru}</div>
                        )}
                        {booking.participants && booking.participants > 1 && (
                          <div className="text-xs text-gray-500">{booking.participants} участников</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(booking.date).toLocaleDateString('ru-RU')}
                        </div>
                        {booking.time && (
                          <div className="text-sm text-gray-500">{booking.time}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingId === booking._id ? (
                          <div className="flex gap-2">
                            <select
                              value={editStatus}
                              onChange={(e) => setEditStatus(e.target.value)}
                              className="text-sm border border-gray-300 rounded px-2 py-1"
                            >
                              <option value="pending">Ожидает</option>
                              <option value="confirmed">Подтверждено</option>
                              <option value="cancelled">Отменено</option>
                              <option value="completed">Завершено</option>
                            </select>
                            <button
                              onClick={() => handleUpdateStatus(booking._id, editStatus)}
                              className="text-green-600 hover:text-green-800"
                            >
                              ✓
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="text-red-600 hover:text-red-800"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <span
                            onClick={() => {
                              setEditingId(booking._id);
                              setEditStatus(booking.status);
                            }}
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full cursor-pointer ${getStatusColor(booking.status)}`}
                          >
                            {getStatusLabel(booking.status)}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleDelete(booking._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Удалить
                        </button>
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

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Payment {
  _id: string;
  bookingId?: {
    _id: string;
    serviceType: string;
    clientName: string;
    date: string;
  };
  clientName: string;
  clientEmail: string;
  amount: number;
  currency: string;
  paymentMethod?: 'paypal' | 'card' | 'bank_transfer' | 'cash' | 'other';
  paymentProvider?: string;
  transactionId?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paidAt?: string;
  refundedAt?: string;
  notes?: string;
  createdAt: string;
}

export default function AdminPayments() {
  const router = useRouter();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterMethod, setFilterMethod] = useState<string>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<string>('');

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [payments, filterStatus, filterMethod]);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/verify');
      if (!response.ok) {
        router.push('/admin/login');
        return;
      }
      setAuthLoading(false);
      fetchPayments();
    } catch (error) {
      router.push('/admin/login');
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await fetch('/api/payments');
      const data = await response.json();
      if (data.success) {
        setPayments(data.data);
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...payments];

    if (filterStatus !== 'all') {
      filtered = filtered.filter(p => p.status === filterStatus);
    }

    if (filterMethod !== 'all') {
      filtered = filtered.filter(p => p.paymentMethod === filterMethod);
    }

    setFilteredPayments(filtered);
  };

  const handleUpdateStatus = async (paymentId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/payments/${paymentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Status updated!');
        setEditingId(null);
        fetchPayments();
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating payment:', error);
      alert('Error updating payment');
    }
  };

  const handleDelete = async (paymentId: string) => {
    if (!confirm('Are you sure you want to delete this payment record?')) return;

    try {
      const response = await fetch(`/api/payments/${paymentId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        alert('Payment deleted!');
        fetchPayments();
      } else {
        alert('Failed to delete payment');
      }
    } catch (error) {
      console.error('Error deleting payment:', error);
      alert('Error deleting payment');
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

  const getMethodLabel = (method?: string) => {
    const labels: any = {
      paypal: 'PayPal',
      card: 'Карта',
      bank_transfer: 'Банковский перевод',
      cash: 'Наличные',
      other: 'Другое',
    };
    return method ? labels[method] || method : 'Не указан';
  };

  const getStatusColor = (status: string) => {
    const colors: any = {
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-purple-100 text-purple-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const labels: any = {
      pending: 'Ожидает',
      completed: 'Завершен',
      failed: 'Ошибка',
      refunded: 'Возврат',
    };
    return labels[status] || status;
  };

  const calculateTotals = () => {
    const completed = filteredPayments.filter(p => p.status === 'completed');
    const totalAmount = completed.reduce((sum, p) => sum + p.amount, 0);
    return { totalAmount, completedCount: completed.length };
  };

  const totals = calculateTotals();

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
              <h1 className="text-2xl font-light text-gray-800">Управление Платежами</h1>
              <p className="text-sm text-gray-500 mt-1">Просмотр и управление платежами</p>
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
            <p className="text-sm text-gray-500">Всего платежей</p>
            <p className="text-2xl font-light text-gray-800">{payments.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">Завершено</p>
            <p className="text-2xl font-light text-green-600">
              {payments.filter(p => p.status === 'completed').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">Ожидают</p>
            <p className="text-2xl font-light text-yellow-600">
              {payments.filter(p => p.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">Общая сумма</p>
            <p className="text-2xl font-light text-gray-800">
              €{totals.totalAmount.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Info Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-blue-800 mb-1">Платежная система еще не подключена</h3>
              <p className="text-sm text-blue-700">
                Эта страница готова для интеграции с любой платежной системой (PayPal, Stripe, и т.д.). 
                После выбора платежки, данные будут автоматически появляться здесь.
              </p>
            </div>
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
                <option value="completed">Завершен</option>
                <option value="failed">Ошибка</option>
                <option value="refunded">Возврат</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Метод оплаты</label>
              <select
                value={filterMethod}
                onChange={(e) => setFilterMethod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">Все методы</option>
                <option value="paypal">PayPal</option>
                <option value="card">Карта</option>
                <option value="bank_transfer">Банковский перевод</option>
                <option value="cash">Наличные</option>
                <option value="other">Другое</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Клиент
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Сумма
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Метод
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Дата
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      {payments.length === 0 
                        ? 'Платежи появятся здесь после подключения платежной системы'
                        : 'Платежи не найдены по выбранным фильтрам'}
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((payment) => (
                    <tr key={payment._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{payment.clientName}</div>
                        <div className="text-sm text-gray-500">{payment.clientEmail}</div>
                        {payment.transactionId && (
                          <div className="text-xs text-gray-400 font-mono">{payment.transactionId}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {payment.currency} {payment.amount.toFixed(2)}
                        </div>
                        {payment.bookingId && (
                          <div className="text-xs text-gray-500">Booking ID: {payment.bookingId._id.slice(-6)}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{getMethodLabel(payment.paymentMethod)}</div>
                        {payment.paymentProvider && (
                          <div className="text-xs text-gray-500">{payment.paymentProvider}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingId === payment._id ? (
                          <div className="flex gap-2">
                            <select
                              value={editStatus}
                              onChange={(e) => setEditStatus(e.target.value)}
                              className="text-sm border border-gray-300 rounded px-2 py-1"
                            >
                              <option value="pending">Ожидает</option>
                              <option value="completed">Завершен</option>
                              <option value="failed">Ошибка</option>
                              <option value="refunded">Возврат</option>
                            </select>
                            <button
                              onClick={() => handleUpdateStatus(payment._id, editStatus)}
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
                              setEditingId(payment._id);
                              setEditStatus(payment.status);
                            }}
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full cursor-pointer ${getStatusColor(payment.status)}`}
                          >
                            {getStatusLabel(payment.status)}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(payment.createdAt).toLocaleDateString('ru-RU')}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(payment.createdAt).toLocaleTimeString('ru-RU')}
                        </div>
                        {payment.paidAt && (
                          <div className="text-xs text-green-600">
                            Оплачен: {new Date(payment.paidAt).toLocaleDateString('ru-RU')}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleDelete(payment._id)}
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

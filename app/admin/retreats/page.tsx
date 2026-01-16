'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Retreat {
  _id?: string;
  title: {
    ru: string;
    en: string;
  };
  subtitle: {
    ru: string;
    en: string;
  };
  dates: string;
  duration: string;
  location: {
    ru: string;
    en: string;
  };
  price: string;
  earlyBirdPrice?: string;
  earlyBirdDeadline?: string;
  pricingTiers?: Array<{
    deadline: string;
    price: string;
  }>;
  description: {
    ru: string;
    en: string;
  };
  highlights: {
    ru: string[];
    en: string[];
  };
  included: {
    ru: string[];
    en: string[];
  };
  notIncluded: {
    ru: string[];
    en: string[];
  };
  imageUrl: string;
  maxParticipants?: number;
  isActive: boolean;
  order: number;
}

export default function AdminRetreats() {
  const router = useRouter();
  const [retreats, setRetreats] = useState<Retreat[]>([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewRetreat, setPreviewRetreat] = useState<Retreat | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [newHighlight, setNewHighlight] = useState({ ru: '', en: '' });
  const [newIncluded, setNewIncluded] = useState({ ru: '', en: '' });
  const [newNotIncluded, setNewNotIncluded] = useState({ ru: '', en: '' });
  const [formData, setFormData] = useState<Retreat>({
    title: { ru: '', en: '' },
    subtitle: { ru: '', en: '' },
    dates: '',
    duration: '',
    location: { ru: '', en: '' },
    price: '',
    earlyBirdPrice: '',
    earlyBirdDeadline: '',
    pricingTiers: [],
    description: { ru: '', en: '' },
    highlights: { ru: [], en: [] },
    included: { ru: [], en: [] },
    notIncluded: { ru: [], en: [] },
    imageUrl: '',
    maxParticipants: 0,
    isActive: true,
    order: 0,
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
      fetchRetreats();
    } catch (error) {
      router.push('/admin/login');
    }
  };

  const fetchRetreats = async () => {
    try {
      const response = await fetch('/api/retreats');
      const data = await response.json();
      if (data.success) {
        setRetreats(data.data);
      }
    } catch (error) {
      console.error('Error fetching retreats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingId ? `/api/retreats/${editingId}` : '/api/retreats';
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert(editingId ? 'Retreat updated!' : 'Retreat created!');
        setShowForm(false);
        setEditingId(null);
        resetForm();
        fetchRetreats();
      }
    } catch (error) {
      console.error('Error saving retreat:', error);
      alert('Error saving retreat');
    }
  };

  const handleEdit = (retreat: Retreat) => {
    setFormData(retreat);
    setEditingId(retreat._id || null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this retreat?')) return;
    
    try {
      const response = await fetch(`/api/retreats/${id}`, { method: 'DELETE' });
      const data = await response.json();
      
      if (data.success) {
        alert('Retreat deleted!');
        fetchRetreats();
      }
    } catch (error) {
      console.error('Error deleting retreat:', error);
      alert('Error deleting retreat');
    }
  };

  const resetForm = () => {
    setFormData({
      title: { ru: '', en: '' },
      subtitle: { ru: '', en: '' },
      dates: '',
      duration: '',
      location: { ru: '', en: '' },
      price: '',
      earlyBirdPrice: '',
      earlyBirdDeadline: '',
      pricingTiers: [],
      description: { ru: '', en: '' },
      highlights: { ru: [], en: [] },
      included: { ru: [], en: [] },
      notIncluded: { ru: [], en: [] },
      imageUrl: '',
      maxParticipants: 0,
      isActive: true,
      order: 0,
    });
    setNewHighlight({ ru: '', en: '' });
    setNewIncluded({ ru: '', en: '' });
    setNewNotIncluded({ ru: '', en: '' });
  };

  const addArrayItem = (field: 'highlights' | 'included' | 'notIncluded', lang: 'ru' | 'en', value: string) => {
    if (!value.trim()) return;
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [lang]: [...prev[field][lang], value],
      },
    }));
  };

  const addHighlight = () => {
    if (newHighlight.ru.trim() && newHighlight.en.trim()) {
      setFormData(prev => ({
        ...prev,
        highlights: {
          ru: [...prev.highlights.ru, newHighlight.ru],
          en: [...prev.highlights.en, newHighlight.en],
        },
      }));
      setNewHighlight({ ru: '', en: '' });
    }
  };

  const addIncluded = () => {
    if (newIncluded.ru.trim() && newIncluded.en.trim()) {
      setFormData(prev => ({
        ...prev,
        included: {
          ru: [...prev.included.ru, newIncluded.ru],
          en: [...prev.included.en, newIncluded.en],
        },
      }));
      setNewIncluded({ ru: '', en: '' });
    }
  };

  const addNotIncluded = () => {
    if (newNotIncluded.ru.trim() && newNotIncluded.en.trim()) {
      setFormData(prev => ({
        ...prev,
        notIncluded: {
          ru: [...prev.notIncluded.ru, newNotIncluded.ru],
          en: [...prev.notIncluded.en, newNotIncluded.en],
        },
      }));
      setNewNotIncluded({ ru: '', en: '' });
    }
  };

  const addPricingTier = () => {
    setFormData(prev => ({
      ...prev,
      pricingTiers: [...(prev.pricingTiers || []), { deadline: '', price: '' }],
    }));
  };

  const updatePricingTier = (index: number, field: 'deadline' | 'price', value: string) => {
    setFormData(prev => ({
      ...prev,
      pricingTiers: (prev.pricingTiers || []).map((tier, i) =>
        i === index ? { ...tier, [field]: value } : tier
      ),
    }));
  };

  const removePricingTier = (index: number) => {
    setFormData(prev => ({
      ...prev,
      pricingTiers: (prev.pricingTiers || []).filter((_, i) => i !== index),
    }));
  };

  const removeArrayItem = (field: 'highlights' | 'included' | 'notIncluded', lang: 'ru' | 'en', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [lang]: prev[field][lang].filter((_, i) => i !== index),
      },
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setFormData(prev => ({
          ...prev,
          imageUrl: data.data.secure_url,
        }));
        alert('Image uploaded successfully!');
      } else {
        alert('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  if (authLoading || loading) {
    return <div className="min-h-screen bg-[#e8e6e0] flex items-center justify-center">Loading...</div>;
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#e8e6e0] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-light text-[#3a3a35]">Admin - Retreats</h1>
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/admin')}
              className="px-6 py-3 bg-white text-[#3a3a35] border border-[#3a3a35]/20 hover:border-[#c9b896] transition-colors"
            >
              Dashboard
            </button>
            <button
              onClick={() => router.push('/retreats')}
              className="px-6 py-3 bg-white text-[#3a3a35] border border-[#3a3a35]/20 hover:border-[#c9b896] transition-colors"
            >
              View Site
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-white text-red-600 border border-red-200 hover:border-red-400 transition-colors"
            >
              Logout
            </button>
            <button
              onClick={() => {
                setShowForm(true);
                setEditingId(null);
                resetForm();
              }}
              className="px-6 py-3 bg-[#c9b896] text-[#3a3a35] hover:bg-[#3a3a35] hover:text-white transition-colors"
            >
              + Add Retreat
            </button>
          </div>
        </div>

        {/* Retreats List */}
        {!showForm && (
          <div className="grid gap-6">
            {retreats.map((retreat) => (
              <div key={retreat._id} className="bg-white/60 backdrop-blur-sm border border-[#3a3a35]/10 p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-2xl font-light text-[#3a3a35] mb-2">{retreat.title.en}</h3>
                    <p className="text-[#3a3a35]/60 mb-2">{retreat.subtitle.en}</p>
                    <div className="flex gap-6 text-sm text-[#3a3a35]/60">
                      <span>📅 {retreat.dates}</span>
                      <span>📍 {retreat.location.en}</span>
                      <span>💶 {retreat.price}</span>
                      <span className={retreat.isActive ? 'text-green-600' : 'text-red-600'}>
                        {retreat.isActive ? '✓ Active' : '✗ Inactive'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setPreviewRetreat(retreat);
                        setShowPreview(true);
                      }}
                      className="px-4 py-2 bg-[#c9b896] text-[#3a3a35] hover:bg-[#3a3a35] hover:text-white transition-colors text-sm"
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => handleEdit(retreat)}
                      className="px-4 py-2 bg-[#3a3a35] text-white hover:bg-[#c9b896] transition-colors text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(retreat._id!)}
                      className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition-colors text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Form */}
        {showForm && (
          <div className="bg-white/60 backdrop-blur-sm border border-[#3a3a35]/10 p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-light text-[#3a3a35]">
                {editingId ? 'Edit Retreat' : 'Add New Retreat'}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  resetForm();
                }}
                className="text-[#3a3a35]/60 hover:text-[#3a3a35]"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-[#3a3a35]/70 mb-2">Title (RU)</label>
                  <input
                    type="text"
                    value={formData.title.ru}
                    onChange={(e) => setFormData({...formData, title: {...formData.title, ru: e.target.value}})}
                    className="w-full px-4 py-3 border border-[#3a3a35]/20 bg-white/50 focus:border-[#c9b896] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#3a3a35]/70 mb-2">Title (EN)</label>
                  <input
                    type="text"
                    value={formData.title.en}
                    onChange={(e) => setFormData({...formData, title: {...formData.title, en: e.target.value}})}
                    className="w-full px-4 py-3 border border-[#3a3a35]/20 bg-white/50 focus:border-[#c9b896] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#3a3a35]/70 mb-2">Subtitle (RU)</label>
                  <input
                    type="text"
                    value={formData.subtitle.ru}
                    onChange={(e) => setFormData({...formData, subtitle: {...formData.subtitle, ru: e.target.value}})}
                    className="w-full px-4 py-3 border border-[#3a3a35]/20 bg-white/50 focus:border-[#c9b896] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#3a3a35]/70 mb-2">Subtitle (EN)</label>
                  <input
                    type="text"
                    value={formData.subtitle.en}
                    onChange={(e) => setFormData({...formData, subtitle: {...formData.subtitle, en: e.target.value}})}
                    className="w-full px-4 py-3 border border-[#3a3a35]/20 bg-white/50 focus:border-[#c9b896] focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Dates & Location */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-[#3a3a35]/70 mb-2">Dates</label>
                  <input
                    type="text"
                    value={formData.dates}
                    onChange={(e) => setFormData({...formData, dates: e.target.value})}
                    className="w-full px-4 py-3 border border-[#3a3a35]/20 bg-white/50 focus:border-[#c9b896] focus:outline-none"
                    placeholder="29.01 - 02.02"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#3a3a35]/70 mb-2">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="w-full px-4 py-3 border border-[#3a3a35]/20 bg-white/50 focus:border-[#c9b896] focus:outline-none"
                    placeholder="5 days"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#3a3a35]/70 mb-2">Location (RU)</label>
                  <input
                    type="text"
                    value={formData.location.ru}
                    onChange={(e) => setFormData({...formData, location: {...formData.location, ru: e.target.value}})}
                    className="w-full px-4 py-3 border border-[#3a3a35]/20 bg-white/50 focus:border-[#c9b896] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#3a3a35]/70 mb-2">Location (EN)</label>
                  <input
                    type="text"
                    value={formData.location.en}
                    onChange={(e) => setFormData({...formData, location: {...formData.location, en: e.target.value}})}
                    className="w-full px-4 py-3 border border-[#3a3a35]/20 bg-white/50 focus:border-[#c9b896] focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Pricing */}
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm text-[#3a3a35]/70 mb-2">Price</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-4 py-3 border border-[#3a3a35]/20 bg-white/50 focus:border-[#c9b896] focus:outline-none"
                    placeholder="€690"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#3a3a35]/70 mb-2">Early Bird Price</label>
                  <input
                    type="text"
                    value={formData.earlyBirdPrice}
                    onChange={(e) => setFormData({...formData, earlyBirdPrice: e.target.value})}
                    className="w-full px-4 py-3 border border-[#3a3a35]/20 bg-white/50 focus:border-[#c9b896] focus:outline-none"
                    placeholder="€2400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#3a3a35]/70 mb-2">Early Bird Deadline</label>
                  <input
                    type="text"
                    value={formData.earlyBirdDeadline}
                    onChange={(e) => setFormData({...formData, earlyBirdDeadline: e.target.value})}
                    className="w-full px-4 py-3 border border-[#3a3a35]/20 bg-white/50 focus:border-[#c9b896] focus:outline-none"
                    placeholder="20.11.2025"
                  />
                </div>
              </div>

              {/* Pricing Tiers */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm text-[#3a3a35]/70">Pricing Tiers (Optional)</label>
                  <button
                    type="button"
                    onClick={addPricingTier}
                    className="px-3 py-1 text-sm bg-[#c9b896] text-[#3a3a35] hover:bg-[#3a3a35] hover:text-white transition-colors"
                  >
                    + Add Tier
                  </button>
                </div>
                {(formData.pricingTiers || []).map((tier, index) => (
                  <div key={index} className="grid md:grid-cols-2 gap-4 mb-3 p-4 bg-white/30 border border-[#3a3a35]/10">
                    <input
                      type="text"
                      value={tier.deadline}
                      onChange={(e) => updatePricingTier(index, 'deadline', e.target.value)}
                      className="px-4 py-2 border border-[#3a3a35]/20 bg-white/50 focus:border-[#c9b896] focus:outline-none"
                      placeholder="До 20 ноября 2025"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={tier.price}
                        onChange={(e) => updatePricingTier(index, 'price', e.target.value)}
                        className="flex-1 px-4 py-2 border border-[#3a3a35]/20 bg-white/50 focus:border-[#c9b896] focus:outline-none"
                        placeholder="€2400"
                      />
                      <button
                        type="button"
                        onClick={() => removePricingTier(index)}
                        className="px-3 py-2 bg-red-500 text-white hover:bg-red-600 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-[#3a3a35]/70 mb-2">Description (RU)</label>
                  <textarea
                    value={formData.description.ru}
                    onChange={(e) => setFormData({...formData, description: {...formData.description, ru: e.target.value}})}
                    className="w-full px-4 py-3 border border-[#3a3a35]/20 bg-white/50 focus:border-[#c9b896] focus:outline-none h-32"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#3a3a35]/70 mb-2">Description (EN)</label>
                  <textarea
                    value={formData.description.en}
                    onChange={(e) => setFormData({...formData, description: {...formData.description, en: e.target.value}})}
                    className="w-full px-4 py-3 border border-[#3a3a35]/20 bg-white/50 focus:border-[#c9b896] focus:outline-none h-32"
                    required
                  />
                </div>
              </div>

              {/* Image & Misc */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm text-[#3a3a35]/70 mb-2">Upload Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-4 py-3 border border-[#3a3a35]/20 bg-white/50 focus:border-[#c9b896] focus:outline-none file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-[#c9b896] file:text-[#3a3a35] file:cursor-pointer"
                    disabled={uploading}
                  />
                  {uploading && <p className="text-sm text-[#3a3a35]/60 mt-2">Uploading...</p>}
                  {formData.imageUrl && (
                    <div className="mt-3">
                      <p className="text-xs text-[#3a3a35]/60 mb-2">Current image:</p>
                      <img src={formData.imageUrl} alt="Preview" className="w-32 h-32 object-cover border border-[#3a3a35]/10" />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-[#3a3a35]/70 mb-2">Max Participants</label>
                  <input
                    type="number"
                    value={formData.maxParticipants}
                    onChange={(e) => setFormData({...formData, maxParticipants: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 border border-[#3a3a35]/20 bg-white/50 focus:border-[#c9b896] focus:outline-none"
                  />
                </div>
              </div>

              {/* Order & Active */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-[#3a3a35]/70 mb-2">Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 border border-[#3a3a35]/20 bg-white/50 focus:border-[#c9b896] focus:outline-none"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                      className="w-5 h-5"
                    />
                    <span className="text-[#3a3a35]">Active</span>
                  </label>
                </div>
              </div>

              {/* Highlights */}
              <div>
                <label className="block text-sm text-[#3a3a35]/70 mb-3">Highlights</label>
                <div className="space-y-3 mb-3">
                  {formData.highlights.ru.map((item, index) => (
                    <div key={index} className="flex gap-2 items-start p-3 bg-white/30 border border-[#3a3a35]/10">
                      <div className="flex-1">
                        <p className="text-sm text-[#3a3a35]"><strong>RU:</strong> {item}</p>
                        <p className="text-sm text-[#3a3a35] mt-1"><strong>EN:</strong> {formData.highlights.en[index]}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeArrayItem('highlights', 'ru', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={newHighlight.ru}
                    onChange={(e) => setNewHighlight({ ...newHighlight, ru: e.target.value })}
                    className="px-4 py-2 border border-[#3a3a35]/20 bg-white/50 focus:border-[#c9b896] focus:outline-none"
                    placeholder="RU: 16 часов йога-практики"
                  />
                  <input
                    type="text"
                    value={newHighlight.en}
                    onChange={(e) => setNewHighlight({ ...newHighlight, en: e.target.value })}
                    className="px-4 py-2 border border-[#3a3a35]/20 bg-white/50 focus:border-[#c9b896] focus:outline-none"
                    placeholder="EN: 16 hours of yoga practice"
                  />
                </div>
                <button
                  type="button"
                  onClick={addHighlight}
                  className="mt-2 px-4 py-2 bg-[#c9b896] text-[#3a3a35] hover:bg-[#3a3a35] hover:text-white transition-colors text-sm"
                >
                  + Add Highlight
                </button>
              </div>

              {/* Included */}
              <div>
                <label className="block text-sm text-[#3a3a35]/70 mb-3">What's Included</label>
                <div className="space-y-3 mb-3">
                  {formData.included.ru.map((item, index) => (
                    <div key={index} className="flex gap-2 items-start p-3 bg-white/30 border border-[#3a3a35]/10">
                      <div className="flex-1">
                        <p className="text-sm text-[#3a3a35]"><strong>RU:</strong> {item}</p>
                        <p className="text-sm text-[#3a3a35] mt-1"><strong>EN:</strong> {formData.included.en[index]}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeArrayItem('included', 'ru', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={newIncluded.ru}
                    onChange={(e) => setNewIncluded({ ...newIncluded, ru: e.target.value })}
                    className="px-4 py-2 border border-[#3a3a35]/20 bg-white/50 focus:border-[#c9b896] focus:outline-none"
                    placeholder="RU: 3-разовое питание"
                  />
                  <input
                    type="text"
                    value={newIncluded.en}
                    onChange={(e) => setNewIncluded({ ...newIncluded, en: e.target.value })}
                    className="px-4 py-2 border border-[#3a3a35]/20 bg-white/50 focus:border-[#c9b896] focus:outline-none"
                    placeholder="EN: 3 meals a day"
                  />
                </div>
                <button
                  type="button"
                  onClick={addIncluded}
                  className="mt-2 px-4 py-2 bg-[#c9b896] text-[#3a3a35] hover:bg-[#3a3a35] hover:text-white transition-colors text-sm"
                >
                  + Add Included Item
                </button>
              </div>

              {/* Not Included */}
              <div>
                <label className="block text-sm text-[#3a3a35]/70 mb-3">What's Not Included</label>
                <div className="space-y-3 mb-3">
                  {formData.notIncluded.ru.map((item, index) => (
                    <div key={index} className="flex gap-2 items-start p-3 bg-white/30 border border-[#3a3a35]/10">
                      <div className="flex-1">
                        <p className="text-sm text-[#3a3a35]"><strong>RU:</strong> {item}</p>
                        <p className="text-sm text-[#3a3a35] mt-1"><strong>EN:</strong> {formData.notIncluded.en[index]}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeArrayItem('notIncluded', 'ru', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={newNotIncluded.ru}
                    onChange={(e) => setNewNotIncluded({ ...newNotIncluded, ru: e.target.value })}
                    className="px-4 py-2 border border-[#3a3a35]/20 bg-white/50 focus:border-[#c9b896] focus:outline-none"
                    placeholder="RU: Авиабилеты"
                  />
                  <input
                    type="text"
                    value={newNotIncluded.en}
                    onChange={(e) => setNewNotIncluded({ ...newNotIncluded, en: e.target.value })}
                    className="px-4 py-2 border border-[#3a3a35]/20 bg-white/50 focus:border-[#c9b896] focus:outline-none"
                    placeholder="EN: Flight tickets"
                  />
                </div>
                <button
                  type="button"
                  onClick={addNotIncluded}
                  className="mt-2 px-4 py-2 bg-[#c9b896] text-[#3a3a35] hover:bg-[#3a3a35] hover:text-white transition-colors text-sm"
                >
                  + Add Not Included Item
                </button>
              </div>

              {/* Note removed */}
              <div className="bg-[#c9b896]/10 border border-[#c9b896]/20 p-4 text-sm text-[#3a3a35]/70">
                <p>All array fields (Highlights, Included, Not Included) can now be managed directly in this form.</p>
              </div>

              {/* Submit */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#c9b896] text-[#3a3a35] hover:bg-[#3a3a35] hover:text-white transition-colors"
                >
                  {editingId ? 'Update Retreat' : 'Create Retreat'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    resetForm();
                  }}
                  className="px-8 py-3 bg-white text-[#3a3a35] border border-[#3a3a35]/20 hover:border-[#c9b896] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Preview Modal */}
        {showPreview && previewRetreat && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6 overflow-y-auto">
            <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-[#3a3a35]/10 p-4 flex justify-between items-center">
                <h2 className="text-2xl font-light text-[#3a3a35]">Preview: {previewRetreat.title.en}</h2>
                <button
                  onClick={() => {
                    setShowPreview(false);
                    setPreviewRetreat(null);
                  }}
                  className="text-[#3a3a35] hover:text-red-500 text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-8">
                {/* Image */}
                {previewRetreat.imageUrl && (
                  <img src={previewRetreat.imageUrl} alt={previewRetreat.title.en} className="w-full h-96 object-cover mb-6" />
                )}
                
                {/* Title & Subtitle */}
                <h3 className="text-3xl font-light text-[#3a3a35] mb-2">{previewRetreat.title.en}</h3>
                <p className="text-lg text-[#3a3a35]/60 mb-4">{previewRetreat.subtitle.en}</p>
                
                {/* Info Grid */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-[#e8e6e0]">
                    <p className="text-xs uppercase text-[#3a3a35]/60 mb-1">Dates</p>
                    <p className="text-[#3a3a35]">{previewRetreat.dates}</p>
                  </div>
                  <div className="p-4 bg-[#e8e6e0]">
                    <p className="text-xs uppercase text-[#3a3a35]/60 mb-1">Duration</p>
                    <p className="text-[#3a3a35]">{previewRetreat.duration}</p>
                  </div>
                  <div className="p-4 bg-[#e8e6e0]">
                    <p className="text-xs uppercase text-[#3a3a35]/60 mb-1">Location</p>
                    <p className="text-[#3a3a35]">{previewRetreat.location.en}</p>
                  </div>
                </div>
                
                {/* Price */}
                <div className="mb-6 p-6 bg-[#c9b896]/10 border border-[#c9b896]/20">
                  <p className="text-2xl font-light text-[#3a3a35] mb-3">{previewRetreat.price}</p>
                  {previewRetreat.pricingTiers && previewRetreat.pricingTiers.length > 0 && (
                    <div className="space-y-2">
                      {previewRetreat.pricingTiers.map((tier, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-[#3a3a35]/70">{tier.deadline}</span>
                          <span className="text-[#3a3a35] font-medium">{tier.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Description */}
                <p className="text-[#3a3a35]/80 mb-6 leading-relaxed">{previewRetreat.description.en}</p>
                
                {/* Highlights */}
                {previewRetreat.highlights.en.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-xl font-light text-[#3a3a35] mb-3">Highlights</h4>
                    <ul className="space-y-2">
                      {previewRetreat.highlights.en.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-[#c9b896]">•</span>
                          <span className="text-[#3a3a35]/70">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Included */}
                {previewRetreat.included.en.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-xl font-light text-[#3a3a35] mb-3">What's Included</h4>
                    <ul className="space-y-2">
                      {previewRetreat.included.en.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-600">✓</span>
                          <span className="text-[#3a3a35]/70">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Not Included */}
                {previewRetreat.notIncluded.en.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-xl font-light text-[#3a3a35] mb-3">What's Not Included</h4>
                    <ul className="space-y-2">
                      {previewRetreat.notIncluded.en.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-red-500">✗</span>
                          <span className="text-[#3a3a35]/70">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

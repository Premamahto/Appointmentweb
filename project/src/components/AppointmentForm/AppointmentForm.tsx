import React from 'react';
import { User, Mail, Phone, Clock } from 'lucide-react';

interface AppointmentFormProps {
  onSubmit: (data: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    notes?: string;
  }) => void;
}

export function AppointmentForm({ onSubmit }: AppointmentFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    onSubmit({
      customerName: formData.get('customerName') as string,
      customerEmail: formData.get('customerEmail') as string,
      customerPhone: formData.get('customerPhone') as string,
      notes: formData.get('notes') as string,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Book Appointment</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name
            </div>
          </label>
          <input
            type="text"
            name="customerName"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </div>
          </label>
          <input
            type="email"
            name="customerEmail"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone Number
            </div>
          </label>
          <input
            type="tel"
            name="customerPhone"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Additional Notes
            </div>
          </label>
          <textarea
            name="notes"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Schedule Appointment
        </button>
      </div>
    </form>
  );
}
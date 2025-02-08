import React, { useState } from 'react';
import { Calendar } from './components/Calendar/Calendar';
import { AppointmentForm } from './components/AppointmentForm/AppointmentForm';
import { TimeSlot } from './types';

function App() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // Mock data for available time slots
  const availableSlots: TimeSlot[] = [
    {
      startTime: new Date(2024, 2, 20, 9, 0),
      endTime: new Date(2024, 2, 20, 10, 0),
      isAvailable: true,
    },
    {
      startTime: new Date(2024, 2, 20, 10, 0),
      endTime: new Date(2024, 2, 20, 11, 0),
      isAvailable: true,
    },
    {
      startTime: new Date(2024, 2, 20, 11, 0),
      endTime: new Date(2024, 2, 20, 12, 0),
      isAvailable: false,
    },
  ];

  const handleAppointmentSubmit = (formData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    notes?: string;
  }) => {
    console.log('Appointment data:', formData);
    // This will be connected to the backend later
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Appointment Scheduler</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            availableSlots={availableSlots}
          />
          <AppointmentForm onSubmit={handleAppointmentSubmit} />
        </div>
      </main>
    </div>
  );
}

export default App;
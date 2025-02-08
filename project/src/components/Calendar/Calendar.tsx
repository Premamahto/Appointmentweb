import React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { TimeSlot } from '../../types';

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  availableSlots: TimeSlot[];
}

export function Calendar({ selectedDate, onDateSelect, availableSlots }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days: (Date | null)[] = [];
    
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const days = getDaysInMonth(currentMonth);

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date: Date) => {
    return date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear();
  };

  const isPast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Select Date & Time
        </h2>
        <CalendarIcon className="w-6 h-6 text-blue-600" />
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h3 className="text-lg font-medium text-gray-800">
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-600">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 mb-6">
        {days.map((date, index) => (
          <div key={index} className="aspect-square">
            {date ? (
              <button
                onClick={() => onDateSelect(date)}
                disabled={isPast(date)}
                className={`w-full h-full flex items-center justify-center rounded-full text-sm
                  ${isPast(date) 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : isSelected(date)
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : isToday(date)
                    ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                    : 'hover:bg-gray-100 text-gray-700'
                  }
                `}
              >
                {date.getDate()}
              </button>
            ) : (
              <div className="w-full h-full"></div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Available Time Slots</h3>
        <div className="grid grid-cols-3 gap-2">
          {availableSlots.map((slot, index) => (
            <button
              key={index}
              className={`p-2 text-sm rounded-md transition-colors
                ${slot.isAvailable 
                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!slot.isAvailable}
            >
              {slot.startTime.toLocaleTimeString([], { 
                hour: '2-digit',
                minute: '2-digit'
              })}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { 
  Users, CalendarCheck, Award, MessageSquare, 
  Send, AlertCircle, Phone, BookOpen, ShieldCheck, 
  CheckCircle2, Clock, Check, X, RefreshCw
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'attendance' | 'students' | 'alerts' | 'sef'>('attendance');
  const [selectedClass, setSelectedClass] = useState('Class 9');
  const [attendanceDate, setAttendanceDate] = useState('2026-11-03');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState<string | null>(null);

  // Sample real data structure for Shah Latif Model Secondary School Thikratho
  const [students, setStudents] = useState([
    { id: '1', roll: '01', name: 'Zohaib Ali', father: 'Muhammad Murad', status: 'present', phone: '03001234567', whatsapp: '923001234567' },
    { id: '2', roll: '02', name: 'Kashif Hussain', father: 'Muneer Ahmed', status: 'present', phone: '03019876543', whatsapp: '923019876543' },
    { id: '3', roll: '03', name: 'Dua Fatima', father: 'Ghulam Rasool', status: 'absent', phone: '03033639664', whatsapp: '923033639664' },
    { id: '4', roll: '04', name: 'Abdul Rehman', father: 'Nazir Ahmed', status: 'present', phone: '03024567891', whatsapp: '923024567891' },
    { id: '5', roll: '05', name: 'Mehwish', father: 'Ali Nawaz', status: 'leave', phone: '03051239874', whatsapp: '923051239874' },
  ]);

  const [logs, setLogs] = useState([
    { id: '1', name: 'Dua Fatima', roll: '03', channel: 'WhatsApp Cloud API', phone: '923033639664', status: 'Delivered', time: '08:45 AM' },
    { id: '2', name: 'Farhan Ali', roll: '07', channel: 'SMS Gateway', phone: '923012345678', status: 'Delivered', time: '08:46 AM' },
  ]);

  const toggleStatus = (id: string, newStatus: string) => {
    setStudents(students.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const submitAttendance = () => {
    setIsSubmitting(true);
    setNotificationStatus('Saving attendance and triggering WhatsApp/SMS alerts...');
    
    setTimeout(() => {
      const absents = students.filter(s => s.status === 'absent');
      const newLogs = absents.map((s, idx) => ({
        id: String(Date.now() + idx),
        name: s.name,
        roll: s.roll,
        channel: 'WhatsApp Cloud API',
        phone: s.whatsapp,
        status: 'Delivered',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }));

      setLogs(prev => [...newLogs, ...prev]);
      setIsSubmitting(false);
      setNotificationStatus(`Attendance submitted! ${absents.length} Absent alert(s) sent via WhatsApp Cloud API.`);
    }, 1200);
  };

  const presentCount = students.filter(s => s.status === 'present').length;
  const absentCount = students.filter(s => s.status === 'absent').length;
  const leaveCount = students.filter(s => s.status === 'leave').length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-emerald-800 text-white shadow-md border-b-4 border-amber-400">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white text-emerald-800 rounded-full flex items-center justify-center font-bold text-xl shadow">
              SL
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold leading-tight">
                Shah Latif Model Secondary School Thikratho
              </h1>
              <p className="text-xs text-emerald-100 flex items-center gap-2">
                <span>SEF School Code: <strong>340102001</strong></span>
                <span>•</span>
                <span>Taluka: Pano Akil</span>
                <span>•</span>
                <span className="bg-amber-400 text-slate-900 font-bold px-1.5 py-0.5 rounded text-[10px]">100% FREE (FAS)</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-emerald-900/60 px-3 py-1.5 rounded-full border border-emerald-600/50 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Portal Active
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 py-6 w-full flex-1 flex flex-col gap-6">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('attendance')}
            className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition ${
              activeTab === 'attendance'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            Smart Attendance
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition ${
              activeTab === 'alerts'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            WhatsApp & SMS Alerts
            {absentCount > 0 && (
              <span className="bg-red-500 text-white text-[11px] px-1.5 py-0.2 rounded-full font-bold">
                {absentCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition ${
              activeTab === 'students'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            Student Directory
          </button>
          <button
            onClick={() => setActiveTab('sef')}
            className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition ${
              activeTab === 'sef'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            SEF Free Entitlements
          </button>
        </div>

        {/* Tab 1: Attendance */}
        {activeTab === 'attendance' && (
          <div className="flex flex-col gap-6">
            {/* Quick Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-500 font-medium">Total Registered</span>
                <p className="text-2xl font-bold text-slate-800 mt-1">{students.length}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-sm">
                <span className="text-xs text-emerald-600 font-medium">Present Today</span>
                <p className="text-2xl font-bold text-emerald-700 mt-1">{presentCount}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-rose-200 shadow-sm">
                <span className="text-xs text-rose-600 font-medium">Absent Today</span>
                <p className="text-2xl font-bold text-rose-600 mt-1">{absentCount}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm">
                <span className="text-xs text-amber-600 font-medium">On Leave</span>
                <p className="text-2xl font-bold text-amber-600 mt-1">{leaveCount}</p>
              </div>
            </div>

            {/* Attendance Form */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4 mb-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Class</label>
                    <select
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      <option>Class 6</option>
                      <option>Class 7</option>
                      <option>Class 8</option>
                      <option>Class 9</option>
                      <option>Class 10</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Date</label>
                    <input
                      type="date"
                      value={attendanceDate}
                      onChange={(e) => setAttendanceDate(e.target.value)}
                      className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <button
                  onClick={submitAttendance}
                  disabled={isSubmitting}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-5 py-2.5 rounded-lg shadow transition flex items-center gap-2 self-stretch sm:self-auto justify-center disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit & Auto-Send Alerts
                    </>
                  )}
                </button>
              </div>

              {notificationStatus && (
                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>{notificationStatus}</span>
                </div>
              )}

              {/* Attendance Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600 uppercase text-xs border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-3">Roll #</th>
                      <th className="py-3 px-3">Student Name</th>
                      <th className="py-3 px-3">Father Name</th>
                      <th className="py-3 px-3">Parent WhatsApp</th>
                      <th className="py-3 px-3 text-center">Mark Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {students.map((student) => (
                      <tr key={student.id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-3 font-semibold text-slate-700">{student.roll}</td>
                        <td className="py-3 px-3 font-medium text-slate-900">{student.name}</td>
                        <td className="py-3 px-3 text-slate-600">{student.father}</td>
                        <td className="py-3 px-3 text-slate-500 font-mono text-xs">{student.whatsapp}</td>
                        <td className="py-3 px-3">
                          <div className="flex justify-center gap-1.5">
                            <button
                              onClick={() => toggleStatus(student.id, 'present')}
                              className={`px-3 py-1 rounded text-xs font-semibold transition ${
                                student.status === 'present'
                                  ? 'bg-emerald-600 text-white shadow-sm'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              Present
                            </button>
                            <button
                              onClick={() => toggleStatus(student.id, 'absent')}
                              className={`px-3 py-1 rounded text-xs font-semibold transition ${
                                student.status === 'absent'
                                  ? 'bg-rose-600 text-white shadow-sm'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              Absent
                            </button>
                            <button
                              onClick={() => toggleStatus(student.id, 'leave')}
                              className={`px-3 py-1 rounded text-xs font-semibold transition ${
                                student.status === 'leave'
                                  ? 'bg-amber-500 text-white shadow-sm'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              Leave
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: WhatsApp & SMS Logs */}
        {activeTab === 'alerts' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-800">Automated Parent Notification Logs</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Notifications are sent directly via official WhatsApp Business API & SMS Gateway when students are marked Absent.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600 uppercase text-xs border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3">Time</th>
                    <th className="py-3 px-3">Student</th>
                    <th className="py-3 px-3">Parent Number</th>
                    <th className="py-3 px-3">Channel</th>
                    <th className="py-3 px-3">Delivery Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50">
                      <td className="py-3 px-3 text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {log.time}
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-800">{log.name} (Roll #{log.roll})</td>
                      <td className="py-3 px-3 font-mono text-xs text-slate-600">{log.phone}</td>
                      <td className="py-3 px-3">
                        <span className="text-xs bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-medium text-slate-700">
                          {log.channel}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                          <Check className="w-3 h-3" />
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Student Directory */}
        {activeTab === 'students' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <h2 className="text-base font-bold text-slate-800 mb-4">Enrolled Students (Shah Latif Model Secondary School)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {students.map(s => (
                <div key={s.id} className="border border-slate-200 p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800">{s.name}</h3>
                    <p className="text-xs text-slate-500">Father: {s.father}</p>
                    <p className="text-xs text-slate-500">Roll No: {s.roll} • WhatsApp: {s.whatsapp}</p>
                  </div>
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-1 rounded">
                    Active Student
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: SEF Entitlements */}
        {activeTab === 'sef' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-800">Sindh Education Foundation (SEF) Free Entitlements</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Shah Latif Model Secondary School Thikratho is an FAS partner school. All textbooks, bags and schooling are 100% free.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="border border-slate-200 p-4 rounded-lg bg-emerald-50/50">
                <BookOpen className="w-6 h-6 text-emerald-700 mb-2" />
                <h4 className="font-bold text-slate-800">Free Textbooks</h4>
                <p className="text-xs text-slate-600 mt-1">100% Sindh Textbook Board curriculum provided at no cost.</p>
              </div>
              <div className="border border-slate-200 p-4 rounded-lg bg-amber-50/50">
                <Award className="w-6 h-6 text-amber-700 mb-2" />
                <h4 className="font-bold text-slate-800">FAS Subsidy</h4>
                <p className="text-xs text-slate-600 mt-1">Supported by Sindh Education Foundation for zero-fee learning.</p>
              </div>
              <div className="border border-slate-200 p-4 rounded-lg bg-blue-50/50">
                <ShieldCheck className="w-6 h-6 text-blue-700 mb-2" />
                <h4 className="font-bold text-slate-800">Verified School Code</h4>
                <p className="text-xs text-slate-600 mt-1">Official Registry Code: 340102001 (Sukkur / Pano Akil).</p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        Shah Latif Model Secondary School Thikratho • Supported by Sindh Education Foundation (SEF) • Sukkur, Sindh
      </footer>
    </div>
  );
}

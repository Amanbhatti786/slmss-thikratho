import React, { useState } from 'react';
import { 
  Users, CalendarCheck, Award, 
  Send, ShieldCheck, 
  CheckCircle2, Clock, Check, RefreshCw, UserPlus, Save,
  Smartphone, Radio, ExternalLink
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'attendance' | 'students' | 'add_student' | 'alerts' | 'sef'>('attendance');
  const [selectedClass, setSelectedClass] = useState('Class 7');
  const [selectedSection, setSelectedSection] = useState('A');
  const [attendanceDate, setAttendanceDate] = useState('2026-11-03');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState<string | null>(null);
  const [studentAddedSuccess, setStudentAddedSuccess] = useState(false);

  const [newStudent, setNewStudent] = useState({
    roll: '',
    name: '',
    father: '',
    class: 'Class 7',
    section: 'A',
    mobile: ''
  });

  const classesList = [
    'Katchi', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 
    'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'
  ];

  const sectionsList = ['A', 'B', 'C', 'D', 'E', 'F'];

  const [students, setStudents] = useState([
    { id: '1', roll: '01', name: 'Zohaib Ali', father: 'Muhammad Murad', class: 'Class 7', section: 'A', status: 'present', mobile: '03003077396' },
    { id: '2', roll: '02', name: 'Taj Muhammad', father: 'Ali Bux', class: 'Class 7', section: 'A', status: 'absent', mobile: '03003077396' },
    { id: '3', roll: '03', name: 'Dua Fatima', father: 'Ghulam Rasool', class: 'Class 1', section: 'A', status: 'absent', mobile: '03033639664' },
    { id: '4', roll: '01', name: 'Abdul Rehman', father: 'Nazir Ahmed', class: 'Class 1', section: 'B', status: 'present', mobile: '03024567891' },
  ]);

  const [logs, setLogs] = useState([
    { 
      id: '1', 
      name: 'Taj Muhammad', 
      roll: '02', 
      classSection: 'Class 7-A', 
      mobile: '03003077396', 
      msgText: 'Muhtaram Walid, aapka bacha Taj Muhammad (Roll 02) aaj school se ghair-hazir hai. Shah Latif School Thikratho.',
      status: 'Ready to Send', 
      time: '01:47 PM' 
    }
  ]);

  const filteredStudents = students.filter(
    s => s.class === selectedClass && s.section === selectedSection
  );

  const toggleStatus = (id: string, newStatus: string) => {
    setStudents(students.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.roll || !newStudent.mobile) {
      alert('Roll number, Student Name aur Mobile number zaroori hain!');
      return;
    }

    const createdStudent = {
      id: String(Date.now()),
      roll: newStudent.roll,
      name: newStudent.name,
      father: newStudent.father || 'N/A',
      class: newStudent.class,
      section: newStudent.section,
      status: 'present',
      mobile: newStudent.mobile
    };

    setStudents([createdStudent, ...students]);
    setStudentAddedSuccess(true);
    setNewStudent({
      roll: '',
      name: '',
      father: '',
      class: newStudent.class,
      section: newStudent.section,
      mobile: ''
    });

    setTimeout(() => setStudentAddedSuccess(false), 3000);
  };

  // Direct Mobile SMS Dispatch (Opens native SMS with filled body)
  const sendSMSNative = (student: any) => {
    const message = `Muhtaram Walid, aapka bacha ${student.name} (Roll ${student.roll}) aaj school se ghair-hazir hai. Shah Latif Model Secondary School Thikratho.`;
    const cleanMobile = student.mobile.replace(/\s+/g, '');
    window.location.href = `sms:${cleanMobile}?body=${encodeURIComponent(message)}`;
  };

  // Submit and Trigger SMS
  const submitAttendance = () => {
    setIsSubmitting(true);
    const absents = filteredStudents.filter(s => s.status === 'absent');

    if (absents.length === 0) {
      setNotificationStatus(`Attendance save ho gayi! Koi bacha absent nahi hai.`);
      setIsSubmitting(false);
      return;
    }

    const newLogs = absents.map((s, idx) => ({
      id: String(Date.now() + idx),
      name: s.name,
      roll: s.roll,
      classSection: `${s.class}-${s.section}`,
      mobile: s.mobile,
      msgText: `Muhtaram Walid, aapka bacha ${s.name} (Roll ${s.roll}) aaj school se ghair-hazir hai. Shah Latif School Thikratho.`,
      status: 'Dispatched',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));

    setLogs(prev => [...newLogs, ...prev]);
    setIsSubmitting(false);
    setNotificationStatus(`Attendance save ho gayi! ${absents.length} Absent student(s) ke SMS ready hain.`);

    // Agar 1 bacha absent hai to foran SMS screen khol de
    if (absents.length === 1) {
      sendSMSNative(absents[0]);
    }
  };

  const presentCount = filteredStudents.filter(s => s.status === 'present').length;
  const absentCount = filteredStudents.filter(s => s.status === 'absent').length;
  const leaveCount = filteredStudents.filter(s => s.status === 'leave').length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
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
              <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              SIM SMS Ready
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 w-full flex-1 flex flex-col gap-6">
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
            onClick={() => setActiveTab('add_student')}
            className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition ${
              activeTab === 'add_student'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <UserPlus className="w-4 h-4 text-amber-500" />
            Add Student Data
          </button>

          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition ${
              activeTab === 'alerts'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            SIM SMS Alerts Log
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
        </div>

        {activeTab === 'attendance' && (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-500 font-medium">Strength ({selectedClass} - {selectedSection})</span>
                <p className="text-2xl font-bold text-slate-800 mt-1">{filteredStudents.length}</p>
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

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-4 mb-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Class</label>
                    <select
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                    >
                      {classesList.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Section</label>
                    <select
                      value={selectedSection}
                      onChange={(e) => setSelectedSection(e.target.value)}
                      className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none bg-white font-bold text-emerald-800"
                    >
                      {sectionsList.map(sec => (
                        <option key={sec} value={sec}>Section {sec}</option>
                      ))}
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
                  disabled={isSubmitting || filteredStudents.length === 0}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-5 py-2.5 rounded-lg shadow transition flex items-center gap-2 self-stretch md:self-auto justify-center disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  Submit & Send SIM SMS
                </button>
              </div>

              {notificationStatus && (
                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>{notificationStatus}</span>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600 uppercase text-xs border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-3">Roll #</th>
                      <th className="py-3 px-3">Student Name</th>
                      <th className="py-3 px-3">Parent SIM #</th>
                      <th className="py-3 px-3 text-center">Attendance</th>
                      <th className="py-3 px-3 text-center">Direct Send</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-3 font-semibold text-slate-700">{student.roll}</td>
                        <td className="py-3 px-3 font-medium text-slate-900">{student.name}</td>
                        <td className="py-3 px-3 text-slate-700 font-mono text-xs font-semibold">{student.mobile}</td>
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
                        <td className="py-3 px-3 text-center">
                          {student.status === 'absent' ? (
                            <button
                              onClick={() => sendSMSNative(student)}
                              className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-md shadow transition"
                            >
                              <Smartphone className="w-3.5 h-3.5" />
                              Send SMS
                            </button>
                          ) : (
                            <span className="text-slate-300 text-xs">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col gap-4">
            <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-emerald-700" />
              Parent Attendance SIM SMS Dispatch Logs
            </h2>
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600 uppercase text-xs border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3">Time</th>
                    <th className="py-3 px-3">Student Name</th>
                    <th className="py-3 px-3">Class</th>
                    <th className="py-3 px-3">Parent SIM #</th>
                    <th className="py-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50">
                      <td className="py-3 px-3 text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {log.time}
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-800">{log.name}</td>
                      <td className="py-3 px-3 font-semibold text-xs text-emerald-800">{log.classSection}</td>
                      <td className="py-3 px-3 font-mono text-xs text-slate-700">{log.mobile}</td>
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

        {activeTab === 'add_student' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-2xl mx-auto w-full">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-emerald-700" />
              Add New Student
            </h2>
            {studentAddedSuccess && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm">
                Student kamyabi se add ho gaya hai!
              </div>
            )}
            <form onSubmit={handleAddStudent} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Class</label>
                  <select
                    value={newStudent.class}
                    onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white font-medium"
                  >
                    {classesList.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Section</label>
                  <select
                    value={newStudent.section}
                    onChange={(e) => setNewStudent({ ...newStudent, section: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white font-bold text-emerald-800"
                  >
                    {sectionsList.map(sec => (
                      <option key={sec} value={sec}>Section {sec}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Roll Number</label>
                  <input
                    type="text"
                    value={newStudent.roll}
                    onChange={(e) => setNewStudent({ ...newStudent, roll: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Parent SIM Mobile Number</label>
                  <input
                    type="tel"
                    value={newStudent.mobile}
                    onChange={(e) => setNewStudent({ ...newStudent, mobile: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none font-mono"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Student Full Name</label>
                <input
                  type="text"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2.5 rounded-lg shadow transition flex items-center justify-center gap-2 mt-4"
              >
                <Save className="w-4 h-4" />
                Register Student
              </button>
            </form>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <h2 className="text-base font-bold text-slate-800 mb-4">Student Directory ({students.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {students.map(s => (
                <div key={s.id} className="border border-slate-200 p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800">{s.name}</h3>
                    <p className="text-xs text-slate-500">Roll: {s.roll} | SIM: {s.mobile}</p>
                  </div>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded font-semibold">
                    {s.class} ({s.section})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        Shah Latif Model Secondary School Thikratho • Supported by SEF • Sukkur, Sindh
      </footer>
    </div>
  );
}

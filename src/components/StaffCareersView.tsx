import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Briefcase, 
  Clock, 
  GraduationCap, 
  Mail, 
  ShieldCheck, 
  FileText, 
  Upload, 
  CheckCircle2, 
  UserCheck, 
  SlidersHorizontal,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { StaffRole, JobOpening } from '../types/mall';
import { INITIAL_STAFF_ROLES } from '../data/staffData';
import { INITIAL_JOBS } from '../data/jobsData';

export const StaffCareersView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'staff' | 'careers'>('staff');
  const [staffRoles, setStaffRoles] = useState<StaffRole[]>(INITIAL_STAFF_ROLES);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('ALL');
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);

  // Application form modal state
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [resumeFileName, setResumeFileName] = useState('');
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  // Departments list
  const departments = useMemo(() => {
    const set = new Set<string>();
    staffRoles.forEach((r) => set.add(r.department));
    return ['ALL', ...Array.from(set)];
  }, [staffRoles]);

  const filteredStaff = useMemo(() => {
    return staffRoles.filter(
      (r) => selectedDepartment === 'ALL' || r.department === selectedDepartment
    );
  }, [staffRoles, selectedDepartment]);

  const filteredJobs = useMemo(() => {
    return INITIAL_JOBS.filter(
      (j) => selectedDepartment === 'ALL' || j.department === selectedDepartment
    );
  }, [selectedDepartment]);

  const handleUpdateHeadcount = (roleId: string, delta: number) => {
    setStaffRoles((prev) =>
      prev.map((role) =>
        role.id === roleId
          ? { ...role, currentStaffed: Math.max(0, role.currentStaffed + delta) }
          : role
      )
    );
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail) {
      alert('Please fill in your name and email address.');
      return;
    }
    setApplicationSuccess(true);
    setTimeout(() => {
      setApplicationSuccess(false);
      setSelectedJob(null);
      setApplicantName('');
      setApplicantEmail('');
      setApplicantPhone('');
      setResumeFileName('');
    }, 2800);
  };

  return (
    <div className="w-full space-y-8">
      {/* Banner */}
      <div className="relative rounded-3xl bg-[#0B192C] text-white p-8 md:p-12 overflow-hidden shadow-xl border border-slate-800">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wide uppercase">
            <Users className="w-3.5 h-3.5" />
            Human Capital & Talent
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-cinzel">
            Staff Directory & Careers
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Discover the operational hierarchy, security command structure, and facility engineering teams powering Smart Mall, or explore executive career opportunities to join our team.
          </p>
        </div>
      </div>

      {/* Main Mode Toggle: Staff Directory vs Career Openings */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('staff')}
            className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'staff'
                ? 'bg-[#0B192C] text-amber-400 shadow-md ring-2 ring-amber-500/30'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Staff Directory & Roles ({staffRoles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('careers')}
            className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'careers'
                ? 'bg-[#0B192C] text-amber-400 shadow-md ring-2 ring-amber-500/30'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Open Careers & Jobs ({INITIAL_JOBS.length})</span>
          </button>
        </div>

        {/* Department Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDepartment(dept)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedDepartment === dept
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: STAFF DIRECTORY */}
      {activeTab === 'staff' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              Displaying <strong>{filteredStaff.length}</strong> operational staff roles
            </span>
            <span className="text-slate-400">
              Internal demo profiles • Private contact details protected
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredStaff.map((role) => (
              <div
                key={role.id}
                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between space-y-4 hover:border-amber-400/80 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
                      {role.department}
                    </span>
                    <span className="text-xs text-slate-400">Reports to: <strong>{role.reportingManager}</strong></span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 font-cinzel mb-2">
                    {role.title}
                  </h3>

                  {/* Core Responsibilities */}
                  <div className="space-y-1.5 mb-4">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block font-mono">
                      Core Responsibilities:
                    </span>
                    {role.responsibilities.map((resp, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{resp}</span>
                      </div>
                    ))}
                  </div>

                  {/* Qualifications & Shift */}
                  <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 mb-3">
                    <div className="flex items-start gap-2">
                      <GraduationCap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span><strong>Qualifications:</strong> {role.qualifications}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                      <span><strong>Shift Schedule:</strong> {role.shift}</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 italic">
                    <strong>Mandatory Training:</strong> {role.trainingRequirements}
                  </div>
                </div>

                {/* Headcount Planner */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-50 -mx-6 -mb-6 p-4 rounded-b-3xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-medium">Headcount:</span>
                    <span className="font-mono font-bold text-xs text-slate-900">
                      {role.currentStaffed} / {role.headcountNeeded} staffed
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleUpdateHeadcount(role.id, -1)}
                      className="w-7 h-7 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center text-xs"
                      title="Decrease staffed count"
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleUpdateHeadcount(role.id, 1)}
                      className="w-7 h-7 rounded-lg bg-[#0B192C] text-amber-400 font-bold hover:bg-slate-800 flex items-center justify-center text-xs"
                      title="Increase staffed count"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CAREERS & RECRUITMENT */}
      {activeTab === 'careers' && (
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl font-bold text-slate-900 font-cinzel">
              Build Your Career at Smart Mall
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              We offer competitive compensation, comprehensive health benefits, continuing education allowances, and clear promotion pathways within a globally recognized commercial destination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {job.type}
                    </span>
                    <span className="text-[10px] text-slate-400">Posted {job.postedDate}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-cinzel">{job.title}</h3>
                  <div className="text-xs font-semibold text-slate-500">{job.department}</div>
                  <div className="text-xs font-mono font-bold text-amber-700">{job.salaryRange}</div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {job.description}
                  </p>

                  <div className="space-y-1 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block font-mono">
                      Key Qualifications:
                    </span>
                    {job.requirements.slice(0, 2).map((r, i) => (
                      <div key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedJob(job)}
                  className="w-full py-2.5 rounded-xl bg-[#0B192C] text-amber-400 text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Apply for Position</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Job Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-200 relative animate-fade-in space-y-5">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 text-sm font-bold w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
            >
              ✕
            </button>

            {applicationSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-cinzel">Application Received</h3>
                <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                  Thank you, {applicantName}. Your application for <strong>{selectedJob.title}</strong> has been logged into our Human Resources talent portal. Our team will review your credentials within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {selectedJob.department}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-2 font-cinzel">
                    Apply: {selectedJob.title}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedJob.salaryRange} • {selectedJob.type}</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Full Legal Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alexander Vance"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="alexander@example.com"
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Contact Phone</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    />
                  </div>

                  {/* Resume Upload Mock */}
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Curriculum Vitae / Resume</label>
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center cursor-pointer hover:border-amber-400 transition-colors">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setResumeFileName(e.target.files[0].name);
                          }
                        }}
                        className="hidden"
                        id="resumeUpload"
                      />
                      <label htmlFor="resumeUpload" className="cursor-pointer">
                        <Upload className="w-5 h-5 mx-auto text-slate-400 mb-1" />
                        <span className="text-xs font-semibold text-amber-700 block">
                          {resumeFileName ? resumeFileName : 'Upload PDF or DOC (Max 5MB)'}
                        </span>
                        <span className="text-[10px] text-slate-400">Click to browse your device</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#0B192C] text-amber-400 text-xs font-semibold hover:bg-slate-800 transition-colors"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

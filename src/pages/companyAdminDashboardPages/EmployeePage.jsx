import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../redux/slices/employeeSlice";
import { useEmployeeExcel } from "../../Hooks/useEmployeeExcel";
import { addEmployee } from "../../redux/api/employeeApi";
import EmployeeList from "../../components/EmployeesUpload/EmployeeList";
import UploadPreview from "../../components/EmployeesUpload/UploadPreview";
import AddEmployeeModal from "../../components/EmployeesUpload/AddEmployeeModal";
import Pagination from "../../components/EmployeesPagination";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Search,
  UserPlus,
  Download,
  Users,
  Menu,
  Loader2,
  X,
  UploadCloud,
} from "lucide-react";

// (SidebarContent remains exactly the same as previous)
const SidebarContent = ({
  searchTerm,
  setSearchTerm,
  onAddClick,
  downloadTemplate,
  downloadingTemplate,
  fileRef,
  totalRecords,
  isPreviewMode,
}) => (
  /* ... Paste Sidebar code here ... */
  <div className="flex flex-col h-full bg-[#050505] border-r border-white/5">
    <div className="p-4 space-y-6 flex-1 overflow-y-auto">
      {!isPreviewMode && (
        <div className="space-y-3 sidebar-item">
          <div className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest pl-1 mb-2">
            Control Center
          </div>

          <div className="relative group">
            <Search
              size={12}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-white transition-colors"
            />
            <input
              type="text"
              placeholder="Search database..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-neutral-800 rounded-md pl-9 pr-3 py-2 text-[11px] text-white focus:border-neutral-600 outline-none transition-all placeholder-neutral-700 font-medium"
            />
          </div>
          {/* ... Rest of Sidebar ... */}
          <button
            onClick={onAddClick}
            className="w-full py-2.5 bg-white text-black text-[10px] font-bold uppercase tracking-wider rounded-md hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            <UserPlus size={12} /> Add Member
          </button>
          {/* ... Bulk Actions, System Status ... */}
          <div className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest pl-1 pt-3 pb-1">
            Bulk Actions
          </div>
          <div className="space-y-2">
            <button
              onClick={downloadTemplate}
              disabled={downloadingTemplate}
              className="w-full flex items-center justify-between px-3 py-2.5 bg-[#0A0A0A] border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-900 rounded-md text-[11px] text-neutral-400 hover:text-white transition-all group"
            >
              <span className="flex items-center gap-2">
                <Download
                  size={12}
                  className="group-hover:text-blue-400 transition-colors"
                />
                <span className="font-medium">Download Template</span>
              </span>
              {downloadingTemplate && (
                <Loader2 size={11} className="animate-spin" />
              )}
            </button>
            <button
              onClick={() => fileRef.current?.click()}
              className="w-full flex items-center justify-between px-3 py-2.5 bg-[#0A0A0A] border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-900 rounded-md text-[11px] text-neutral-400 hover:text-white transition-all group"
            >
              <span className="flex items-center gap-2">
                <UploadCloud
                  size={12}
                  className="group-hover:text-emerald-400 transition-colors"
                />
                <span className="font-medium">Bulk Upload</span>
              </span>
              <span className="text-[9px] text-neutral-600 font-mono">
                .XLSX
              </span>
            </button>
          </div>
        </div>
      )}
      <div className="sidebar-item pt-2">
        <div className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest pl-1 mb-3">
          System Status
        </div>
        <div className="p-4 bg-gradient-to-b from-[#0A0A0A] to-[#050505] border border-neutral-800 rounded-lg relative overflow-hidden group hover:border-neutral-700 transition-colors">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users size={40} />
          </div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-1.5 bg-neutral-900 rounded border border-neutral-800 text-neutral-400">
              <Users size={12} />
            </div>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <div className="text-2xl font-light text-white tracking-tighter relative z-10">
            {totalRecords}
          </div>
          <div className="text-[10px] text-neutral-500 font-mono relative z-10">
            Active Personnel
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function EmployeesPage() {
  const dispatch = useDispatch();
  const { list, loading, totalRecords } = useSelector((s) => s.employees);
  const containerRef = useRef(null);

  const [page, setPage] = useState(1);
  const PAGE_SIZE = 12;

  const [searchTerm, setSearchTerm] = useState("");
  // 🟢 Debounced Term State
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // 🟢 Debounce Logic: Update 'debouncedSearch' 500ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      // Reset to page 1 when search changes to avoid empty pages
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const {
    fileRef,
    preview,
    notification,
    uploading,
    downloadingTemplate,
    handleExcelUpload,
    confirmUpload,
    downloadTemplate,
    cancelUpload,
    setNotification,
  } = useEmployeeExcel(() =>
    dispatch(
      fetchEmployees({ page, pageSize: PAGE_SIZE, search: debouncedSearch })
    )
  );

  const isPreviewMode = preview.length > 0;

  // 🟢 Effect: Fetch Data whenever Page OR Search changes
  useEffect(() => {
    dispatch(
      fetchEmployees({
        page,
        pageSize: PAGE_SIZE,
        search: debouncedSearch, // Pass the search term
      })
    );
  }, [dispatch, page, debouncedSearch]);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".sidebar-item",
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, stagger: 0.05, duration: 0.3, ease: "power2.out" }
      );
      tl.fromTo(
        ".content-entry",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        "-=0.2"
      );
    },
    { scope: containerRef, dependencies: [list, isPreviewMode] }
  );

  // 🟢 Removed 'filteredList' (The backend now does the filtering)
  const displayList = list;

  const handleManualAdd = async (formData) => {
    setIsAdding(true);
    try {
      await addEmployee(formData);
      setNotification({
        type: "success",
        message: "Employee added successfully",
      });
      setShowAddModal(false);
      dispatch(
        fetchEmployees({ page, pageSize: PAGE_SIZE, search: debouncedSearch })
      );
    } catch (err) {
      setNotification({ type: "danger", message: "Failed to add employee" });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="relative flex h-screen bg-[#020202] text-white font-sans overflow-hidden selection:bg-white/20">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="relative z-10 flex w-full h-full" ref={containerRef}>
        {/* Sidebar */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <SidebarContent
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onAddClick={() => setShowAddModal(true)}
            downloadTemplate={downloadTemplate}
            downloadingTemplate={downloadingTemplate}
            fileRef={fileRef}
            totalRecords={totalRecords}
            isPreviewMode={isPreviewMode}
          />
        </div>

        {/* Mobile Sidebar */}
        {showMobileSidebar && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowMobileSidebar(false)}
            />
            <div className="relative w-64 h-full shadow-2xl animate-in slide-in-from-left duration-300">
              <button
                onClick={() => setShowMobileSidebar(false)}
                className="absolute top-4 right-4 z-10 text-neutral-500 hover:text-white"
              >
                <X size={18} />
              </button>
              <SidebarContent
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onAddClick={() => setShowAddModal(true)}
                downloadTemplate={downloadTemplate}
                downloadingTemplate={downloadingTemplate}
                fileRef={fileRef}
                totalRecords={totalRecords}
                isPreviewMode={isPreviewMode}
              />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Mobile Header */}
          <div className="md:hidden h-14 border-b border-white/5 flex items-center justify-between px-4 bg-[#050505]/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMobileSidebar(true)}
                className="p-1.5 -ml-1.5 text-neutral-400 hover:text-white transition-colors"
              >
                <Menu size={20} />
              </button>
              <span className="text-sm font-medium tracking-tight">
                Directory
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-neutral-600 font-mono">
                {totalRecords} MEMBERS
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent flex flex-col">
            <input
              ref={fileRef}
              type="file"
              hidden
              accept=".xlsx,.xls"
              onChange={handleExcelUpload}
            />

            {/* Notification */}
            {notification && (
              <div className="fixed top-6 right-6 z-50 pl-3 pr-4 py-2.5 rounded-lg border border-white/10 bg-[#0A0A0A]/90 backdrop-blur-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    notification.type === "success"
                      ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                      : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                  }`}
                ></div>
                <span className="text-[11px] font-medium text-neutral-200">
                  {notification.message}
                </span>
                <button
                  onClick={() => setNotification(null)}
                  className="ml-2 text-neutral-600 hover:text-white transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            )}

            {/* Content Switcher */}
            {isPreviewMode ? (
              <UploadPreview
                data={preview}
                onCancel={cancelUpload}
                onConfirm={confirmUpload}
                uploading={uploading}
              />
            ) : (
              <div className="content-entry max-w-6xl mx-auto w-full flex-1 flex flex-col">
                <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-end border-b border-white/5 pb-4 gap-3">
                  <div>
                    <h1 className="text-lg font-light text-white tracking-tight">
                      Employee Directory
                    </h1>
                    <p className="text-[11px] text-neutral-500 mt-1">
                      Manage global access and roles
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-[10px] font-mono text-neutral-600">
                      TOTAL:{" "}
                      <span className="text-white font-bold">
                        {totalRecords}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col bg-[#050505]/50 rounded-lg overflow-hidden min-h-[500px]">
                  {loading ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-3">
                      <Loader2
                        className="animate-spin text-neutral-500"
                        size={20}
                      />
                      <span className="text-xs text-neutral-600 font-medium">
                        Fetching Records...
                      </span>
                    </div>
                  ) : displayList.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-3">
                      <div className="p-4 bg-neutral-900/30 rounded-full">
                        <Users size={32} className="text-neutral-700" />
                      </div>
                      <span className="text-xs text-neutral-600 font-medium">
                        {debouncedSearch
                          ? `No matches for "${debouncedSearch}"`
                          : "No employees found"}
                      </span>
                    </div>
                  ) : (
                    <div className="flex-1">
                      {/* Pass the server-side filtered list */}
                      <EmployeeList list={displayList} />
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <Pagination
                    currentPage={page}
                    totalItems={totalRecords}
                    pageSize={PAGE_SIZE}
                    onPageChange={(newPage) => setPage(newPage)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => setShowAddModal(true)}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-white text-black rounded-full shadow-2xl shadow-white/20 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-40"
      >
        <UserPlus size={22} />
      </button>

      {showAddModal && (
        <AddEmployeeModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleManualAdd}
          isLoading={isAdding}
        />
      )}
    </div>
  );
}

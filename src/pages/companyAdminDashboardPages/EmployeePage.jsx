import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../redux/slices/employeeSlice";
import { useEmployeeExcel } from "../../Hooks/useEmployeeExcel";
import EmployeeList from "../../components/EmployeesUpload/EmployeeList";
import UploadPreview from "../../components/EmployeesUpload/UploadPreview";
import { useEffect, useState } from "react";
import { addEmployee } from "../../redux/api/employeeApi";

export default function EmployeesPage() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((s) => s.employees);

  // Local UI State
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Custom Hook
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
  } = useEmployeeExcel(() => dispatch(fetchEmployees()));

  const isPreviewMode = preview.length > 0;

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  // Search Logic
  const filteredList = list.filter((emp) =>
    emp.employeeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add Logic
  const handleManualAdd = async (formData) => {
    setIsAdding(true);
    try {
      await addEmployee(formData);
      setNotification({ type: 'success', message: 'Employee added successfully!' });
      setShowAddModal(false);
      dispatch(fetchEmployees());
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to add employee";
      setNotification({ type: 'danger', message: msg });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 bg-light">
      <div className="row flex-nowrap min-vh-100">
        
        {/* =========================================================
            LEFT PANEL: CONTROL CENTER (Sticky Sidebar)
            ========================================================= */}
        <div className="col-auto col-md-4 col-xl-3 px-0 border-end bg-white position-relative d-none d-md-block">
          <div className="d-flex flex-column h-100 position-sticky top-0 p-4">
            
            {/* Header */}
            <div className="mb-5">
              <div className="d-flex align-items-center gap-2 mb-2">
                <div className="bg-primary rounded-3 p-2 d-flex align-items-center justify-content-center text-white">
                  <i className="bi bi-buildings-fill fs-5"></i>
                </div>
                <h5 className="fw-bold text-dark m-0 tracking-tight">TeamDirectory</h5>
              </div>
              <p className="text-muted small">Manage your organization's talent pool.</p>
            </div>

            {/* Primary Actions */}
            {!isPreviewMode && (
              <div className="d-flex flex-column gap-3 mb-5">
                {/* Search */}
                <div>
                  <label className="text-uppercase text-muted fw-bold mb-2" style={{fontSize: '0.75rem'}}>Find People</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0"><i className="bi bi-search text-secondary"></i></span>
                    <input 
                      type="text" 
                      className="form-control bg-light border-start-0 ps-0" 
                      placeholder="Name, Email, Dept..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Add Button */}
                <button 
                  className="btn btn-primary w-100 py-2 fw-bold shadow-sm mt-2" 
                  onClick={() => setShowAddModal(true)}
                >
                  <i className="bi bi-plus-lg me-2"></i> New Employee
                </button>
              </div>
            )}

            {/* Stats Card */}
            <div className="card bg-primary bg-opacity-10 border-0 rounded-3 mb-auto">
              <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-primary fw-bold mb-0">Active Members</h6>
                    <small className="text-primary text-opacity-75">Currently enrolled</small>
                  </div>
                  <h2 className="text-primary fw-bold mb-0">{list.length}</h2>
                </div>
              </div>
            </div>

            {/* Bottom: Utilities */}
            <div className="mt-4 pt-4 border-top">
              <label className="text-uppercase text-muted fw-bold mb-3" style={{fontSize: '0.75rem'}}>Bulk Actions</label>
              <div className="d-grid gap-2">
                <button 
                  className="btn btn-sm btn-outline-secondary d-flex align-items-center justify-content-between"
                  onClick={downloadTemplate}
                  disabled={downloadingTemplate}
                >
                  <span><i className="bi bi-download me-2"></i>Excel Template</span>
                  {downloadingTemplate && <span className="spinner-border spinner-border-sm"></span>}
                </button>
                
                <button 
                  className="btn btn-sm btn-outline-success d-flex align-items-center justify-content-between"
                  onClick={() => fileRef.current.click()}
                >
                   <span><i className="bi bi-file-spreadsheet me-2"></i>Import Excel</span>
                   <i className="bi bi-chevron-right small"></i>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* =========================================================
            RIGHT PANEL: CONTENT FEED
            ========================================================= */}
        <div className="col py-4 px-3 px-md-5 overflow-auto bg-light">
          
          {/* Mobile Header (Visible only on small screens) */}
          <div className="d-block d-md-none mb-4">
             <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="fw-bold mb-0">Team</h3>
                <button className="btn btn-primary rounded-circle shadow" onClick={() => setShowAddModal(true)} style={{width: 45, height: 45}}>
                  <i className="bi bi-plus-lg"></i>
                </button>
             </div>
             <input 
                type="text" 
                className="form-control rounded-pill" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
          </div>

          {/* Hidden Input */}
          <input ref={fileRef} type="file" hidden accept=".xlsx,.xls" onChange={handleExcelUpload} />

          {/* Notification Toast */}
          {notification && (
            <div className={`alert alert-${notification.type} border-0 shadow-sm rounded-3 mb-4 d-flex align-items-center gap-3 fade show`}>
              <i className={`bi ${notification.type === "success" ? "bi-check-circle-fill" : "bi-exclamation-octagon-fill"} fs-5`}></i>
              <div className="fw-medium">{notification.message}</div>
              <button type="button" className="btn-close ms-auto" onClick={() => setNotification(null)}></button>
            </div>
          )}

          {/* Main Content Render */}
          {isPreviewMode ? (
            <div className="bg-white rounded-4 shadow-sm p-4 animate-in">
              <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
                <h4 className="fw-bold mb-0">Import Preview</h4>
                <button className="btn btn-link text-muted text-decoration-none" onClick={cancelUpload}>Cancel</button>
              </div>
              <UploadPreview
                data={preview}
                onCancel={cancelUpload}
                onConfirm={confirmUpload}
                uploading={uploading}
              />
            </div>
          ) : (
            <div className="animate-in">
               {/* Header for list */}
               <div className="d-flex justify-content-between align-items-end mb-3">
                 <h6 className="text-muted text-uppercase fw-bold small m-0">
                    {searchTerm ? `Results for "${searchTerm}"` : 'All Employees'}
                 </h6>
                 {loading && <div className="spinner-border spinner-border-sm text-primary"></div>}
               </div>

               {/* List Component */}
               <div className="bg-white border rounded-3 shadow-sm overflow-hidden" style={{ minHeight: '600px' }}>
                 <EmployeeList list={filteredList} loading={loading} isDimmed={false} />
                 
                 {/* Empty State */}
                 {filteredList.length === 0 && !loading && (
                   <div className="d-flex flex-column align-items-center justify-content-center py-5">
                      <div className="bg-light rounded-circle p-4 mb-3">
                        <i className="bi bi-people text-secondary fs-1"></i>
                      </div>
                      <h5 className="text-dark fw-bold">No results found</h5>
                      <p className="text-muted">Try adjusting your search filters</p>
                   </div>
                 )}
               </div>
            </div>
          )}
        </div>
      </div>

      {/* === ADD MODAL (Minimalist) === */}
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

/* =========================================
   INTERNAL COMPONENT: SIDEBAR STYLE MODAL
   ========================================= */
function AddEmployeeModal({ onClose, onSubmit, isLoading }) {
  const [form, setForm] = useState({ 
    employeeName: "", email: "", department: "", defaultFloorId: "" 
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, defaultFloorId: form.defaultFloorId ? parseInt(form.defaultFloorId) : 0 });
  };

  return (
    <>
      <div className="modal-backdrop fade show" style={{ backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}></div>
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg rounded-4">
            
            <div className="modal-header border-bottom-0 pb-0 pt-4 px-4">
              <h5 className="modal-title fw-bold">Add Team Member</h5>
              <button type="button" className="btn-close" onClick={onClose} disabled={isLoading}></button>
            </div>
            
            <div className="modal-body p-4">
              <form onSubmit={handleSubmit} id="addForm">
                
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted">Full Name</label>
                  <input required name="employeeName" className="form-control form-control-lg bg-light border-0" 
                    placeholder="e.g. Sarah Connor" value={form.employeeName} onChange={handleChange} />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted">Email Address</label>
                  <input required type="email" name="email" className="form-control form-control-lg bg-light border-0" 
                    placeholder="sarah@company.com" value={form.email} onChange={handleChange} />
                </div>

                <div className="row g-2">
                  <div className="col-8">
                    <label className="form-label small fw-bold text-muted">Department</label>
                    <select name="department" className="form-select form-select-lg bg-light border-0" 
                      value={form.department} onChange={handleChange} required>
                      <option value="">Select...</option>
                      <option value="IT">IT</option>
                      <option value="HR">HR</option>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Operations">Operations</option>
                      <option value="Management">Management</option>
                    </select>
                  </div>
                  <div className="col-4">
                    <label className="form-label small fw-bold text-muted">Floor</label>
                    <input type="number" name="defaultFloorId" className="form-control form-control-lg bg-light border-0" 
                      value={form.defaultFloorId} onChange={handleChange} required placeholder="#" />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer border-top-0 px-4 pb-4 pt-0">
               <button type="button" className="btn btn-light rounded-pill px-4" onClick={onClose}>Cancel</button>
               <button type="submit" form="addForm" className="btn btn-primary rounded-pill px-4 fw-bold shadow-sm" disabled={isLoading}>
                 {isLoading ? <span className="spinner-border spinner-border-sm"/> : "Create Profile"}
               </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
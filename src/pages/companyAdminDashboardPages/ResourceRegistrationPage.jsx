import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFloors, setActiveFloor } from '../../redux/slices/floorSlice';
import { createResource, fetchResourcesByFloor, deleteResource } from '../../redux/slices/resourceSlice';
import { 
  Monitor, Users, Plus, Trash2, Search, 
  MapPin, Box, Loader2, Layout, ChevronDown
} from "lucide-react";

export default function ResourceRegistrationPage() {
  const dispatch = useDispatch();
  const { floors, activeFloor } = useSelector((s) => s.floor);
  const { resources, loading } = useSelector((s) => s.resources);

  const [form, setForm] = useState({
    resourceTypeId: 1, // 1=Desk, 2=MeetingRoom
    name: "" 
  });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchFloors());
  }, [dispatch]);

  // Sync resources when floor changes
  useEffect(() => {
    if (activeFloor?.floorId) {
      dispatch(fetchResourcesByFloor(activeFloor.floorId));
    }
  }, [activeFloor, dispatch]);

  // 🟢 Fix: Ensure floor ID is treated as a Number to find the correct object
  const handleFloorChange = (e) => {
    const selectedId = Number(e.target.value);
    const floor = floors.find(f => f.floorId === selectedId);
    if (floor) {
      dispatch(setActiveFloor(floor));
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!activeFloor) return;

    const payload = {
      floorId: activeFloor.floorId,
      resourceTypeId: Number(form.resourceTypeId),
      x: 0, y: 0, width: 60, height: 60, rotation: 0,
      metadataJson: JSON.stringify({ name: form.name })
    };
    await dispatch(createResource(payload));
    setForm({ ...form, name: "" });
  };

  // Filter resources based on search
  const filteredResources = resources.filter(r => {
    const meta = JSON.parse(r.metadataJson || "{}");
    return meta.name?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-10 font-sans">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Asset Inventory</h1>
          <p className="text-neutral-500 text-sm">Register and manage physical assets across your floors.</p>
        </div>
        
        {/* Floor Switcher */}
        <div className="flex items-center gap-3 bg-[#0A0A0A] border border-neutral-800 pl-3 pr-2 py-1.5 rounded-lg relative">
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Floor</span>
          <div className="h-4 w-[1px] bg-neutral-800"></div>
          <select 
            className="bg-transparent text-sm font-medium text-white outline-none cursor-pointer hover:text-neutral-300 transition-colors appearance-none pr-6"
            value={activeFloor?.floorId || ""}
            onChange={handleFloorChange}
          >
            {floors.map(f => (
              <option key={f.floorId} value={f.floorId} className="bg-[#111] text-white">
                {f.floorName}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="text-neutral-500 absolute right-2 pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 2. Left Column: Registration Form */}
        <div className="lg:col-span-1">
          <div className="bg-[#0A0A0A] border border-neutral-900 rounded-xl p-6 sticky top-6 shadow-2xl shadow-black/50">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-900">
              <div className="p-2 bg-white text-black rounded-lg">
                <Plus size={20} />
              </div>
              <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-300">Register New Asset</h3>
            </div>

            <form onSubmit={handleCreate} className="space-y-6">
              
              {/* Type Selection Cards */}
              <div>
                <label className="text-[10px] font-bold text-neutral-500 uppercase mb-3 block">Asset Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setForm({...form, resourceTypeId: 1})}
                    className={`p-4 rounded-lg border flex flex-col items-center gap-3 transition-all ${
                      form.resourceTypeId === 1 
                        ? "bg-neutral-800 border-neutral-700 text-white shadow-lg" 
                        : "bg-[#111] border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300"
                    }`}
                  >
                    <Monitor size={24} strokeWidth={1.5} />
                    <span className="text-xs font-bold tracking-wide">Workstation</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setForm({...form, resourceTypeId: 2})}
                    className={`p-4 rounded-lg border flex flex-col items-center gap-3 transition-all ${
                      form.resourceTypeId === 2 
                        ? "bg-neutral-800 border-neutral-700 text-white shadow-lg" 
                        : "bg-[#111] border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300"
                    }`}
                  >
                    <Users size={24} strokeWidth={1.5} />
                    <span className="text-xs font-bold tracking-wide">Meeting Room</span>
                  </button>
                </div>
              </div>

              {/* Name Input */}
              <div>
                <label className="text-[10px] font-bold text-neutral-500 uppercase mb-2 block">Display Name / ID</label>
                <input 
                  className="w-full bg-[#111] border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-white/20 focus:bg-[#151515] outline-none transition-all"
                  placeholder="e.g. Desk A-101"
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  required 
                />
              </div>

              <button 
                type="button" 
                onClick={handleCreate}
                disabled={loading || !activeFloor}
                className="w-full py-3 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 size={16} className="animate-spin"/> : <Plus size={16} />}
                Add to Inventory
              </button>
            </form>
          </div>
        </div>

        {/* 3. Right Column: Inventory List */}
        <div className="lg:col-span-2">
          <div className="bg-[#0A0A0A] border border-neutral-900 rounded-xl overflow-hidden flex flex-col h-full min-h-[500px]">
            
            {/* Toolbar */}
            <div className="p-4 border-b border-neutral-900 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-neutral-400">
                <Box size={18} />
                <span className="text-sm font-medium">{filteredResources.length} Items</span>
              </div>
              
              <div className="relative w-full max-w-xs">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input 
                  type="text" 
                  placeholder="Search assets..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#111] border border-neutral-800 rounded-full pl-9 pr-4 py-1.5 text-xs text-white focus:border-neutral-600 outline-none placeholder-neutral-600"
                />
              </div>
            </div>

            {/* List Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-[#111] border-b border-neutral-900 text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
              <div className="col-span-4">Asset Details</div>
              <div className="col-span-3">Type</div>
              <div className="col-span-3">Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {/* List Body */}
            <div className="divide-y divide-neutral-900 overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
              {loading ? (
                 <div className="py-20 flex flex-col items-center justify-center text-neutral-500">
                    <Loader2 size={32} className="animate-spin mb-3 text-white" />
                    <p className="text-xs font-mono uppercase tracking-widest">Loading Resources...</p>
                 </div>
              ) : filteredResources.length > 0 ? (
                filteredResources.map(r => {
                  const meta = JSON.parse(r.metadataJson || "{}");
                  const isPlaced = r.x !== 0 || r.y !== 0;

                  return (
                    <div key={r.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-white/5 transition-colors group">
                      
                      {/* Name Column */}
                      <div className="col-span-4 flex items-center gap-3">
                        <div className={`p-2 rounded-md ${r.resourceTypeId === 1 ? 'bg-neutral-800 text-white' : 'bg-neutral-800 text-neutral-400'}`}>
                          {r.resourceTypeId === 1 ? <Monitor size={16} strokeWidth={1.5} /> : <Users size={16} strokeWidth={1.5} />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{meta.name || "Untitled Asset"}</p>
                          <p className="text-[10px] text-neutral-600 font-mono">ID: {r.id}</p>
                        </div>
                      </div>

                      {/* Type Column */}
                      <div className="col-span-3">
                        <span className="text-xs text-neutral-400">
                          {r.resourceTypeId === 1 ? 'Workstation' : 'Meeting Room'}
                        </span>
                      </div>

                      {/* Status Column */}
                      <div className="col-span-3">
                         {isPlaced ? (
                           <div className="flex items-center gap-1.5 text-white">
                             <MapPin size={12} className="text-white" />
                             <span className="text-[10px] font-bold uppercase tracking-wider">Placed</span>
                           </div>
                         ) : (
                           <div className="flex items-center gap-1.5 text-neutral-600">
                             <Layout size={12} />
                             <span className="text-[10px] font-bold uppercase tracking-wider">Unplaced</span>
                           </div>
                         )}
                      </div>

                      {/* Action Column */}
                      <div className="col-span-2 text-right">
                        <button 
                          onClick={() => dispatch(deleteResource(r.id))}
                          className="p-2 text-neutral-500 hover:text-red-500 hover:bg-red-500/10 rounded-md transition-all opacity-0 group-hover:opacity-100"
                          title="Delete Asset"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-neutral-600">
                   <Box size={48} className="mb-3 opacity-20" />
                   <p className="text-sm">No assets found on this floor.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
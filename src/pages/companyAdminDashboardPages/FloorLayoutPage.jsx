import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFloors, setActiveFloor } from "../../redux/slices/floorSlice";
import { 
  fetchResourcesByFloor, 
  updateResourcePosition, 
  deleteResource 
} from "../../redux/slices/resourceSlice";
import { 
  DndContext, 
  useDraggable, 
  useDroppable, 
  useSensor, 
  useSensors, 
  PointerSensor,
  TouchSensor 
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { 
  Monitor, Users, Grid, Save, Plus, Layers, Loader2, Trash2, X, Move, 
  ChevronDown, ZoomIn, ZoomOut, Maximize
} from "lucide-react";
import CreateFloorForm from "../../components/companyAdmin/CreateFloorForm";
import CreateResourceForm from "../../components/companyAdmin/CreateResourceForm";

// 🟢 1. DRAGGABLE COMPONENT (Theater Booking Style)
const DraggableResource = ({ resource, onSelect, isSelected, scale }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: resource.id,
    data: resource
  });

  // 🟢 Fix: Compensate for Zoom Scale during Drag
  // If zoomed out (0.5), moving mouse 10px should move item 20px to keep up
  const adjustedTransform = transform ? {
      ...transform,
      x: transform.x / scale,
      y: transform.y / scale,
  } : null;

  const style = {
    transform: CSS.Translate.toString(adjustedTransform),
    left: `${resource.x}px`,
    top: `${resource.y}px`,
    position: "absolute",
    zIndex: isDragging ? 100 : isSelected ? 50 : 10,
    touchAction: "none"
  };

  const meta = JSON.parse(resource.metadataJson || "{}");
  const isDesk = resource.resourceTypeId === 1;

  // Visual Styling - "Theater Slot" look
  // Desks are smaller rectangles, Rooms are larger squares
  const width = isDesk ? "w-16" : "w-32";
  const height = isDesk ? "h-12" : "h-32";
  
  // Color coding based on status (simulated logic)
  const statusColor = resource.status === "Reserved" 
    ? "bg-red-900/40 border-red-600" 
    : isSelected 
        ? "bg-blue-600/30 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        : "bg-[#1A1A1A] border-neutral-700 hover:border-neutral-500";

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={(e) => { 
        if(!isDragging) {
            e.stopPropagation(); 
            onSelect(resource); 
        }
      }}
      className={`
        absolute flex flex-col items-center justify-center border rounded-md transition-colors cursor-grab active:cursor-grabbing
        ${width} ${height} ${statusColor}
      `}
    >
      {isDesk ? <Monitor size={14} className="text-neutral-400 mb-1" /> : <Users size={20} className="text-neutral-400 mb-1" />}
      
      <span className="text-[9px] font-mono text-white font-bold truncate max-w-full px-1">
        {meta.name || `ID-${resource.id}`}
      </span>

      {/* Coordinate Tooltip only while dragging */}
      {isDragging && (
        <div className="absolute -top-8 bg-white text-black text-[8px] px-2 py-1 rounded font-bold shadow-xl whitespace-nowrap z-50 pointer-events-none">
           X:{Math.round(resource.x)} Y:{Math.round(resource.y)}
        </div>
      )}
    </div>
  );
};

// 🟢 2. POPUP (Same as before, kept for completeness)
const AssetPopup = ({ resource, onClose, onDelete, onUpdate }) => {
    const popupRef = useRef(null);
    const [localMeta, setLocalMeta] = useState(JSON.parse(resource.metadataJson || "{}"));
    const [status, setStatus] = useState(resource.status || "Available");

    useGSAP(() => {
        gsap.fromTo(popupRef.current, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.2, ease: "back.out(1.5)" });
    }, []);

    const handleChange = (key, value) => {
        const newMeta = { ...localMeta, [key]: value };
        setLocalMeta(newMeta);
        onUpdate(resource.id, { metadataJson: JSON.stringify(newMeta) });
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
            <div ref={popupRef} onClick={(e) => e.stopPropagation()} className="w-full max-w-sm bg-[#0A0A0A] border border-neutral-800 rounded-xl shadow-2xl overflow-hidden">
                <div className="bg-[#111] p-4 flex justify-between items-center border-b border-neutral-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-neutral-900 rounded text-blue-500">
                            {resource.resourceTypeId === 1 ? <Monitor size={16}/> : <Users size={16}/>}
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-white">Edit Asset</h4>
                            <p className="text-[10px] text-neutral-500 font-mono">#{resource.id}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-neutral-500 hover:text-white"><X size={18}/></button>
                </div>
                <div className="p-5 space-y-4">
                    <div>
                        <label className="text-[10px] font-bold text-neutral-500 uppercase mb-1 block">Name</label>
                        <input type="text" value={localMeta.name || ""} onChange={(e) => handleChange("name", e.target.value)}
                            className="w-full bg-[#151515] border border-neutral-800 rounded px-3 py-2 text-xs text-white focus:border-blue-500 outline-none" />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-neutral-500 uppercase mb-1 block">Status</label>
                        <select value={status} onChange={(e) => { setStatus(e.target.value); onUpdate(resource.id, { status: e.target.value }); }}
                            className="w-full bg-[#151515] border border-neutral-800 rounded px-3 py-2 text-xs text-white focus:border-blue-500 outline-none">
                            <option value="Available">Available</option>
                            <option value="Reserved">Reserved</option>
                            <option value="Maintenance">Maintenance</option>
                        </select>
                    </div>
                </div>
                <div className="p-4 bg-[#111] border-t border-neutral-800 flex gap-2">
                    <button onClick={() => onDelete(resource.id)} className="flex-1 py-2 bg-red-900/20 text-red-500 rounded text-xs font-bold hover:bg-red-900/40">Delete</button>
                    <button onClick={onClose} className="flex-1 py-2 bg-white text-black rounded text-xs font-bold hover:bg-neutral-200">Done</button>
                </div>
            </div>
        </div>
    );
};

// 🟢 3. MAIN PAGE
export default function FloorLayoutPage() {
  const dispatch = useDispatch();
  
  const { floors, activeFloor } = useSelector((s) => s.floor);
  const { resources, loading } = useSelector((s) => s.resources);
  
  const [localResources, setLocalResources] = useState([]);
  const [modifiedIds, setModifiedIds] = useState(new Set());
  const [selectedRes, setSelectedRes] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // 🟢 Zoom State (Default 1 for Desktop, 0.5 for Mobile)
  const [zoom, setZoom] = useState(window.innerWidth < 768 ? 0.5 : 1);
  
  const [showFloorModal, setShowFloorModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  );

  useEffect(() => { dispatch(fetchFloors()); }, [dispatch]);
  
  useEffect(() => {
    if (resources) {
        setLocalResources(resources);
        setModifiedIds(new Set());
    }
  }, [resources]);

  useEffect(() => {
    if (activeFloor?.floorId) {
      setLocalResources([]); 
      setModifiedIds(new Set());
      setSelectedRes(null);
      dispatch(fetchResourcesByFloor(activeFloor.floorId));
    }
  }, [activeFloor, dispatch]);

  const handleDragEnd = (event) => {
    const { active, delta } = event;
    if (!active) return;
    
    // 🟢 Critical: Divide delta by zoom level so cursor stays synced with object
    const trueDeltaX = delta.x / zoom;
    const trueDeltaY = delta.y / zoom;

    const updated = localResources.map(res => {
      if (res.id === active.id) {
        return { ...res, x: Math.round(res.x + trueDeltaX), y: Math.round(res.y + trueDeltaY) };
      }
      return res;
    });
    setLocalResources(updated);
    setModifiedIds(prev => new Set(prev).add(active.id));
  };

  const handleResourceUpdate = (id, updates) => {
    setLocalResources(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
    setModifiedIds(prev => new Set(prev).add(id));
  };

  const handleDeleteResource = async (id) => {
    if(window.confirm("Delete this asset?")) {
        await dispatch(deleteResource(id));
        setSelectedRes(null);
        dispatch(fetchResourcesByFloor(activeFloor.floorId));
    }
  };

  const handleSaveChanges = async () => {
    if (modifiedIds.size === 0) return;
    setIsSaving(true);
    const promises = Array.from(modifiedIds).map(id => {
        const res = localResources.find(r => r.id === id);
        if(!res) return Promise.resolve();
        return dispatch(updateResourcePosition({ 
            resourceId: res.id, 
            x: res.x, y: res.y, 
            width: res.width, height: res.height, rotation: res.rotation,
            metadataJson: res.metadataJson 
        })).unwrap();
    });
    try { await Promise.all(promises); setModifiedIds(new Set()); } 
    catch (error) { console.error("Save failed", error); } 
    finally { setIsSaving(false); }
  };

  const { setNodeRef: setCanvasRef } = useDroppable({ id: "canvas" });

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] md:h-screen w-full bg-[#050505] relative overflow-hidden">
      
      {/* 1. TOP TOOLBAR */}
      <div className="h-auto min-h-[60px] bg-black/90 backdrop-blur-md border-b border-neutral-800 flex flex-wrap items-center justify-between px-4 py-2 z-40 gap-3">
        
        {/* Left: Info & Floor Selector */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="hidden md:block p-1.5 bg-neutral-900 border border-neutral-800 rounded text-neutral-400">
                <Grid size={16} />
            </div>
            <div>
                <h2 className="text-xs font-bold text-white uppercase tracking-widest">Layout Designer</h2>
                <p className="text-[10px] text-neutral-500 font-mono">
                    {modifiedIds.size > 0 ? <span className="text-amber-500">● {modifiedIds.size} Unsaved</span> : "All Synced"}
                </p>
            </div>
          </div>

          {/* Mobile Floor Dropdown */}
          <div className="md:hidden relative w-36">
             <select 
                className="w-full bg-[#111] text-white text-xs border border-neutral-800 rounded py-1.5 px-2 appearance-none outline-none focus:border-neutral-600"
                value={activeFloor?.floorId || ""}
                onChange={(e) => {
                    const floor = floors.find(f => f.floorId === Number(e.target.value));
                    if(floor) dispatch(setActiveFloor(floor));
                }}
             >
                {floors.map(f => (
                    <option key={f.floorId} value={f.floorId}>{f.floorName}</option>
                ))}
             </select>
             <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none"/>
          </div>
        </div>
        
        {/* Desktop Floor Tabs */}
        <div className="hidden md:flex items-center gap-2 overflow-x-auto no-scrollbar">
            {floors.map(f => (
              <button key={f.floorId} onClick={() => dispatch(setActiveFloor(f))}
                className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded border transition-all whitespace-nowrap
                ${activeFloor?.floorId === f.floorId 
                  ? "bg-white text-black border-white" 
                  : "bg-transparent text-neutral-500 border-neutral-800 hover:border-neutral-600 hover:text-white"}`}
              >
                {f.floorName}
              </button>
            ))}
            <button onClick={() => setShowFloorModal(true)} className="p-1.5 text-neutral-500 hover:text-white border border-dashed border-neutral-800 rounded hover:border-neutral-600"><Plus size={14} /></button>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            
            {/* 🟢 ZOOM CONTROLS */}
            <div className="flex bg-neutral-900 rounded border border-neutral-800">
                <button onClick={() => setZoom(z => Math.max(z - 0.1, 0.2))} className="p-2 text-neutral-400 hover:text-white border-r border-neutral-800"><ZoomOut size={14}/></button>
                <span className="text-[10px] text-neutral-500 w-10 flex items-center justify-center font-mono">{Math.round(zoom * 100)}%</span>
                <button onClick={() => setZoom(z => Math.min(z + 0.1, 2.0))} className="p-2 text-neutral-400 hover:text-white"><ZoomIn size={14}/></button>
            </div>

            <div className="h-6 w-[1px] bg-neutral-800 mx-1"></div>

            <button onClick={() => setShowResourceModal(true)} disabled={!activeFloor}
                className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 text-white text-[10px] font-bold uppercase tracking-wider rounded hover:bg-neutral-800 disabled:opacity-50">
               + Asset
            </button>
            <button onClick={handleSaveChanges} disabled={modifiedIds.size === 0 || isSaving}
                className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded flex items-center gap-2
                ${modifiedIds.size > 0 ? "bg-white text-black" : "bg-neutral-900 text-neutral-600 border border-neutral-800"}`}>
               {isSaving ? <Loader2 size={12} className="animate-spin"/> : <Save size={12} />}
               {isSaving ? "Saving..." : "Save"}
            </button>
        </div>
      </div>

      {/* 2. INFINITE CANVAS WRAPPER (NO SCROLLBARS - Hidden but functional) */}
      <div className="flex-1 w-full h-full bg-[#080808] overflow-auto relative cursor-grab active:cursor-grabbing scrollbar-hide">
        
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>

        {/* 🟢 This is the "Physical" Canvas. 
            It is LARGE (e.g. 2500px) so items placed far right are accessible by scrolling.
            The Zoom is applied as a CSS transform on this container.
        */}
        <div 
            className="relative transform-origin-top-left transition-transform duration-200 ease-out"
            style={{ 
                width: '2500px', 
                height: '2500px', 
                transform: `scale(${zoom})`,
                transformOrigin: '0 0'
            }}
        >
            <DndContext 
                sensors={sensors} 
                onDragEnd={handleDragEnd} 
                modifiers={[restrictToParentElement]}
            >
              <div ref={setCanvasRef} onClick={() => setSelectedRes(null)}
                className="w-full h-full relative"
              >
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" 
                     style={{ 
                        backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
                        backgroundSize: '100px 100px'
                     }} 
                />
                
                {/* Reference Center Lines */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-blue-500/10" style={{top: '50%'}}></div>
                <div className="absolute top-0 left-0 h-full w-[1px] bg-blue-500/10" style={{left: '50%'}}></div>

                {/* Resources */}
                {localResources.map(res => (
                  <DraggableResource 
                    key={res.id} 
                    resource={res} 
                    isSelected={selectedRes?.id === res.id} 
                    onSelect={(r) => setSelectedRes(r)} 
                    scale={zoom}
                  />
                ))}

                {/* Empty State Hint */}
                {localResources.length === 0 && !loading && (
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neutral-800 text-center pointer-events-none">
                      <Layers size={100} className="mx-auto mb-4 opacity-10" />
                      <p className="text-xl font-mono uppercase tracking-widest text-neutral-700">Floor Empty</p>
                   </div>
                )}
              </div>
            </DndContext>
        </div>
      </div>

      {/* 🟢 3. POPUP */}
      {selectedRes && (
          <AssetPopup 
              resource={selectedRes} 
              onClose={() => setSelectedRes(null)} 
              onDelete={handleDeleteResource}
              onUpdate={handleResourceUpdate}
          />
      )}

      {/* Modals */}
      <CreateFloorForm show={showFloorModal} onHide={() => setShowFloorModal(false)} />
      {activeFloor && <CreateResourceForm floorId={activeFloor.floorId} show={showResourceModal} onHide={() => setShowResourceModal(false)} />}
    </div>
  );
}
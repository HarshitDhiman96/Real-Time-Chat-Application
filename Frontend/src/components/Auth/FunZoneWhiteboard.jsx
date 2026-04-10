import { useEffect, useRef } from 'react';

const FunZoneWhiteboard = ({ className }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const updateSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    
    // Custom drawing styles
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#00F0FF';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#00F0FF';
    
    const draw = (e) => {
      if (!isDrawing) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
      
      lastX = x;
      lastY = y;
    };
    
    const startDrawing = (e) => {
      isDrawing = true;
      const rect = canvas.getBoundingClientRect();
      lastX = e.clientX - rect.left;
      lastY = e.clientY - rect.top;
    };
    
    const stopDrawing = () => {
      isDrawing = false;
    };
    
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    return () => {
      window.removeEventListener('resize', updateSize);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
    };
  }, []);

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'funzone-creativity.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-10 cursor-crosshair"
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <p className="text-white/20 font-headline text-4xl font-extrabold tracking-widest uppercase">Fun Zone</p>
      </div>
      
      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-4">
        <button 
          onClick={handleClear}
          className="px-6 py-2 bg-surface/10 hover:bg-surface/20 border border-white/20 hover:border-white/40 text-white rounded-full font-bold backdrop-blur-md transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]"
        >
          Reset Creativity
        </button>
        <button 
          onClick={handleSave}
          className="px-6 py-2 bg-gradient-to-r from-[#00E5FF] to-[#D500F9] text-white rounded-full font-bold shadow-[0_0_20px_rgba(213,0,249,0.4)] hover:scale-105 transition-all"
        >
          Save Masterpiece
        </button>
      </div>
    </div>
  );
};

export default FunZoneWhiteboard;

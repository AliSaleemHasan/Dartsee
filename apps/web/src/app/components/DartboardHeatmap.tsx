import { useEffect, useRef } from 'react';

interface CoordinateData {
  x: number;
  y: number;
  modifier: number;
}

interface DartboardHeatmapProps {
  throws: CoordinateData[];
  size?: number;
}

export function DartboardHeatmap({ throws, size = 600 }: DartboardHeatmapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Scale factor (original coordinates are 0-800, we scale to canvas size)
    const scale = size / 800;
    const center = size / 2;

    // Draw dartboard background
    drawDartboard(ctx, center, size);


    // Draw throw points
    drawThrows(ctx, throws, scale);
  }, [throws, size]);

  const drawDartboard = (ctx: CanvasRenderingContext2D, center: number, size: number) => {
    // Outer circle (catchment area)
    ctx.beginPath();
    ctx.arc(center, center, size * 0.45, 0, Math.PI * 2);
    ctx.fillStyle = '#1E1E1E';
    ctx.fill();
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Double ring outer
    ctx.beginPath();
    ctx.arc(center, center, size * 0.4, 0, Math.PI * 2);
    ctx.strokeStyle = '#39FF14';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.3;
    ctx.stroke();

    // Triple ring
    ctx.beginPath();
    ctx.arc(center, center, size * 0.24, 0, Math.PI * 2);
    ctx.stroke();

    // Bull rings
    ctx.beginPath();
    ctx.arc(center, center, size * 0.04, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(center, center, size * 0.02, 0, Math.PI * 2);
    ctx.stroke();

    ctx.globalAlpha = 1;

    // Draw segment lines
    const segments = 20;
    for (let i = 0; i < segments; i++) {
      const angle = (i * Math.PI * 2) / segments;
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.lineTo(
        center + Math.cos(angle) * size * 0.45,
        center + Math.sin(angle) * size * 0.45
      );
      ctx.strokeStyle = '#333333';
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.5;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // Center crosshair
    ctx.strokeStyle = '#39FF14';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.moveTo(center - 5, center);
    ctx.lineTo(center + 5, center);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(center, center - 5);
    ctx.lineTo(center, center + 5);
    ctx.stroke();
    ctx.globalAlpha = 1;
  };



  const drawThrows = (ctx: CanvasRenderingContext2D, throws: CoordinateData[], scale: number) => {
    throws.forEach((throw_) => {
      const x = throw_.x * scale;
      const y = throw_.y * scale;

      // Color based on score/modifier
      let color: string;
      if (throw_.modifier === 0) {
        color = '#FF6B6B'; // Miss
      } else if (throw_.modifier === 3) {
        color = '#39FF14'; // Triple
      } else if (throw_.modifier === 2) {
        color = '#FFD93D'; // Double
      } else {
        color = '#FFFFFF'; // Single
      }

      // Draw point
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = '#121212';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Add slight glow for better visibility
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.globalAlpha = 1;
    });
  };

  return (
    <div className="flex justify-center">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="rounded-xl border border-border"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
}

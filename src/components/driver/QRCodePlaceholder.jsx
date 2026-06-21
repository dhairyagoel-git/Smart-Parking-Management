import React from 'react';

// SVG-based QR code visual placeholder
export default function QRCodePlaceholder({ bookingId = '', size = 160 }) {
  const seed = bookingId.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const pseudo = (i, j) => ((seed * (i + 1) * (j + 1)) % 7) < 3;

  return (
    <div
      className="bg-white rounded-xl p-3 inline-block"
      style={{ width: size, height: size }}
      title={`QR Code for ${bookingId}`}
    >
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="100" height="100" fill="white" />

        {/* Top-left finder pattern */}
        <rect x="5"  y="5"  width="28" height="28" rx="2" fill="#0f172a" />
        <rect x="9"  y="9"  width="20" height="20" rx="1" fill="white" />
        <rect x="13" y="13" width="12" height="12" rx="1" fill="#0f172a" />

        {/* Top-right finder pattern */}
        <rect x="67" y="5"  width="28" height="28" rx="2" fill="#0f172a" />
        <rect x="71" y="9"  width="20" height="20" rx="1" fill="white" />
        <rect x="75" y="13" width="12" height="12" rx="1" fill="#0f172a" />

        {/* Bottom-left finder pattern */}
        <rect x="5"  y="67" width="28" height="28" rx="2" fill="#0f172a" />
        <rect x="9"  y="71" width="20" height="20" rx="1" fill="white" />
        <rect x="13" y="75" width="12" height="12" rx="1" fill="#0f172a" />

        {/* Data modules – pseudo-random based on bookingId */}
        {Array.from({ length: 14 }, (_, i) =>
          Array.from({ length: 14 }, (_, j) => {
            // Skip finder pattern areas
            if ((i < 4 && j < 4) || (i < 4 && j > 9) || (i > 9 && j < 4)) return null;
            if (!pseudo(i, j)) return null;
            return (
              <rect
                key={`${i}-${j}`}
                x={36 + i * 4.5}
                y={36 + j * 4.5}
                width="3.5"
                height="3.5"
                fill="#0f172a"
              />
            );
          })
        )}

        {/* Timing patterns */}
        {[37, 42, 47, 52, 57, 62].map((x, i) =>
          i % 2 === 0 ? <rect key={`tx${x}`} x={x} y="34" width="3" height="3" fill="#0f172a" /> : null
        )}
        {[37, 42, 47, 52, 57, 62].map((y, i) =>
          i % 2 === 0 ? <rect key={`ty${y}`} x="34" y={y} width="3" height="3" fill="#0f172a" /> : null
        )}
      </svg>
    </div>
  );
}

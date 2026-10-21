import React from 'react';

export const LeafGraphic = ({ type, specimenId, className = 'w-full h-44' }) => {
  if (type === 'blister-blight') {
    
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-[#1a3826] via-[#102b1c] to-[#0a1c12] ${className}`}>
        <svg viewBox="0 0 320 180" className="w-full h-full object-cover">
          <defs>
            <radialGradient id="leafGrad1" cx="45%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#4a8b54" />
              <stop offset="60%" stopColor="#245c32" />
              <stop offset="100%" stopColor="#133d1f" />
            </radialGradient>
            <linearGradient id="veinGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#68a86a" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#356e39" stopOpacity="0.4" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <radialGradient id="blister1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#fef08a" stopOpacity="0.8" />
              <stop offset="80%" stopColor="#ca8a04" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#245c32" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="blister2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef9c3" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#eab308" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#245c32" stopOpacity="0" />
            </radialGradient>
          </defs>

        
          <path
            d="M 20,95 C 40,40 120,20 220,45 C 290,65 310,95 310,95 C 310,95 270,145 190,155 C 100,165 40,140 20,95 Z"
            fill="url(#leafGrad1)"
            stroke="#5aa065"
            strokeWidth="1.5"
            opacity="0.95"
          />

         
          <path d="M 20,95 Q 160,88 310,95" stroke="url(#veinGrad)" strokeWidth="3" fill="none" />
          <path d="M 80,92 Q 120,60 160,42" stroke="url(#veinGrad)" strokeWidth="1.5" fill="none" />
          <path d="M 120,90 Q 170,55 210,47" stroke="url(#veinGrad)" strokeWidth="1.5" fill="none" />
          <path d="M 170,91 Q 220,65 260,60" stroke="url(#veinGrad)" strokeWidth="1.2" fill="none" />
          <path d="M 90,94 Q 130,125 170,140" stroke="url(#veinGrad)" strokeWidth="1.5" fill="none" />
          <path d="M 140,92 Q 190,130 230,135" stroke="url(#veinGrad)" strokeWidth="1.5" fill="none" />

       
          <ellipse cx="145" cy="72" rx="22" ry="16" fill="url(#blister1)" />
          <ellipse cx="195" cy="62" rx="16" ry="12" fill="url(#blister2)" />
          <ellipse cx="165" cy="112" rx="19" ry="14" fill="url(#blister1)" />
          <ellipse cx="230" cy="98" rx="14" ry="11" fill="url(#blister2)" />
          <circle cx="115" cy="75" r="9" fill="url(#blister2)" />

          <g filter="url(#glow)">
        
            <circle cx="145" cy="72" r="26" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4 2" />
            <circle cx="145" cy="72" r="3" fill="#22c55e" />
            <line x1="145" y1="42" x2="145" y2="48" stroke="#22c55e" strokeWidth="1.5" />
            <line x1="145" y1="96" x2="145" y2="102" stroke="#22c55e" strokeWidth="1.5" />
            <line x1="115" y1="72" x2="121" y2="72" stroke="#22c55e" strokeWidth="1.5" />
            <line x1="169" y1="72" x2="175" y2="72" stroke="#22c55e" strokeWidth="1.5" />

     
            <circle cx="195" cy="62" r="20" fill="none" stroke="#4ade80" strokeWidth="1.2" strokeDasharray="3 2" />
            <circle cx="195" cy="62" r="2.5" fill="#4ade80" />

            <circle cx="165" cy="112" r="22" fill="none" stroke="#22c55e" strokeWidth="1.2" strokeDasharray="3 2" />
            <circle cx="165" cy="112" r="2.5" fill="#22c55e" />
          </g>

          
          <rect x="180" y="24" width="98" height="18" rx="4" fill="#0f172a" fillOpacity="0.85" stroke="#22c55e" strokeWidth="0.8" />
          <text x="186" y="37" fill="#86efac" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
            BLISTER 98.2%
          </text>
        </svg>
      </div>
    );
  }

  if (type === 'grey-blight') {
   
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-[#1c2c1a] via-[#122114] to-[#0c160e] ${className}`}>
        <svg viewBox="0 0 320 180" className="w-full h-full object-cover">
          <defs>
            <radialGradient id="leafGrad2" cx="40%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#437d45" />
              <stop offset="70%" stopColor="#25542b" />
              <stop offset="100%" stopColor="#143317" />
            </radialGradient>
            <radialGradient id="necrotic" cx="48%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#52525b" />
              <stop offset="35%" stopColor="#71717a" />
              <stop offset="65%" stopColor="#3f3f46" />
              <stop offset="85%" stopColor="#27272a" />
              <stop offset="100%" stopColor="#78350f" stopOpacity="0.8" />
            </radialGradient>
            <filter id="glowOrange">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

      
          <path
            d="M 15,90 C 35,35 125,15 225,38 C 295,55 315,90 315,90 C 315,90 275,145 195,160 C 105,170 35,140 15,90 Z"
            fill="url(#leafGrad2)"
            stroke="#4d8b52"
            strokeWidth="1.5"
          />

         
          <path d="M 15,90 Q 160,86 315,90" stroke="#5fa665" strokeWidth="2.8" fill="none" opacity="0.75" />
          <path d="M 75,88 Q 115,55 155,38" stroke="#5fa665" strokeWidth="1.3" fill="none" opacity="0.6" />
          <path d="M 85,91 Q 125,120 165,135" stroke="#5fa665" strokeWidth="1.3" fill="none" opacity="0.6" />

        
          <ellipse cx="160" cy="85" rx="48" ry="36" fill="url(#necrotic)" stroke="#78350f" strokeWidth="1.5" />
          
          <ellipse cx="160" cy="85" rx="36" ry="26" fill="none" stroke="#27272a" strokeWidth="1.2" opacity="0.8" />
          <ellipse cx="160" cy="85" rx="24" ry="17" fill="none" stroke="#3f3f46" strokeWidth="1.4" opacity="0.9" />
          <ellipse cx="160" cy="85" rx="12" ry="8" fill="#18181b" opacity="0.9" />

         
          <ellipse cx="235" cy="72" rx="15" ry="11" fill="url(#necrotic)" stroke="#78350f" strokeWidth="1" />

         
          <g filter="url(#glowOrange)">
            <rect x="104" y="44" width="112" height="82" rx="6" fill="none" stroke="#f97316" strokeWidth="1.6" strokeDasharray="5 3" />
            <circle cx="160" cy="85" r="3" fill="#f97316" />
            <rect x="104" y="32" width="94" height="15" rx="3" fill="#0f172a" fillOpacity="0.9" stroke="#f97316" strokeWidth="0.8" />
            <text x="110" y="43" fill="#fdba74" fontSize="9" fontFamily="monospace" fontWeight="bold">
              PESTALOTIOPSIS 91.4%
            </text>
          </g>
        </svg>
      </div>
    );
  }

  if (type === 'stem-canker') {
  
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-[#241a12] via-[#1a130c] to-[#0f0b07] ${className}`}>
        <svg viewBox="0 0 320 180" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="barkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#452e1f" />
              <stop offset="30%" stopColor="#6e4d36" />
              <stop offset="70%" stopColor="#543a28" />
              <stop offset="100%" stopColor="#362214" />
            </linearGradient>
            <radialGradient id="cankerCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1c0f0a" />
              <stop offset="50%" stopColor="#3d1f14" />
              <stop offset="85%" stopColor="#7c2d12" />
              <stop offset="100%" stopColor="#9a3412" stopOpacity="0" />
            </radialGradient>
            <filter id="glowAmber">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Woody Tea Trunk / Stem */}
          <path
            d="M 110,0 L 130,180 L 195,180 L 180,0 Z"
            fill="url(#barkGrad)"
            stroke="#2e1a0e"
            strokeWidth="1.5"
          />
          {/* Bark texture lines */}
          <path d="M 125,0 L 140,180" stroke="#331f13" strokeWidth="1.5" fill="none" opacity="0.7" />
          <path d="M 145,0 L 155,180" stroke="#805638" strokeWidth="1.2" fill="none" opacity="0.5" />
          <path d="M 165,0 L 175,180" stroke="#2b1a10" strokeWidth="1.5" fill="none" opacity="0.7" />

          {/* Depressed Canker Lesion at Collar */}
          <path
            d="M 130,70 C 120,95 125,120 145,130 C 165,138 180,120 178,95 C 175,72 155,62 130,70 Z"
            fill="url(#cankerCore)"
            stroke="#b45309"
            strokeWidth="1.5"
          />
        
          <path d="M 140,82 Q 148,98 152,118" stroke="#000" strokeWidth="2" fill="none" />
          <path d="M 148,90 Q 160,102 165,112" stroke="#000" strokeWidth="1.5" fill="none" />

          
          <path d="M 40,80 Q 80,60 110,65 Q 90,110 40,80 Z" fill="#2d522f" opacity="0.6" />
          <path d="M 180,60 Q 240,40 270,75 Q 220,105 180,60 Z" fill="#254627" opacity="0.6" />

    
          <g filter="url(#glowAmber)">
            <rect x="115" y="60" width="75" height="78" rx="6" fill="none" stroke="#eab308" strokeWidth="1.6" strokeDasharray="4 2" />
            <circle cx="150" cy="98" r="3" fill="#eab308" />
            <rect x="115" y="46" width="90" height="15" rx="3" fill="#0f172a" fillOpacity="0.9" stroke="#eab308" strokeWidth="0.8" />
            <text x="121" y="57" fill="#fef08a" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
              STEM CANKER 84.0%
            </text>
          </g>
        </svg>
      </div>
    );
  }

  // Chlorotic Mosaic / Mottled leaf
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-[#283818] via-[#1d2b12] to-[#121c0b] ${className}`}>
      <svg viewBox="0 0 320 180" className="w-full h-full object-cover">
        <defs>
          <radialGradient id="mosaicGrad" cx="45%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#9dbf39" />
            <stop offset="35%" stopColor="#b4c734" />
            <stop offset="65%" stopColor="#638023" />
            <stop offset="100%" stopColor="#2e4210" />
          </radialGradient>
          <filter id="glowBlue">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <path
          d="M 25,92 C 45,35 130,22 215,48 C 285,68 305,95 305,95 C 305,95 260,140 185,152 C 105,162 45,135 25,92 Z"
          fill="url(#mosaicGrad)"
          stroke="#8ba432"
          strokeWidth="1.5"
        />

        
        <path d="M 25,92 Q 155,88 305,95" stroke="#486315" strokeWidth="2.5" fill="none" />
        <ellipse cx="120" cy="65" rx="22" ry="14" fill="#fef08a" opacity="0.65" />
        <ellipse cx="170" cy="58" rx="26" ry="16" fill="#facc15" opacity="0.55" />
        <ellipse cx="130" cy="115" rx="20" ry="12" fill="#fef08a" opacity="0.6" />
        <ellipse cx="185" cy="118" rx="24" ry="14" fill="#fef9c3" opacity="0.5" />
        <ellipse cx="230" cy="80" rx="18" ry="12" fill="#facc15" opacity="0.6" />


        <path d="M 215,48 Q 250,55 285,68" stroke="#ca8a04" strokeWidth="2" fill="none" />

        
        <g filter="url(#glowBlue)">
          <rect x="95" y="42" width="135" height="96" rx="6" fill="none" stroke="#38bdf8" strokeWidth="1.6" strokeDasharray="4 2" />
          <circle cx="160" cy="90" r="3" fill="#38bdf8" />
          <rect x="95" y="30" width="112" height="15" rx="3" fill="#0f172a" fillOpacity="0.9" stroke="#38bdf8" strokeWidth="0.8" />
          <text x="101" y="41" fill="#7dd3fc" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
            UNVERIFIED 62.1%
          </text>
        </g>
      </svg>
    </div>
  );
};

import React from "react";

interface KartikaEkaPaksiLogoProps {
  className?: string;
  style?: React.CSSProperties;
}

export const KartikaEkaPaksiLogo: React.FC<KartikaEkaPaksiLogoProps> = ({
  className = "w-10 h-10",
  style,
}) => {
  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <defs>
        {/* Gold Metallic Gradient */}
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF176" />
          <stop offset="25%" stopColor="#FBC02D" />
          <stop offset="50%" stopColor="#F57F17" />
          <stop offset="75%" stopColor="#FBC02D" />
          <stop offset="100%" stopColor="#FFF59D" />
        </linearGradient>

        <linearGradient id="goldDarkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F57F17" />
          <stop offset="50%" stopColor="#E65100" />
          <stop offset="100%" stopColor="#BF360C" />
        </linearGradient>

        <linearGradient id="goldLightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFF59D" />
          <stop offset="50%" stopColor="#FEE074" />
          <stop offset="100%" stopColor="#F57F17" />
        </linearGradient>

        {/* Green Flourish Gradient */}
        <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2E7D32" />
          <stop offset="50%" stopColor="#1B5E20" />
          <stop offset="100%" stopColor="#0D3B11" />
        </linearGradient>

        {/* Shield Red Gradient */}
        <linearGradient id="redShieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E53935" />
          <stop offset="100%" stopColor="#B71C1C" />
        </linearGradient>

        {/* Shield White Gradient */}
        <linearGradient id="whiteShieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E0E0E0" />
        </linearGradient>

        {/* Drop Shadow for 3D realism */}
        <filter id="logoShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.5" />
        </filter>
      </defs>

      <g filter="url(#logoShadow)">
        {/* 1. TOP GOLDEN STAR */}
        <path
          d="M 100,6 L 104.5,20 L 119,20 L 107.2,28.5 L 111.7,42.5 L 100,34 L 88.3,42.5 L 92.8,28.5 L 81,20 L 95.5,20 Z"
          fill="url(#goldGradient)"
          stroke="#9E7D0A"
          strokeWidth="1"
        />

        {/* 2. TAIL FEATHERS (FANNING DOWNWARDS) */}
        <g id="tailFeathers">
          <path d="M 100,180 L 100,230 L 92,228 Z" fill="url(#goldGradient)" stroke="#8D6E03" strokeWidth="0.8" />
          <path d="M 100,180 L 100,230 L 108,228 Z" fill="url(#goldLightGradient)" stroke="#8D6E03" strokeWidth="0.8" />
          <path d="M 100,180 L 88,227 L 78,222 Z" fill="url(#goldGradient)" stroke="#8D6E03" strokeWidth="0.8" />
          <path d="M 100,180 L 112,227 L 122,222 Z" fill="url(#goldLightGradient)" stroke="#8D6E03" strokeWidth="0.8" />
          <path d="M 100,180 L 76,220 L 66,212 Z" fill="url(#goldDarkGradient)" stroke="#8D6E03" strokeWidth="0.8" />
          <path d="M 100,180 L 124,220 L 134,212 Z" fill="url(#goldGradient)" stroke="#8D6E03" strokeWidth="0.8" />
          <path d="M 100,180 L 64,210 L 55,200 Z" fill="url(#goldDarkGradient)" stroke="#8D6E03" strokeWidth="0.8" />
          <path d="M 100,180 L 136,210 L 145,200 Z" fill="url(#goldGradient)" stroke="#8D6E03" strokeWidth="0.8" />
        </g>

        {/* 3. GREEN RIBBON FLOURISHES (LEFT & RIGHT) */}
        <path
          d="M 50,145 C 25,145 20,185 30,205 C 40,215 50,195 45,175 C 40,160 52,150 55,160 C 58,170 52,190 42,205 C 30,220 18,205 18,185 C 18,150 40,138 52,140 Z"
          fill="url(#greenGradient)"
          stroke="#0A2C0D"
          strokeWidth="1"
        />
        <path
          d="M 150,145 C 175,145 180,185 170,205 C 160,215 150,195 155,175 C 160,160 148,150 145,160 C 142,170 148,190 158,205 C 170,220 182,205 182,185 C 182,150 160,138 148,140 Z"
          fill="url(#greenGradient)"
          stroke="#0A2C0D"
          strokeWidth="1"
        />

        {/* 4. LEFT WING (OUTER FEATHERS CURVING UPWARDS) */}
        <g id="leftWing">
          {/* Main Wing Curve Outline */}
          <path
            d="M 80,110 C 60,80 30,50 18,28 C 12,20 20,12 35,16 C 50,20 70,38 88,68 C 82,50 68,32 55,18 C 50,12 58,8 70,14 C 82,20 92,36 100,55 M 78,110 Z"
            fill="url(#goldGradient)"
            stroke="#8D6E03"
            strokeWidth="0.8"
          />
          {/* Feathers Stack Left */}
          <path d="M 22,25 C 28,38 42,58 58,78 L 52,82 C 36,60 22,40 18,28 Z" fill="url(#goldLightGradient)" stroke="#8D6E03" strokeWidth="0.6" />
          <path d="M 28,38 C 36,52 50,72 65,92 L 58,96 C 42,74 28,52 22,38 Z" fill="url(#goldGradient)" stroke="#8D6E03" strokeWidth="0.6" />
          <path d="M 36,52 C 45,68 58,88 72,106 L 65,110 C 50,90 36,68 28,52 Z" fill="url(#goldDarkGradient)" stroke="#8D6E03" strokeWidth="0.6" />
          <path d="M 45,68 C 55,85 68,105 80,120 L 72,124 C 60,108 46,86 36,68 Z" fill="url(#goldGradient)" stroke="#8D6E03" strokeWidth="0.6" />
          <path d="M 55,85 C 65,100 75,118 85,132 L 78,135 C 68,120 58,102 48,85 Z" fill="url(#goldDarkGradient)" stroke="#8D6E03" strokeWidth="0.6" />
        </g>

        {/* 5. RIGHT WING (OUTER FEATHERS CURVING UPWARDS) */}
        <g id="rightWing">
          <path
            d="M 120,110 C 140,80 170,50 182,28 C 188,20 180,12 165,16 C 150,20 130,38 112,68 C 118,50 132,32 145,18 C 150,12 142,8 130,14 C 118,20 108,36 100,55 M 122,110 Z"
            fill="url(#goldGradient)"
            stroke="#8D6E03"
            strokeWidth="0.8"
          />
          <path d="M 178,25 C 172,38 158,58 142,78 L 148,82 C 164,60 178,40 182,28 Z" fill="url(#goldLightGradient)" stroke="#8D6E03" strokeWidth="0.6" />
          <path d="M 172,38 C 164,52 150,72 135,92 L 142,96 C 158,74 172,52 178,38 Z" fill="url(#goldGradient)" stroke="#8D6E03" strokeWidth="0.6" />
          <path d="M 164,52 C 155,68 142,88 128,106 L 135,110 C 150,90 164,68 172,52 Z" fill="url(#goldDarkGradient)" stroke="#8D6E03" strokeWidth="0.6" />
          <path d="M 155,68 C 145,85 132,105 120,120 L 128,124 C 140,108 154,86 164,68 Z" fill="url(#goldGradient)" stroke="#8D6E03" strokeWidth="0.6" />
          <path d="M 145,85 C 135,100 125,118 115,132 L 122,135 C 132,120 142,102 152,85 Z" fill="url(#goldDarkGradient)" stroke="#8D6E03" strokeWidth="0.6" />
        </g>

        {/* 6. EAGLE HEAD & NECK (FACING LEFT) */}
        <g id="eagleHead">
          {/* Neck Feathers */}
          <path
            d="M 85,62 C 80,50 82,38 92,26 C 96,24 100,28 98,32 C 94,36 94,42 98,48 C 102,54 105,62 108,70 L 85,70 Z"
            fill="url(#goldGradient)"
            stroke="#8D6E03"
            strokeWidth="0.8"
          />
          {/* Head Crown */}
          <path
            d="M 92,26 C 88,24 82,26 80,30 C 78,32 76,38 80,40 C 82,41 85,38 88,36 C 86,40 84,45 88,48 C 90,50 94,48 93,44 Z"
            fill="url(#goldLightGradient)"
            stroke="#8D6E03"
            strokeWidth="0.6"
          />
          {/* Sharp Beak */}
          <path
            d="M 82,31 C 76,32 70,36 68,40 C 67,42 70,44 74,43 C 78,42 81,39 83,36 Z"
            fill="url(#goldGradient)"
            stroke="#B78103"
            strokeWidth="1"
          />
          {/* Open Mouth / Tongue */}
          <path d="M 72,41 L 78,44 L 75,45 Z" fill="#D32F2F" />
          {/* Eye */}
          <circle cx="85" cy="33" r="3" fill="#FFFFFF" stroke="#8D6E03" strokeWidth="0.5" />
          <circle cx="85" cy="33" r="1.5" fill="#D32F2F" />
          <circle cx="84.5" cy="32.5" r="0.5" fill="#000000" />
        </g>

        {/* 7. EAGLE BODY & CHEST SHIELD */}
        {/* Eagle Body Base behind Shield */}
        <path
          d="M 70,95 C 65,115 65,145 75,170 C 85,185 115,185 125,170 C 135,145 135,115 130,95 Z"
          fill="url(#goldDarkGradient)"
          stroke="#8D6E03"
          strokeWidth="1"
        />

        {/* SHIELD (RED & WHITE DIAGONAL) */}
        <g id="chestShield">
          {/* Shield Black Rim / Border */}
          <path
            d="M 70,92 L 130,92 L 130,128 C 130,152 100,165 100,165 C 100,165 70,152 70,128 Z"
            fill="#1A1A1A"
            stroke="#FFD54F"
            strokeWidth="2"
          />
          {/* Inner Shield Clip Area */}
          <path
            d="M 73,95 L 127,95 L 127,126 C 127,148 100,160 100,160 C 100,160 73,148 73,126 Z"
            fill="url(#whiteShieldGradient)"
          />
          {/* Red Top-Left Diagonal Half */}
          <path
            d="M 73,95 L 127,95 L 73,148 Z"
            fill="url(#redShieldGradient)"
          />
          {/* Inner Shield Outline */}
          <path
            d="M 73,95 L 127,95 L 127,126 C 127,148 100,160 100,160 C 100,160 73,148 73,126 Z"
            fill="none"
            stroke="#262626"
            strokeWidth="1.5"
          />
        </g>

        {/* 8. EAGLE TALONS GRASPING BANNER */}
        <g id="talons">
          {/* Left Claw */}
          <path d="M 62,172 C 58,175 52,185 58,188 C 62,189 65,182 66,176 Z" fill="url(#goldGradient)" stroke="#8D6E03" strokeWidth="0.8" />
          <path d="M 68,173 C 65,178 62,188 68,190 C 72,191 73,183 72,176 Z" fill="url(#goldGradient)" stroke="#8D6E03" strokeWidth="0.8" />
          <path d="M 74,173 C 72,178 72,188 77,188 C 80,188 79,181 77,175 Z" fill="url(#goldGradient)" stroke="#8D6E03" strokeWidth="0.8" />

          {/* Right Claw */}
          <path d="M 138,172 C 142,175 148,185 142,188 C 138,189 135,182 134,176 Z" fill="url(#goldGradient)" stroke="#8D6E03" strokeWidth="0.8" />
          <path d="M 132,173 C 135,178 138,188 132,190 C 128,191 127,183 128,176 Z" fill="url(#goldGradient)" stroke="#8D6E03" strokeWidth="0.8" />
          <path d="M 126,173 C 128,178 128,188 123,188 C 120,188 121,181 123,175 Z" fill="url(#goldGradient)" stroke="#8D6E03" strokeWidth="0.8" />
        </g>

        {/* 9. WHITE RIBBON BANNER & TEXT "KARTIKA EKA PAKSI" */}
        <g id="bannerRibbon">
          {/* Ribbon Shadow Back folds */}
          <path d="M 38,188 L 48,182 L 48,196 L 38,202 Z" fill="#D5D5D5" stroke="#757575" strokeWidth="0.8" />
          <path d="M 162,188 L 152,182 L 152,196 L 162,202 Z" fill="#D5D5D5" stroke="#757575" strokeWidth="0.8" />

          {/* Main Curved White Ribbon */}
          <path
            d="M 40,185 C 70,192 130,192 160,185 C 165,184 165,198 160,200 C 130,208 70,208 40,200 C 35,198 35,184 40,185 Z"
            fill="url(#whiteShieldGradient)"
            stroke="#424242"
            strokeWidth="1.2"
          />

          {/* Text "KARTIKA EKA PAKSI" */}
          <text
            x="100"
            y="197"
            fontFamily="'Cinzel', 'Times New Roman', 'Georgia', serif"
            fontSize="8.5"
            fontWeight="900"
            fill="#111111"
            textAnchor="middle"
            letterSpacing="0.6"
          >
            KARTIKA EKA PAKSI
          </text>
        </g>
      </g>
    </svg>
  );
};

import React from "react";

interface KartikaEkaPaksiLogoProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Official Logo Kartika Eka Paksi (TNI AD)
 * Vector representation matching official emblem specifications:
 * - Golden 5-pointed faceted star on top
 * - Upward curving gold eagle wings with distinct feathering
 * - Eagle head facing left with open beak, red tongue, red eye
 * - Red & White shield (Perisai Sang Saka)
 * - Green side scrollwork / flourishes
 * - White ribbon with "KARTIKA EKA PAKSI" text
 * - Fan-shaped tail feathers
 * - Crisp black outlines for maximum clarity on any background
 */
export const KartikaEkaPaksiLogo: React.FC<KartikaEkaPaksiLogoProps> = ({
  className = "w-10 h-12",
  style,
}) => {
  return (
    <svg
      viewBox="0 0 500 680"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <defs>
        <style>{`
          .kep-black-stroke { stroke: #000000; stroke-width: 3.5; stroke-linejoin: round; stroke-linecap: round; }
          .kep-thin-stroke { stroke: #000000; stroke-width: 2; stroke-linejoin: round; stroke-linecap: round; }
          .kep-gold { fill: #FFCC00; }
          .kep-gold-light { fill: #FFE680; }
          .kep-gold-dark { fill: #E6A100; }
          .kep-red { fill: #D32F2F; }
          .kep-white { fill: #FFFFFF; }
          .kep-green { fill: #1B5E20; }
        `}</style>
      </defs>

      <g id="KartikaEkaPaksiLogo">
        {/* ================= 1. GREEN SIDE FLOURISHES (BEHIND TAIL & WINGS) ================= */}
        <g id="greenScrollwork">
          {/* Left Green Scroll */}
          <path
            d="M 175,410 C 130,370 70,390 60,450 C 50,510 90,560 120,580 C 140,590 160,570 155,540 C 150,510 120,490 100,470 C 80,450 90,420 125,415 C 150,410 165,430 170,450 Z"
            className="kep-green kep-black-stroke"
          />
          <path
            d="M 85,465 C 75,510 110,545 135,550"
            fill="none"
            className="kep-black-stroke"
          />

          {/* Right Green Scroll */}
          <path
            d="M 325,410 C 370,370 430,390 440,450 C 450,510 410,560 380,580 C 360,590 340,570 345,540 C 350,510 380,490 400,470 C 420,450 410,420 375,415 C 350,410 335,430 330,450 Z"
            className="kep-green kep-black-stroke"
          />
          <path
            d="M 415,465 C 425,510 390,545 365,550"
            fill="none"
            className="kep-black-stroke"
          />
        </g>

        {/* ================= 2. FAN TAIL FEATHERS (7 FEATHERS) ================= */}
        <g id="tailFeathers">
          {/* Central Feather */}
          <path
            d="M 230,460 L 220,660 C 220,670 280,670 280,660 L 270,460 Z"
            className="kep-gold kep-black-stroke"
          />
          <path d="M 250,460 L 250,665" fill="none" className="kep-thin-stroke" />

          {/* Inner Left Feather */}
          <path
            d="M 225,460 L 175,640 C 170,650 225,665 235,655 L 245,460 Z"
            className="kep-gold kep-black-stroke"
          />
          <path d="M 235,460 L 200,645" fill="none" className="kep-thin-stroke" />

          {/* Inner Right Feather */}
          <path
            d="M 275,460 L 325,640 C 330,650 275,665 265,655 L 255,460 Z"
            className="kep-gold kep-black-stroke"
          />
          <path d="M 265,460 L 300,645" fill="none" className="kep-thin-stroke" />

          {/* Middle Left Feather */}
          <path
            d="M 220,460 L 135,605 C 130,615 180,635 195,625 L 235,460 Z"
            className="kep-gold kep-black-stroke"
          />
          <path d="M 225,460 L 155,612" fill="none" className="kep-thin-stroke" />

          {/* Middle Right Feather */}
          <path
            d="M 280,460 L 365,605 C 370,615 320,635 305,625 L 265,460 Z"
            className="kep-gold kep-black-stroke"
          />
          <path d="M 275,460 L 345,612" fill="none" className="kep-thin-stroke" />

          {/* Outer Left Feather */}
          <path
            d="M 215,460 L 105,550 C 100,560 145,585 160,575 L 225,460 Z"
            className="kep-gold kep-black-stroke"
          />

          {/* Outer Right Feather */}
          <path
            d="M 285,460 L 395,550 C 400,560 355,585 340,575 L 275,460 Z"
            className="kep-gold kep-black-stroke"
          />
        </g>

        {/* ================= 3. LEFT WING (CURVING HIGH UPWARDS) ================= */}
        <g id="leftWing">
          {/* Main Outer Left Wing Shell */}
          <path
            d="M 210,320 C 160,260 80,180 40,80 C 35,65 50,45 80,55 C 110,65 150,110 200,200 C 170,140 120,80 90,40 C 85,30 100,15 125,25 C 150,35 190,90 225,170 C 210,120 180,70 150,25 C 145,15 160,5 185,15 C 210,25 240,90 250,140 Z"
            className="kep-gold kep-black-stroke"
          />

          {/* Individual Feather Layer Lines (Left) */}
          <path d="M 50,75 C 80,110 130,180 180,240" fill="none" className="kep-black-stroke" />
          <path d="M 65,100 C 95,135 140,200 185,255" fill="none" className="kep-black-stroke" />
          <path d="M 80,125 C 110,160 150,220 190,270" fill="none" className="kep-black-stroke" />
          <path d="M 95,150 C 125,185 160,240 195,285" fill="none" className="kep-black-stroke" />
          <path d="M 110,175 C 135,205 170,255 200,300" fill="none" className="kep-black-stroke" />
          <path d="M 125,200 C 145,225 175,270 205,310" fill="none" className="kep-black-stroke" />
          <path d="M 140,225 C 160,250 185,285 210,320" fill="none" className="kep-black-stroke" />

          {/* Inner Wing Horizontal Layer Cuts */}
          <path d="M 155,100 C 180,120 210,150 230,180" fill="none" className="kep-thin-stroke" />
          <path d="M 140,125 C 165,145 195,175 220,205" fill="none" className="kep-thin-stroke" />
          <path d="M 125,150 C 150,170 180,200 205,230" fill="none" className="kep-thin-stroke" />
        </g>

        {/* ================= 4. RIGHT WING (CURVING HIGH UPWARDS) ================= */}
        <g id="rightWing">
          {/* Main Outer Right Wing Shell */}
          <path
            d="M 290,320 C 340,260 420,180 460,80 C 465,65 450,45 420,55 C 390,65 350,110 300,200 C 330,140 380,80 410,40 C 415,30 400,15 375,25 C 350,35 310,90 275,170 C 290,120 320,70 350,25 C 355,15 340,5 315,15 C 290,25 260,90 250,140 Z"
            className="kep-gold kep-black-stroke"
          />

          {/* Individual Feather Layer Lines (Right) */}
          <path d="M 450,75 C 420,110 370,180 320,240" fill="none" className="kep-black-stroke" />
          <path d="M 435,100 C 405,135 360,200 315,255" fill="none" className="kep-black-stroke" />
          <path d="M 420,125 C 390,160 350,220 310,270" fill="none" className="kep-black-stroke" />
          <path d="M 405,150 C 375,185 340,240 305,285" fill="none" className="kep-black-stroke" />
          <path d="M 390,175 C 365,205 330,255 300,300" fill="none" className="kep-black-stroke" />
          <path d="M 375,200 C 355,225 325,270 295,310" fill="none" className="kep-black-stroke" />
          <path d="M 360,225 C 340,250 315,285 290,320" fill="none" className="kep-black-stroke" />

          {/* Inner Wing Horizontal Layer Cuts */}
          <path d="M 345,100 C 320,120 290,150 270,180" fill="none" className="kep-thin-stroke" />
          <path d="M 360,125 C 335,145 305,175 280,205" fill="none" className="kep-thin-stroke" />
          <path d="M 375,150 C 350,170 320,200 295,230" fill="none" className="kep-thin-stroke" />
        </g>

        {/* ================= 5. EAGLE HEAD & NECK (FACING LEFT) ================= */}
        <g id="eagleHead">
          {/* Neck Feathers Jagged Outline */}
          <path
            d="M 215,180 C 200,165 205,145 220,130 C 210,125 210,115 225,105 C 215,100 220,85 235,75 C 240,65 250,60 255,75 C 265,85 270,100 275,120 C 280,140 280,165 275,180 Z"
            className="kep-gold kep-black-stroke"
          />

          {/* Jagged Neck Feather Texture Lines */}
          <path d="M 230,135 L 220,145 L 235,155 L 225,165 L 240,175" fill="none" className="kep-black-stroke" />
          <path d="M 245,115 L 235,125 L 250,135 L 240,145 L 255,155" fill="none" className="kep-black-stroke" />

          {/* Sharp Open Beak Facing Left */}
          <path
            d="M 222,118 C 205,112 190,125 185,135 C 180,140 192,148 202,145 C 212,142 220,132 222,128 Z"
            className="kep-gold kep-black-stroke"
          />
          {/* Open Beak Mouth / Tongue */}
          <path
            d="M 190,138 C 196,142 204,143 208,140"
            fill="none"
            className="kep-black-stroke"
          />
          <path d="M 193,138 C 198,136 202,140 198,142 Z" className="kep-red" />

          {/* Eye */}
          <circle cx="225" cy="115" r="7" className="kep-white kep-thin-stroke" />
          <circle cx="224" cy="115" r="4" className="kep-red" />
          <circle cx="223" cy="114" r="1.5" fill="#000000" />
        </g>

        {/* ================= 6. EAGLE FEET / LEGS & CLAWS ================= */}
        <g id="eagleLegs">
          {/* Left Leg Feathers & Claws */}
          <path
            d="M 180,380 C 170,410 160,440 175,465 C 185,470 200,460 195,445 C 190,430 195,400 205,380 Z"
            className="kep-gold kep-black-stroke"
          />
          {/* Claws Left */}
          <path d="M 165,455 C 155,465 150,480 165,485 C 175,480 170,465 170,455 Z" className="kep-gold kep-black-stroke" />
          <path d="M 175,458 C 170,470 170,488 182,488 C 188,480 180,465 178,458 Z" className="kep-gold kep-black-stroke" />
          <path d="M 185,458 C 185,470 190,488 200,485 C 202,475 192,465 188,458 Z" className="kep-gold kep-black-stroke" />

          {/* Right Leg Feathers & Claws */}
          <path
            d="M 320,380 C 330,410 340,440 325,465 C 315,470 300,460 305,445 C 310,430 305,400 295,380 Z"
            className="kep-gold kep-black-stroke"
          />
          {/* Claws Right */}
          <path d="M 335,455 C 345,465 350,480 335,485 C 325,480 330,465 330,455 Z" className="kep-gold kep-black-stroke" />
          <path d="M 325,458 C 330,470 330,488 318,488 C 312,480 320,465 322,458 Z" className="kep-gold kep-black-stroke" />
          <path d="M 315,458 C 315,470 310,488 300,485 C 298,475 308,465 312,458 Z" className="kep-gold kep-black-stroke" />
        </g>

        {/* ================= 7. CHEST SHIELD (PERISAI MERAH PUTIH) ================= */}
        <g id="chestShield">
          {/* Shield Outer Outline with Black Border */}
          <path
            d="M 175,230 L 325,230 L 325,350 C 325,410 250,445 250,445 C 250,445 175,410 175,350 Z"
            className="kep-white kep-black-stroke"
            style={{ strokeWidth: 5 }}
          />
          {/* Top-Left Red Diagonal Split */}
          <path
            d="M 177,232 L 323,232 L 177,418 Z"
            className="kep-red"
          />
          {/* Inner Diagonal Dividing Line */}
          <path
            d="M 323,232 L 177,418"
            fill="none"
            className="kep-black-stroke"
          />
          {/* Shield Re-stroke for crisp edge */}
          <path
            d="M 175,230 L 325,230 L 325,350 C 325,410 250,445 250,445 C 250,445 175,410 175,350 Z"
            fill="none"
            className="kep-black-stroke"
            style={{ strokeWidth: 5 }}
          />
        </g>

        {/* ================= 8. WHITE BANNER RIBBON & TEXT ================= */}
        <g id="bannerRibbon">
          {/* Folded Ribbon Back Tails */}
          <path d="M 85,485 L 120,470 L 120,510 L 85,525 Z" className="kep-white kep-black-stroke" />
          <path d="M 415,485 L 380,470 L 380,510 L 415,525 Z" className="kep-white kep-black-stroke" />

          {/* Main Front Curved Banner */}
          <path
            d="M 95,480 C 180,498 320,498 405,480 C 418,477 420,520 405,525 C 320,545 180,545 95,525 C 80,520 82,477 95,480 Z"
            className="kep-white kep-black-stroke"
            style={{ strokeWidth: 4 }}
          />

          {/* Banner Text: KARTIKA EKA PAKSI */}
          <text
            x="250"
            y="511"
            fontFamily="'Times New Roman', 'Cinzel', 'Georgia', 'serif'"
            fontSize="25"
            fontWeight="900"
            fill="#000000"
            textAnchor="middle"
            letterSpacing="2"
          >
            KARTIKA EKA PAKSI
          </text>
        </g>

        {/* ================= 9. TOP GOLDEN STAR (BINTANG EMAS SISI LIMA) ================= */}
        <g id="topStar">
          {/* Faceted 5-point Star */}
          {/* Star Outline Base */}
          <polygon
            points="250,15 261,48 296,48 268,69 278,102 250,82 222,102 232,69 204,48 239,48"
            className="kep-gold kep-black-stroke"
            style={{ strokeWidth: 3.5 }}
          />

          {/* Faceted Triangular Halves */}
          <polygon points="250,15 250,82 261,48" className="kep-gold-light" />
          <polygon points="250,15 250,82 239,48" className="kep-gold-dark" />
          <polygon points="296,48 250,82 268,69" className="kep-gold-light" />
          <polygon points="204,48 250,82 232,69" className="kep-gold-dark" />
          <polygon points="278,102 250,82 250,82" className="kep-gold-light" />
          <polygon points="222,102 250,82 250,82" className="kep-gold-dark" />

          {/* Facet Lines from Center */}
          <path d="M 250,15 L 250,82" fill="none" className="kep-thin-stroke" />
          <path d="M 296,48 L 250,82" fill="none" className="kep-thin-stroke" />
          <path d="M 278,102 L 250,82" fill="none" className="kep-thin-stroke" />
          <path d="M 222,102 L 250,82" fill="none" className="kep-thin-stroke" />
          <path d="M 204,48 L 250,82" fill="none" className="kep-thin-stroke" />

          {/* Star Outer Re-stroke */}
          <polygon
            points="250,15 261,48 296,48 268,69 278,102 250,82 222,102 232,69 204,48 239,48"
            fill="none"
            className="kep-black-stroke"
            style={{ strokeWidth: 3.5 }}
          />
        </g>
      </g>
    </svg>
  );
};

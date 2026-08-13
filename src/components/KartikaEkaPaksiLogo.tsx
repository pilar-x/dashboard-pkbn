import React from "react";

interface KartikaEkaPaksiLogoProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Official Logo Kartika Eka Paksi (TNI AD)
 * Vector representation matching official emblem specifications:
 * - Golden 5-pointed faceted star on top
 * - Wide upward curving gold eagle wings with distinct feathering
 * - Eagle head facing left with open beak, red tongue, red eye
 * - Red & White shield (Perisai Sang Saka)
 * - Green side scrollwork / flourishes
 * - White ribbon with "KARTIKA EKA PAKSI" text
 * - Fan-shaped tail feathers
 * - Crisp black outlines for maximum clarity on any background
 */
export const KartikaEkaPaksiLogo: React.FC<KartikaEkaPaksiLogoProps> = ({
  className = "h-12 w-auto",
  style,
}) => {
  return (
    <svg
      viewBox="0 0 500 640"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <defs>
        <style>{`
          .kep-stroke { stroke: #000000; stroke-width: 4; stroke-linejoin: round; stroke-linecap: round; }
          .kep-stroke-thin { stroke: #000000; stroke-width: 2.5; stroke-linejoin: round; stroke-linecap: round; }
          .kep-gold { fill: #FACC15; }
          .kep-gold-light { fill: #FEF08A; }
          .kep-gold-dark { fill: #EAB308; }
          .kep-red { fill: #DC2626; }
          .kep-white { fill: #FFFFFF; }
          .kep-green { fill: #15803D; }
        `}</style>
      </defs>

      <g id="KartikaEkaPaksiLogo">
        {/* ================= 1. GREEN SIDE FLOURISHES ================= */}
        <g id="greenFlourishes">
          {/* Left Green Scroll */}
          <path
            d="M 180,420 C 130,380 60,400 50,460 C 40,520 80,570 120,580 C 145,585 160,560 150,535 C 140,510 110,490 95,470 C 80,450 90,425 120,425 C 145,425 165,445 175,465 Z"
            className="kep-green kep-stroke"
          />
          {/* Right Green Scroll */}
          <path
            d="M 320,420 C 370,380 440,400 450,460 C 460,520 420,570 380,580 C 355,585 340,560 350,535 C 360,510 390,490 405,470 C 420,450 410,425 380,425 C 355,425 335,445 325,465 Z"
            className="kep-green kep-stroke"
          />
        </g>

        {/* ================= 2. FAN TAIL FEATHERS ================= */}
        <g id="tailFeathers">
          {/* Central Feather */}
          <path d="M 235,450 L 225,620 C 225,630 275,630 275,620 L 265,450 Z" className="kep-gold kep-stroke" />
          <path d="M 250,450 L 250,625" fill="none" className="kep-stroke-thin" />

          {/* Inner Left Feather */}
          <path d="M 230,450 L 180,605 C 175,615 225,625 235,615 L 245,450 Z" className="kep-gold kep-stroke" />
          <path d="M 238,450 L 205,610" fill="none" className="kep-stroke-thin" />

          {/* Inner Right Feather */}
          <path d="M 270,450 L 320,605 C 325,615 275,625 265,615 L 255,450 Z" className="kep-gold kep-stroke" />
          <path d="M 262,450 L 295,610" fill="none" className="kep-stroke-thin" />

          {/* Middle Left Feather */}
          <path d="M 225,450 L 140,575 C 135,585 180,605 195,595 L 235,450 Z" className="kep-gold kep-stroke" />

          {/* Middle Right Feather */}
          <path d="M 275,450 L 360,575 C 365,585 320,605 305,595 L 265,450 Z" className="kep-gold kep-stroke" />

          {/* Outer Left Feather */}
          <path d="M 220,450 L 105,530 C 100,540 140,560 155,550 L 225,450 Z" className="kep-gold kep-stroke" />

          {/* Outer Right Feather */}
          <path d="M 280,450 L 395,530 C 400,540 360,560 345,550 L 275,450 Z" className="kep-gold kep-stroke" />
        </g>

        {/* ================= 3. LEFT WING (MAJESTIC WIDE OUTWARD SWEEP) ================= */}
        <g id="leftWing">
          {/* Main Outer Wing Shape */}
          <path
            d="M 210,340 C 140,320 50,220 20,100 C 15,80 35,50 65,60 C 95,70 140,120 180,200 C 150,140 100,70 80,40 C 75,25 95,15 120,25 C 145,35 180,100 215,180 C 190,120 160,60 145,30 C 140,15 160,5 180,15 C 200,25 220,80 230,130 C 235,150 240,180 245,210 Z"
            className="kep-gold kep-stroke"
          />

          {/* Wing Feather Cuts & Layer Lines */}
          <path d="M 30,100 C 70,140 120,200 170,260" fill="none" className="kep-stroke" />
          <path d="M 45,125 C 85,165 135,225 180,280" fill="none" className="kep-stroke" />
          <path d="M 60,150 C 100,190 145,245 190,295" fill="none" className="kep-stroke" />
          <path d="M 75,175 C 115,215 155,265 200,310" fill="none" className="kep-stroke" />
          <path d="M 90,200 C 125,235 165,280 205,325" fill="none" className="kep-stroke" />

          <path d="M 125,75 C 155,100 190,140 215,185" fill="none" className="kep-stroke-thin" />
          <path d="M 140,105 C 170,130 200,165 222,205" fill="none" className="kep-stroke-thin" />
        </g>

        {/* ================= 4. RIGHT WING (MAJESTIC WIDE OUTWARD SWEEP) ================= */}
        <g id="rightWing">
          {/* Main Outer Wing Shape */}
          <path
            d="M 290,340 C 360,320 450,220 480,100 C 485,80 465,50 435,60 C 405,70 360,120 320,200 C 350,140 400,70 420,40 C 425,25 405,15 380,25 C 355,35 320,100 285,180 C 310,120 340,60 355,30 C 360,15 340,5 320,15 C 300,25 280,80 270,130 C 265,150 260,180 255,210 Z"
            className="kep-gold kep-stroke"
          />

          {/* Wing Feather Cuts & Layer Lines */}
          <path d="M 470,100 C 430,140 380,200 330,260" fill="none" className="kep-stroke" />
          <path d="M 455,125 C 415,165 365,225 320,280" fill="none" className="kep-stroke" />
          <path d="M 440,150 C 400,190 355,245 310,295" fill="none" className="kep-stroke" />
          <path d="M 425,175 C 385,215 345,265 300,310" fill="none" className="kep-stroke" />
          <path d="M 410,200 C 375,235 335,280 295,325" fill="none" className="kep-stroke" />

          <path d="M 375,75 C 345,100 310,140 285,185" fill="none" className="kep-stroke-thin" />
          <path d="M 360,105 C 330,130 300,165 278,205" fill="none" className="kep-stroke-thin" />
        </g>

        {/* ================= 5. EAGLE HEAD & NECK (CENTERED & FACING LEFT) ================= */}
        <g id="eagleHead">
          {/* Golden Neck with Jagged Feathers */}
          <path
            d="M 220,200 C 210,180 215,160 228,145 C 220,140 220,128 235,118 C 228,110 235,95 248,85 C 255,80 265,85 270,100 C 278,120 282,150 275,200 Z"
            className="kep-gold kep-stroke"
          />

          {/* Jagged Neck Texture */}
          <path d="M 235,145 L 225,155 L 240,165 L 230,175 L 245,185" fill="none" className="kep-stroke-thin" />
          <path d="M 250,125 L 240,135 L 255,145 L 245,155 L 260,165" fill="none" className="kep-stroke-thin" />

          {/* Sharp Open Beak Facing Left */}
          <path
            d="M 228,122 C 210,118 192,130 188,140 C 182,145 196,152 208,148 C 218,145 226,135 228,130 Z"
            className="kep-gold kep-stroke"
          />

          {/* Open Mouth / Red Tongue */}
          <path d="M 195,142 C 200,140 205,144 200,146 Z" className="kep-red" />

          {/* Eye */}
          <circle cx="230" cy="118" r="6" className="kep-white kep-stroke-thin" />
          <circle cx="229" cy="118" r="3.5" className="kep-red" />
          <circle cx="228" cy="117" r="1.5" fill="#000000" />
        </g>

        {/* ================= 6. EAGLE FEET & CLAWS ================= */}
        <g id="eagleLegs">
          {/* Left Leg */}
          <path
            d="M 180,380 C 170,410 160,430 170,450 C 180,455 195,445 190,430 C 185,415 190,395 200,380 Z"
            className="kep-gold kep-stroke"
          />
          {/* Left Claws */}
          <path d="M 160,440 C 150,450 148,465 160,470 C 170,465 168,450 165,440 Z" className="kep-gold kep-stroke" />
          <path d="M 170,442 C 165,455 165,472 178,472 C 182,465 178,450 175,442 Z" className="kep-gold kep-stroke" />

          {/* Right Leg */}
          <path
            d="M 320,380 C 330,410 340,430 330,450 C 320,455 305,445 310,430 C 315,415 310,395 300,380 Z"
            className="kep-gold kep-stroke"
          />
          {/* Right Claws */}
          <path d="M 340,440 C 350,450 352,465 340,470 C 330,465 332,450 335,440 Z" className="kep-gold kep-stroke" />
          <path d="M 330,442 C 335,455 335,472 322,472 C 318,465 322,450 325,442 Z" className="kep-gold kep-stroke" />
        </g>

        {/* ================= 7. CHEST SHIELD (PERISAI SANG SAKA MERAH PUTIH) ================= */}
        <g id="chestShield">
          {/* Shield Outer Outline */}
          <path
            d="M 180,240 L 320,240 L 320,350 C 320,405 250,440 250,440 C 250,440 180,405 180,350 Z"
            className="kep-white kep-stroke"
            style={{ strokeWidth: 5 }}
          />

          {/* Top-Left Red Diagonal Split */}
          <path d="M 182,242 L 318,242 L 182,412 Z" className="kep-red" />

          {/* Diagonal Line */}
          <path d="M 318,242 L 182,412" fill="none" className="kep-stroke" />

          {/* Re-stroke Shield Border */}
          <path
            d="M 180,240 L 320,240 L 320,350 C 320,405 250,440 250,440 C 250,440 180,405 180,350 Z"
            fill="none"
            className="kep-stroke"
            style={{ strokeWidth: 5 }}
          />
        </g>

        {/* ================= 8. BANNER RIBBON & TEXT ================= */}
        <g id="bannerRibbon">
          {/* Ribbon Tails Folded */}
          <path d="M 75,470 L 110,455 L 110,495 L 75,510 Z" className="kep-white kep-stroke" />
          <path d="M 425,470 L 390,455 L 390,495 L 425,510 Z" className="kep-white kep-stroke" />

          {/* Front Curved Ribbon */}
          <path
            d="M 85,465 C 170,482 330,482 415,465 C 428,462 428,505 415,510 C 330,530 170,530 85,510 C 72,505 72,462 85,465 Z"
            className="kep-white kep-stroke"
            style={{ strokeWidth: 4.5 }}
          />

          {/* Text: KARTIKA EKA PAKSI */}
          <text
            x="250"
            y="496"
            fontFamily="'Times New Roman', 'Georgia', 'serif'"
            fontSize="24"
            fontWeight="900"
            fill="#000000"
            textAnchor="middle"
            letterSpacing="2.5"
          >
            KARTIKA EKA PAKSI
          </text>
        </g>

        {/* ================= 9. TOP GOLDEN STAR (STANDS PROUDLY AT TOP) ================= */}
        <g id="topStar">
          <polygon
            points="250,10 262,42 296,42 268,62 278,95 250,75 222,95 232,62 204,42 238,42"
            className="kep-gold kep-stroke"
            style={{ strokeWidth: 3.5 }}
          />

          {/* Star Facets */}
          <polygon points="250,10 250,75 262,42" className="kep-gold-light" />
          <polygon points="250,10 250,75 238,42" className="kep-gold-dark" />
          <polygon points="296,42 250,75 268,62" className="kep-gold-light" />
          <polygon points="204,42 250,75 232,62" className="kep-gold-dark" />
          <polygon points="278,95 250,75 250,75" className="kep-gold-light" />
          <polygon points="222,95 250,75 250,75" className="kep-gold-dark" />

          {/* Facet Lines */}
          <path d="M 250,10 L 250,75" fill="none" className="kep-stroke-thin" />
          <path d="M 296,42 L 250,75" fill="none" className="kep-stroke-thin" />
          <path d="M 278,95 L 250,75" fill="none" className="kep-stroke-thin" />
          <path d="M 222,95 L 250,75" fill="none" className="kep-stroke-thin" />
          <path d="M 204,42 L 250,75" fill="none" className="kep-stroke-thin" />

          {/* Star Re-stroke */}
          <polygon
            points="250,10 262,42 296,42 268,62 278,95 250,75 222,95 232,62 204,42 238,42"
            fill="none"
            className="kep-stroke"
            style={{ strokeWidth: 3.5 }}
          />
        </g>
      </g>
    </svg>
  );
};

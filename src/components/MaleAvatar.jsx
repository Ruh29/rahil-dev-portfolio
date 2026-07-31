import React from "react";

// Premium Manhwa/Anime Webtoon style Male Avatar for Rahil
export default function MaleAvatar({ size = 280, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 280 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Gradients */}
        <radialGradient id="animeBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#12082e" />
          <stop offset="100%" stopColor="#05020f" />
        </radialGradient>
        
        <radialGradient id="skinGrad" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#fffbf7" />
          <stop offset="65%" stopColor="#ffede2" />
          <stop offset="100%" stopColor="#f3c2ab" />
        </radialGradient>

        <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e2029" />
          <stop offset="70%" stopColor="#111218" />
          <stop offset="100%" stopColor="#08090d" />
        </linearGradient>

        <linearGradient id="eyeIris" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00f5ff" />
          <stop offset="60%" stopColor="#0d5f8a" />
          <stop offset="100%" stopColor="#051c2c" />
        </linearGradient>

        <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1d1e26" />
          <stop offset="50%" stopColor="#121319" />
          <stop offset="100%" stopColor="#0a0a0d" />
        </linearGradient>

        <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00f5ff" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>

        <filter id="neonFilter">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <clipPath id="avatarClip">
          <circle cx="140" cy="140" r="132" />
        </clipPath>
      </defs>

      {/* Background Circle */}
      <circle cx="140" cy="140" r="136" fill="url(#animeBg)" />
      <circle cx="140" cy="140" r="136" fill="none" stroke="url(#neonGlow)" strokeWidth="2" opacity="0.7" />

      {/* Grid Backdrop */}
      <g opacity="0.08" clipPath="url(#avatarClip)">
        <path d="M 0 40 L 280 40 M 0 80 L 280 80 M 0 120 L 280 120 M 0 160 L 280 160 M 0 200 L 280 200 M 0 240 L 280 240" stroke="#00f5ff" strokeWidth="0.5" />
        <path d="M 40 0 L 40 280 M 80 0 L 80 280 M 120 0 L 120 280 M 160 0 L 160 280 M 200 0 L 200 280 M 240 0 L 240 280" stroke="#00f5ff" strokeWidth="0.5" />
      </g>

      <g clipPath="url(#avatarClip)">
        {/* Neck */}
        <path d="M122 165 L122 210 Q140 220 158 210 L158 165 Z" fill="url(#skinGrad)" />
        <path d="M122 176 Q140 186 158 176" fill="#efa995" opacity="0.45" />

        {/* Outfit - White Collared Shirt */}
        <path d="M106 215 L174 215 L182 280 L98 280 Z" fill="#ffffff" />
        {/* Left Collar leaf */}
        <path d="M108 214 L130 242 L136 214 Z" fill="#f2f2f5" stroke="#dbdbe3" strokeWidth="1" />
        {/* Right Collar leaf */}
        <path d="M172 214 L150 242 L144 214 Z" fill="#f2f2f5" stroke="#dbdbe3" strokeWidth="1" />

        {/* Blue/Cyan futuristic Tie */}
        <g>
          {/* Main tie shape */}
          <path d="M136 230 L144 230 L150 280 L130 280 Z" fill="#00b5cc" />
          {/* Dark stripes */}
          <path d="M136 238 L142 233 L144 238 L138 243 Z" fill="#121319" />
          <path d="M134 250 L145 242 L147 248 L136 256 Z" fill="#121319" />
          <path d="M132 263 L148 251 L151 257 L134 269 Z" fill="#121319" />
          <path d="M130 276 L151 260 L152 266 L131 280 Z" fill="#121319" />
          {/* Tie Knot */}
          <path d="M135 223 L145 223 L142 234 L138 234 Z" fill="#0090a3" stroke="#005d6b" strokeWidth="0.5" />
        </g>

        {/* Outfit - Suit Blazer (Dark Charcoal/Black) */}
        <path d="M68 240 C68 240 82 212 110 212 L170 212 C198 212 212 240 212 240 L232 280 L48 280 Z" fill="url(#suitGrad)" />
        {/* Lapels */}
        <path d="M83 240 L110 212 L124 255 Z" fill="#181920" stroke="#0e0f14" strokeWidth="0.75" />
        <path d="M197 240 L170 212 L156 255 Z" fill="#181920" stroke="#0e0f14" strokeWidth="0.75" />

        {/* Sharp Masculine Face Structure */}
        <path d="M94 125 C94 172 106 195 140 207 C174 195 186 172 186 125 C186 88 172 88 140 88 C108 88 94 88 94 125 Z" fill="url(#skinGrad)" />

        {/* Ears */}
        <path d="M94 125 C88 125 84 135 88 145 C90 148 94 148 94 145 Z" fill="url(#skinGrad)" />
        <path d="M186 125 C192 125 196 135 192 145 C190 148 186 148 186 145 Z" fill="url(#skinGrad)" />

        {/* Sharp Manhwa Eyes (Masculine / Cool) */}
        {/* Left Eye */}
        <g>
          {/* Sclera */}
          <path d="M105 140 C105 135 121 135 125 140 C125 143 105 143 105 140 Z" fill="#ffffff" />
          {/* Iris */}
          <ellipse cx="115.5" cy="140.5" rx="6.5" ry="7.5" fill="url(#eyeIris)" />
          {/* Pupil */}
          <ellipse cx="115.5" cy="141" rx="3" ry="3.8" fill="#040507" />
          {/* Glare/Catchlights */}
          <circle cx="113.5" cy="138" r="1.8" fill="#ffffff" />
          <circle cx="117.5" cy="143" r="0.8" fill="#ffffff" opacity="0.8" />
          {/* Eyeliner & Wing - Sharp & Cool */}
          <path d="M102 138 C108 132 120 132 127 137" stroke="#0e0f14" strokeWidth="2.8" strokeLinecap="round" fill="none" />
          <path d="M107 145 Q115 146.5 123 144" stroke="#1d1e26" strokeWidth="1" fill="none" />
        </g>

        {/* Right Eye */}
        <g>
          {/* Sclera */}
          <path d="M155 140 C155 135 171 135 175 140 C175 143 155 143 155 140 Z" fill="#ffffff" />
          {/* Iris */}
          <ellipse cx="164.5" cy="140.5" rx="6.5" ry="7.5" fill="url(#eyeIris)" />
          {/* Pupil */}
          <ellipse cx="164.5" cy="141" rx="3" ry="3.8" fill="#040507" />
          {/* Glare/Catchlights */}
          <circle cx="162.5" cy="138" r="1.8" fill="#ffffff" />
          <circle cx="166.5" cy="143" r="0.8" fill="#ffffff" opacity="0.8" />
          {/* Eyeliner & Wing - Sharp & Cool */}
          <path d="M153 137 C160 132 172 132 178 138" stroke="#0e0f14" strokeWidth="2.8" strokeLinecap="round" fill="none" />
          <path d="M157 144 Q165 146.5 173 145" stroke="#1d1e26" strokeWidth="1" fill="none" />
        </g>

        {/* Sharp Masculine Eyebrows */}
        <path d="M100 121 Q114 113 126 117" stroke="#111218" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M154 117 Q166 113 180 121" stroke="#111218" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Sharp nose line */}
        <path d="M138 152 L140 162 L144 160" stroke="#cc7a5d" strokeWidth="1.2" strokeLinecap="round" fill="none" />

        {/* Lips / Mouth - Cool Smile */}
        <path d="M129 176 Q140 181 151 176" stroke="#c93e46" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <line x1="131" y1="176" x2="149" y2="176" stroke="#801016" strokeWidth="0.5" />

        {/* Styled Masculine Anime Hair (Swept-back & textured style) */}
        <g>
          {/* Back hair / Volume */}
          <path d="M92 108 C86 90 102 66 122 62 C140 58 158 64 172 70 C186 76 194 92 188 108 L184 120 L96 120 Z" fill="url(#hairGrad)" />

          {/* Styled sweeping spikes/bangs on top and front */}
          {/* Main top-left sweep */}
          <path d="M94 105 Q125 58 155 72 C140 76 115 88 106 112 Z" fill="url(#hairGrad)" />
          {/* Center-right sweep bang */}
          <path d="M142 66 Q178 72 186 100 C170 94 154 96 142 110 Z" fill="url(#hairGrad)" />
          {/* Sideburns Left */}
          <path d="M94 115 C90 122 88 135 91 142 C92 142 94 130 96 120 Z" fill="url(#hairGrad)" />
          {/* Sideburns Right */}
          <path d="M186 115 C190 122 192 135 189 142 C188 142 186 130 184 120 Z" fill="url(#hairGrad)" />

          {/* Textured hair lock overlays */}
          <path d="M110 75 Q125 90 120 114" stroke="#0e0f14" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <path d="M152 74 Q162 90 156 114" stroke="#0e0f14" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <path d="M135 68 Q142 85 138 108" stroke="#0e0f14" strokeWidth="1.8" fill="none" strokeLinecap="round" />

          {/* High-Contrast Anime Gloss Highlights (Futuristic Neon Cyan/Purple reflection) */}
          <path d="M102 82 Q128 66 166 76" stroke="#00f5ff" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.4" />
          <path d="M112 80 Q130 70 156 78" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6" />
        </g>
      </g>

      {/* Floating Sparkle Particles */}
      <g filter="url(#neonFilter)" opacity="0.65">
        <path d="M 52 70 L 54 64 L 56 70 L 62 72 L 56 74 L 54 80 L 52 74 L 46 72 Z" fill="#00f5ff" />
        <path d="M 225 60 L 226 56 L 227 60 L 231 61 L 227 62 L 226 66 L 225 62 L 221 61 Z" fill="#ec4899" />
        <path d="M 40 180 L 41 176 L 42 180 L 46 181 L 42 182 L 41 186 L 40 182 L 36 181 Z" fill="#8b5cf6" />
        <path d="M 235 190 L 236 186 L 237 190 L 241 191 L 237 192 L 236 196 L 235 192 L 231 191 Z" fill="#00f5ff" />
      </g>
    </svg>
  );
}

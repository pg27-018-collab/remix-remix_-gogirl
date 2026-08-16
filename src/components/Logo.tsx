/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

interface LogoProps {
  variant?: 'large' | 'compact' | 'header' | 'animated';
  className?: string;
  glow?: boolean;
  onDark?: boolean;
}

export default function Logo({ variant = 'large', className = '', glow = false, onDark = false }: LogoProps) {
  if (variant === 'animated') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        {/* Animated GoGirl Logo Card */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-64 h-64 flex flex-col items-center justify-center rounded-[32px] bg-[#FAF6F0] border border-[#E8DCCB] shadow-2xl p-6 overflow-hidden"
        >
          {/* Subtle warm glow aura */}
          <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-tr from-[#F4ECE1] via-[#E8DCCB]/50 to-[#FAF6F0] rounded-[32px] blur-md -z-10"
          />

          {/* Cursive Capital G and small g signature with stroke drawing animation */}
          <div className="w-28 h-28 flex items-center justify-center">
            <svg 
              viewBox="0 0 160 160" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-full h-full text-[#27221F]"
            >
              {/* Cursive Capital G */}
              <motion.path 
                d="M 38,70 
                   C 35,42 50,18 68,18 
                   C 82,18 80,38 68,54 
                   M 68,54 
                   C 52,76 42,98 48,118 
                   C 52,132 66,128 72,110 
                   C 78,88 68,52 76,28" 
                stroke="currentColor" 
                strokeWidth="4.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                fill="none" 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />

              {/* Lowercase Cursive g with Arrow shaft */}
              <motion.path 
                d="M 102,62 
                   C 92,60 82,70 84,82 
                   C 86,94 100,96 108,86 
                   C 112,80 108,66 106,64 
                   M 106,64 
                   L 102,112 
                   C 98,132 82,142 74,132 
                   C 66,122 76,108 96,94 
                   L 142,48" 
                stroke="currentColor" 
                strokeWidth="4.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                fill="none" 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.6, ease: "easeInOut" }}
              />

              {/* Arrowhead at end of small g */}
              <motion.path 
                d="M 126,49 L 142,48 L 138,64" 
                stroke="currentColor" 
                strokeWidth="4.2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                fill="none" 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.8, ease: "easeOut" }}
              />
            </svg>
          </div>

          {/* Animated Brand Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-3xl font-extrabold text-[#27221F] tracking-tight mt-1"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Go Girl
          </motion.h1>

          {/* Animated Subtitle */}
          <motion.p 
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, letterSpacing: '0.22em' }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-[10px] uppercase font-black text-[#800020] mt-2"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '0.22em' }}
          >
            MEET. EXPLORE. BELONG.
          </motion.p>
        </motion.div>
      </div>
    );
  }
  if (variant === 'header') {
    return (
      <div className={`flex items-center gap-2 select-none ${className}`}>
        {/* Mini version of the Capital G and small g signature */}
        <div className="relative w-8 h-8 rounded-full bg-[#FAF6F0] border border-[#E8DCCB] flex items-center justify-center shadow-xs overflow-hidden">
          <svg viewBox="0 0 160 160" fill="none" className="w-6.5 h-6.5 text-[#27221F]">
            <path 
              d="M 38,70 C 35,42 50,18 68,18 C 82,18 80,38 68,54 M 68,54 C 52,76 42,98 48,118 C 52,132 66,128 72,110 C 78,88 68,52 76,28" 
              stroke="currentColor" 
              strokeWidth="5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              fill="none" 
            />
            <path 
              d="M 102,62 C 92,60 82,70 84,82 C 86,94 100,96 108,86 C 112,80 108,66 106,64 M 106,64 L 102,112 C 98,132 82,142 74,132 C 66,122 76,108 96,94 L 142,48" 
              stroke="currentColor" 
              strokeWidth="5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              fill="none" 
            />
            <path 
              d="M 126,49 L 142,48 L 138,64" 
              stroke="currentColor" 
              strokeWidth="4.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              fill="none" 
            />
          </svg>
        </div>
        <div>
          <h1 
            className="text-[15px] font-extrabold text-gray-950 tracking-tight leading-none"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Go Girl
          </h1>
          <span 
            className="text-[8.5px] uppercase font-black text-[#800020] block mt-0.5"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '0.2em' }}
          >
            MEET. EXPLORE. BELONG.
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        <div className="relative w-16 h-16 bg-[#FAF6F0] rounded-full border border-[#E8DCCB] flex items-center justify-center p-2 mb-2 shadow-xs">
          <svg viewBox="0 0 160 160" fill="none" className="w-13 h-13 text-[#27221F]">
            <path 
              d="M 38,70 C 35,42 50,18 68,18 C 82,18 80,38 68,54 M 68,54 C 52,76 42,98 48,118 C 52,132 66,128 72,110 C 78,88 68,52 76,28" 
              stroke="currentColor" 
              strokeWidth="5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              fill="none" 
            />
            <path 
              d="M 102,62 C 92,60 82,70 84,82 C 86,94 100,96 108,86 C 112,80 108,66 106,64 M 106,64 L 102,112 C 98,132 82,142 74,132 C 66,122 76,108 96,94 L 142,48" 
              stroke="currentColor" 
              strokeWidth="5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              fill="none" 
            />
            <path 
              d="M 126,49 L 142,48 L 138,64" 
              stroke="currentColor" 
              strokeWidth="4.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              fill="none" 
            />
          </svg>
        </div>
        <h2 
          className="text-lg font-extrabold text-gray-950 tracking-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
            Go Girl
        </h2>
        <span 
          className="text-[9px] uppercase font-black text-[#800020] mt-0.5"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '0.2em' }}
        >
          MEET. EXPLORE. BELONG.
        </span>
      </div>
    );
  }

  // Variant default 'large'
  return (
    <div className={`flex flex-col items-center text-center select-none ${className}`}>
      {/* Cursive Capital G and small g Image Area */}
      <div className={`relative w-36 h-36 flex items-center justify-center rounded-full bg-[#FAF6F0] border border-[#E8DCCB] shadow-xs ${glow ? 'after:content-[""] after:absolute after:inset-4 after:-z-10 after:bg-[#F4ECE1]/80 after:blur-xl' : ''}`}>
        <svg 
          viewBox="0 0 160 160" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full text-[#27221F] p-4"
        >
          <path 
            d="M 38,70 C 35,42 50,18 68,18 C 82,18 80,38 68,54 M 68,54 C 52,76 42,98 48,118 C 52,132 66,128 72,110 C 78,88 68,52 76,28" 
            stroke="currentColor" 
            strokeWidth="4.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            fill="none" 
          />
          <path 
            d="M 102,62 C 92,60 82,70 84,82 C 86,94 100,96 108,86 C 112,80 108,66 106,64 M 106,64 L 102,112 C 98,132 82,142 74,132 C 66,122 76,108 96,94 L 142,48" 
            stroke="currentColor" 
            strokeWidth="4.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            fill="none" 
          />
          <path 
            d="M 126,49 L 142,48 L 138,64" 
            stroke="currentColor" 
            strokeWidth="4.2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            fill="none" 
          />
        </svg>
      </div>

      {/* Brand Title: GoGirl */}
      <h1 
        className="text-4xl font-extrabold text-gray-950 tracking-tight mt-1.5"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Go Girl
      </h1>

      {/* Sub-brand Statement: MEET. EXPLORE. BELONG. */}
      <p 
        className="text-[11.5px] uppercase font-black text-[#800020] mt-2"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '0.24em' }}
      >
        MEET. EXPLORE. BELONG.
      </p>
    </div>
  );
}

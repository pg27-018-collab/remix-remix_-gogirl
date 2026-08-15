/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface CheckeredBackgroundProps {
  opacity?: number;
  transparentBg?: boolean;
}

export default function CheckeredBackground({ opacity = 1, transparentBg = false }: CheckeredBackgroundProps = {}) {
  return (
    <div 
      className={`absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none ${transparentBg ? 'bg-transparent' : 'bg-[#F8F5EE]'}`}
      style={opacity !== 1 ? { opacity } : undefined}
    />
  );
}


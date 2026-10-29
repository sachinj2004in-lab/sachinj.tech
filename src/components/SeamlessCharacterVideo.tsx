import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useMouseParallax } from '../engine/hooks';

// Verified character centers of mass in video space
const SECTION_METRICS: Record<string, { sectionCode: number; centerX: number }> = {
  hero:     { sectionCode: 0, centerX: 0.555 },
  about:    { sectionCode: 1, centerX: 0.545 },
  projects: { sectionCode: 2, centerX: 0.500 },
  journey:  { sectionCode: 3, centerX: 0.565 },
  resume:   { sectionCode: 4, centerX: 0.620 },
  contact:  { sectionCode: 5, centerX: 0.620 },
};

const VS_SOURCE = `
attribute vec2 a_pos;
attribute vec2 a_uv;
varying vec2 v_uv;

void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
  v_uv = vec2(a_uv.x, 1.0 - a_uv.y);
}
`;

const FS_SOURCE = `
precision highp float;
uniform sampler2D u_tex;
uniform int u_section;
uniform float u_centerX;
varying vec2 v_uv;

void main() {
  vec4 col = texture2D(u_tex, v_uv);
  float maxC = max(col.r, max(col.g, col.b));

  // --- SECTION 2: PROJECTS SECTION (Real Engineering Workbench Footage) ---
  if (u_section == 2) {
    // Projects: Real engineering workbench footage
    // Smooth organic rounded box vignette so video edges dissolve naturally into the clean white page
    // Zero harsh rectangular borders
    vec2 p = abs(v_uv - vec2(0.5)) * 2.0; // 0 at center, 1 at edge
    vec2 q = max(p - vec2(0.72, 0.68), 0.0);
    float dist = length(q);
    float edgeMask = 1.0 - smoothstep(0.0, 0.28, dist);
    gl_FragColor = vec4(col.rgb * edgeMask, edgeMask);
    return;
  }

  // --- SECTION 5: CONTACT SECTION (Red background video on red page background) ---
  if (u_section == 5) {
    float minC = min(col.r, min(col.g, col.b));
    float sat = maxC - minC;
    float maxGB = max(col.g, col.b);
    float redExcess = col.r - maxGB;

    // 1. Human skin protection: warm reddish tones with healthy green and blue channels
    // Real skin always has col.g >= 0.14 and col.b >= 0.10, redExcess < 0.55
    bool isSkin = (col.r > col.b * 1.02) && (col.r > col.g * 0.82) && (col.g > 0.14) && (col.b > 0.10) && (col.r > 0.16) && (redExcess < 0.55);

    // 2. White shirt protection:
    // Torso strictly bounded between collar and jacket button, width x in [0.45, 0.65]
    bool inShirtTorso = (v_uv.x >= 0.45 && v_uv.x <= 0.65 && v_uv.y >= 0.25 && v_uv.y <= 0.60);
    bool isShirt = inShirtTorso && (minC > 0.40) && (sat < 0.25) && !isSkin;

    // 3. Dark suit, tie, hair, trousers, belt & sleeves
    bool isDark = (col.r < 0.36 && col.g < 0.30 && col.b < 0.30);

    // 4. Red background detection (including shadows, compression artifacts, and cyclorama gradient)
    // Red cyclorama has redExcess > 0.32 and col.r > 0.40
    bool isBackground = (!isSkin && !isShirt) && (redExcess > 0.32 && col.r > 0.40);

    float alpha = 0.0;
    vec3 outCol = col.rgb;

    if (isSkin || isShirt) {
      alpha = 1.0;
      outCol = col.rgb;
    } else if (isDark) {
      alpha = 1.0;
      // De-spill red reflection on dark suit edge:
      if (redExcess > 0.04) {
        outCol.r = maxGB;
      }
    } else if (!isBackground) {
      // Smooth edge transition right at silhouette boundary
      float edgeAlpha = 1.0 - smoothstep(0.24, 0.32, redExcess);
      alpha = edgeAlpha;
      outCol = col.rgb;
    } else {
      alpha = 0.0;
      outCol = vec3(0.0);
    }

    // De-spill red reflection on white shirt strictly within torso:
    if (isShirt && !isSkin) {
      float shirtLuma = dot(outCol, vec3(0.299, 0.587, 0.114));
      outCol = mix(outCol, vec3(shirtLuma), 0.55);
    }

    // Soft perimeter feathering to prevent any harsh rectangular video box edges
    float edgeMask = smoothstep(0.0, 0.02, v_uv.x) * (1.0 - smoothstep(0.98, 1.0, v_uv.x)) *
                     smoothstep(0.0, 0.02, v_uv.y) * (1.0 - smoothstep(0.92, 0.99, v_uv.y));
    alpha = alpha * edgeMask;

    gl_FragColor = vec4(outCol * alpha, alpha);
    return;
  }

  // --- SECTION 0: HERO SECTION (Pure white studio background, clean character silhouette) ---
  // Keyed for new portrait character video (720x1280): full natural walking entrance into standing pose
  if (u_section == 0) {
    float minC = min(col.r, min(col.g, col.b));
    float sat = maxC - minC;

    // 1. Natural human skin tone protection across the upper body (face, neck down into open collar, hands)
    bool isSkin = (v_uv.y < 0.70) && (col.r > col.b * 1.02) && (col.r > col.g * 0.78) && (sat > 0.020) && (col.r > 0.13) && (col.b < 0.90);

    // 2. White shirt & collar protection:
    // Fully encloses collar wings and chest shirt across all walk & stand frames (x in [0.435, 0.585], y in [0.185, 0.48])
    // Shirt/collar is bright white (minC > 0.65). This never touches dark suit lapels (minC < 0.35).
    bool inShirtTorso = (v_uv.x >= 0.435 && v_uv.x <= 0.585 && v_uv.y >= 0.185 && v_uv.y <= 0.48);
    bool isShirt = inShirtTorso && (minC > 0.65) && !isSkin;

    // 3. Studio white cyclorama background & floor shadow/smoke removal:
    // Pure studio background has minC > 0.80 (cyclorama white is > 0.90)
    // Shoe leather and specular toe highlights strictly have minC < 0.40
    // All floor background and smoke around and between shoes (y >= 0.80) has minC > 0.48
    bool isFloorShadow = (v_uv.y >= 0.80) && (minC > 0.48);
    bool isBackground = (!isSkin && !isShirt) && (minC > 0.80 || isFloorShadow);

    float alpha = 0.0;
    vec3 outCol = col.rgb;

    if (isSkin || isShirt) {
      // 100% natural skin and white shirt
      alpha = 1.0;
      outCol = col.rgb;
    } else if (!isBackground) {
      // Crisp edge falloff right at studio cyclorama boundary (minC between 0.76 and 0.80)
      float edgeAlpha = 1.0 - smoothstep(0.76, 0.80, minC);
      alpha = edgeAlpha;

      // Natural black fabric: preserve genuine highlights, folds, lapel creases and texture
      outCol = col.rgb;
    } else {
      alpha = 0.0;
      outCol = vec3(0.0);
    }

    float edgeMask = smoothstep(0.0, 0.015, v_uv.x) * (1.0 - smoothstep(0.985, 1.0, v_uv.x)) *
                     smoothstep(0.0, 0.015, v_uv.y) * (1.0 - smoothstep(0.985, 1.0, v_uv.y));
    alpha = alpha * edgeMask;

    gl_FragColor = vec4(outCol * alpha, alpha);
    return;
  }

  // --- SECTION 3: JOURNEY SECTION (Welcoming gesture, wide outstretched hands) ---
  if (u_section == 3) {
    float minC = min(col.r, min(col.g, col.b));
    float sat = maxC - minC;

    // 1. Human skin protection across full frame (outstretched hands, fingers, thumbs, palms, wrists, face)
    bool isSkin = (col.r > col.b * 1.01) && (col.r > col.g * 0.78) && (sat > 0.005) && (col.r > 0.14);

    // 2. Dark suit, tie, hair, trousers, belt & outstretched sleeves
    bool isDark = (maxC < 0.48 && sat < 0.28);
    float suitSoft = (!isDark) ? (1.0 - clamp((maxC - 0.36) / (0.68 - 0.36), 0.0, 1.0)) : 0.0;

    // 3. White shirt protection: dynamically bounded within chest torso and flanked by suit lapels
    bool inTorso = (v_uv.x >= 0.48 && v_uv.x <= 0.64 && v_uv.y >= 0.28 && v_uv.y <= 0.76);
    bool isShirt = false;
    if (inTorso && col.r > 0.40 && col.g > 0.40 && col.b > 0.40 && sat < 0.20 && !isSkin) {
      vec4 cL = texture2D(u_tex, v_uv - vec2(0.045, 0.0));
      vec4 cR = texture2D(u_tex, v_uv + vec2(0.045, 0.0));
      float maxL = max(cL.r, max(cL.g, cL.b));
      float maxR = max(cR.r, max(cR.g, cR.b));
      bool hasL = (maxL < 0.45) || (cL.r > cL.b * 1.01 && cL.r > 0.14);
      bool hasR = (maxR < 0.45) || (cR.r > cR.b * 1.01 && cR.r > 0.14);
      isShirt = hasL && hasR;
    }

    // 4. Wrist cuff protection: white fabric connecting sleeve to hand
    bool isCuff = false;
    if (!isSkin && !isDark && !isShirt && maxC < 0.99 && maxC > 0.45 && sat < 0.22) {
      vec4 cU = texture2D(u_tex, v_uv + vec2(0.0, 0.02));
      vec4 cD = texture2D(u_tex, v_uv - vec2(0.0, 0.02));
      vec4 cL = texture2D(u_tex, v_uv - vec2(0.02, 0.0));
      vec4 cR = texture2D(u_tex, v_uv + vec2(0.02, 0.0));
      float maxU = max(cU.r, max(cU.g, cU.b));
      float maxD = max(cD.r, max(cD.g, cD.b));
      float maxL = max(cL.r, max(cL.g, cL.b));
      float maxR = max(cR.r, max(cR.g, cR.b));
      bool nearDark = (maxU < 0.50 || maxD < 0.50 || maxL < 0.50 || maxR < 0.50);
      bool nearSkin = (cU.r > cU.b * 1.01 && cU.r > cU.g * 0.78 && cU.r > 0.14) ||
                      (cD.r > cD.b * 1.01 && cD.r > cD.g * 0.78 && cD.r > 0.14) ||
                      (cL.r > cL.b * 1.01 && cL.r > cL.g * 0.78 && cL.r > 0.14) ||
                      (cR.r > cR.b * 1.01 && cR.r > cR.g * 0.78 && cR.r > 0.14);
      isCuff = nearDark || nearSkin;
    }

    float alpha = 0.0;
    vec3 outCol = vec3(0.0);

    if (isSkin || isDark || isShirt || isCuff) {
      alpha = 1.0;
      outCol = col.rgb;
    } else if (suitSoft > 0.0) {
      alpha = suitSoft;
      outCol = min(col.rgb, vec3(0.25));
    } else {
      alpha = 0.0;
      outCol = vec3(0.0);
    }

    float edgeMask = smoothstep(0.0, 0.015, v_uv.x) * (1.0 - smoothstep(0.985, 1.0, v_uv.x)) *
                     smoothstep(0.0, 0.015, v_uv.y) * (1.0 - smoothstep(0.985, 1.0, v_uv.y));
    alpha = alpha * edgeMask;

    gl_FragColor = vec4(outCol * alpha, alpha);
    return;
  }

  // --- SECTION 4: RESUME SECTION (Pointing hand upward, non-pointing arm resting near hip) ---
  if (u_section == 4) {
    float minC = min(col.r, min(col.g, col.b));
    float sat = maxC - minC;

    // 1. Human skin protection: pointing hand, fingertips, non-pointing hand/wrist, face & neck
    bool isSkin = (col.r > col.b * 1.01) && (col.r > col.g * 0.78) && (sat > 0.005) && (col.r > 0.14);

    // 2. Dark suit, tie, hair, trousers, belt & non-pointing arm fabric
    bool isDark = (maxC < 0.48 && sat < 0.28);
    float suitSoft = (!isDark) ? (1.0 - clamp((maxC - 0.36) / (0.68 - 0.36), 0.0, 1.0)) : 0.0;

    // 3. White shirt protection: dynamically flanked by dark suit lapels within torso
    bool inTorso = (v_uv.x >= 0.52 && v_uv.x <= 0.68 && v_uv.y >= 0.28 && v_uv.y <= 0.78);
    bool isShirt = false;
    if (inTorso && col.r > 0.40 && col.g > 0.40 && col.b > 0.40 && sat < 0.20 && !isSkin) {
      vec4 cL = texture2D(u_tex, v_uv - vec2(0.045, 0.0));
      vec4 cR = texture2D(u_tex, v_uv + vec2(0.045, 0.0));
      float maxL = max(cL.r, max(cL.g, cL.b));
      float maxR = max(cR.r, max(cR.g, cR.b));
      bool hasL = (maxL < 0.45) || (cL.r > cL.b * 1.01 && cL.r > 0.14);
      bool hasR = (maxR < 0.45) || (cR.r > cR.b * 1.01 && cR.r > 0.14);
      isShirt = hasL && hasR;
    }

    // 4. Wrist cuff protection: white fabric connecting sleeve to hand
    bool isCuff = false;
    if (!isSkin && !isDark && !isShirt && maxC < 0.99 && maxC > 0.45 && sat < 0.22) {
      vec4 cU = texture2D(u_tex, v_uv + vec2(0.0, 0.02));
      vec4 cD = texture2D(u_tex, v_uv - vec2(0.0, 0.02));
      vec4 cL = texture2D(u_tex, v_uv - vec2(0.02, 0.0));
      vec4 cR = texture2D(u_tex, v_uv + vec2(0.02, 0.0));
      float maxU = max(cU.r, max(cU.g, cU.b));
      float maxD = max(cD.r, max(cD.g, cD.b));
      float maxL = max(cL.r, max(cL.g, cL.b));
      float maxR = max(cR.r, max(cR.g, cR.b));
      bool nearDark = (maxU < 0.50 || maxD < 0.50 || maxL < 0.50 || maxR < 0.50);
      bool nearSkin = (cU.r > cU.b * 1.01 && cU.r > cU.g * 0.78 && cU.r > 0.14) ||
                      (cD.r > cD.b * 1.01 && cD.r > cD.g * 0.78 && cD.r > 0.14) ||
                      (cL.r > cL.b * 1.01 && cL.r > cL.g * 0.78 && cL.r > 0.14) ||
                      (cR.r > cR.b * 1.01 && cR.r > cR.g * 0.78 && cR.r > 0.14);
      isCuff = nearDark || nearSkin;
    }

    float alpha = 0.0;
    vec3 outCol = vec3(0.0);

    if (isSkin || isDark || isShirt || isCuff) {
      alpha = 1.0;
      outCol = col.rgb;
    } else if (suitSoft > 0.0) {
      alpha = suitSoft;
      outCol = min(col.rgb, vec3(0.25));
    } else {
      alpha = 0.0;
      outCol = vec3(0.0);
    }

    float edgeMask = smoothstep(0.0, 0.015, v_uv.x) * (1.0 - smoothstep(0.985, 1.0, v_uv.x)) *
                     smoothstep(0.0, 0.015, v_uv.y) * (1.0 - smoothstep(0.985, 1.0, v_uv.y));
    alpha = alpha * edgeMask;

    gl_FragColor = vec4(outCol * alpha, alpha);
    return;
  }

  // --- SECTION 1: ABOUT SECTION ---
  // Pure white studio keying: 100% clean studio background removal, zero rectangular seams
  float luma = dot(col.rgb, vec3(0.299, 0.587, 0.114));
  float minC = min(col.r, min(col.g, col.b));
  float sat = maxC - minC;

  // Character bounding envelope covering gesture spread (x in [0.05, 0.98])
  bool inBodyZone = (v_uv.x >= 0.05 && v_uv.x <= 0.98);

  // 1. Human skin protection: warm reddish tones, high red vs blue, moderate saturation
  bool isSkin = inBodyZone && (col.r > col.b * 1.06) && (col.r > col.g * 0.84) && (sat > 0.035) && (col.r > 0.20);

  // 2. Dark suit, tie, hair, belt, shoes protection
  bool isDark = inBodyZone && (maxC < 0.35 && sat < 0.24);
  float suitSoft = inBodyZone ? (1.0 - clamp((maxC - 0.28) / (0.46 - 0.28), 0.0, 1.0)) : 0.0;

  // 3. Shirt protection: dynamically bounded by torso and lapels/skin
  float minShirtX = (v_uv.y < 0.36) ? 0.545 : 0.475;
  float maxShirtX = (v_uv.y < 0.36) ? 0.665 : 0.705;

  bool isShirt = false;
  if (v_uv.x >= minShirtX && v_uv.x <= maxShirtX && v_uv.y >= 0.27 && v_uv.y <= 0.78) {
    if (col.r > 0.40 && col.g > 0.40 && col.b > 0.40 && sat < 0.18) {
      vec4 cL1 = texture2D(u_tex, v_uv - vec2(0.012, 0.0));
      vec4 cL2 = texture2D(u_tex, v_uv - vec2(0.028, 0.0));
      vec4 cL3 = texture2D(u_tex, v_uv - vec2(0.052, 0.0));
      vec4 cL4 = texture2D(u_tex, v_uv - vec2(0.086, 0.0));
      float maxL1 = max(cL1.r, max(cL1.g, cL1.b));
      float maxL2 = max(cL2.r, max(cL2.g, cL2.b));
      float maxL3 = max(cL3.r, max(cL3.g, cL3.b));
      float maxL4 = max(cL4.r, max(cL4.g, cL4.b));
      bool isDarkL = (maxL1 < 0.35 || maxL2 < 0.35 || maxL3 < 0.35 || maxL4 < 0.35);
      bool isSkinL = (cL1.r > cL1.b * 1.06 && cL1.r > cL1.g * 0.84 && (maxL1 - min(cL1.r, min(cL1.g, cL1.b))) > 0.035) ||
                     (cL2.r > cL2.b * 1.06 && cL2.r > cL2.g * 0.84 && (maxL2 - min(cL2.r, min(cL2.g, cL2.b))) > 0.035);
      bool hasLeftBody = isDarkL || isSkinL;

      vec4 cR1 = texture2D(u_tex, v_uv + vec2(0.012, 0.0));
      vec4 cR2 = texture2D(u_tex, v_uv + vec2(0.028, 0.0));
      vec4 cR3 = texture2D(u_tex, v_uv + vec2(0.052, 0.0));
      vec4 cR4 = texture2D(u_tex, v_uv + vec2(0.086, 0.0));
      float maxR1 = max(cR1.r, max(cR1.g, cR1.b));
      float maxR2 = max(cR2.r, max(cR2.g, cR2.b));
      float maxR3 = max(cR3.r, max(cR3.g, cR3.b));
      float maxR4 = max(cR4.r, max(cR4.g, cR4.b));
      bool isDarkR = (maxR1 < 0.35 || maxR2 < 0.35 || maxR3 < 0.35 || maxR4 < 0.35);
      bool isSkinR = (cR1.r > cR1.b * 1.06 && cR1.r > cR1.g * 0.84 && (maxR1 - min(cR1.r, min(cR1.g, cR1.b))) > 0.035) ||
                     (cR2.r > cR2.b * 1.06 && cR2.r > cR2.g * 0.84 && (maxR2 - min(cR2.r, min(cR2.g, cR2.b))) > 0.035);
      bool hasRightBody = isDarkR || isSkinR;

      isShirt = hasLeftBody && hasRightBody;
    }
  }

  float alpha = 0.0;
  vec3 outCol = vec3(0.0);

  if (isSkin || isDark) {
    alpha = 1.0;
    outCol = col.rgb;
  } else if (suitSoft > 0.0 && !isShirt) {
    alpha = suitSoft;
    // De-halo hair & suit edges: clamp brightness to dark silhouette to strip white cyclorama light bleed
    outCol = min(col.rgb, vec3(0.25));
  } else if (isShirt) {
    alpha = 1.0;
    outCol = col.rgb;
  } else {
    // Studio cyclorama background wall & floor:
    // Pure 0 alpha = 100% transparent. ZERO grey shadows, ZERO white boxes, ZERO halos!
    alpha = 0.0;
    outCol = vec3(0.0);
  }

  // Soft edge feathering only at extreme video boundaries to prevent any hard video edge lines
  float edgeMask = smoothstep(0.0, 0.015, v_uv.x) * (1.0 - smoothstep(0.985, 1.0, v_uv.x)) *
                   smoothstep(0.0, 0.015, v_uv.y) * (1.0 - smoothstep(0.985, 1.0, v_uv.y));
  alpha = alpha * edgeMask;

  // Premultiplied alpha output for clean WebGL compositing
  gl_FragColor = vec4(outCol * alpha, alpha);
  return;
}
`;

export interface SeamlessCharacterVideoProps {
  sectionId: 'hero' | 'about' | 'projects' | 'journey' | 'resume' | 'contact';
  videoSrc: string;
  posterSrc?: string;
  position?: 'left' | 'right' | 'center';
  parallaxStrength?: number;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
}

export const SeamlessCharacterVideo: React.FC<SeamlessCharacterVideoProps> = ({
  sectionId,
  videoSrc,
  posterSrc,
  position = 'right',
  parallaxStrength = 8,
  priority = false,
  className = '',
  containerClassName = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseParallax = useMouseParallax(parallaxStrength);
  const [webGLFailed, setWebGLFailed] = useState(false);

  const isHero = sectionId === 'hero';
  // Tracks one-time playback completion for Hero only
  const hasEndedRef = useRef(false);

  // Drawing callback ref for cross-effect calling
  const drawFrameRef = useRef<() => void>(() => {});

  const metrics = SECTION_METRICS[sectionId] || { sectionCode: 1, centerX: 0.500 };

  // 1. WebGL Chroma/Luma Keying Pipeline — Initialized ONCE per component mount
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const gl =
      canvas.getContext('webgl', {
        premultipliedAlpha: true,
        alpha: true,
        antialias: false,
        preserveDrawingBuffer: true,
      }) ||
      (canvas.getContext('experimental-webgl', {
        premultipliedAlpha: true,
        alpha: true,
        antialias: false,
        preserveDrawingBuffer: true,
      }) as WebGLRenderingContext | null);

    if (!gl) {
      setWebGLFailed(true);
      return;
    }

    const handleContextLost = (e: Event) => {
      e.preventDefault();
    };
    canvas.addEventListener('webglcontextlost', handleContextLost, false);

    const createShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, VS_SOURCE);
    const fs = createShader(gl.FRAGMENT_SHADER, FS_SOURCE);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      return;
    }

    gl.useProgram(program);

    // Quad geometry: full-canvas NDC
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1, 0, 0,
         1, -1, 1, 0,
        -1,  1, 0, 1,
        -1,  1, 0, 1,
         1, -1, 1, 0,
         1,  1, 1, 1,
      ]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(program, 'a_pos');
    const aUv = gl.getAttribLocation(program, 'a_uv');
    gl.enableVertexAttribArray(aPos);
    gl.enableVertexAttribArray(aUv);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 16, 0);
    gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 16, 8);

    // Video Texture setup
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const uSectionLoc = gl.getUniformLocation(program, 'u_section');
    const uCenterXLoc = gl.getUniformLocation(program, 'u_centerX');
    gl.uniform1i(uSectionLoc, metrics.sectionCode);
    gl.uniform1f(uCenterXLoc, metrics.centerX);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    let animId: number;
    let isRunning = true;

    const drawFrame = () => {
      if (!isRunning) return;
      if (video.readyState >= 2 && video.videoWidth > 0) {
        const targetW = Math.min(video.videoWidth, 1280);
        const targetH = Math.round(targetW * (video.videoHeight / video.videoWidth));

        if (canvas.width !== targetW || canvas.height !== targetH) {
          canvas.width = targetW;
          canvas.height = targetH;
          gl.viewport(0, 0, canvas.width, canvas.height);
        }

        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(program);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
    };

    drawFrameRef.current = drawFrame;

    const renderLoop = () => {
      if (!isRunning) return;

      // For hero only: stop cleanly 0.20s before EOF to hold final standing pose permanently
      if (isHero && video.duration > 0 && video.currentTime >= video.duration - 0.20) {
        hasEndedRef.current = true;
        video.currentTime = Math.max(0, video.duration - 0.20);
        video.pause();
        drawFrame();
        return;
      }

      drawFrame();

      // For all other sections (About, Projects, Journey, Resume, Contact):
      // Keep renderLoop cycling continuously while video is playing
      if (!video.paused && !video.ended) {
        animId = requestAnimationFrame(renderLoop);
      }
    };

    const handlePlay = () => {
      if (isRunning && (!isHero || !hasEndedRef.current)) {
        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(renderLoop);
      }
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('loadeddata', drawFrame);
    video.addEventListener('canplay', drawFrame);
    video.addEventListener('seeked', drawFrame);
    video.addEventListener('timeupdate', drawFrame);

    // Initial render
    drawFrame();

    if (!video.paused && (!isHero || !hasEndedRef.current)) {
      animId = requestAnimationFrame(renderLoop);
    }

    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('loadeddata', drawFrame);
      video.removeEventListener('canplay', drawFrame);
      video.removeEventListener('seeked', drawFrame);
      video.removeEventListener('timeupdate', drawFrame);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      if (texture) gl.deleteTexture(texture);
      if (positionBuffer) gl.deleteBuffer(positionBuffer);
      if (vs) gl.deleteShader(vs);
      if (fs) gl.deleteShader(fs);
      if (program) gl.deleteProgram(program);
    };
  }, [metrics.sectionCode, metrics.centerX, isHero]);

  // 2. Playback Management & Viewport Intersection Observer
  // WebGL context is NOT torn down on scroll! Only video play/pause is toggled to conserve CPU.
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    let heroStarted = false;
    let fallbackTimer: NodeJS.Timeout | undefined;

    const startHeroPlayback = () => {
      if (isHero && video && !heroStarted && !hasEndedRef.current) {
        heroStarted = true;
        hasEndedRef.current = false;
        video.playbackRate = 0.88;
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    };

    const handleHeroStart = () => {
      startHeroPlayback();
    };

    if (isHero) {
      window.addEventListener('heroStartPlay', handleHeroStart);
      // Fallback in case preloader is already completed or skipped: start smoothly once
      fallbackTimer = setTimeout(() => {
        if (!heroStarted && !hasEndedRef.current) {
          startHeroPlayback();
        }
      }, 3500);
    } else if (priority) {
      video.play().catch(() => {});
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (isHero) {
              if (heroStarted && !hasEndedRef.current) {
                video.play().catch(() => {});
              }
            } else {
              video.play().catch(() => {});
            }
            // Request immediate redraw when returning to view
            drawFrameRef.current();
          } else {
            if (!priority && !isHero) {
              video.pause();
            }
          }
        });
      },
      { threshold: 0.01, rootMargin: '200px 0px 200px 0px' }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      if (isHero) {
        window.removeEventListener('heroStartPlay', handleHeroStart);
        if (fallbackTimer) clearTimeout(fallbackTimer);
      }
    };
  }, [priority, isHero]);

  // Ensure natural arm & body extension for Journey, Resume, and Contact without invisible rectangular clipping
  useEffect(() => {
    if (sectionId === 'journey' || sectionId === 'resume' || sectionId === 'contact') {
      let p = containerRef.current?.parentElement;
      while (p && p.id !== 'journey' && p.id !== 'resume' && p.id !== 'contact' && p.tagName !== 'MAIN') {
        p.style.overflow = 'visible';
        p = p.parentElement;
      }
      if (sectionId === 'journey' && canvasRef.current) {
        if (window.innerWidth >= 1024) {
          canvasRef.current.style.transform = 'scale(2.15) translate(10px, -10px)';
          canvasRef.current.style.transformOrigin = 'bottom center';
        }
      }
    }
  }, [sectionId]);

  const positionClasses =
    position === 'left'
      ? 'justify-center md:justify-start'
      : position === 'right'
      ? 'justify-center md:justify-end'
      : 'justify-center';

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center ${positionClasses} pointer-events-none select-none bg-transparent ${containerClassName}`}
      style={{
        transform: `translate3d(${mouseParallax.x}px, ${mouseParallax.y}px, 0)`,
        transition: 'transform 0.15s ease-out',
      }}
    >
      {/* 
        Hardware-decoded Video element:
        Loops seamlessly for all sections except Hero.
        Hero plays once and preserves final frame.
      */}
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterSrc}
        muted
        playsInline
        loop={!isHero}
        autoPlay={priority && !isHero}
        preload="auto"
        crossOrigin="anonymous"
        className={`absolute inset-0 w-full h-full object-contain pointer-events-none ${
          webGLFailed ? 'opacity-100' : 'opacity-[0.001]'
        }`}
      />

      {/* Real-time WebGL Keyed Canvas: Clean cutout character visual */}
      {!webGLFailed && (
        <canvas
          ref={canvasRef}
          className={`w-full h-full object-contain pointer-events-none select-none bg-transparent ${className}`}
        />
      )}
    </div>
  );
};

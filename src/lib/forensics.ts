/**
 * Perceptual Hashing and Forensic Algorithms
 */

export function dHash(data: Uint8ClampedArray, w: number, h: number): string {
  const S = 9, SH = 8;
  const g: number[] = [];
  for (let r = 0; r < SH; r++) {
    for (let c = 0; c < S; c++) {
      const sx = Math.floor(c / S * w);
      const sy = Math.floor(r / SH * h);
      const i = (sy * w + sx) * 4;
      g.push(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
    }
  }
  let hash = '';
  for (let r = 0; r < SH; r++) {
    for (let c = 0; c < S - 1; c++) {
      hash += g[r * S + c] < g[r * S + c + 1] ? '1' : '0';
    }
  }
  return hash;
}

export function pHash(data: Uint8ClampedArray, w: number, h: number): string {
  const S = 32;
  const g: number[] = [];
  for (let r = 0; r < S; r++) {
    for (let c = 0; c < S; c++) {
      const sx = Math.floor(c / S * w);
      const sy = Math.floor(r / S * h);
      const i = (sy * w + sx) * 4;
      g.push(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
    }
  }
  const dct: number[] = [];
  for (let u = 0; u < 8; u++) {
    for (let v = 0; v < 8; v++) {
      let sum = 0;
      for (let x = 0; x < S; x++) {
        for (let y = 0; y < S; y++) {
          sum += g[x * S + y] * Math.cos((2 * x + 1) * u * Math.PI / (2 * S)) * Math.cos((2 * y + 1) * v * Math.PI / (2 * S));
        }
      }
      dct.push(sum);
    }
  }
  const vals = dct.slice(1);
  const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
  return vals.map(v => v > avg ? '1' : '0').join('');
}

export function aHash(data: Uint8ClampedArray, w: number, h: number): string {
  const S = 8;
  const g: number[] = [];
  for (let r = 0; r < S; r++) {
    for (let c = 0; c < S; c++) {
      const sx = Math.floor(c / S * w);
      const sy = Math.floor(r / S * h);
      const i = (sy * w + sx) * 4;
      g.push(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
    }
  }
  const avg = g.reduce((a, b) => a + b, 0) / g.length;
  return g.map(v => v >= avg ? '1' : '0').join('');
}

export function hamming(a: string, b: string): number {
  let d = 0;
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] !== b[i]) d++;
  }
  return d;
}

export function toHex(h: string): string {
  let x = '';
  for (let i = 0; i < h.length; i += 4) {
    x += parseInt(h.substr(i, 4), 2).toString(16);
  }
  return x.substring(0, 16).toUpperCase();
}

export function ssim(d1: Uint8ClampedArray, d2: Uint8ClampedArray, w: number, h: number): number {
  const L = 255, C1 = (0.01 * L) ** 2, C2 = (0.03 * L) ** 2, n = w * h;
  const g1: number[] = [], g2: number[] = [];
  for (let i = 0; i < d1.length; i += 4) {
    g1.push(0.299 * d1[i] + 0.587 * d1[i + 1] + 0.114 * d1[i + 2]);
    g2.push(0.299 * d2[i] + 0.587 * d2[i + 1] + 0.114 * d2[i + 2]);
  }
  const mu1 = g1.reduce((a, b) => a + b, 0) / n;
  const mu2 = g2.reduce((a, b) => a + b, 0) / n;
  let s1 = 0, s2 = 0, s12 = 0;
  for (let i = 0; i < n; i++) {
    s1 += (g1[i] - mu1) ** 2;
    s2 += (g2[i] - mu2) ** 2;
    s12 += (g1[i] - mu1) * (g2[i] - mu2);
  }
  s1 /= n; s2 /= n; s12 /= n;
  return ((2 * mu1 * mu2 + C1) * (2 * s12 + C2)) / ((mu1 ** 2 + mu2 ** 2 + C1) * (s1 + s2 + C2));
}

export function histSim(d1: Uint8ClampedArray, d2: Uint8ClampedArray): number {
  const bins = 64, step = 256 / bins;
  const hr1 = new Array(bins).fill(0), hg1 = new Array(bins).fill(0), hb1 = new Array(bins).fill(0);
  const hr2 = new Array(bins).fill(0), hg2 = new Array(bins).fill(0), hb2 = new Array(bins).fill(0);
  for (let i = 0; i < d1.length; i += 4) {
    hr1[Math.min(bins - 1, Math.floor(d1[i] / step))]++;
    hg1[Math.min(bins - 1, Math.floor(d1[i + 1] / step))]++;
    hb1[Math.min(bins - 1, Math.floor(d1[i + 2] / step))]++;
    hr2[Math.min(bins - 1, Math.floor(d2[i] / step))]++;
    hg2[Math.min(bins - 1, Math.floor(d2[i + 1] / step))]++;
    hb2[Math.min(bins - 1, Math.floor(d2[i + 2] / step))]++;
  }
  const n = d1.length / 4;
  let bc = 0;
  for (let i = 0; i < bins; i++) {
    bc += Math.sqrt((hr1[i] / n) * (hr2[i] / n));
    bc += Math.sqrt((hg1[i] / n) * (hg2[i] / n));
    bc += Math.sqrt((hb1[i] / n) * (hb2[i] / n));
  }
  return (bc / 3) * 100;
}

export function pixelDiff(d1: Uint8ClampedArray, d2: Uint8ClampedArray, w: number, h: number) {
  let totDiff = 0, hiPx = 0, medPx = 0, loPx = 0;
  let sR1 = 0, sG1 = 0, sB1 = 0, sR2 = 0, sG2 = 0, sB2 = 0, sBr1 = 0, sBr2 = 0;
  const diffMap = new Uint8ClampedArray(w * h * 4);
  const REG = 4;
  const rdiffs = new Array(REG * REG).fill(0), rcnts = new Array(REG * REG).fill(0);
  for (let i = 0; i < d1.length; i += 4) {
    const px = i / 4, row = Math.floor(px / w), col = px % w;
    const dr = Math.abs(d1[i] - d2[i]), dg = Math.abs(d1[i + 1] - d2[i + 1]), db = Math.abs(d1[i + 2] - d2[i + 2]);
    const diff = (dr + dg + db) / 3; totDiff += diff;
    sR1 += d1[i]; sG1 += d1[i + 1]; sB1 += d1[i + 2]; sR2 += d2[i]; sG2 += d2[i + 1]; sB2 += d2[i + 2];
    sBr1 += (d1[i] + d1[i + 1] + d1[i + 2]) / 3; sBr2 += (d2[i] + d2[i + 1] + d2[i + 2]) / 3;
    const rr = Math.min(REG - 1, Math.floor(row / h * REG)), rc = Math.min(REG - 1, Math.floor(col / w * REG));
    rdiffs[rr * REG + rc] += diff; rcnts[rr * REG + rc]++;
    if (diff > 80) { diffMap[i] = 255; diffMap[i + 1] = 59; diffMap[i + 2] = 92; diffMap[i + 3] = 210; hiPx++; }
    else if (diff > 30) { diffMap[i] = 245; diffMap[i + 1] = 200; diffMap[i + 2] = 66; diffMap[i + 3] = 170; medPx++; }
    else if (diff > 8) { diffMap[i] = 0; diffMap[i + 1] = 229; diffMap[i + 2] = 160; diffMap[i + 3] = 130; loPx++; }
    else { diffMap[i] = 13; diffMap[i + 1] = 18; diffMap[i + 2] = 32; diffMap[i + 3] = 240; }
  }
  const n = w * h, avgDiff = totDiff / n;
  const brightD = Math.abs(sBr1 / n - sBr2 / n);
  const colorD = (Math.abs(sR1 / n - sR2 / n) + Math.abs(sG1 / n - sG2 / n) + Math.abs(sB1 / n - sB2 / n)) / 3;
  const ravgs = rdiffs.map((s, i) => s / (rcnts[i] || 1));
  const borderIdx = [0, 1, 2, 3, 4, 7, 8, 11, 12, 13, 14, 15];
  const centerIdx = [5, 6, 9, 10];
  const bAvg = borderIdx.reduce((s, i) => s + ravgs[i], 0) / borderIdx.length;
  const cAvg = centerIdx.reduce((s, i) => s + ravgs[i], 0) / centerIdx.length;
  const cropDetected = bAvg > cAvg * 2.5 && bAvg > 20;
  return {
    avgDiff: avgDiff.toFixed(2), brightD: brightD.toFixed(1), colorD: colorD.toFixed(1),
    hiPct: (hiPx / n * 100).toFixed(1), medPct: (medPx / n * 100).toFixed(1), loPct: (loPx / n * 100).toFixed(1),
    editPct: ((hiPx + medPx) / n * 100).toFixed(1), cropDetected,
    bAvg: bAvg.toFixed(1), cAvg: cAvg.toFixed(1), diffMap
  };
}

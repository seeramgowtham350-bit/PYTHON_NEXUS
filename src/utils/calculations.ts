/**
 * Scientific formulas and domain calculation utilities
 * Python Nexus Science Engine
 */

export interface BiotechCalculations {
  calculateGcContent: (sequence: string) => number;
  calculateBacterialGrowth: (initialCount: number, doublingTimeHours: number, totalHours: number) => number;
  calculatePh: (hydrogenIonConcentration: number) => number;
  calculateBeerLambertConcentration: (absorbance: number, molarExtinctionCoeff: number, pathLengthCm: number) => number;
}

export interface MaterialCalculations {
  calculateDensity: (massGrams: number, volumeCm3: number) => number;
  calculateStress: (forceNewtons: number, areaMm2: number) => number;
  calculateStrain: (stressMpa: number, youngsModulusGpa: number) => number;
  celsiusToKelvin: (celsius: number) => number;
  kelvinToCelsius: (kelvin: number) => number;
}

export const scienceCalculations = {
  biotech: {
    calculateGcContent: (sequence: string): number => {
      const clean = sequence.toUpperCase().replace(/[^ATGC]/g, '');
      if (clean.length === 0) return 0;
      const g = (clean.match(/G/g) || []).length;
      const c = (clean.match(/C/g) || []).length;
      return Number(((g + c) / clean.length * 100).toFixed(2));
    },
    calculateBacterialGrowth: (n0: number, doublingTimeHours: number, totalHours: number): number => {
      const generations = totalHours / doublingTimeHours;
      return Math.round(n0 * Math.pow(2, generations));
    },
    calculatePh: (hConc: number): number => {
      if (hConc <= 0) return 7.0;
      return Number((-Math.log10(hConc)).toFixed(2));
    },
  },
  materials: {
    calculateDensity: (massGrams: number, volumeCm3: number): number => {
      if (volumeCm3 <= 0) return 0;
      return Number((massGrams / volumeCm3).toFixed(3));
    },
    calculateStress: (forceN: number, areaMm2: number): number => {
      if (areaMm2 <= 0) return 0;
      return Number((forceN / areaMm2).toFixed(2)); // MPa
    },
    calculateStrain: (stressMpa: number, youngsGpa: number): number => {
      if (youngsGpa <= 0) return 0;
      return Number((stressMpa / (youngsGpa * 1000)).toFixed(6));
    },
    celsiusToKelvin: (c: number): number => {
      return Number((c + 273.15).toFixed(2));
    },
  },
};

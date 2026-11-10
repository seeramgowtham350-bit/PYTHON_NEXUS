import { describe, it, expect } from 'vitest';
import { scienceCalculations } from '../src/utils/calculations';
import { normalizeOutput, compareOutputs } from '../src/engine/missionValidator';
import { calculateRankAndLevel } from '../src/engine/xpManager';

describe('Biotech Calculations', () => {
  it('calculates DNA GC-content accurately', () => {
    const gc = scienceCalculations.biotech.calculateGcContent('GCGC');
    expect(gc).toBe(100.0);

    const half = scienceCalculations.biotech.calculateGcContent('ATGC');
    expect(half).toBe(50.0);
  });

  it('calculates exponential bacterial growth', () => {
    // 100 cells, doubling every 2 hours, for 6 hours -> 3 doublings -> 800
    const pop = scienceCalculations.biotech.calculateBacterialGrowth(100, 2, 6);
    expect(pop).toBe(800);
  });
});

describe('Materials Calculations', () => {
  it('calculates density', () => {
    const density = scienceCalculations.materials.calculateDensity(45.0, 10.0);
    expect(density).toBe(4.5);
  });

  it('calculates stress and strain', () => {
    const stress = scienceCalculations.materials.calculateStress(40000, 100);
    expect(stress).toBe(400); // 400 MPa
  });
});

describe('Mission Validator', () => {
  it('normalizes outputs and compares numbers with float tolerance', () => {
    expect(compareOutputs('4.50\n', '4.5')).toBe(true);
    expect(compareOutputs('Specimen DNA-782 Activated ', 'Specimen DNA-782 Activated')).toBe(true);
  });
});

describe('XP Manager', () => {
  it('advances player rank as XP increases', () => {
    const rookie = calculateRankAndLevel(0);
    expect(rookie.rank).toBe('Python Rookie');
    expect(rookie.level).toBe(1);

    const master = calculateRankAndLevel(4000);
    expect(master.rank).toBe('Python Nexus Master');
    expect(master.level).toBe(8);
  });
});

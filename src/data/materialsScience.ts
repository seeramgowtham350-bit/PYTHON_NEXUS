export interface MaterialConcept {
  id: string;
  name: string;
  category: 'Alloys' | 'Polymers' | 'Crystallography' | 'Nanomaterials';
  summary: string;
  pythonRelevance: string;
  sampleCodeSnippet: string;
}

export const MATERIALS_KNOWLEDGE: MaterialConcept[] = [
  {
    id: 'tensile_stress_strain',
    name: 'Stress-Strain Behavior & Hooke\'s Law',
    category: 'Alloys',
    summary: 'Tensile test coupons experience uniaxial force. Engineering stress σ = Force / Area (MPa), and strain ε = ΔL / L0. In the linear elastic regime, Young\'s Modulus E = σ / ε (GPa).',
    pythonRelevance: 'Compute material stiffness, yield boundaries, and deformation limits with float variables, functions, and list filters.',
    sampleCodeSnippet: `force = 25000.0  # N
area = 100.0      # mm2
stress = force / area
print(f"Engineering Stress: {stress} MPa")`,
  },
  {
    id: 'crystal_packing',
    name: 'Crystal Lattice & Atomic Packing Factor',
    category: 'Crystallography',
    summary: 'Metals crystallize in Face-Centered Cubic (FCC), Body-Centered Cubic (BCC), or Hexagonal Close-Packed (HCP) unit cells. Theoretical density depends on atomic mass, unit cell volume, and Avogadro\'s number.',
    pythonRelevance: 'Tuple structures store crystallographic vector coordinates (a, b, c, α, β, γ) and calculate unit cell volumes.',
    sampleCodeSnippet: `lattice_a = 0.352  # nm (Nickel FCC)
unit_vol = lattice_a ** 3
print(f"FCC Cell Volume: {unit_vol:.5f} nm^3")`,
  },
  {
    id: 'shape_memory_effect',
    name: 'Thermo-Mechanical Shape Memory (Nitinol)',
    category: 'Nanomaterials',
    summary: 'Shape memory alloys transition between low-temperature Martensite and high-temperature Austenite crystal phases upon heating, enabling self-healing biomedical stents and robotic actuators.',
    pythonRelevance: 'Represented via Object-Oriented class hierarchies, property getters, and thermal state machines.',
    sampleCodeSnippet: `class ShapeMemoryAlloy:
    def __init__(self, name, temp_c):
        self.name = name
        self.temp_c = temp_c
    def phase(self, current_temp):
        return "Austenite" if current_temp >= self.temp_c else "Martensite"`,
  },
];

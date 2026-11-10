export interface BioConcept {
  id: string;
  name: string;
  category: 'Genomics' | 'Microbiology' | 'Bioinformatics' | 'Biochemistry';
  summary: string;
  pythonRelevance: string;
  sampleCodeSnippet: string;
}

export const BIOTECH_KNOWLEDGE: BioConcept[] = [
  {
    id: 'dna_gc_ratio',
    name: 'GC Content & Thermal Stability',
    category: 'Genomics',
    summary: 'Guanine-Cytosine base pairs form 3 hydrogen bonds compared to 2 in Adenine-Thymine pairs. High GC content elevates the melting temperature (Tm) required to denature DNA strands during PCR amplification.',
    pythonRelevance: 'Calculate string frequencies using count(), dictionaries, and float arithmetic to evaluate genomic GC ratios.',
    sampleCodeSnippet: `dna = "ATGCGATCGATC"
gc = (dna.count('G') + dna.count('C')) / len(dna) * 100
print(f"GC Content: {gc:.1f}%")`,
  },
  {
    id: 'bacterial_kinetics',
    name: 'Bacterial Binary Fission & Doubling',
    category: 'Microbiology',
    summary: 'Microbial cell cultures follow four distinct growth phases: Lag phase (metabolic adaptation), Log/Exponential phase (rapid binary fission), Stationary phase (nutrient limitation), and Death phase.',
    pythonRelevance: 'Modeled using while loops, exponential powers (2 ** n), or differential equations.',
    sampleCodeSnippet: `n0, hours, doubling_time = 100, 8, 2
final_pop = n0 * (2 ** (hours // doubling_time))
print(f"Population after {hours}h: {final_pop}")`,
  },
  {
    id: 'enzyme_kinetics',
    name: 'Michaelis-Menten Enzyme Catalysis',
    category: 'Biochemistry',
    summary: 'Enzymatic reaction velocity V relates to substrate concentration [S] via V = (Vmax * [S]) / (Km + [S]), where Km is the substrate concentration at half-maximal velocity.',
    pythonRelevance: 'Modeled in Python functions with default parameters, list comprehensions, or NumPy vectorization.',
    sampleCodeSnippet: `def reaction_velocity(s, vmax=100.0, km=5.0):
    return (vmax * s) / (km + s)

print("V at S=5.0:", reaction_velocity(5.0))`,
  },
];

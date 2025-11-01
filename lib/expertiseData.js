// Centralized data for Expertise: categories and technologies

export function slugify(input) {
  return String(input)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export const categories = [
  {
    title: 'Frontend Development',
    slug: 'frontend-development',
    summary:
      'Responsive, accessible UIs using React, Next.js, and Tailwind CSS with performance-minded patterns.',
    points: [
      'Component-driven architecture with reusable patterns',
      'SSR/SSG with Next.js and data fetching best practices',
      'Design systems, theming, and accessible components',
    ],
  },
  {
    title: 'Backend Development',
    slug: 'backend-development',
    summary:
      'Robust APIs with Node.js/Express, authentication, and data modeling for reliable services.',
    points: [
      'RESTful APIs and middleware composition',
      'Auth, sessions, JWT, and secure config management',
      'SQL/NoSQL modeling and pragmatic error handling',
    ],
  },
  {
    title: 'Machine Learning',
    slug: 'machine-learning',
    summary:
      'Prototyping ML features with modern Python stacks and production-minded evaluation.',
    points: [
      'Model training and evaluation pipelines',
      'TensorFlow/PyTorch basics and data preprocessing',
      'Inference integration and monitoring considerations',
    ],
  },
  {
    title: 'Problem Solving',
    slug: 'problem-solving',
    summary:
      'Clean, maintainable code with attention to edge cases, complexity, and testing.',
    points: [
      'Algorithmic thinking and complexity awareness',
      'Test-first mindset where practical',
      'Iterative refactoring and code readability',
    ],
  },
];

export const technologies = [
  { label: 'HTML', color: '#F97316' },
  { label: 'CSS', color: '#06B6D4' },
  { label: 'JavaScript', color: '#EAB308' },
  { label: 'Node.js', color: '#16A34A' },
  { label: 'React', color: '#3B82F6' },
  { label: 'Next.js', color: '#111827' },
  { label: 'Supabase', color: '#10B981' },
  { label: 'Firebase', color: '#F59E0B' },
  { label: 'Python', color: '#2563EB' },
  { label: 'Java', color: '#DC2626' },
  { label: 'Docker', color: '#0db7ed' },
  { label: 'AWS', color: '#FF9900' },
].map(t => ({ ...t, slug: slugify(t.label) }));

export function getExpertiseBySlug(slug) {
  const cat = categories.find(c => c.slug === slug);
  if (cat) return { type: 'category', data: cat };
  const tech = technologies.find(t => t.slug === slug);
  if (tech) {
    return {
      type: 'technology',
      data: {
        title: tech.label,
        slug: tech.slug,
        color: tech.color,
        summary: `${tech.label} resources, experience, and representative projects.`,
        points: [
          `Hands-on experience with ${tech.label}.`,
          'Integration with modern tooling and best practices.',
          'Performance, reliability, and DX in focus.',
        ],
      },
    };
  }
  return null;
}

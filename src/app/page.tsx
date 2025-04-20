'use client';

import {Github, Linkedin} from 'lucide-react';
import {motion} from 'framer-motion';
import {useState, useRef, useEffect} from 'react';

import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';

function Card({children}: {children: React.ReactNode}) {
  return <div className="border rounded-md bg-white">{children}</div>;
}
function CardContent({children, className = ''}: {children: React.ReactNode; className?: string}) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
function Button({children, variant, size, asChild, ...props}: {children: React.ReactNode; variant?: string; size?: string; asChild?: boolean; props?: any}) {
  return <button {...props} className="border px-3 py-1 rounded-md bg-white hover:bg-gray-100">{children}</button>;
}

const timelineEvents = [
  {id: 'policy', year: 2025, category: 'Government', color: 'green-500', title: 'AI Policy Research', description: 'AI policy research at [X]'},
  {id: 'hackathon', year: 2024, category: 'Other', color: 'red-500', title: 'Evacuation Route Planner', description: 'AI hackathons and consumer tools'},
  {id: 'lab', start: 2023, end: 2024, category: 'LegalTech', color: 'blue-500', title: 'Public Interest Tech Lab', description: 'Co-founded Public Interest Tech Lab'},
  {id: 'cisa', year: 2023, category: 'Government', color: 'green-500', title: 'CISA Cybersecurity', description: 'Cybersecurity work at CISA'},
  {id: 'sbom', year: 2022, category: 'LegalTech', color: 'blue-500', title: 'GitHub SBOM', description: 'Interned at XYZ Legal AI'},
];

export default function HomePage() {
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const projectRefs = useRef({});

  const handleClick = (id: string) => {
    const node = projectRefs.current[id];
    if (node) {
      node.scrollIntoView({behavior: 'smooth', block: 'center'});
      setExpandedId(id);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!Object.values(projectRefs.current).some(ref => ref?.contains(event.target))) {
        setExpandedId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sortedEvents = [...timelineEvents].sort((a, b) => {
    const yearA = a.year || a.start || 0;
    const yearB = b.year || b.start || 0;
    return yearB - yearA; // Sort in descending order
  });

  const yearSpacing = 80;

  return (
    <main className="min-h-screen bg-[#fdfcf7] text-[#3a3a3a] font-serif px-6 py-12 md:px-20 max-w-6xl mx-auto space-y-16">
      <section className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">Medhya Goel</h1>
        <p className="text-lg max-w-2xl">
          AI + Systems student at Stanford. I’m excited by the intersection of technology,
          governance, and human empowerment — building across legaltech, public interest,
          and AI policy.
        </p>
        <div className="flex space-x-4 pt-2">
          <Button variant="outline" size="icon" asChild>
            <a href="https://github.com/medhya-goel" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href="https://linkedin.com/in/medhyagoel" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Timeline</h2>
        <Accordion type="single" collapsible className="w-full">
          {sortedEvents.map(event => (
            <AccordionItem key={event.id} value={event.id}>
              <AccordionTrigger className="text-lg">{event.title}</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-gray-700">{event.description}</p>
                {event.year ? (
                  <p className="text-sm text-gray-500">Year: {event.year}</p>
                ) : (
                  <p className="text-sm text-gray-500">
                    {event.start} - {event.end}
                  </p>
                )}
                <a
                  className="text-sm text-blue-600 hover:underline"
                  href={`https://github.com/medhya-goel/${event.id}`}
                  target="_blank" rel="noopener noreferrer"
                >
                  View on GitHub
                </a>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Bookshelf</h2>
        <div className="w-full flex justify-center gap-2 items-end h-[280px]">
          {['Gödel, Escher, Bach', 'The Master and His Emissary', 'The Alignment Problem', 'Invisible Women', 'Thinking, Fast and Slow', 'This is How You Lose the Time War'].map((title, index) => (
            <div
              key={index}
              className="w-10 h-[240px] rounded-md bg-white border border-gray-200 shadow-sm flex items-center justify-center px-1 hover:shadow-md transition"
            >
              <span className="text-xs font-medium text-gray-800" style={{writingMode: 'vertical-rl', transform: 'rotate(180deg)'}}>
                {title}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

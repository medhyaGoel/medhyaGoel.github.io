'use client';

import {Github, Linkedin} from 'lucide-react';
import {motion} from 'framer-motion';
import {useState, useRef, useEffect} from 'react';

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

  const sortedEvents = [...timelineEvents];
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

      <section className="flex space-x-8">
        <div className="relative flex flex-col items-start pl-4" style={{minHeight: `${(2025 - 2022 + 1) * yearSpacing}px`}}>
          <div className="absolute left-[7px] top-0 bottom-0 w-px bg-gray-300" />
          {sortedEvents.filter(e => e.start && e.end).map((event, i) => (
            <div
              key={i}
              className="absolute left-[6px] w-px"
              style={{
                top: `${(event.start - 2022) * yearSpacing + 8}px`,
                height: `${(event.end - event.start) * yearSpacing}px`,
                backgroundColor: event.color === 'green-500' ? '#22c55e' : event.color === 'blue-500' ? '#3b82f6' : event.color === 'red-500' ? '#ef4444' : '#000',
              }}
            />
          ))}
          <div className="z-10">
            {[2025, 2024, 2023, 2022].map((year) => (
              <div key={year} className="relative" style={{height: `${yearSpacing}px`}}>
                <div className="absolute left-[-50px] top-[8px] text-xs text-gray-400 w-12 text-right">{year}</div>
                {sortedEvents.filter(e => (e.year === year || e.start === year)).map((event, index) => (
                  <div key={index} className="relative flex items-center space-x-3 pl-4">
                    <motion.div
                      className="w-4 h-4 rounded-full z-20 cursor-pointer hover:scale-110 transition-transform" style={{backgroundColor: event.color === 'green-500' ? '#22c55e' : event.color === 'blue-500' ? '#3b82f6' : event.color === 'red-500' ? '#ef4444' : '#000'}}
                      onClick={() => handleClick(event.id)}
                      onMouseEnter={() => setHoveredEvent(event)}
                      onMouseLeave={() => setHoveredEvent(null)}
                    />
                    <div className="text-sm text-gray-700 font-medium">{event.title}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 max-h-[500px] overflow-y-auto space-y-6 pr-2">
          {sortedEvents.map(event => (
            <div
              key={event.id}
              ref={el => projectRefs.current[event.id] = el}
              className={`transition-all duration-300 cursor-pointer ${expandedId === event.id ? 'bg-opacity-10 p-4 rounded-lg shadow' : ''}`}
              onClick={() => handleClick(event.id)}
            >
              <Card>
                <CardContent className="p-4 space-y-2">
                  <h3 className="text-lg font-medium">{event.title}</h3>
                  <p className="text-sm text-gray-700">{event.description}</p>
                  <a
                    className="text-sm text-blue-600 hover:underline"
                    href={`https://github.com/medhya-goel/${event.id}`}
                    target="_blank" rel="noopener noreferrer"
                  >View on GitHub</a>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
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

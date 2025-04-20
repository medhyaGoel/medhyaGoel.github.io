'use client';

import {Github, Linkedin} from 'lucide-react';
import {motion} from 'framer-motion';
import {useState, useRef, useEffect} from 'react';

import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {ScrollArea} from '@/components/ui/scroll-area';

const timelineEvents = [
  {
    id: 'policy',
    year: 2025,
    month: 'Jan',
    category: 'Government',
    color: 'green-500',
    title: 'AI Policy Research',
    description: 'AI policy research at [X]',
  },
  {
    id: 'hackathon',
    year: 2024,
    month: 'Dec',
    category: 'Other',
    color: 'red-500',
    title: 'Evacuation Route Planner',
    description: 'AI hackathons and consumer tools',
  },
  {
    id: 'lab',
    startYear: 2023,
    startMonth: 'Jun',
    endYear: 2024,
    endMonth: 'Dec',
    category: 'LegalTech',
    color: 'blue-500',
    title: 'Public Interest Tech Lab',
    description: 'Co-founded Public Interest Tech Lab',
  },
  {
    id: 'cisa',
    year: 2023,
    month: 'Jan',
    category: 'Government',
    color: 'green-500',
    title: 'CISA Cybersecurity',
    description: 'Cybersecurity work at CISA',
  },
  {
    id: 'sbom',
    year: 2022,
    month: 'Jun',
    category: 'LegalTech',
    color: 'blue-500',
    title: 'GitHub SBOM',
    description: 'Interned at XYZ Legal AI',
  },
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
    const yearA = a.year || a.startYear || 0;
    const yearB = b.year || b.startYear || 0;
    return yearB - yearA; // Sort in descending order
  });

  const getTimelineLabel = (event: any) => {
    if (event.year && event.month) {
      return `${event.month}, ${event.year}`;
    } else if (event.startYear && event.startMonth && event.endYear && event.endMonth) {
      return `${event.startMonth}, ${event.startYear} - ${event.endMonth}, ${event.endYear}`;
    }
    return 'Unknown Date';
  };

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
        {/* Timeline Section */}
        <div className="w-2/3">
          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-300" />
            <ul className="space-y-4">
              {sortedEvents.map((event, index) => (
                <li key={index} className="ml-12 relative">
                  <div className="flex items-center mb-1">
                    <div className="absolute left-[-40px] top-0 text-sm text-gray-500">
                      {getTimelineLabel(event)}
                    </div>
                    <motion.div
                      className="z-10 w-3 h-3 bg-gray-700 rounded-full absolute left-[-4px]"
                    />
                    <button
                      className="font-semibold text-gray-800 hover:text-blue-500 focus:outline-none"
                      onClick={() => handleClick(event.id)}
                      onMouseEnter={() => setHoveredEvent(event)}
                      onMouseLeave={() => setHoveredEvent(null)}
                    >
                      {event.title}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Project Showcase */}
        <div className="flex-1 max-h-[500px] space-y-6 pr-2">
          <ScrollArea className="h-full">
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
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                    <a
                      className="text-sm text-blue-600 hover:underline"
                      href={`https://github.com/medhya-goel/${event.id}`}
                      target="_blank" rel="noopener noreferrer"
                    >View on GitHub</a>
                  </CardContent>
                </Card>
              </div>
            ))}
          </ScrollArea>
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

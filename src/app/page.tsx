'use client';

import {Github, Linkedin} from 'lucide-react';
import {motion} from 'framer-motion';
import {useState, useRef, useEffect} from 'react';

import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';
import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';

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

      <section className="flex space-x-8">
        {/* Timeline Section */}
        <div className="relative flex flex-col items-start pl-6">
          {/* Vertical Line */}
          <div className="absolute left-2 top-0 h-full w-0.5 bg-border"></div>

          {/* Timeline Events */}
          {sortedEvents.map((event, index) => {
            const isYearlyEvent = event.year !== undefined;
            const eventYear = event.year || event.start || 0;

            return (
              <div key={event.id} className="relative mb-6 w-full">
                {/* Timeline Circle */}
                <div className="absolute left-[-9px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-background shadow">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{backgroundColor: event.color === 'green-500' ? '#22c55e' : event.color === 'blue-500' ? '#3b82f6' : event.color === 'red-500' ? '#ef4444' : '#000'}}
                  />
                </div>

                {/* Event Content */}
                <div
                  className={`ml-6 rounded-md p-4 shadow-sm transition-shadow duration-200 hover:shadow-md ${expandedId === event.id ? 'shadow-md' : ''}`}
                  onMouseEnter={() => setHoveredEvent(event)}
                  onMouseLeave={() => setHoveredEvent(null)}
                >
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                  {isYearlyEvent ? (
                    <p className="mt-1 text-sm text-muted-foreground">Year: {eventYear}</p>
                  ) : (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {event.start} - {event.end}
                    </p>
                  )}
                  <a
                    className="mt-2 block text-sm text-blue-600 hover:underline"
                    href={`https://github.com/medhya-goel/${event.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Project Showcase */}
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

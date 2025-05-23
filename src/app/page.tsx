'use client';

import {Github, Linkedin} from 'lucide-react';
import {useState, useRef, useEffect} from 'react';

import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {ScrollArea} from '@/components/ui/scroll-area';

const timelineEvents = [
  {
    id: 'policy',
    year: 2025,
    month: 'winter',
    category: 'Government',
    color: 'green-500',
    job: 'software',
    title: 'Stripe',
    description: 'moved & stored $$$.',
  },
  {
    id: 'hackathon',
    year: 2024,
    month: 'summer',
    category: 'Other',
    color: 'red-500',
    job: 'policy + software',
    title: 'Cybersecurity & Infrastructure Security Agency',
    description: (
      <>
        worked on an Executive Order + <a href="https://github.com/cisagov/crossfeed/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Crossfeed</a>.
      </>
    ),
  },
  {
    id: 'lab',
    year: 2023,
    month: 'summer',
    category: 'LegalTech',
    color: 'blue-500',
    job: 'software',
    title: 'Rasa',
    description: 'automated criminal records expungement.',
  },
  {
    id: 'cisa',
    year: 2024,
    month: 'Summer',
    category: 'Government',
    color: 'green-500',
    job: 'research',
    title: 'Stanford Internet Observatory',
    description: (
      <>
        studied <a href="https://github.com/stanfordio/truthbrush" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">social media activity</a> + bot networks.
      </>
    ),
  },
  {
    id: 'sbom',
    startYear: 2020,
    startMonth: ' ',
    endYear: 2022,
    endMonth: ' ',
    category: 'LegalTech',
    color: 'blue-500',
    job: 'journalism',
    title: 'city paper',
    description: (
      <>
        helped found <a href="https://sammamishindependent.com/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">city paper</a>. published in <a href="https://www.seattletimes.com/education-lab/student-voices-15-seconds-of-infamy-football-misinformation-and-death-threats/
" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">The Seattle Times</a>. covered everything from murder to city politics.
      </>
    ),
  },
];

export default function HomePage() {
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
    } else if (event.startYear && event.endYear) {
      return `${event.startYear} - ${event.endYear}`;
    }
    return 'Unknown Date';
  };

  return (
    <main className="min-h-screen bg-[#fdfcf7] text-[#3a3a3a] font-serif px-6 py-12 md:px-20 max-w-6xl mx-auto space-y-16">
      <section className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">medhya goel</h1>
        <p className="text-lg max-w-2xl"> ai & public policy @ stanford </p>
          <p className="text-lg max-w-2xl"> building tools that mitigate the effects of broken policy (implementation) of good policy.
          
        </p>
        <div className="flex space-x-4 pt-2">
          <Button variant="outline" size="icon" asChild>
            <a href="https://github.com/medhyaGoel" target="_blank" rel="noopener noreferrer">
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
        <div className="w-1/2">
          <div className="-my-6">
            {sortedEvents.map((event, index) => (
              <div key={index} className="relative pl-8 sm:pl-32 py-6 group">
                <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-border sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-primary after:border-4 after:box-content after:border-background after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                  <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">{getTimelineLabel(event)}</time>
                  <button
                    className="text-xl font-bold text-slate-900 hover:text-blue-500 focus:outline-none"
                    onClick={() => handleClick(event.id)}
                  >
                    {event.job}
                  </button>
                </div>
                <div className="text-slate-500">{event.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Showcase */}
        <div className="w-1/2 max-h-[500px] space-y-6 pr-2">
          <ScrollArea className="h-full">
            {sortedEvents.map(event => (
              <div
                key={event.id}
                ref={el => projectRefs.current[event.id] = el}
                className={`transition-all duration-300 cursor-pointer ${expandedId === event.id ? 'bg-green-100 p-4 rounded-lg shadow' : ''}`}
                onClick={() => handleClick(event.id)}
              >
                <Card>
                  <CardContent className="p-4 space-y-2">
                    <h3 className="text-lg font-medium">{event.job} @ {event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </ScrollArea>
        </div>
      </section>
    </main>
  );
}

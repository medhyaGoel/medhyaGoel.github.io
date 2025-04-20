
import {Github, Linkedin} from 'lucide-react';

export function ProfileLinks() {
  return (
    <div className="flex space-x-4">
      <a href="#" className="text-primary hover:text-primary/80 flex items-center">
        <Linkedin className="mr-2 h-5 w-5"/>
        LinkedIn
      </a>
      <a href="#" className="text-primary hover:text-primary/80 flex items-center">
        <Github className="mr-2 h-5 w-5"/>
        GitHub
      </a>
    </div>
  );
}

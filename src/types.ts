export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  status: 'unread' | 'read';
}

export interface Skill {
  name: string;
  category: 'core' | 'digital-marketing' | 'tools' | 'communication';
  proficiency: number; // 0 to 100
  description: string;
}

export interface TimelineItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  type: 'internship' | 'education' | 'milestone';
  description: string[];
}

export interface EducationItem {
  qualification: string;
  institution: string;
  year: string;
  score: string;
  details?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: 'frontend' | 'backend' | 'fullstack' | 'devops';
  featured: boolean;
  date: string;
}


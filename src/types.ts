export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  status: 'In Progress';
  description: string;
  tags: string[];
  specs: { label: string; value: string }[];
  accentColor?: string;
  diagramType: 'robot' | 'jarvis' | 'drone' | 'iot';
}

export interface SkillItem {
  name: string;
  category: 'Microcontrollers & Hardware' | 'Systems & Languages' | 'Hardware Interfacing';
  status?: string;
  desc: string;
  badge?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

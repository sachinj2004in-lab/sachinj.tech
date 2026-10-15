export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  status: 'IN PROGRESS';
  schematicType: 'robot' | 'jarvis' | 'drone' | 'iot';
}

export interface SkillItem {
  id: string;
  name: string;
  badge?: string;
  isLearning?: boolean;
  category: 'Microcontrollers' | 'Hardware Interfacing' | 'Languages';
}

export interface TrackItem {
  number: string;
  title: string;
  description: string;
  tag: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    name: 'Sachin J',
    firstName: 'SACHIN',
    role: 'Aspiring Embedded Software Engineer',
    email: 'sachinreva2004@gmail.com',
    github: 'https://github.com/sachin2004-roxx',
    linkedin: 'https://www.linkedin.com/in/sachin-j-b18011276',
    location: 'Coimbatore, Tamil Nadu, India',
    education: {
      college: 'Kumaraguru College of Technology',
      degree: 'B.E. Electronics and Communication Engineering',
      batch: '2022–2026',
    },
  },

  hero: {
    intro: "Hi, I'm Sachin J.",
    headlineLine1: 'EMBEDDED SOFTWARE',
    headlineLine2: 'ENGINEER.',
    supporting:
      'Exploring embedded systems, microcontrollers and intelligent hardware-software integration through hands-on engineering projects.',
    primaryCta: 'Explore My Work',
    secondaryCta: 'Contact Me',
  },

  about: {
    label: '(02) — About Me',
    headline: 'CURIOUS BY NATURE. BUILDING THROUGH EXPERIMENTATION.',
    paragraph:
      "I'm an Electronics and Communication Engineering student focused on learning how hardware and software work together. I explore microcontrollers, sensors, motor control and intelligent systems through projects that turn ideas into practical prototypes.",
    cards: [
      {
        title: 'ESP32',
        subtitle: 'Embedded platform explored',
        tag: 'HARDWARE CORE',
      },
      {
        title: 'IoT',
        subtitle: 'Connected monitoring concepts',
        tag: 'CLOUD TELEMETRY',
      },
      {
        title: 'C / Python',
        subtitle: 'Programming tools',
        tag: 'FIRMWARE & SCRIPTS',
      },
    ],
  },

  work: {
    label: '(03) — Selected Projects',
    headline: 'SELECTED PROJECTS',
    projects: [
      {
        id: 'road-cleaning-robot',
        number: '01 / 04',
        title: 'Autonomous Road-Cleaning Robot',
        description: 'A robotics concept focused on autonomous movement and road-cleaning functionality.',
        tags: ['Embedded C', 'Motor Control', 'State Machine', 'Sensors'],
        status: 'IN PROGRESS',
        schematicType: 'robot',
      },
      {
        id: 'jarvis-ai-assistant',
        number: '02 / 04',
        title: 'J.A.R.V.I.S Personal AI Assistant',
        description: 'A personal AI assistant concept exploring intelligent interaction and automation.',
        tags: ['Python', 'Speech Recognition', 'Automation', 'UART Serial'],
        status: 'IN PROGRESS',
        schematicType: 'jarvis',
      },
      {
        id: 'ai-assisted-drone',
        number: '03 / 04',
        title: 'AI-Assisted Drone System',
        description: 'A drone-system concept exploring AI-assisted functionality and aerial applications.',
        tags: ['Flight Dynamics', 'Sensor Interfacing', 'Python Telemetry'],
        status: 'IN PROGRESS',
        schematicType: 'drone',
      },
      {
        id: 'iot-air-quality',
        number: '04 / 04',
        title: 'IoT Air-Quality Monitoring',
        description: 'An air-quality monitoring concept using ESP32, MQ-135, an LCD, and ThingSpeak.',
        tags: ['ESP32', 'MQ-135', 'ThingSpeak IoT', '16x2 LCD'],
        status: 'IN PROGRESS',
        schematicType: 'iot',
      },
    ] as ProjectItem[],
  },

  journey: {
    label: '(04) — Education & Journey',
    headlineLine1: 'LEARNING',
    headlineLine2: 'THROUGH BUILDING.',
    batch: '2022–2026',
    college: 'Kumaraguru College of Technology',
    degree: 'B.E. Electronics and Communication Engineering',
    location: 'Coimbatore, Tamil Nadu, India',
    focus: 'Microcontroller Architectures, Sensor Interfacing, Digital Signal Processing, Embedded Systems',
  },

  skills: {
    label: '(05) — Toolkit',
    headlineLine1: 'ENGINEERED',
    headlineLine2: 'THROUGH CURIOSITY.',
    items: [
      { id: 'esp32', name: 'ESP32', category: 'Microcontrollers', badge: 'Xtensa Core' },
      { id: 'arduino', name: 'Arduino', category: 'Microcontrollers', badge: 'AVR / ATmega' },
      { id: 'mcu', name: 'Microcontrollers', category: 'Microcontrollers', badge: 'Timers & GPIO' },
      { id: 'sensor', name: 'Sensor Interfacing', category: 'Hardware Interfacing', badge: 'I2C / SPI / ADC' },
      { id: 'motor', name: 'Motor Control', category: 'Hardware Interfacing', badge: 'PWM & H-Bridge' },
      { id: 'c', name: 'C', category: 'Languages', badge: 'Firmware Logic' },
      { id: 'python', name: 'Python', category: 'Languages', badge: 'Serial & Scripts' },
      { id: 'embedded-c', name: 'Embedded C — Learning', isLearning: true, category: 'Languages', badge: 'In Active Study' },
    ] as SkillItem[],
    marquee: [
      'ESP32',
      'ARDUINO',
      'MICROCONTROLLERS',
      'SENSOR INTERFACING',
      'MOTOR CONTROL',
      'C',
      'PYTHON',
      'EMBEDDED C',
      'UART',
      'I2C',
      'SPI',
      'PWM',
      'THINGSPEAK',
    ],
  },

  highlights: {
    label: '(06) — Highlights',
    headline: 'EXPLORATION AREAS',
    tracks: [
      {
        number: '01',
        title: 'Embedded Systems & Firmware',
        description: 'Low-level C programming, timer interrupts, register control, and deterministic logic execution.',
        tag: 'FIRMWARE ARCHITECTURE',
      },
      {
        number: '02',
        title: 'Robotics & Motor Control',
        description: 'Autonomous road-cleaning kinematics, dual H-bridge motor regulation, and non-blocking state machines.',
        tag: 'ROBOTICS & PWM',
      },
      {
        number: '03',
        title: 'IoT & Atmospheric Sensing',
        description: 'ESP32 environmental telemetry, MQ-135 calibration curves, and ThingSpeak cloud telemetry.',
        tag: 'SENSORS & CLOUD',
      },
      {
        number: '04',
        title: 'AI-Assisted System Telemetry',
        description: 'Python speech recognition routines and telemetry feeds for drone stability monitoring.',
        tag: 'INTELLIGENT SYSTEMS',
      },
    ] as TrackItem[],
  },

  contact: {
    label: '(07) — Contact',
    headlineLine1: "LET'S",
    headlineLine2: 'CONNECT.',
    email: 'sachinreva2004@gmail.com',
    github: 'https://github.com/sachin2004-roxx',
    linkedin: 'https://www.linkedin.com/in/sachin-j-b18011276',
    location: 'Coimbatore, Tamil Nadu, India',
    year: '2026',
  },
};

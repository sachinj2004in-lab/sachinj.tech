export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: 'AI & Robotics' | 'Embedded & IoT' | 'Electronics & Mobile' | 'System Architecture';
  description: string;
  coverImage: string;
  tags: string[];
  status: 'IN PROGRESS' | 'PROTOTYPE' | 'CONCEPT / DESIGN';
  schematicType:
    | 'jarvis'
    | 'workspace'
    | 'robot'
    | 'builder'
    | 'marketplace'
    | 'drone'
    | 'telephony'
    | 'solar'
    | 'arm'
    | 'iot'
    | 'rccar'
    | 'safety';
}

export interface SkillItem {
  id: string;
  name: string;
  badge?: string;
  isLearning?: boolean;
  isExploring?: boolean;
}

export interface SkillCategoryGroup {
  id: string;
  name: string;
  countLabel: string;
  skills: SkillItem[];
}

export interface RoadmapStage {
  step: string;
  title: string;
  period: string;
  status: 'Current Education' | 'Active Exploration' | 'Target Objective' | 'Long-Term Vision';
  statusColor: 'emerald' | 'amber' | 'blue' | 'purple';
  description: string;
  highlights: string[];
}

export const PORTFOLIO_DATA = {
  profile: {
    name: 'Sachin J',
    firstName: 'SACHIN',
    role: 'Aspiring Embedded Software Engineer | AI & Robotics Enthusiast',
    email: 'sachinreva2004@gmail.com',
    github: 'https://github.com/sachinj2004in-lab',
    linkedin: 'https://www.linkedin.com/in/sachin-j-b18011276',
    phone: '+91 81488 43278',
    whatsappUrl: 'https://wa.me/918148843278',
    location: 'Coimbatore, Tamil Nadu, India',
    education: {
      college: 'Kumaraguru College of Technology, Coimbatore',
      degree: 'Bachelor of Engineering — Electronics and Communication Engineering',
      batch: '2022–2026 batch',
    },
  },

  hero: {
    intro: "HI, I'M SACHIN J",
    headlineLine1: 'EMBEDDED',
    headlineLine2: 'SOFTWARE',
    headlineLine3: 'ENGINEER',
    supporting:
      'Exploring embedded systems, microcontrollers and intelligent hardware-software integration through hands-on engineering projects.',
    primaryCta: 'Explore My Work',
    secondaryCta: 'Contact Me',
  },

  about: {
    label: '(02) — About',
    headline: 'CURIOUS BY NATURE. BUILDING THROUGH EXPERIMENTATION.',
    paragraph:
      "I am an Electronics and Communication Engineering student at Kumaraguru College of Technology, Coimbatore (2022–2026 batch). My technical focus is centered on embedded software, electronics, AI, robotics, IoT, and automation. I believe in hands-on experimentation, building physical prototypes, and bridging firmware with hardware to turn ideas into practical systems.",
    skillCategories: [
      {
        id: 'programming',
        name: 'Programming & Software',
        countLabel: '5 Technologies',
        skills: [
          { id: 'c', name: 'C Programming', badge: 'Firmware Logic & Systems' },
          { id: 'embedded-c', name: 'Embedded C — Learning', badge: 'In Active Study', isLearning: true },
          { id: 'python', name: 'Python', badge: 'Scripting & AI Automation' },
          { id: 'kotlin', name: 'Kotlin / Android', badge: 'Mobile Applications' },
          { id: 'web', name: 'HTML, CSS, JavaScript', badge: 'Interactive Web Interfaces' },
        ],
      },
      {
        id: 'embedded',
        name: 'Embedded Systems',
        countLabel: '8 Disciplines',
        skills: [
          { id: 'esp32', name: 'ESP32', badge: 'Xtensa Dual-Core & Wi-Fi' },
          { id: 'arduino', name: 'Arduino', badge: 'AVR / ATmega Ecosystem' },
          { id: 'rpi', name: 'Raspberry Pi', badge: 'Single-Board Computing' },
          { id: 'arm', name: 'ARM / LPC2148', badge: '32-Bit Microcontroller' },
          { id: 'stm32', name: 'STM32 — Learning Path', badge: 'Learning Path', isLearning: true },
          { id: 'sensors', name: 'Sensors and Actuators', badge: 'Interfacing & Telemetry' },
          { id: 'motors', name: 'Motor Control', badge: 'PWM & Dual H-Bridge Drivers' },
          { id: 'interfacing', name: 'Hardware Interfacing', badge: 'GPIO, ADC, DAC & Regulators' },
        ],
      },
      {
        id: 'communication',
        name: 'Communication',
        countLabel: '7 Protocols',
        skills: [
          { id: 'uart', name: 'UART', badge: 'Serial Telemetry & AT-Cmds' },
          { id: 'i2c', name: 'I²C', badge: 'Two-Wire Sensor Bus' },
          { id: 'spi', name: 'SPI', badge: 'High-Speed Synchronous Bus' },
          { id: 'wifi', name: 'Wi-Fi', badge: '802.11 b/g/n Networking' },
          { id: 'ble', name: 'Bluetooth', badge: 'BLE Teleoperation' },
          { id: 'iot-mon', name: 'IoT Monitoring', badge: 'Cloud Data Logging' },
          { id: 'mqtt', name: 'MQTT — Exploring', badge: 'Exploring', isExploring: true },
        ],
      },
      {
        id: 'ai',
        name: 'Artificial Intelligence',
        countLabel: '7 Capabilities',
        skills: [
          { id: 'genai', name: 'Generative AI', badge: 'LLMs & Multimodal Reasoning' },
          { id: 'llm', name: 'LLM Integration', badge: 'API Orchestration & Function Calls' },
          { id: 'prompt', name: 'Prompt Engineering', badge: 'Structured Output & Chains' },
          { id: 'voice-ai', name: 'Voice AI Concepts', badge: 'STT & TTS Pipelines' },
          { id: 'assistant-arch', name: 'AI Assistant Architecture', badge: 'Context & State Graphs' },
          { id: 'agents', name: 'Agent Workflows', badge: 'Autonomous Execution' },
          { id: 'ai-code', name: 'AI-Assisted Coding', badge: 'Accelerated Development' },
        ],
      },
      {
        id: 'tools',
        name: 'Development Tools',
        countLabel: '6 Platforms',
        skills: [
          { id: 'arduino-ide', name: 'Arduino IDE', badge: 'MCU Toolchain & Flashing' },
          { id: 'vscode', name: 'VS Code', badge: 'Firmware & Scripting IDE' },
          { id: 'proteus', name: 'Proteus', badge: 'Schematic & Circuit Simulation' },
          { id: 'git', name: 'Git / GitHub', badge: 'Version Control & Repos' },
          { id: 'android-studio', name: 'Android Development', badge: 'Android Studio SDK' },
          { id: 'thingspeak', name: 'ThingSpeak', badge: 'IoT Analytics Cloud' },
        ],
      },
    ] as SkillCategoryGroup[],
  },

  projects: {
    label: '(03) — Projects',
    headline: 'SELECTED ENGINEERING PROJECTS',
    items: [
      // 1. VECTOR — Personal AI Assistant
      {
        id: 'jarvis-ai-assistant',
        number: '01 / 12',
        title: 'VECTOR — Personal AI Assistant',
        category: 'AI & Robotics',
        description:
          'Intelligent personal assistant combining Python voice interaction, LLM integration, contextual memory concepts, and UART serial telemetry with embedded hardware.',
        coverImage: '/assets/jarvis-ironman.jpg',
        tags: ['Python', 'LLM Integration', 'Voice AI', 'UART Telemetry', 'Speech-to-Text'],
        status: 'IN PROGRESS',
        schematicType: 'jarvis',
      },
      // 2. Workspace AI
      {
        id: 'workspace-ai',
        number: '02 / 12',
        title: 'Workspace AI',
        category: 'Embedded & IoT',
        description:
          'Smart workspace automation powered by ESP32, voice commands, motorized physical peripherals, and intelligent ambient sensors.',
        coverImage: '/assets/workspace-ai.svg',
        tags: ['ESP32', 'Voice Commands', 'Motor Control', 'Automation', 'Sensors'],
        status: 'IN PROGRESS',
        schematicType: 'workspace',
      },
      // 3. Autonomous Road-Cleaning Robot
      {
        id: 'road-cleaning-robot',
        number: '03 / 12',
        title: 'Autonomous Road-Cleaning Robot',
        category: 'AI & Robotics',
        description:
          'Realistic outdoor road and leaf cleaning robot prototype featuring ESP32, LiDAR obstacle awareness, non-blocking finite state machine, and dual motorized cylindrical scrubbers.',
        coverImage: '/assets/project-robot.jpg',
        tags: ['ESP32', 'Embedded C', 'LiDAR', 'Motor Control', 'Sensors', 'Robotics'],
        status: 'IN PROGRESS',
        schematicType: 'robot',
      },
      // 4. VECTOR — AI-Powered Robotic Builder
      {
        id: 'vector-robotic-builder',
        number: '04 / 12',
        title: 'VECTOR — AI-Powered Robotic Builder',
        category: 'AI & Robotics',
        description:
          'Robotics workbench concept with articulated robotic arms, computer vision component tracking, AI motion planning, and automatic tool changing.',
        coverImage: '/assets/vector-robotic-builder.svg',
        tags: ['Robotics', 'Computer Vision', 'AI Planning', 'Tool Changing', 'Concept Design'],
        status: 'CONCEPT / DESIGN',
        schematicType: 'builder',
      },
      // 5. FixNear — Service & Rental Marketplace
      {
        id: 'fixnear-marketplace',
        number: '05 / 12',
        title: 'FixNear — Service & Rental Marketplace',
        category: 'Electronics & Mobile',
        description:
          'Hyperlocal digital service and rental marketplace connecting neighborhood users with verified electronics technicians, diagnostic tools, and equipment rentals.',
        coverImage: '/assets/fixnear-marketplace.svg',
        tags: ['Web Platform', 'Service Discovery', 'Rentals', 'Product Design', 'JavaScript'],
        status: 'PROTOTYPE',
        schematicType: 'marketplace',
      },
      // 6. AI Gesture & Voice-Controlled Drone
      {
        id: 'ai-drone',
        number: '06 / 12',
        title: 'AI Gesture & Voice-Controlled Drone',
        category: 'AI & Robotics',
        description:
          'High-agility quadcopter platform featuring 6-axis flight telemetry, GPS satellite positioning, gesture/voice command processing, and safety fail-safe recovery.',
        coverImage: '/assets/project-drone.jpg',
        tags: ['UAV Dynamics', 'GPS Navigation', 'Sensor Interfacing', 'Flight Controller', 'Voice Control'],
        status: 'IN PROGRESS',
        schematicType: 'drone',
      },
      // 7. Android Call Assistant
      {
        id: 'android-call-assistant',
        number: '07 / 12',
        title: 'Android Call Assistant',
        category: 'Electronics & Mobile',
        description:
          'Native Android mobile application built with Kotlin and Jetpack Compose featuring intelligent incoming call screening, edge speech recognition, and assistant workflows.',
        coverImage: '/assets/android-call-assistant.svg',
        tags: ['Kotlin', 'Android Studio', 'Jetpack Compose', 'Voice Interaction', 'Telephony API'],
        status: 'IN PROGRESS',
        schematicType: 'telephony',
      },
      // 8. Solar-Powered Mobile Charger
      {
        id: 'solar-mobile-charger',
        number: '08 / 12',
        title: 'Solar-Powered Mobile Charger',
        category: 'Electronics & Mobile',
        description:
          'Portable green energy harvesting module integrating monocrystalline photovoltaic cells, high-efficiency MPPT buck regulation, and 5V 2.4A regulated USB charging output.',
        coverImage: '/assets/solar-mobile-charger.svg',
        tags: ['Solar PV', 'MPPT Regulation', 'Power Electronics', 'Hardware Prototype', 'DC-DC Buck'],
        status: 'PROTOTYPE',
        schematicType: 'solar',
      },
      // 9. Digital Clock using ARM LPC2148
      {
        id: 'arm-digital-clock',
        number: '09 / 12',
        title: 'Digital Clock using ARM LPC2148',
        category: 'Embedded & IoT',
        description:
          'Microcontroller-based digital timepiece implemented on 32-bit ARM7 LPC2148, configuring on-chip RTC registers, 32.768kHz crystal oscillator, and multiplexed 7-segment display.',
        coverImage: '/assets/arm-digital-clock.svg',
        tags: ['ARM7 LPC2148', 'Embedded C', 'On-Chip RTC', 'Keil uVision', '7-Segment Display'],
        status: 'PROTOTYPE',
        schematicType: 'arm',
      },
      // 10. Air Quality Monitoring System
      {
        id: 'iot-air-quality',
        number: '10 / 12',
        title: 'Air Quality Monitoring System',
        category: 'Embedded & IoT',
        description:
          'ESP32-based environmental monitoring node with MQ-135 sensor, 16x2 I2C LCD, logging continuous atmospheric PPM data directly to ThingSpeak cloud analytics.',
        coverImage: '/assets/project-iot.svg',
        tags: ['ESP32', 'MQ-135', 'ThingSpeak IoT', 'I2C LCD', 'Environmental Telemetry'],
        status: 'PROTOTYPE',
        schematicType: 'iot',
      },
      // 11. ESP32 Wi-Fi RC Car
      {
        id: 'esp32-rc-car',
        number: '11 / 12',
        title: 'ESP32 Wi-Fi RC Car',
        category: 'Embedded & IoT',
        description:
          'Small teleoperated vehicular robot hosting an asynchronous embedded web server on ESP32, enabling low-latency WebSocket directional steering and PWM motor control via L298N dual H-bridge.',
        coverImage: '/assets/esp32-rc-car.svg',
        tags: ['ESP32', 'WebSockets', 'L298N Driver', 'PWM Motor Drive', 'Differential Steering'],
        status: 'PROTOTYPE',
        schematicType: 'rccar',
      },
      // 12. Car Accident Safety Monitor
      {
        id: 'car-accident-safety-monitor',
        number: '12 / 12',
        title: 'Car Accident Safety Monitor',
        category: 'Embedded & IoT',
        description:
          'Automotive safety telemetry system coupling ADXL345 3-axis accelerometer for impact threshold detection, NEO-6M GPS for satellite coordinates, and SIM800L GSM for automated emergency SOS dispatch.',
        coverImage: '/assets/car-accident-safety-monitor.svg',
        tags: ['Microcontroller', 'ADXL345', 'NEO-6M GPS', 'SIM800L GSM', 'Emergency Telemetry'],
        status: 'PROTOTYPE',
        schematicType: 'safety',
      },
    ] as ProjectItem[],
  },

  journey: {
    label: '(04) — Journey & Career Roadmap',
    headlineLine1: 'LEARNING',
    headlineLine2: 'THROUGH BUILDING.',
    batch: '2022–2026 batch',
    college: 'Kumaraguru College of Technology, Coimbatore',
    degree: 'Bachelor of Engineering — Electronics and Communication Engineering',
    location: 'Coimbatore, Tamil Nadu, India',
    focus: 'Microcontroller Architectures, Sensor Interfacing, Embedded Firmware, Digital Systems',

    careerGoal: {
      headline: 'My Next Chapter: M.S. in Embedded Systems, Germany',
      targetDegree: 'Master of Science (M.S.) in Embedded Systems',
      targetCountry: 'Germany',
      narrative:
        'My ambition is to deepen my knowledge through an M.S. in Embedded Systems in Germany, focusing on advanced firmware development, real-time embedded systems, intelligent electronics, hardware-software architecture, robotics, industrial automation, and automotive electronics.',
      coreInterests: [
        {
          title: 'Advanced Firmware & RTOS',
          description:
            'Designing deterministic, low-latency firmware architectures for real-time microcontrollers with rigorous safety constraints.',
        },
        {
          title: 'Automotive & Industrial Electronics',
          description:
            'Engineering electronic control units (ECUs), CAN/LIN bus vehicle communication, sensor fusion, and smart industrial automation.',
        },
        {
          title: 'Intelligent Hardware-Software Integration',
          description:
            'Bridging physical circuits and microcontrollers with edge intelligence, digital signal processing, and robotics kinematics.',
        },
      ],
      notice:
        '* Note: This reflects a future academic goal and educational roadmap. Formal admissions and applications will be submitted upon completion of undergraduate studies.',
    },

    roadmap: [
      {
        step: '01',
        title: 'Engineering Foundations',
        period: '2022–2026',
        status: 'Current Education',
        statusColor: 'emerald',
        description:
          'B.E. in Electronics and Communication Engineering at Kumaraguru College of Technology, establishing core principles of circuit analysis, digital electronics, signals, and microprocessors.',
        highlights: [
          'B.E. in Electronics & Communication Engineering',
          'Kumaraguru College of Technology, Coimbatore',
          'Circuit analysis, digital logic, and microprocessors',
        ],
      },
      {
        step: '02',
        title: 'Technical Development',
        period: '2023–Present',
        status: 'Active Exploration',
        statusColor: 'amber',
        description:
          'Developing practical knowledge in embedded systems, firmware, microcontrollers, AI, IoT, and robotics through 12 hands-on prototypes.',
        highlights: [
          'Hands-on with ESP32, Arduino, ARM LPC2148 & STM32 learning',
          'Prototyping autonomous robotics, IoT telemetry & motor control',
          'Active study of Embedded C & firmware register programming',
        ],
      },
      {
        step: '03',
        title: 'Higher Education Goal — M.S. in Embedded Systems, Germany',
        period: 'Target 2026+',
        status: 'Target Objective',
        statusColor: 'blue',
        description:
          'Aspiration to pursue an M.S. in Embedded Systems in Germany, specializing in real-time operating systems, advanced microcontroller architectures, and automotive electronics.',
        highlights: [
          'Target: M.S. in Embedded Systems in Germany',
          'Advanced RTOS & safety-critical embedded systems',
          'Automotive electronics & industrial automation',
        ],
      },
      {
        step: '04',
        title: 'Long-Term Career Vision',
        period: '2028+ Horizon',
        status: 'Long-Term Vision',
        statusColor: 'purple',
        description:
          'Contribute to dependable embedded systems and intelligent engineering applications across electric vehicles, robotics, and industrial technology.',
        highlights: [
          'Embedded Software Engineer in automotive or robotics',
          'Architecting dependable, intelligent hardware-software systems',
          'Bridging cutting-edge firmware with real-world machines',
        ],
      },
    ] as RoadmapStage[],
  },

  resume: {
    label: '(05) — Resume',
    headlineLine1: 'CURRICULUM',
    headlineLine2: 'VITAE',
    summary:
      'Aspiring Embedded Software Engineer pursuing Bachelor of Engineering in Electronics & Communication Engineering at Kumaraguru College of Technology (2022–2026 batch). Hands-on experience developing microcontrollers, robotics kinematics, and IoT telemetry prototypes.',
    degree: 'Bachelor of Engineering — Electronics and Communication Engineering',
    college: 'Kumaraguru College of Technology, Coimbatore',
    batch: '2022–2026 batch',
    location: 'Coimbatore, Tamil Nadu, India',
    email: 'sachinreva2004@gmail.com',
    phone: '+91 81488 43278',
    competencies: [
      { area: 'Microcontrollers', skills: 'ESP32, Arduino, ARM LPC2148, STM32 (Learning Path), Timers & GPIO' },
      { area: 'Hardware Interfacing', skills: 'Sensors and Actuators (I2C/SPI/ADC), Motor Control (PWM, Dual H-Bridge)' },
      { area: 'Languages & Tools', skills: 'C Programming, Python, Embedded C (Learning), Kotlin, Keil uVision, VS Code, Git' },
      { area: 'Project Prototypes', skills: 'Autonomous Cleaning Robot, J.A.R.V.I.S Assistant, AI Drone, IoT Telemetry' },
    ],
    pdfFile: '/assets/resume.pdf',
  },

  contact: {
    label: '(06) — Contact',
    headline: "LET'S CONNECT.",
    headlineLine1: "LET'S",
    headlineLine2: 'CONNECT.',
    phone: '+91 81488 43278',
    phoneUrl: 'https://wa.me/918148843278',
    email: 'sachinreva2004@gmail.com',
    linkedin: 'https://www.linkedin.com/in/sachin-j-b18011276',
    linkedinDisplay: 'sachin-j-b18011276',
    github: 'https://github.com/sachinj2004in-lab',
    githubDisplay: 'sachinj2004in-lab',
    location: 'Coimbatore, Tamil Nadu, India',
    locationUrl: 'https://maps.google.com/?q=Coimbatore,+Tamil+Nadu,+India',
    year: '2026',
  },
};

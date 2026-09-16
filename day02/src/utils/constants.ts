import { FolderGuideItem } from '../types';

export const APP_NAME = "React Architecture Workshop";
export const WORKSHOP_DAY = "Day 02: Folder Structure & Clean Code";

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Folder Guide", href: "#folder-guide" },
  { label: "Live Demo", href: "#live-demo" },
  { label: "README", href: "#readme" },
];

export const FOLDER_EXPLANATIONS: FolderGuideItem[] = [
  {
    folderName: "pages/",
    purpose: "Holds full page views/screens (e.g., Home, Profile, Dashboard).",
    simpleAnalogy: "Like full pages in a textbook.",
    colorTheme: "from-blue-500 to-indigo-600",
    exampleFile: "src/pages/Home.tsx",
  },
  {
    folderName: "components/",
    purpose: "Holds reusable UI building blocks (e.g., Header, Button, Card).",
    simpleAnalogy: "Like LEGO bricks you can reuse anywhere.",
    colorTheme: "from-cyan-500 to-blue-500",
    exampleFile: "src/components/Header.tsx",
  },
  {
    folderName: "services/",
    purpose: "Handles business logic, processing data received from APIs before feeding to components.",
    simpleAnalogy: "Like a kitchen chef preparing raw food before serving.",
    colorTheme: "from-emerald-500 to-teal-600",
    exampleFile: "src/services/studentService.ts",
  },
  {
    folderName: "api/",
    purpose: "Contains HTTP configuration, API clients (Axios/Fetch), and endpoint definitions.",
    simpleAnalogy: "Like a delivery driver bringing data from external servers.",
    colorTheme: "from-purple-500 to-violet-600",
    exampleFile: "src/api/client.ts",
  },
  {
    folderName: "utils/",
    purpose: "Contains generic helper functions (date formatting, currency, calculations).",
    simpleAnalogy: "Like a multi-tool pocket knife.",
    colorTheme: "from-amber-500 to-orange-600",
    exampleFile: "src/utils/formatters.ts",
  },
  {
    folderName: "types/",
    purpose: "Stores TypeScript interfaces and type declarations for strict type checking.",
    simpleAnalogy: "Like a blueprint ensuring all parts fit correctly.",
    colorTheme: "from-rose-500 to-pink-600",
    exampleFile: "src/types/index.ts",
  },
  {
    folderName: "hooks/",
    purpose: "Contains custom React hooks for sharing stateful logic across components.",
    simpleAnalogy: "Like a smart helper managing state in the background.",
    colorTheme: "from-sky-500 to-cyan-600",
    exampleFile: "src/hooks/useStudents.ts",
  },
];

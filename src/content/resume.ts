// Single source of truth for everything on the site.
// Kept free of browser/Vite-only imports: vite.config.ts also loads this file
// to emit the static JSON API under /api/*.json at build time.

export const profile = {
  name: "Saran M",
  role: "Backend-focused Full Stack Developer",
  location: "Bengaluru, India",
  timezone: "Asia/Kolkata",
  status: "open_to_opportunities",
  summary:
    "Backend-focused full stack engineer with production experience at healthtech startups, building NestJS/TypeScript REST APIs, PostgreSQL and Redis-backed services, queue-driven async pipelines (BullMQ) and AWS infrastructure for a HIPAA-compliant platform. Owns features end to end, from API and data design through CI/CD and deployment, and works across Next.js/React front ends. Building a multi-channel SaaS product for SMB sellers on the side.",
  contact: {
    email: "saranmvdm@gmail.com",
    phone: "+91 6379710438",
  },
  links: {
    github: "https://github.com/saran-mani",
    linkedin: "https://linkedin.com/in/saranmj",
    linktree: "https://linktr.ee/saranmj",
  },
};

export type Highlight = { key: string; text: string };

export type Role = {
  company: string;
  title: string;
  period: { start: string; end: string | null };
  location?: string;
  context?: string;
  previously?: { title: string; period: { start: string; end: string } };
  highlights: Highlight[];
};

// Dates are ISO months so the timeline can compute real durations.
export const experience: Role[] = [
  {
    company: "Synapsis Medical Technologies",
    title: "Software Engineer",
    period: { start: "2025-07", end: null },
    location: "Bengaluru",
    context: "HIPAA-compliant healthtech platform",
    previously: {
      title: "Software Engineer Intern",
      period: { start: "2025-04", end: "2025-06" },
    },
    highlights: [
      {
        key: "auth",
        text: "Designed the patient authentication system in NestJS: 15-minute access tokens, sliding refresh-token expiry, per-device revocation and a grace window to safely handle concurrent refresh replays.",
      },
      {
        key: "ingestion",
        text: "Built webhook-first ingestion for wearable health data (Terra) with BullMQ workers, decoupling receipt from processing so bursts of events are handled reliably and asynchronously.",
      },
      {
        key: "fhir",
        text: "Implemented SMART on FHIR OAuth2 (confidential client) integration with Medplum, with per-clinic credential storage to support multiple tenant clinics.",
      },
      {
        key: "infra",
        text: "Provisioned the AWS pre-production environment inside the existing VPC (subnets, security groups, ALB listener rules, ACM certificates, ECS Fargate service); contributing to AWS Config HIPAA conformance remediation.",
      },
      {
        key: "migration",
        text: "Executed a soft-to-hard delete migration across Admin, Clinic, Patient and Dependent models, and set up LocalStack (SES, KMS, IAM) with a bootstrap script for reproducible local AWS development.",
      },
      {
        key: "ci/cd",
        text: "Built GitHub Actions CI/CD for the Electron/Next.js desktop app: arm64/x64 macOS builds, notarization with a retry wrapper for arm64 timeouts, OIDC-based AWS auth and S3 artifact publishing.",
      },
    ],
  },
  {
    company: "MyCLNQ Health",
    title: "Software Engineer Intern",
    period: { start: "2024-07", end: "2025-03" },
    context: "Healthtech platform",
    highlights: [
      {
        key: "backend",
        text: "Contributed to backend development, debugging and feature delivery for a healthtech platform while working in an agile team.",
      },
    ],
  },
];

export const projects = [
  {
    slug: "vendpilot",
    name: "VendPilot",
    tagline: "Multi-channel inventory sync SaaS",
    kind: "side_project",
    stack: ["NestJS", "Next.js", "BullMQ", "Redis", "Turborepo"],
    channels: ["Shopify", "WooCommerce", "Etsy"],
    caseStudy: "/vendpilot",
    highlights: [
      "Building a SaaS that keeps stock in sync across Shopify, WooCommerce and Etsy for SMB sellers, using a PlatformAdapter interface (Adapter pattern) so new channels plug in without changing core sync logic.",
      "Designed onboarding as a BullMQ parent-child job flow (webhook registration → catalog → locations → stock import) with Redis distributed locking to prevent conflicting concurrent stock writes.",
      "Implemented Etsy PKCE and Shopify OAuth flows and webhook routing; migrated the codebase to a Turborepo + pnpm monorepo.",
    ],
  },
];

export type Usage = { at: string; for: string };
export type Skill = { name: string; usedIn?: Usage[] };
export type SkillGroup = { group: string; items: Skill[] };

const SYN = "Synapsis";
const VP = "VendPilot";

export const stack: SkillGroup[] = [
  {
    group: "languages",
    items: [
      { name: "TypeScript", usedIn: [{ at: SYN, for: "NestJS services" }, { at: VP, for: "NestJS + Next.js monorepo" }] },
      { name: "JavaScript (ES6+)" },
      { name: "SQL" },
      { name: "HTML" },
      { name: "CSS" },
    ],
  },
  {
    group: "backend",
    items: [
      { name: "Node.js", usedIn: [{ at: SYN, for: "API services" }, { at: VP, for: "sync workers" }] },
      { name: "NestJS", usedIn: [{ at: SYN, for: "patient auth & REST APIs" }, { at: VP, for: "the sync backend" }] },
      { name: "REST APIs", usedIn: [{ at: SYN, for: "the HIPAA-compliant platform" }] },
      { name: "Async programming" },
      { name: "OAuth2 / SMART on FHIR", usedIn: [{ at: SYN, for: "Medplum integration" }, { at: VP, for: "Shopify OAuth & Etsy PKCE" }] },
      { name: "JWT auth", usedIn: [{ at: SYN, for: "patient auth" }] },
      { name: "Webhooks", usedIn: [{ at: SYN, for: "Terra wearable ingestion" }, { at: VP, for: "channel webhook routing" }] },
    ],
  },
  {
    group: "frontend",
    items: [
      { name: "React", usedIn: [{ at: SYN, for: "product front ends" }] },
      { name: "Next.js", usedIn: [{ at: SYN, for: "the desktop app UI" }, { at: VP, for: "the seller dashboard" }] },
      { name: "Electron", usedIn: [{ at: SYN, for: "the macOS desktop app" }] },
    ],
  },
  {
    group: "data & queues",
    items: [
      { name: "PostgreSQL", usedIn: [{ at: SYN, for: "core services" }] },
      { name: "Redis", usedIn: [{ at: SYN, for: "Redis-backed services" }, { at: VP, for: "distributed stock locks" }] },
      { name: "BullMQ", usedIn: [{ at: SYN, for: "wearable data workers" }, { at: VP, for: "the onboarding job flow" }] },
      { name: "SQLite" },
      { name: "Supabase" },
    ],
  },
  {
    group: "cloud & devops",
    items: [
      { name: "AWS ECS Fargate", usedIn: [{ at: SYN, for: "the pre-prod service" }] },
      { name: "RDS" },
      { name: "ALB", usedIn: [{ at: SYN, for: "listener rules" }] },
      { name: "VPC", usedIn: [{ at: SYN, for: "subnets & security groups" }] },
      { name: "S3", usedIn: [{ at: SYN, for: "desktop build artifacts" }] },
      { name: "KMS", usedIn: [{ at: SYN, for: "LocalStack dev setup" }] },
      { name: "SES", usedIn: [{ at: SYN, for: "LocalStack dev setup" }] },
      { name: "ACM", usedIn: [{ at: SYN, for: "certificates" }] },
      { name: "AWS Config", usedIn: [{ at: SYN, for: "HIPAA conformance" }] },
      { name: "GCP Cloud Run" },
      { name: "Docker" },
      { name: "LocalStack", usedIn: [{ at: SYN, for: "reproducible local AWS" }] },
      { name: "GitHub Actions", usedIn: [{ at: SYN, for: "desktop CI/CD with OIDC" }] },
      { name: "Git" },
    ],
  },
  {
    group: "fundamentals",
    items: [
      { name: "Data Structures & Algorithms" },
      { name: "OOP" },
      { name: "Adapter pattern", usedIn: [{ at: VP, for: "the PlatformAdapter interface" }] },
      { name: "Strategy pattern" },
      { name: "AI-assisted development" },
    ],
  },
];

export const education = [
  {
    degree: "B.Tech, Information Technology",
    school: "CSI College of Engineering (Anna University)",
    period: { start: "2021", end: "2025" },
    cgpa: 7.7,
  },
];

// Each section of the page is also a static JSON endpoint: /api/<name>.json
export const endpoints = {
  profile,
  experience,
  projects,
  stack,
  education,
  contact: { ...profile.contact, ...profile.links },
} as const;

export type EndpointName = keyof typeof endpoints;

import { z } from 'zod';

export const ProjectDetailSchema = z.object({
  label: z.string(),
  items: z.array(z.string()),
});

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  categories: z.array(z.string()),
  techStack: z.array(z.string()),
  description: z.string(),
  metric: z.string().describe('One honest, verifiable metric for the project'),
  githubUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  details: z.array(ProjectDetailSchema),
});

export const ExperienceItemSchema = z.object({
  id: z.string(),
  role: z.string(),
  company: z.string(),
  period: z.string(),
  active: z.boolean(),
  location: z.string(),
  description: z.string(),
  skills: z.array(z.string()),
  bulletPoints: z.array(z.string()),
});

export const EducationItemSchema = z.object({
  id: z.string(),
  degree: z.string(),
  institution: z.string(),
  period: z.string(),
  location: z.string(),
  focus: z.string(),
  highlight: z.string().optional(),
});

export const SkillCategorySchema = z.object({
  id: z.string(),
  num: z.string(),
  title: z.string(),
  count: z.number().int().nonnegative(),
  description: z.string(),
  skills: z.array(z.string()),
});

export const SocialLinkSchema = z.object({
  id: z.string(),
  num: z.string(),
  label: z.string(),
  value: z.string(),
  href: z.string(),
  external: z.boolean(),
});

export const PersonalInfoSchema = z.object({
  name: z.string(),
  displayNameMatte: z.string(),
  displayNameChrome: z.string(),
  handle: z.string(),
  status: z.string(),
  availability: z.string(),
  location: z.string(),
  email: z.string().email(),
  github: z.string().url(),
  githubUsername: z.string(),
  linkedin: z.string().url(),
  linkedinDisplay: z.string(),
  tagline: z.string(),
  openToRoles: z.string(),
  bio: z.string(),
  heroRoles: z.array(z.string()),
  footerText: z.string(),
});

export type Project = z.infer<typeof ProjectSchema>;
export type ProjectDetail = z.infer<typeof ProjectDetailSchema>;
export type ExperienceItem = z.infer<typeof ExperienceItemSchema>;
export type EducationItem = z.infer<typeof EducationItemSchema>;
export type SkillCategory = z.infer<typeof SkillCategorySchema>;
export type SocialLink = z.infer<typeof SocialLinkSchema>;
export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;

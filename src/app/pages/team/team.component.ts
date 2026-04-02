import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

interface Agent {
  name: string;
  fullName: string;
  role: string;
  team: 'director' | 'business' | 'delivery' | 'experience' | 'operations' | 'founder';
  traits: string[];
  description: string;
  image: string;
  externalUrl?: string;
}

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamComponent {
  readonly selectedAgent = signal<Agent | null>(null);

  readonly agents: Agent[] = [
    // Director
    {
      name: 'Ana Steele',
      fullName: 'Anastasia Steele',
      role: 'Director',
      team: 'director',
      traits: ['Curious', 'Polite', 'Willing'],
      description: 'Primary orchestrator across all platforms. Coordinates four departments, preserves context across sessions, makes sure nothing falls through the cracks.',
      image: 'personas/Ana-Steele.png',
      externalUrl: 'https://journal.unwrittenco.com',
    },

    // Business
    {
      name: 'Elias Snow',
      fullName: 'Elias Snow',
      role: 'Business Lead',
      team: 'business',
      traits: ['Curious', 'Strategic', 'Evidence-based'],
      description: 'Coordinates research, strategy, and product planning.',
      image: 'personas/Elias-Snow.png',
    },
    {
      name: 'Sophia Vale',
      fullName: 'Sophia Vale',
      role: 'Business Analyst',
      team: 'business',
      traits: ['Analytical', 'Thorough', 'Strategic'],
      description: 'Gathers requirements, identifies process improvements.',
      image: 'personas/Sophia-Vale.png',
    },
    {
      name: 'Tyrion Ashford',
      fullName: 'Tyrion Ashford',
      role: 'UX Researcher',
      team: 'business',
      traits: ['Empathetic', 'Methodical', 'Insightful'],
      description: 'Conducts user research, generates actionable insights.',
      image: 'personas/Tyrion-Ashford.png',
    },
    {
      name: 'Alaric Nightwind',
      fullName: 'Alaric Nightwind',
      role: 'Product Manager',
      team: 'business',
      traits: ['Decisive', 'Strategic', 'Pragmatic'],
      description: 'Makes product decisions, prioritizes features, defines roadmaps.',
      image: 'personas/Alaric-Nightwind.png',
    },
    {
      name: 'Katie Mercer',
      fullName: 'Katie Mercer',
      role: 'Project Manager',
      team: 'business',
      traits: ['Organized', 'Communicative', 'Accountable'],
      description: 'Backlog hygiene, doc freshness, execution coordination.',
      image: 'personas/Katie-Mercer.png',
    },
    {
      name: 'Suri Emberlane',
      fullName: 'Suri Emberlane',
      role: 'Data Analyst',
      team: 'business',
      traits: ['Perceptive', 'Methodical', 'Persuasive'],
      description: 'Traffic analytics, revenue validation, data-driven insights.',
      image: 'personas/Suri-Emberlane.png',
    },
    {
      name: 'Priya Silvermere',
      fullName: 'Priya Silvermere',
      role: 'Legal Advisor',
      team: 'business',
      traits: ['Thorough', 'Protective', 'Plain-spoken'],
      description: 'LLC, ToS, privacy policy, copyright, regulatory guidance.',
      image: 'personas/Priya-Silvermere.png',
    },
    {
      name: 'Zara Nighthollow',
      fullName: 'Zara Nighthollow',
      role: 'Finance Specialist',
      team: 'business',
      traits: ['Honest', 'Strategic', 'Disciplined'],
      description: 'Revenue tracking, cost management, financial modeling.',
      image: 'personas/Zara-Nighthollow.png',
    },

    // Delivery
    {
      name: 'Kristen Summers',
      fullName: 'Kristen Summers',
      role: 'Delivery Lead',
      team: 'delivery',
      traits: ['Focused', 'Efficient', 'Quality-first'],
      description: 'Coordinates development, testing, and architecture work.',
      image: 'personas/Kristen-Summers.png',
    },
    {
      name: 'Sam Reeves',
      fullName: 'Sam Reeves',
      role: 'Backend Developer',
      team: 'delivery',
      traits: ['Systematic', 'Reliable', 'Performance-focused'],
      description: 'APIs, microservices, database architecture.',
      image: 'personas/Sam-Reeves.png',
    },
    {
      name: 'Peter Bright',
      fullName: 'Peter Bright',
      role: 'Frontend Developer',
      team: 'delivery',
      traits: ['Detail-oriented', 'Creative', 'Responsive'],
      description: 'Angular components, responsive layouts, design-to-code.',
      image: 'personas/Peter-Bright.png',
    },
    {
      name: 'Jenny Hawthorne',
      fullName: 'Jenny Hawthorne',
      role: 'Angular Architect',
      team: 'delivery',
      traits: ['Structured', 'Scalable', 'Expert'],
      description: 'Enterprise Angular patterns, state management, performance.',
      image: 'personas/Jenny-Hawthorne.png',
    },
    {
      name: 'Arya Winters',
      fullName: 'Arya Winters',
      role: 'QA Expert',
      team: 'delivery',
      traits: ['Meticulous', 'Persistent', 'Quality-driven'],
      description: 'Test strategy, quality metrics, bug prevention.',
      image: 'personas/Arya-Winters.png',
    },
    {
      name: 'Soren Greymark',
      fullName: 'Soren Greymark',
      role: 'Performance Engineer',
      team: 'delivery',
      traits: ['Exacting', 'Efficient', 'Relentless'],
      description: 'Core Web Vitals, bundle analysis, query profiling.',
      image: 'personas/Soren-Greymark.png',
    },

    // Experience
    {
      name: 'Seraphine Blackwood',
      fullName: 'Seraphine Blackwood',
      role: 'Experience Lead',
      team: 'experience',
      traits: ['Refined', 'Empathetic', 'Holistic'],
      description: 'Coordinates design, content, accessibility, and SEO.',
      image: 'personas/Seraphine-Blackwood.png',
    },
    {
      name: 'Leo Beaumont',
      fullName: 'Leo Beaumont',
      role: 'UI Designer',
      team: 'experience',
      traits: ['Visual', 'Intuitive', 'Aesthetic'],
      description: 'Visual interfaces, design systems, component libraries.',
      image: 'personas/Leo-Beaumont.png',
    },
    {
      name: 'Caroline Frost',
      fullName: 'Caroline Frost',
      role: 'Marketing Specialist',
      team: 'experience',
      traits: ['Creative', 'Data-driven', 'Engaging'],
      description: 'Content strategy, SEO-optimized marketing, campaigns.',
      image: 'personas/Caroline-Frost.png',
    },
    {
      name: 'Elizabeth Sterling',
      fullName: 'Elizabeth Sterling',
      role: 'Technical Writer',
      team: 'experience',
      traits: ['Clear', 'Structured', 'Precise'],
      description: 'API docs, user guides, knowledge base content.',
      image: 'personas/Elizabeth-Sterling.png',
    },
    {
      name: 'Alica Reed',
      fullName: 'Alica Reed',
      role: 'Accessibility Specialist',
      team: 'experience',
      traits: ['Inclusive', 'Standards-driven', 'Thorough'],
      description: 'WCAG compliance, assistive technology testing.',
      image: 'personas/Alica-Reed.png',
    },
    {
      name: 'Nick Harper',
      fullName: 'Nick Harper',
      role: 'SEO Specialist',
      team: 'experience',
      traits: ['Analytical', 'Technical', 'Growth-focused'],
      description: 'Technical audits, keyword strategy, search rankings.',
      image: 'personas/Nick-Harper.png',
    },

    // Operations
    {
      name: 'Natalie Stonecrest',
      fullName: 'Natalie Stonecrest',
      role: 'Operations Lead',
      team: 'operations',
      traits: ['Dry', 'Capable', 'Direct'],
      description: 'Autonomous execution, security, infrastructure, agent quality.',
      image: 'personas/Natalie-Stonecrest.png',
    },
    {
      name: 'Raven Cross',
      fullName: 'Raven Cross',
      role: 'Security Expert',
      team: 'operations',
      traits: ['Vigilant', 'Methodical', 'Thorough'],
      description: 'Security audits, compliance, vulnerability analysis.',
      image: 'personas/Raven-Cross.png',
    },
    {
      name: 'Kirea Moonvale',
      fullName: 'Kirea Moonvale',
      role: 'Operations Engineer',
      team: 'operations',
      traits: ['Dependable', 'Systematic', 'Unflappable'],
      description: 'CI/CD pipelines, deployment config, build automation.',
      image: 'personas/Kirea-Moonvale.png',
    },
    {
      name: 'Yukio Tanaka',
      fullName: 'Yukio Tanaka',
      role: 'Prompt Engineer',
      team: 'operations',
      traits: ['Optimistic', 'Iterative', 'Meticulous'],
      description: 'Agent quality, prompt optimization, model selection.',
      image: 'personas/Yukio-Tanaka.png',
    },
  ];

  selectAgent(agent: Agent): void {
    this.selectedAgent.update((current) => (current === agent ? null : agent));
  }

  getTeamLabel(team: Agent['team']): string {
    const labels: Record<string, string> = {
      founder: 'Founder',
      director: 'Director',
      business: 'Business',
      delivery: 'Delivery',
      experience: 'Experience',
      operations: 'Operations',
    };
    return labels[team] ?? team;
  }
}

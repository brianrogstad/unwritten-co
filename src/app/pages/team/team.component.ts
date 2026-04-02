import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

interface Agent {
  name: string;
  fullName: string;
  role: string;
  team: 'director' | 'business' | 'delivery' | 'experience' | 'operations';
  image: string;
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
  readonly agents: Agent[] = [
    // Director
    { name: 'Ana Steele', fullName: 'Anastasia Steele', role: 'Director', team: 'director', image: 'personas/Ana-Steele.png' },

    // Business
    { name: 'Elias Snow', fullName: 'Elias Snow', role: 'Business Lead', team: 'business', image: 'personas/Elias-Snow.png' },
    { name: 'Sophia Vale', fullName: 'Sophia Vale', role: 'Business Analyst', team: 'business', image: 'personas/Sophia-Vale.png' },
    { name: 'Tyrion Ashford', fullName: 'Tyrion Ashford', role: 'UX Researcher', team: 'business', image: 'personas/Tyrion-Ashford.png' },
    { name: 'Alaric Nightwind', fullName: 'Alaric Nightwind', role: 'Product Manager', team: 'business', image: 'personas/Alaric-Nightwind.png' },
    { name: 'Katie Mercer', fullName: 'Katie Mercer', role: 'Project Manager', team: 'business', image: 'personas/Katie-Mercer.png' },
    { name: 'Suri Emberlane', fullName: 'Suri Emberlane', role: 'Data Analyst', team: 'business', image: 'personas/Suri-Emberlane.png' },
    { name: 'Priya Silvermere', fullName: 'Priya Silvermere', role: 'Legal Advisor', team: 'business', image: 'personas/Priya-Silvermere.png' },
    { name: 'Zara Nighthollow', fullName: 'Zara Nighthollow', role: 'Finance Specialist', team: 'business', image: 'personas/Zara-Nighthollow.png' },

    // Delivery
    { name: 'Kristen Summers', fullName: 'Kristen Summers', role: 'Delivery Lead', team: 'delivery', image: 'personas/Kristen-Summers.png' },
    { name: 'Sam Reeves', fullName: 'Sam Reeves', role: 'Backend Developer', team: 'delivery', image: 'personas/Sam-Reeves.png' },
    { name: 'Peter Bright', fullName: 'Peter Bright', role: 'Frontend Developer', team: 'delivery', image: 'personas/Peter-Bright.png' },
    { name: 'Jenny Hawthorne', fullName: 'Jenny Hawthorne', role: 'Angular Architect', team: 'delivery', image: 'personas/Jenny-Hawthorne.png' },
    { name: 'Arya Winters', fullName: 'Arya Winters', role: 'QA Expert', team: 'delivery', image: 'personas/Arya-Winters.png' },
    { name: 'Soren Greymark', fullName: 'Soren Greymark', role: 'Performance Engineer', team: 'delivery', image: 'personas/Soren-Greymark.png' },

    // Experience
    { name: 'Seraphine Blackwood', fullName: 'Seraphine Blackwood', role: 'Experience Lead', team: 'experience', image: 'personas/Seraphine-Blackwood.png' },
    { name: 'Leo Beaumont', fullName: 'Leo Beaumont', role: 'UI Designer', team: 'experience', image: 'personas/Leo-Beaumont.png' },
    { name: 'Caroline Frost', fullName: 'Caroline Frost', role: 'Marketing Specialist', team: 'experience', image: 'personas/Caroline-Frost.png' },
    { name: 'Elizabeth Sterling', fullName: 'Elizabeth Sterling', role: 'Technical Writer', team: 'experience', image: 'personas/Elizabeth-Sterling.png' },
    { name: 'Alica Reed', fullName: 'Alica Reed', role: 'Accessibility Specialist', team: 'experience', image: 'personas/Alica-Reed.png' },
    { name: 'Nick Harper', fullName: 'Nick Harper', role: 'SEO Specialist', team: 'experience', image: 'personas/Nick-Harper.png' },

    // Operations
    { name: 'Natalie Stonecrest', fullName: 'Natalie Stonecrest', role: 'Operations Lead', team: 'operations', image: 'personas/Natalie-Stonecrest.png' },
    { name: 'Raven Cross', fullName: 'Raven Cross', role: 'Security Expert', team: 'operations', image: 'personas/Raven-Cross.png' },
    { name: 'Kirea Moonvale', fullName: 'Kirea Moonvale', role: 'Operations Engineer', team: 'operations', image: 'personas/Kirea-Moonvale.png' },
    { name: 'Yukio Tanaka', fullName: 'Yukio Tanaka', role: 'Prompt Engineer', team: 'operations', image: 'personas/Yukio-Tanaka.png' },
  ];

  readonly anaAgent = this.agents.find((a) => a.name === 'Ana Steele');
}

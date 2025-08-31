import { Carousel, CarouselSlide } from '@/app/cv/components';

const hainokCarouselContent: CarouselSlide[] = [
  {
    id: 'slide-1',
    content: (
      <ul>
        Lead the technical update and upgrade of the main application product (Hainok) in both FrontEnd:
        <li>Migrated the codebase from a vanilla JS react app to a robust Typescript app</li>
        <li>
          Made use of modern tools like RTKQuery for server state and redux to handle client state and shifted away from
          legacy and dependent tools like Saga for managing client state’s side effects. Made use of React-hook-forms to
          replace Formik and Zod over yup to have finer control and flexibility and performance boost. Moved away from
          bootstrap css to a custom, more reliable SASS spreadsheet.
        </li>
        <li>
          Refactored code along the migration to increase the overall health and performance of the application while
          enhancing the UI and UX side of it through simple and intuitive designs.
        </li>
        <li>Minimised and tweaked options of the build tool (Vite) to make the bundle smaller and faster.</li>
        and Backend:
        <li>
          Shifted to a customisable Zod pipe validation DTO system to gain maintainability, readability and performance
          over NestJS’s built-in class validators.
        </li>
        <li>Defined and implemented the overall backend structure.</li>
        <li>
          Made use of a wide variety of route guards and middlewares to abstract protection/validation logic away from
          controllers and services.
        </li>
        <li>Made use of NestJS workers to spin up parallel processes to offload the main server.</li>
        <li>Made use of sockets to handle cases where real time and streamed data needed to be transmitted over.</li>
        Put safety guards and checks in place per every commit through tools like Husky and lint-staged in both repos to
        help keep a neat, clean and bug-proofed codebase.
      </ul>
    ),
  },
  {
    id: 'slide-2',
    content: (
      <ul>
        Lead a talented team of developers (up to 3) plus a dedicated customer success team member that worked closely
        with us and got perfectly integrated into the development team to gain every day insights. Decide on technology
        approaches and utilisation.
        <li>Review implementation ideas.</li>
        <li>Technically design complex features.</li>
        <li>Review and give understandable and useful feedback on code.</li>
        <li>Conduct pair coding sessions.</li>
        <li>Assist developers with anything they might need (help, doubts, blockers, etc..)</li>
        <li>Ensure code quality standards and efficiency over all developers</li>
        <li>Keep them motivated and avoid bad apples</li>
        Work closely with the company founders to discuss results, next steps, ideas and roadmaps of the product.
        <li>
          Focused on bringing my skills and knowledge to create value innovation into the market boundaries and
          marketing-based psychological biases ideas.
        </li>
        Work closely with marketing and sales to align the teams with the overall OKRs and A/B test different growth and
        retention strategies.
        <br />
        Apply my Product management skills to track and tackle team work over Agile methodologies:
        <li>
          Jira software to plan deadlines as Sprints ahead of time and projects as epics and break down those into small
          achievable tickets, giving developers ownership and control over them. This helped me also to gain insights on
          how much load the team could take over Sprint periods.
        </li>
        <li>
          Run brainstorming sessions with the team to gather ideas and concepts of future possible project
          implementations, enhancements, observations, etc, that successfully helped in planning company quarters.
        </li>
        <li>Run health checks on the team to know the current moods and feelings and keep them on track.</li>
        <li>
          Run a small retrospective at the end of heavy sprints to gain feedback and insights on what went wrong, good
          and what could be improved to take action.
        </li>
        <li>
          Run daily standups to acknowledge team work, raise any blockers in advance and keep the team in the loop
          within the shared goals and objectives of the week.
        </li>
      </ul>
    ),
  },
  {
    id: 'slide-3',
    content: (
      <ul>
        Designed, planned, executed and deployed 3 major business applications from scratch:
        <li>
          Internal admin app: to help internal employees conduct automated and repetitive tasks they otherwise had to do
          by hand and involve third parties.
        </li>
        <li>Hainok mobile App: Android and IOS app version of the main product.</li>
        <li>Inmopublic: a side business of the company, focused on solutions for Spanish governmental institutions.</li>
      </ul>
    ),
  },
  {
    id: 'slide-4',
    content: (
      <ul>
        Get in charge of all of the infrastructure of the products:
        <li>Cloud servers and products maintenance and security.</li>
        <li>Scallability: vertically and horizontally.</li>
        <li>DNS maintenance for the different apps and businesses.</li>
        <li>NGINX configurations.</li>
        <li>CI/CD pipelines.</li>
      </ul>
    ),
  },
];

export const HainokTextContent = () => <Carousel slides={hainokCarouselContent} />;

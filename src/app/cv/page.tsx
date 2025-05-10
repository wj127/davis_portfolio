import CVStyles from 'src/app/cv/cv.module.scss';
import { Toc } from 'src/app/cv/components/toc/Toc';

export default function CurriculumVitae() {
  return (
    <div>
      <Toc />
      <section className={CVStyles.sectionOne}>
        <h1>Curriculum Vitae</h1>
      </section>
      <section className={CVStyles.sectionTwo}></section>
    </div>
  );
}

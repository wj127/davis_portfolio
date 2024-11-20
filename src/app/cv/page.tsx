import CVStyles from 'src/app/cv/cv.module.scss';

export default function CurriculumVitae() {
  return (
    <div>
      <section className={CVStyles.sectionOne}>
        <h1>Curriculum Vitae</h1>
      </section>
      <section className={CVStyles.sectionTwo}></section>
    </div>
  );
}

import BlurFade from "@/components/magicui/blur-fade";
import { HackathonCard } from "@/components/hackathon-card";
import { DATA } from "@/data/resume";
import Link from "next/link";

export const metadata = {
  title: "Achievements",
  description: "Highlights from hackathons and achievements.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function AchievementsPage() {
  return (
    <>
      <section>
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Achievements
              </div>
              <h1 className="font-medium text-2xl mb-2 tracking-tighter sm:text-5xl">
                I like building things
              </h1>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                During my time in university, I attended {DATA.hackathons.length}+ hackathons. People from around the country would come together and build incredible things in 2-3 days.
              </p>
            </div>
          </div>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
            {DATA.hackathons.map((project, id) => (
              <BlurFade key={project.title + project.dates} delay={BLUR_FADE_DELAY * 3 + id * 0.05}>
                <HackathonCard
                  title={project.title}
                  description={project.description}
                  location={project.location}
                  dates={project.dates}
                  image={project.image}
                  links={project.links}
                />
              </BlurFade>
            ))}
          </ul>
        </BlurFade>
      </section>
      
      </>
    );
  }

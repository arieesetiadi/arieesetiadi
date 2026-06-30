"use client";

import { useState } from "react";
import KeenSlider from "@/components/keen-slider";
import Modal from "@/components/modal";
import ProjectLink from "@/components/project-link";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { Project } from "@/lib/types";

export default function SectionProjects({ projects }: { projects: Project[] }) {
  const [selectedModal, setSelectedModal] = useState<null | number>(null);

  return (
    <section id="projects">
      <div className="container">
        <AnimateOnScroll>
          <h2 className="section-title">Recent Projects.</h2>
        </AnimateOnScroll>

        <div
          className="spacer"
          data-height="60"
          style={{ height: "60px" }}></div>

        <div className="row portfolio-wrapper">
          {projects.map((project, i) => (
            <AnimateOnScroll
              key={i}
              delay={i * 0.1}
              className="col-lg-6 col-md-6 col-sm-6 grid-item mb-5">
              <div
                onClick={() => setSelectedModal(i)}
                role="button"
                className="work-content">
                <div className="portfolio-item shadow-dark rounded">
                  <div className="details">
                    <span className="term">{project.category}</span>
                    <h3 className="title">
                      {project.title}
                      <br />
                      <br />
                      <small>{project.subtitle}</small>
                    </h3>
                  </div>
                  <div className="thumb">
                    <img
                      loading="lazy"
                      src={project.thumbnail}
                      alt={`Image of ${project.title}`}
                    />
                    <div className="mask"></div>
                  </div>
                </div>
              </div>

              <Modal
                isOpen={selectedModal == i}
                onClose={() => setSelectedModal(null)}>
                <h2 className="my-0">{project.title}</h2>

                <KeenSlider>
                  <>
                    {project.gallery.map((image, i) => (
                      <div key={i} className="keen-slider__slide number-slide1">
                        <img
                          src={image}
                          alt={`Image of ${project.title}`}
                          loading="eager"
                        />
                      </div>
                    ))}
                  </>
                </KeenSlider>

                <div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: project.description,
                    }}></div>
                  <ul className="mt-4">
                    <li>
                      <strong>Tech Stacks</strong>:{" "}
                      {project.techStacks.join(", ")}
                    </li>
                    {project.github && (
                      <li>
                        <strong>Github</strong>:{" "}
                        <a target="_blank" href={project.github}>
                          <span style={{ textDecoration: "underline" }}>
                            Github URL
                          </span>
                        </a>
                      </li>
                    )}
                    {project.website && <ProjectLink href={project.website} label="Website" />}
                    {project.demo && <ProjectLink href={project.demo} />}
                  </ul>
                </div>
              </Modal>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll>
          <div className="d-flex justify-content-center">
            <a
              className="btn btn-default w-xs-100 d-inline-flex justify-content-center align-items-center mt-3 gap-2"
              href="https://github.com/arieesetiadi"
              target="_blank">
              <img
                width="18"
                height="18"
                src="/images/icons/github-original-white.svg"
                title="Github"
                alt="Github icon"
              />
              Explore more on Github
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

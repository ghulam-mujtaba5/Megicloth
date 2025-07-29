"use client";

"use client";

import Container from "@mui/material/Container";
import Seo from "../components/common/Seo";
import styles from './page.module.css';
import AboutHero from '../components/about/AboutHero';
import MissionVision from '../components/about/MissionVision';
import OurValues from '../components/about/OurValues';

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About Megicloth | Our Story, Mission & Values"
        description="Discover the story behind Megicloth. Learn about our mission to empower the Pakistani textile industry, our vision for the future, and our commitment to quality, authenticity, and innovation."
        ogImage="/file.svg"
        canonical="https://megicloth.com/about"
      />
      <main className={styles.pageWrapper}>
        <Container maxWidth="lg">
          <AboutHero />

          <MissionVision />

          <OurValues />

        </Container>
      </main>
    </>
  );
} 

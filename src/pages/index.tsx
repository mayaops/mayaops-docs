import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";
import { useColorMode } from "@docusaurus/theme-common";
import { useHistory } from "react-router-dom";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const { colorMode } = useColorMode();
  const history = useHistory();

  return (
    <header
      className={clsx(
        "hero",
        colorMode === "dark" ? "hero--dark" : "hero--light",
        styles.heroBanner
      )}
      style={{ display: "grid" }}
    >
      <div className="container">
        <p className="hero__title">{siteConfig.title}</p>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
      <button
        className="home-doc-btn"
        onClick={() => history.push("/docs/intro")}
      >
        Go to Docs
      </button>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

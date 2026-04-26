import { Hero } from "@/components/home/hero";
import { TrustBar } from "@/components/home/trust-bar";
import { ServicePillars } from "@/components/home/service-pillars";
import { FeaturedRealizations } from "@/components/home/featured-realizations";
import { Metrics } from "@/components/home/metrics";
import { LeadershipQuote } from "@/components/home/leadership-quote";
import { ContactBanner } from "@/components/home/contact-banner";
import { HomeMarquee } from "@/components/home/home-marquee";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <HomeMarquee />
      <ServicePillars />
      <FeaturedRealizations />
      <Metrics />
      <LeadershipQuote />
      <ContactBanner />
    </>
  );
}

import HeroSection from '@/components/homepage/HeroSection';
import ValueProp from '@/components/homepage/ValueProp';
import RetreatGrid from '@/components/homepage/RetreatGrid';
import SocialProof from '@/components/homepage/SocialProof';
import CoachesPreview from '@/components/homepage/CoachesPreview';
import FinalCTA from '@/components/homepage/FinalCTA';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ValueProp />
      <RetreatGrid />
      <SocialProof />
      <CoachesPreview />
      <FinalCTA />
    </>
  );
}

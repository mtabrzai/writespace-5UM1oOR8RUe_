import PropTypes from 'prop-types';
import PublicNavbar from '../components/PublicNavbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import LatestPostsPreview from '../components/LatestPostsPreview';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <PublicNavbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <LatestPostsPreview />
      </main>
    </div>
  );
};

LandingPage.propTypes = {};

export default LandingPage;
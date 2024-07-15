import easterEggBlue from '../../assets/easter-eggs/easter-egg-blue.png';
import easterEggCyan from '../../assets/easter-eggs/easter-egg-cyan.png';
import easterEggFuchsia from '../../assets/easter-eggs/easter-egg-fuchsia.png';
import easterEggGreen from '../../assets/easter-eggs/easter-egg-green.png';
import easterEggNeutral from '../../assets/easter-eggs/easter-egg-neutral.png';
import easterEggOrange from '../../assets/easter-eggs/easter-egg-orange.png';
import easterEggPurple from '../../assets/easter-eggs/easter-egg-purple.png';
import easterEggRed from '../../assets/easter-eggs/easter-egg-red.png';
import easterEggTeal from '../../assets/easter-eggs/easter-egg-teal.png';
import easterEggViolet from '../../assets/easter-eggs/easter-egg-violet.png';
import easterEggYellow from '../../assets/easter-eggs/easter-egg-yellow.png';

const easterEggImages = [
  easterEggBlue,
  easterEggCyan,
  easterEggFuchsia,
  easterEggGreen,
  easterEggNeutral,
  easterEggOrange,
  easterEggPurple,
  easterEggRed,
  easterEggTeal,
  easterEggViolet,
  easterEggYellow,
];

// Generate random easter egg ID for each user
export const getEasterEggId = () => {
  let easterEggId = localStorage.getItem('easterEggId');
  if (!easterEggId) {
    easterEggId = Math.random().toString(36).slice(2);
    localStorage.setItem('easterEggId', easterEggId);
  }

  return easterEggId;
};

export const getEasterEggImage = () => {
  const index = Math.floor(Math.random() * easterEggImages.length);
  const easterEggImage = easterEggImages[index];

  return easterEggImage;
};

export const easterEggId = getEasterEggId();

export const easterEggImage = getEasterEggImage();

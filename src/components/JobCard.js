import photosnapLogo from '../images/photosnap.svg';
import manageLogo from '../images/manage.svg';
import accountLogo from '../images/account.svg';
import myHomeLogo from '../images/myhome.svg';
import loopStudioLogo from '../images/loop-studios.svg';
import faceItLogo from '../images/faceit.svg';
import shortlyLogo from '../images/shortly.svg';
import insureLogo from '../images/insure.svg';
import eyeCamLogo from '../images/eyecam-co.svg';
import airFilterLogo from '../images/the-air-filter-company.svg';

export default function JobCard({ listing }) {
  const logoMap = {
    'Photosnap': photosnapLogo,
    'Manage': manageLogo,
    'Account': accountLogo,
    'MyHome': myHomeLogo,
    'Loop Studios': loopStudioLogo,
    'FaceIt': faceItLogo,
    'Shortly': shortlyLogo,
    'Insure': insureLogo,
    'Eyecam Co.': eyeCamLogo,
    'The Air Filter Company': airFilterLogo
  };
  const companyLogo = logoMap[listing.company] || '';

  return (
    <div className="job-card">
      <div className="job-details">
        <div className="logo">
          <img src={companyLogo} alt="" className='job-logo'/>
        </div>
        <div className="card-body">
          <div className="top-row">
            <div className="company">{listing.company}</div>
            {listing.new && <span className="new-badge">NEW!</span>}
            {listing.featured && (
              <span className="featured-badge">FEATURED</span>
            )}
          </div>
          <span className="position">{listing.position}</span>
          <div className="bottom-row">
            <span>{listing.postedAt}</span>
            <span>.</span>
            <span>{listing.contract}</span>
            <span>.</span>
            <span>{listing.location}</span>
          </div>
        </div>
      </div>
      <div className="skills">
        <span className="skill-item">{listing.role}</span>
        <span className="skill-item">{listing.level}</span>
        {listing.languages.map((language, index) => (
          <span className="skill-item" key={index}>
            {language}
          </span>
        ))}
        {listing.tools.map((tool, index) => (
          <span className="skill-item" key={index}>
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}

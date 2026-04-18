import { RepoFolderIcon, ExternalLinkIcon } from './RepoIcons.jsx';

const RepoCard = ({ name, description, language, html_url }) => (
  <a
    href={html_url}
    target="_blank"
    rel="noopener noreferrer"
    className="repo-card"
  >
    <div className="repo-card-accent" />
    <div className="repo-card-body">
      <div className="repo-card-header">
        <RepoFolderIcon />
        <ExternalLinkIcon />
      </div>
      <h3 className="repo-name">{name}</h3>
      <p className="repo-description">{description || 'Sin descripción'}</p>
      {language && <span className="repo-language">{language}</span>}
    </div>
  </a>
);

export default RepoCard;

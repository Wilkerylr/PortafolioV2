import { useGithubRepos } from '../hooks/useGithubRepos';
import RepoCard from './RepoCard.jsx';
import '../styles/Repositories.css';

const Repositories = () => {
  const { repos, loading, error } = useGithubRepos();

  return (
    <section id="repositorios" className="repositorios">
      <h2>Repositorios de GitHub</h2>
      {loading && <p className="repo-status">Cargando repositorios...</p>}
      {error && <p className="repo-status repo-error">Error: {error}</p>}
      <div className="repo-grid">
        {repos.map((repo) => (
          <RepoCard key={repo.id} {...repo} />
        ))}
      </div>
    </section>
  );
};

export default Repositories;

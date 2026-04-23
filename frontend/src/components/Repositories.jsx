import { useGithubRepos } from '../hooks/useGithubRepos';
import RepoCard from './RepoCard.jsx';
import Spinner from './spinner.jsx';
import '../styles/Repositories.css';

const Repositories = () => {
  const { repos, loading, error } = useGithubRepos();

  return (
    <section id="repositorios" className="repositorios">
      <h2>Repositorios de GitHub</h2>
      {loading && <Spinner size="medium" />}
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

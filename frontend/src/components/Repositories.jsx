import { useGithubRepos } from '../hooks/useGithubRepos';
import RepoCard from './RepoCard.jsx';
import SectionHeader from './SectionHeader.jsx';
import '../styles/Repositories.css';

const Repositories = () => {
  const { repos, loading, error, retry } = useGithubRepos();

  return (
    <section id="repositorios" className="repositorios">
      <SectionHeader index="03" title="Repositorios" note="// fuente: api.github" />

      {loading && (
        <p className="repo-status" role="status">
          <span className="loader" aria-hidden="true" /> ESCANEANDO REPOSITORIOS...
        </p>
      )}

      {error && (
        <div className="repo-error">
          <p>// ERROR: NO SE PUEDE ACCEDER A GITHUB AHORA MISMO</p>
          <button className="btn btn--ghost btn--sm" onClick={retry}>REINTENTAR</button>
        </div>
      )}

      <div className="repo-grid">
        {repos.map((repo) => (
          <RepoCard key={repo.id} {...repo} />
        ))}
      </div>
    </section>
  );
};

export default Repositories;
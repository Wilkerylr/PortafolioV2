import { useTheme } from './hooks/useTheme';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Projects from './components/Projects.jsx';
import Repositories from './components/Repositories.jsx';
import Footer from './components/Footer.jsx';
import './styles/global.css';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero theme={theme} />
        <Projects />
        <Repositories />
        <Footer />
      </main>
    </>
  );
}

export default App;

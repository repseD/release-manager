import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { Music, BarChart2, List } from 'lucide-react';
import styles from '../App.module.css';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className={styles.appContainer}>
      {/* Общий хедер для всех страниц приложения */}
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <Music className={styles.logoIcon} size={32} />
          <h1 className={styles.logoText}>BandManager</h1>
        </div>

        {/* Навигация по маршрутам */}
        <nav className={styles.nav}>
          <Link 
            to="/" 
            className={styles.navLink} 
            // activeProps позволяет задать стиль ссылке, когда мы находимся на этом маршруте
            activeProps={{ className: styles.activeLink }}
          >
            <List size={20} />
            <span>Tracks</span>
          </Link>
          
          <Link 
            to="/stats" 
            className={styles.navLink} 
            activeProps={{ className: styles.activeLink }}
          >
            <BarChart2 size={20} />
            <span>Stats</span>
          </Link>
        </nav>
      </header>

      {/* Контент текущей страницы (index.tsx или stats.tsx) подставится сюда */}
      <main className={styles.mainContent}>
        <Outlet />
      </main>

      {/* Опционально: можно добавить футер, он тоже будет виден везде */}
      <footer className={styles.footer}>
        <p>© 2026 BandManager Production Tool</p>
      </footer>
    </div>
  );
}

import styles from '@/styles/DashboardLeftSide.module.scss';

export default function DashboardLeftSide() {
    return (
        <div className={styles.leftside}>
            <span>ml-admin</span>
            <br />
            <a href="/dashboard">Main</a>
            <br />
            <a href="/dashboard/articles">Article management</a>
            <br />
            <a href="/dashboard/redirects">Redirection management</a>
        </div>
    )
}

import styles from './AboutPage.module.css'

export const AboutPage = () => {
  return (
    <div className={styles.about}>
      <div className={styles.content}>
        <p>
          Welcome to <strong>Posts Forum</strong> – a simple platform for sharing
          posts with the community
        </p>

        <p>
          Here you can create posts, comment, like, and interact with other users
        </p>
      </div>
    </div>
  )
}
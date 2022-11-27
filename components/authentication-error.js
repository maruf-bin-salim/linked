import Link from 'next/link'
import styles from '../styles/authentication-error.module.css'
export default function AuthError() {
    return (
        <div className={styles.page}>
            <h2> <span>{"Oops! "}</span> {"You aren't logged in."} </h2>
            <Link href="/">{"Go to the login page!"}</Link>
        </div>
    )
}
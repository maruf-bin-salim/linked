import Link from 'next/link'
import styles from '../styles/loading.module.css'
export default function Loading() {
    return (
        <div className={styles.page}>
            <h2> Loading . . . </h2>
        </div>
    )
}
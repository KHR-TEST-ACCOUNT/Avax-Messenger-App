/** @format
 * Next.jsでは,pagesディレクトリのファイルからエクスポートされたコンポーネントがページとなります。
 *  ページは,ファイル名からルートと関連付けられます。
 *
 * ⭐ たとえば pages/index.js は / ルートに関連付けられます。
 * pages/message/SendMessagePage.tsx は /message/SendMessagePage ルートに関連付けられます。
 */

import type { NextPage } from 'next';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Layout from '@/componen-ts/layout/Layout';

// NextPage →  NextJS の 初期ページとしてルーティングする。
const Home: NextPage = () => {
    // Return が１つではない場合は、明示する。
    return (
        // Home を Props にわたすことで、home? Optional の Boolean を満たしている。
        <Layout home>
            <div className={styles.container}>
                <main className={styles.main}>
                    <h1 className={styles.title}>Welcom to Messenger 📫</h1>

                    {/* メッセージ送信ページ */}
                    <div className={styles.card}>
                        <Link href='/message/SendMessagePage'>
                            <h2>send &rarr;</h2>
                        </Link>
                        <p>send messages and avax to other accounts</p>
                    </div>

                    {/* メッセージ確認ページ */}
                    <div className={styles.card}>
                        <Link href='/message/ConfirmMessagePage'>
                            <h2>Check &rarr;</h2>
                        </Link>
                        <p>Check messages from other accounts</p>
                    </div>
                </main>
            </div>
        </Layout>
    );
};

// Root に ルーティングされるので必ず Export する。
export default Home;

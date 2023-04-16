/** @format */

// Head 要素の コンポーネント → favicon, Title, meata などの設定のときなどに使う。
import Head from 'next/head';

/** aタグの代わりにLinkタグを使うとページ遷移の際に再ロードではなく,
 *      クライアントサイドで遷移が起こるのでより早くコンテンツを切り替えられます。
 *  ⚠️ classNameなどの属性を追加する場合はaタグを使用して下さい。 */
import Link from 'next/link';

import styles from './Layout.module.css';

type Props = {
    children: React.ReactNode;
    //  Home が Undifind / Ture / false の時を許可する → 値がなくても動くということ。
    home?: boolean;
};

/** 全画面共通のコンポーネント
 * @returns Props で 受け取ったコンポーネントを描画する。（→ Children）
 *          Home画面以外では、Home に返るボタンを表示する。
 */
export default function ({ children, home }: Props) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel='icon' href='/favicon.png' />
                <title>Messanger Web App</title>
                <meta
                    name='description'
                    content='テキストとAVAXをやり取りする メッセージDapps です'
                />
            </Head>
            <main>{children}</main>
            {/* Home 画面ではない場合 → Home が引数として渡されていない時。 
                → Undifind｜True 以外。 */}
            {!home && (
                <div className={styles.backToHome}>
                    {/* ホーム（ Index.tsx → / ）に戻る → Next.js の機能
                        Pages ディレクトリの、 Index.tsx が /（ルート）になる。
                    */}
                    <Link href='/'>← Back to home</Link>
                </div>
            )}
        </div>
    );
}

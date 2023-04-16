/** @format
 * _app.tsxファイルは標準で, 全てのページの親コンポーネントとなります。
 *  今回はglobals.cssの利用のみ行いますが,
 * 全てのページで使用したいcontextやレイアウトがある場合に_app.tsxファイル内で使用すると便利です。
 */

import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

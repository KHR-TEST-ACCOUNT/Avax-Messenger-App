/** @format */

// Metamask の拡張機能のプロバイダーと通信する
import { MetaMaskInpageProvider } from '@metamask/providers';

// Window に ether を追加。 Ether はMeatamask の型にして取得。
//   → 取得時に、Window オブジェクトを通じて 署名を求めたりしてくれる。
declare global {
    interface Window {
        ethereum?: MetaMaskInpageProvider;
    }
}

/**
 * Webアプリケーション上で,ユーザーがブロックチェーンネットワークと通信するためには,
 * Webアプリケーションはユーザーのウォレット情報を取得する必要があります。
 *
 * これから,あなたのWebアプリケーションにウォレットを接続したユーザーに,
 * スマートコントラクトを呼び出す権限を付与する機能を実装していきます。
 * これは,Webサイトへの認証機能です。
 *
 * window.ethereumはMetaMaskがwindow（JavaScriptにデフォルトで存在するグローバル変数）の
 * 直下に用意するオブジェクトでありAPIです。
 * このAPIを使用して, ウェブサイトはユーザーのイーサリアムアカウントを要求し,
 * ユーザーが接続しているブロックチェーンからデータを読み取り,
 * ユーザーがメッセージや取引に署名するよう求めることができます。
 *
 * @returns Ethereum
 */
export const getEtherum = (): MetaMaskInpageProvider | null => {
    if (
        typeof window !== 'undefined' &&
        typeof window.ethereum !== 'undefined'
    ) {
        // window オブジェクトから Metamask の Ether情報 を取り出す。
        const { ethereum } = window;
        return ethereum;
    }
    return null;
};

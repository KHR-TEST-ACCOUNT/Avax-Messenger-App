/** @format */

// Metamask の拡張機能のプロバイダーと通信する
import { BaseProvider } from '@metamask/providers';

// Window に ether を追加。 Ether はMeatamask の型にして取得。
//   → 取得時に、Window オブジェクトを通じて 署名を求めたりしてくれる。
declare global {
    interface Window {
        ethereum?: BaseProvider;
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
 * https://zenn.dev/thanai/scraps/4c94c04bdc8373
 *
 * @returns Ethereum
 */
export const getEtherum = (): BaseProvider | null => {
    if (
        typeof window !== 'undefined' &&
        typeof window.ethereum !== 'undefined'
    ) {
        // window オブジェクトから Metamask の Ether情報 を取り出す。
        // ether.jsのWeb3Providerに渡す際はMetaMaskInpageProviderだとエラーになる。
        // Web3ProviderはEIP-1193準拠のものを受け取るようにできているので、BaseProviderを使用する。
        // https://github.com/MetaMask/providers
        // const { ethereum } = window as unknown as { ethereum: BaseProvider };
        const { ethereum } = window;
        return ethereum;
    }

    /**
     * MetaMaskInpageProviderはMetaMask独自の拡張やレガシーインターフェースを含んでいる。

    BaseProviderはEthereum JavaScriptプロバイダ仕様（EIP-1193）を実装しているが、機能させるためにはサブクラスで変更する必要がある。
    StreamProviderはそのようなサブクラスであり、状態を同期させ、二重ストリームを介してJSON-RPCメッセージをマーシャルします。
    MetamaskInpageProviderは、EIP-1193に加えてレガシープロバイダインタフェースをサポートするためにStreamProviderをさらに拡張し、MetaMaskによってウェブページに注入されたオブジェクトをwindow.ethereumとしてインスタンス化するために使われます。
    */
    return null;
};

/** @format */

import Layout from '@/componen-ts/layout/Layout';
import SendMessageForm from '@/componen-ts/form/SendMessageForm';
import { useWallet } from '@/hooks/useWallet';
import RequireWallet from '@/componen-ts/layout/RequireWallet';

export default function SendMessagePage() {
    // ブロックの関数を呼び出す。→ メッセージを送信する。
    function post(text: string, receiver: string, tokenInEther: string) {}

    // connectWallet の定義。 オブジェクト型で返っている。 onClick の関数のように宣言しているだけ。
    const { currentAccount, connectWallet } = useWallet();

    return (
        <Layout>
            {/* Wallet の接続がなければ接続ボタンを表示。あれば 各コンポーネントを表示。 */}
            {/* Children は勝手に渡るので 引数に加えなくて良い。 */}
            <RequireWallet
                currentAccount={currentAccount}
                connectWallet={connectWallet}
            >
                <SendMessageForm
                    sendMessage={(text, receiver, tokenInEther) => {
                        post;
                    }}
                />
            </RequireWallet>
        </Layout>
    );
}

/** @format */

import Layout from '@/componen-ts/layout/Layout';
import SendMessageForm from '@/componen-ts/form/SendMessageForm';
import { useWallet } from '@/hooks/useWallet';
import RequireWallet from '@/componen-ts/layout/RequireWallet';
import { useMessengerContract } from '@/hooks/useMessengerContract';

export default function SendMessagePage() {
    // connectWallet の定義。 オブジェクト型で返っている。 onClick の関数のように宣言しているだけ。
    // currentAccount を格納、 connectWallet: () => void 関数 を定義している。
    const { currentAccount, connectWallet } = useWallet();

    // Message を取得する。 → 独自Hooks → processing などが変わるたびに再レンダリングする。
    const { processing, sendMessage } = useMessengerContract({
        currentAccount,
    });

    return (
        <Layout>
            {processing ? (
                <div>processing...</div>
            ) : (
                // Wallet の接続がなければ接続ボタンを表示。あれば 各コンポーネントを表示。
                // Children は勝手に渡るので 引数に加えなくて良い。
                <RequireWallet
                    currentAccount={currentAccount}
                    connectWallet={connectWallet}
                >
                    <SendMessageForm
                        // SendMessageForm の sendMessage
                        sendMessage={(
                            text: string,
                            receiver: string,
                            tokenInEther: string
                        ) => {
                            // useMessengerContract の sendMessage
                            sendMessage({ text, receiver, tokenInEther });
                        }}
                    />
                </RequireWallet>
            )}
        </Layout>
    );
}

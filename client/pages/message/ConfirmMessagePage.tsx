/** @format */

import Layout from '@/componen-ts/layout/Layout';
import MessageCard from '@/componen-ts/card/MessageCard';
import { useWallet } from '@/hooks/useWallet';
import { useMessengerContract } from '@/hooks/useMessengerContract';

import RequireWallet from '@/componen-ts/layout/RequireWallet';

export default function SendMessagePage() {
    // connectWallet の定義。 オブジェクト型で返っている。 onClick の関数のように宣言しているだけ。
    const { currentAccount, connectWallet } = useWallet();

    // Message を取得する。 → 独自Hooks → processing などが変わるたびに再レンダリングする。
    const { processing, ownMessages, accept, unAccept } = useMessengerContract({
        currentAccount,
    });

    return (
        // レイアウトの中で、下記の子要素を繰り返し表示している。
        <Layout>
            {/* Wallet の接続がなければ接続ボタンを表示。あれば 各コンポーネントを表示。 */}
            {/* Children は勝手に渡るので 引数に加えなくて良い。 */}
            <RequireWallet
                currentAccount={currentAccount}
                connectWallet={connectWallet}
            >
                {/* processing が True なら、その間だけ表示 */}
                {processing && <div>processing...</div>}

                {/* List の文だけ繰り返し表示する */}
                {ownMessages.map((message, index: number) => {
                    return (
                        <div key={index}>
                            <MessageCard
                                message={message}
                                onClickAccept={() => {
                                    accept(BigInt(index));
                                }}
                                onClickUnAccept={() => {
                                    unAccept(BigInt(index));
                                }}
                            />
                        </div>
                    );
                })}
            </RequireWallet>
        </Layout>
    );
}

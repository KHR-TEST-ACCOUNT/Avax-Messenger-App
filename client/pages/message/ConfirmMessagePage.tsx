/** @format */

import { BigNumberish } from 'ethers';
import { Message } from '@/hooks/useMessengerContract';
import Layout from '@/componen-ts/layout/Layout';
import MessageCard from '@/componen-ts/card/MessageCard';
import { useWallet } from '@/hooks/useWallet';
import RequireWallet from '@/componen-ts/layout/RequireWallet';

export default function SendMessagePage() {
    // connectWallet の定義。 オブジェクト型で返っている。 onClick の関数のように宣言しているだけ。
    const { currentAccount, connectWallet } = useWallet();

    const message: Message = {
        sender: '0x~',
        receiver: '0x~',
        depositInWei: '1000000000000000000' as BigNumberish,
        text: 'message',
        isPending: true,
        timestamp: new Date(1),
    };

    // for test
    let ownMassgeList: Message[] = [message, message];

    // 承認する
    function accept(messageIndex: number) {}

    // 否認する
    function unAccept(messageIndex: number) {}

    return (
        // レイアウトの中で、下記の子要素を繰り返し表示している。
        <Layout>
            {/* Wallet の接続がなければ接続ボタンを表示。あれば 各コンポーネントを表示。 */}
            {/* Children は勝手に渡るので 引数に加えなくて良い。 */}
            <RequireWallet
                currentAccount={currentAccount}
                connectWallet={connectWallet}
            >
                {/* List の文だけ繰り返し表示する */}
                {ownMassgeList.map((message, index) => {
                    return (
                        <div key={index}>
                            <MessageCard
                                message={message}
                                onClickAccept={() => {
                                    accept(index);
                                }}
                                onClickUnAccept={() => {
                                    unAccept(index);
                                }}
                            />
                        </div>
                    );
                })}
            </RequireWallet>
        </Layout>
    );
}

/** @format */

import { BigNumberish } from 'ethers';
import { MessageTypes } from '@/hooks/useMessengerContract';
import Layout from '@/componen-ts/layout/Layout';
import MessageCard from '@/componen-ts/card/MessageCard';

export default function SendMessagePage() {
    const message: MessageTypes = {
        sender: '0x~',
        receiver: '0x~',
        depositInWei: '1000000000000000000' as BigNumberish,
        text: 'message',
        isPending: true,
        timestamp: new Date(1),
    };

    // for test
    let ownMassgeList: MessageTypes[] = [message, message];

    // 承認する
    function accept(messageIndex: number) {}

    // 否認する
    function unAccept(messageIndex: number) {}

    return (
        // レイアウトの中で、下記の子要素を繰り返し表示している。
        <Layout>
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
        </Layout>
    );
}

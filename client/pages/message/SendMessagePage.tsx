/** @format */

import Layout from '@/componen-ts/layout/Layout';
import SendMessageForm from '@/componen-ts/form/SendMessageForm';

export default function SendMessagePage() {
    // ブロックの関数を呼び出す。→ メッセージを送信する。
    function post(text: string, receiver: string, tokenInEther: string) {}

    return (
        <Layout>
            <SendMessageForm
                sendMessage={(text, receiver, tokenInEther) => {
                    post;
                }}
            />
        </Layout>
    );
}

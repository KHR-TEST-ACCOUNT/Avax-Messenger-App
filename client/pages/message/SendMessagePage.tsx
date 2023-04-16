/** @format
 * Next.jsでは,pagesディレクトリのファイルからエクスポートされたコンポーネントがページとなります。
 *  ページは,ファイル名からルートと関連付けられます。
 * たとえばpages/index.jsは/ルートに関連付けられます。
 * pages/message/SendMessagePage.tsxは/message/SendMessagePageルートに関連付けられます。
 */

import { BigNumberish } from 'ethers';
import { MessageTypes } from '@/hooks/useMessengerContract';
import Layout from '@/componen-ts/layout/Layout';
import SendMessageForm from '@/componen-ts/form/SendMessageForm';

export default function SendMessagePage() {
    <Layout>
        {/* 後で処理を記載 {} で Void のような何もしない関数を表記*/}
        <SendMessageForm
            sendMessage={(
                text: string,
                reciever: string,
                tokenInEther: string
            ) => {}}
        />
    </Layout>;
}

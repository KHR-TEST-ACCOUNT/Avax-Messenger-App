/** @format */

import { ethers } from 'ethers';
// Hooks import Message types
//   → ＠で接続できる。→ ＠ ルートディレクトリ的な意味あい。
import { Message } from '@/hooks/useMessengerContract';
// ~.module.css → Next.js の機能 → CSS のクラス属性を 自動的に重複が無いように定義してくれる。
//   → めちゃくちゃ便利。 異なるファイルで同じCSSクラス名を使用しても、衝突の心配がありません。
import styles from '../card/MessageCard.module.css';

type Props = {
    message: Message;
    onClickAccept: () => void;
    onClickUnAccept: () => void;
};

/**
 * メッセージの送信者やトークンなどのデータを表示するコンポーネント
 *  {} : Props とすると、｛｝の中をそのまま使える。
 */
export default function MessageCard({
    message,
    onClickAccept,
    onClickUnAccept,
}: Props) {
    // Wei を Ether に変換
    const depositInEther = ethers.formatEther(message.depositInWei);

    return (
        <div className={styles.card}>
            {/* 自身を表示 → メッセージの受け手 */}
            <p className={styles.title}>Hellow : {message.receiver}</p>
            <br />
            {/* 送信者を表示 */}
            <p className={styles.title}>Message from : {message.sender}</p>
            <br />
            {/* AVAX を表示 */}
            <p>AVAX: {depositInEther}</p>
            {/* message を表示 */}
            <p className={styles.text}>
                Content : <br />
                {message.text}
            </p>
            <br />
            {/* Ture なら表示 → コンストラクトのイベントが呼ばれて False になれば、表示しない。 → 動的に変更（再レンダリング）する。 */}
            {message.isPending && (
                <div className={styles.container}>
                    <button className={styles.item} onClick={onClickUnAccept}>
                        UnAccept
                    </button>
                    <button className={styles.item} onClick={onClickAccept}>
                        Accept
                    </button>
                </div>
            )}
            {/* Solidity の Block.Timestamp は TimeStamp型なので、Date型 に変換 */}
            <p className={styles.date}>{message.timestamp.toDateString()}</p>
        </div>
    );
}

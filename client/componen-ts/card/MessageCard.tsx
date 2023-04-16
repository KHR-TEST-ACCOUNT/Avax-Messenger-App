/** @format */

import { ethers } from 'ethers';
// Hooks import Message types
//   → ＠で接続できる。→ ＠ ルートディレクトリ的な意味あい。
import { MessageTypes } from '@/hooks/useMessengerContract';
// ~.module.css → Next.js の機能 → CSS のクラス属性を 自動的に重複が無いように定義してくれる。
//   → めちゃくちゃ便利。 異なるファイルで同じCSSクラス名を使用しても、衝突の心配がありません。
import styles from '../card/MessageCard.module.css';

type Props = {
    message: MessageTypes;
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
            <p className={styles.title}>Hellow {message.receiver}</p>
            {/* 送信者を表示 */}
            <p className={styles.title}>Message from {message.sender}</p>
            <p>AVAX: {depositInEther}</p>
            <p className={styles.text}>{message.text}</p>
            {/* Ture なら表示 */}
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

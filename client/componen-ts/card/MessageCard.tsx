/** @format */

import { ethers } from 'ethers';
// Hooks import Message types
//   → ＠で接続できる。→ ＠ ルートディレクトリ的な意味あい。
import { MessageTypes } from '@/hooks/useMessengerContract';
// ~.module.css → Next.js の機能 → CSS のクラス属性を 自動的に重複が無いように定義してくれる。
//   → めちゃくちゃ便利。 異なるファイルで同じCSSクラス名を使用しても、衝突の心配がありません。
import styles from '/MessageCard.module.css';

type MessageCardProps = {
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
}: MessageCardProps) {
    // Wei を Ether に変換
    const depositInEther = ethers.formatEther(message.depositInWei);

    return (
        <div className={styles.card}>
            <p className={styles.title}>from {message.sender}</p>
            <p>AVAX: {depositInEther}</p>
            <p className={styles.text}>{message.text}</p>
            {/* Ture なら表示 */}
            {message.isPending && (
                <div className={styles.container}>
                    <button className={styles.item} onClick={onClickAccept}>
                        Accept
                    </button>
                    <button className={styles.item} onClick={onClickUnAccept}>
                        UnAccept
                    </button>
                </div>
            )}
            {/* Solidity の Block.Timestamp は TimeStamp型なので、Date型 に変換 */}
            <p className={styles.date}>{message.timestamp.toDateString()}</p>
        </div>
    );
}

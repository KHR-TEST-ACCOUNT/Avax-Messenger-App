/** @format */

import { useState } from 'react';
import styles from './Form.module.css';

type Props = {
    // Props が 渡ってくる コンポーネントに記載する 文字列を定義する。
    sendMessage: (text: string, reciever: string, tokenInEther: string) => void;
};

export default function SendMessageForm({ sendMessage }: Props) {
    // 初期値とセッターを定義
    const [textValue, setTextValue] = useState('');
    const [receiverAccountValue, setReceiverAccountValue] = useState('');
    const [tokenValue, setTokenValue] = useState('0');

    return (
        <div className={styles.container}>
            {/* .form ::placeholder → ここでの デフォルトテキストのCSS を定義 */}
            <div className={styles.form}>
                <div className={styles.title}>Send your message !</div>

                {/* テキスト */}
                <textarea
                    name='text'
                    placeholder='type sender message text.'
                    id='input_text'
                    className={styles.text}
                    onChange={(e) => setTextValue(e.target.value)}
                />

                {/* receiver account address */}
                <input
                    name='address'
                    placeholder='receiver address: 0x...'
                    id='input_address'
                    className={styles.address}
                    onChange={(e) => setReceiverAccountValue(e.target.value)}
                />

                {/* send AVAX token => ether */}
                <input
                    // インプット要素に入力できる型を指定 → 数値のみ
                    type='number'
                    name='avax'
                    placeholder='AVAX'
                    id='input_avax'
                    // 最小値を設定
                    min={0}
                    className={styles.number}
                    onChange={(e) => setTokenValue(e.target.value)}
                />

                {/* 送信ボタン */}
                <button
                    onClick={() =>
                        // 下記の引数は Props の呼び出し元の関数の 引数に合わせる。
                        sendMessage(textValue, receiverAccountValue, tokenValue)
                    }
                >
                    send{' '}
                </button>
            </div>
        </div>
    );
}

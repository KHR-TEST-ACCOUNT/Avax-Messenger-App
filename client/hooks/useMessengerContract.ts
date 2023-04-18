/** @format */

import { BigNumberish, ethers } from 'ethers';
import abi from '@/utils/Messenger.json';
import { getEtherum } from '@/utils/ethereum';
import { Messenger as MessengerType } from '@/typechain-types';
import { useState } from 'react';

// コントラクトアドレスを使用してコントラクトに接続する。
const contractAddress = '0x1A39EAAfd55D97b7e499ab5f7f8055a40DcF4183';

// コントラクトの情報 → Abi を取得する。 → Jsonになっているのでその形式で取得
const contractAbi = abi.abi;

/** 独自の Hooks で Type を定義 */
export type Message = {
    sender: string;
    receiver: string;
    depositInWei: BigNumberish;
    timestamp: Date;
    text: string;
    isPending: boolean;
};

// メッセージの型
type SendMessageProps = {
    text: string;
    reciever: string;
    tokenInEther: string;
};

// UseState で返すデータの型を定義
type ReturnUseMessengerContract = {
    ownMessages: Message[];
    processing: boolean;
    // 親で呼出して、子で処理する。
    sendMessage: (props: SendMessageProps) => void;
};

type UseMessengerContractPsops = {
    // アカウントは取得できるときと、できない時がある。
    currentAccount: string | undefined;
};

/**
 * ReturnUseMessengerContract → UseState で返す関数。
 * 親で呼出して、子で処理する。  → currentAccount を更新する。
 */
export const useMessengerContract = ({
    currentAccount,
}: UseMessengerContractPsops): ReturnUseMessengerContract => {
    // ユーザ宛のメッセージを配列で保持する状態変数。
    const [ownMessages, setOwnMessages] = useState<Message[]>([]);

    // トランザクションの処理中のフラグを表す状態変数。
    const [processing, setProcessing] = useState<boolean>(false);

    // Messenger コントラクトを 格納する状態変数 → 初期値なし
    const [messengerContract, setMessengerContract] = useState<MessengerType>();

    // ethereum プロバイダーを取得
    const ethereum = getEtherum();

    /** コントラクトを取得する */
    function getMessengerContract() {
        try {
            if (ethereum) {
                //  ethers.providers.Web3Provider → Ethereumのプロバイダーを取得する
                // provider (= MetaMask) を設定しています。
                // providerを介して,ユーザーはブロックチェーン上に存在するノードに接続することができます。
                const provider = new ethers.providers.Web3Provider(ethereum);

                // signerは,ユーザーのウォレットアドレスを抽象化したもの
                const signer = provider.getSigner();
            } else {
            }
        } catch (error) {
            console.log(error);
        }
    }
};

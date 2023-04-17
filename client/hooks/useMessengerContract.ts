/** @format */

import { BigNumberish, ethers } from 'ethers';
import abi from '@/utils/Messenger.json';
import { getEtherum } from '@/utils/ethereum';
import { Messenger as MessengerType } from '@/typechain-types';

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

type SendMessageProps = {
    text: string;
    reciever: string;
    tokenInEther: string;
};

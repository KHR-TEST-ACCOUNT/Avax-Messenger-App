/** @format */

import { BigNumberish } from 'ethers';

/** 独自の Hooks を定義 */
export type Message = {
    sender: string;
    receiver: string;
    depositInWei: BigNumberish;
    timestamp: Date;
    text: string;
    isPending: boolean;
};

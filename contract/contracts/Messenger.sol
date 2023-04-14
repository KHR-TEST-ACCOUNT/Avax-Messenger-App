// SPDX-License-Identifier: MIT
/**
    MAJOR（一番左の番号）は互換性がない修正・変更がSolidityに加わった場合に変わります。 
    つまり, 0.8.9から1.0.0までの範囲は修正が加わっても互換性がある（コンパイルが可能）変更なので,
    ^を先頭につけることで, その範囲のバージョンの違いは許容するということです。
 */
pragma solidity ^0.8.9;

/** エラーはスルーして良い。 → アノテーションなどは見つからない。 */
import "hardhat/console.sol";

contract Messenger {
    // publicの指定により, stateはコントラクトの外部からアクセスできる
    // 状態変数のstateを定義 → 読み取って実行を確認できる → Getter なので、State() で呼び出し
    uint256 public state;

    constructor() {
        // コントラクトが呼び出されたときに出力される。
        console.log("Here is my first smart contract!");

        state = 1;
    }
}

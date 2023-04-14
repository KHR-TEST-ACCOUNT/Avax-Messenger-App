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

    /**
     * @dev メッセージの送り手、受け手を格納。その他、保留中などのデータを格納
     * 1ETH ＝ 1,000,000,000,000,000,000 wei (10^18)
     */
    struct Message {
        address payable sender; // Payable -> トークンのやり取りを可能にする型
        address payable receiver;
        uint256 depositInWe; // メッセージトークンの量(wei → トークンの料金)を表します。
        uint256 timestamp;
        string text;
        bool isPending; // 保留かどうか
    }

    // private -> コントラクトないからのみ呼び出し可能
    // Solidityでは, アクセス修飾子がついてない変数を, 自動的にinternalとして扱います。
    // メッセージ受取人のアドレスをKey、 その人あてのメッセージを保存するMap
    mapping(address => Message[]) private messageAtAddress;

    // payableはトランザクションにトークンのやり取りが発生することを伝える関数修飾子
    constructor() payable {
        // コントラクトが呼び出されたときに出力される。
        console.log("Here is my first smart contract!");
    }

    /**
     * メッセージを送信する。関数を呼び出した人のアドレスと トークン を読み取る。
        関数にpayableを指定するとその関数の呼び出しにトークンを送ることができます。 
        逆にpayableが無い関数にトークンを送ろうとすると関数はトランザクションを拒否します。
        ⭐ payable → となっているので、コントラクトに支払情報、アカウントなどのデータを記憶する。
     * @param _text  メッセージ本文
     * @param _receiver 受け手
     */
    function post(
        string memory _text,
        address payable _receiver
    ) public payable {
        // コンソールに表示
        console.log(
            "%s -> posts text:[%s], token:[%d]",
            msg.sender,
            _text,
            msg.value
        );

        // Map に格納 →
        messageAtAddress[_receiver].push(
            Message(
                payable(msg.sender), // ⭐関数を呼び出した User をPayable型にキャスト
                _receiver,
                msg.value, // gus 代 Wai -> ⭐関数呼び出し時に送信されたトークンの値
                block.timestamp,
                _text,
                true // 全てのメッセージは投稿直後は保留状態となる
            )
        );
    }

    // 関数を呼び出したユーザのアドレス宛のメッセージを全て取得します。
    // view → 読み込みだけなのでガス代が　かからない。
    function getOwnMessages() public view returns (Message[] memory) {
        return messageAtAddress[msg.sender];
    }
}

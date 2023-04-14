/** @format */

import hre, { ethers } from 'hardhat';
import { Overrides } from 'ethers';
import { expect } from 'chai';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';

/**
 * 
// test at TS -> Mocha
//   it関数をdescribeの引数（の関数）内に渡すことで, 個々のテストを1つのdescribeでグループ化。
// hre.ethers.getContractFactory("Messenger")の処理が終わるまで,
//   async function関数の中に記載されている他の処理は実行されない
 */

/**
 * 各テストで呼び出されるヘルパー関数
 * Hardhat が用意するローカルether ネットワークにデプロイして、デプロイの情報を返却する。
 * @returns デプロイの結果の、コントラクト、トークン数、アカウント
 */
async function deployContract() {
    // ethers.getSigners → 第一、第2引数に etherのアカウントを返す。
    // Hardhatが提供する任意のアドレスを配列で返す関数。 10000ether を持っている。
    const [ownerAccount, otherAccount] = await ethers.getSigners();

    // トークンの初期値。 関数を呼び出すのに、いくつかトークンを持っていることにする。
    const funds = 100;

    // コントラクトを変数に格納する用意をする
    const MessengerFactory = await hre.ethers.getContractFactory('Messenger');

    // コンストラクターの呼び出しをオーバーライド
    // contract.METHOD_NAME(...args [ , overrides ] ) ⇒ Promise< any >とする。
    // Value → 関数を呼び出すアカウントのValue → アカウントの初期トークン量 を指定。
    //   → トークンは、関数を呼び出しているアカウントから引かれる。
    const MessengerContract = await MessengerFactory.deploy({
        value: funds,
    } as Overrides);

    // デプロイの結果の、コントラクト、トークン数、アカウントをリターン
    return { MessengerContract, funds, ownerAccount, otherAccount };
}

describe('Post', function () {
    // トークンが送られたかどうかのテスト
    it('Should send the correct amount of tokens', async function () {
        // loadFixture → 引数の関数の戻り値を格納。
        //   → 初回の呼び出し時は、格納して初期化。　次回以降は、1回目の初期化の値を返す。
        //   → 無駄なメモリを使わない。
        const { MessengerContract, ownerAccount, otherAccount } =
            await loadFixture(deployContract);

        // 送るトークンを設定
        const testDeposit = 10;

        // テスト実行
        // {value: testDeposit,} → コントラクトを呼び出すときのアカウントのValue
        //   → ⭐アカウントの残高からいくら引いて、Payable 関数に渡して、コントラクトに保存するか
        // expect(a).to.changeEtherBalances(b,c) → 第一と、第2、それぞれの変化をテストする。
        //   → a.関数実行後の、 b.増減の結果 を記述する。
        await expect(
            MessengerContract.post('test_text_v1', otherAccount.address, {
                value: testDeposit,
            })
        ).to.changeEtherBalances(
            [ownerAccount, MessengerContract],
            [-testDeposit, testDeposit]
        );
    });

    // 正しいメッセージを発信することをテスト
    it('Should set the right Message', async function () {
        const { MessengerContract, ownerAccount, otherAccount } =
            await loadFixture(deployContract);
        const testDeposit = 1;
        const testText = 'test_text_v2';
        await MessengerContract.post(testText, otherAccount.address, {
            value: testDeposit,
        });

        // メッセージの受け手 の アカウントで、コントラクトの関数を呼び出す。
        const messageResults = await MessengerContract.connect(
            otherAccount
        ).getOwnMessages();

        // Message 構造体の配列が返るので、その 0番目を取得 → 送ったメッセージ
        const message = messageResults[0];

        // Message 構造体の 中身を確認する。
        expect(message.sender).to.equal(ownerAccount.address);
        expect(message.receiver).to.equal(otherAccount.address);
        expect(message.depositInWe).to.equal(testDeposit);
        expect(message.text).to.equal(testText);
        expect(message.isPending).to.equal(true);

        // 最後に表示する
        console.log(message);
    });
});

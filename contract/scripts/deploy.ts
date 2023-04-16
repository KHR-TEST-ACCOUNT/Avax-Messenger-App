/** @format */

import { ethers } from 'hardhat';

async function main() {
    // Wei → TS で Ether に変換する。 コントラクト呼出し時に AVAXトークンを送る量
    const Amount = 100;

    // デプロイするユーザーを定義 → ユーザーの秘密鍵から、デプロイするユーザーを表示する。
    // ethers.getSigners() -> hardhat.config.ts で設定した ユーザーを取得する。
    const [deployer] = await ethers.getSigners();
    console.log('Deploying contract with the account :', deployer.address);

    // コントラクトのインスタンスを作成
    const Messenger = await ethers.getContractFactory('Messenger');
    // コントラクトのデプロイされたインスタンス
    const messenger = await Messenger.deploy({ value: Amount });
    // コントラクトをデプロイ
    await messenger.deployed();

    // コントラクトのアドレスを表示
    console.log('Contract deployed at : ', messenger.address);
    // コントラクトの所持者の 所持ether を表示。
    console.log(
        "Contract's fund is : ",
        await messenger.provider.getBalance(messenger.address)
    );
}

// async/awaitをどこでも使えるようにするために、このパターンを推奨します。
// そして、エラーを適切に処理します。
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

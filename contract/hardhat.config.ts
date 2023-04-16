/** @format */

import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

// 環境構築時にこのパッケージはインストールしてあります。
import * as dotenv from 'dotenv';

// .env ファイルを環境変数からロード → Process． で使える。
dotenv.config();

if (process.env.TEST_ACCOUNT_PRIVATE_KEY === undefined) {
    console.log('private key is missing');
}

const config: HardhatUserConfig = {
    solidity: '0.8.18',
    // デプロイ →  npx hardhat run scripts/deploy.ts --network fuji
    networks: {
        // ネットワーク名 → デプロイコマンドで指定。
        fuji: {
            url: 'https://api.avax-test.network/ext/bc/C/rpc',
            chainId: 43113,
            // undefind にも対応させる必要がある → IF で [] を含ませる
            accounts:
                process.env.TEST_ACCOUNT_PRIVATE_KEY !== undefined
                    ? [process.env.TEST_ACCOUNT_PRIVATE_KEY]
                    : [],
        },
    },
};

export default config;

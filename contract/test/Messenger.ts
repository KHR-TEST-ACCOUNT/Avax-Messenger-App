/** @format */

import hre from 'hardhat';
import { expect } from 'chai';

// test at TS -> Mocha
//   it関数をdescribeの引数（の関数）内に渡すことで, 個々のテストを1つのdescribeでグループ化。
// hre.ethers.getContractFactory("Messenger")の処理が終わるまで,
//   async function関数の中に記載されている他の処理は実行されない
describe('Messenger', function () {
    // テストを宣言 -> Mocha
    it('should deploy construct', async function () {
        const MessengerFactory = await hre.ethers.getContractFactory(
            'Messenger'
        );
        const MessengerContract = await MessengerFactory.deploy();

        // expectは chai ライブラリの機能
        // state)は, 自動的にgetter関数がコンパイラにより作られます。
        expect(await MessengerContract.state()).to.equal(1);
    });
});

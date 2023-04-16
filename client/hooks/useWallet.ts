/** @format */
import { getEtherum } from '@/utils/ethereum';
import { checkIsOnDemandRevalidate } from 'next/dist/server/api-utils';
import { useEffect, useState } from 'react';

// useWallet で返すオブジェクトの型
type ReturnUseWallet = {
    currentAccount: string | undefined;
    connectWallet: () => void;
};

/** wallet のアカウント、接続して、そのアカウントと、アカウントを更新する関数 を返す。  */
export const useWallet = (): ReturnUseWallet => {
    // ユーザアカウントのアドレスを格納するための状態変数
    const [currentAccount, setCurrentAccount] = useState<string>();

    // ⭐ここで接続
    //   Metamask とアカウントがあれば取得、接続できているはず。（インターフェースのようなもの）
    const ethereum = getEtherum();

    // ethereum を使ってアカウントに接続する。
    const connectWallet = async () => {
        try {
            if (ethereum) {
                console.log('Get Metamask!');
            }

            // ⭐ここで接続
            // Metamaskのアカウント情報を取得 null の可能性があるのでオプショナルにする。
            const accounts = await ethereum?.request({
                // eth_requestAccounts →
                //    MetaMask からユーザーにウォレットへのアクセスを許可するよう呼びかける。
                method: 'eth_requestAccounts',
            });

            // Account が取得できてるかどうかの確認 isArray → 何かあれば True
            //   何もなければリターンする。
            if (!Array.isArray(accounts)) return;

            // アカウントがあれば、コンソール出力してセッター呼出し。
            console.log('Connected : ', accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
        }
    };

    const checkIfWalletIsConnected = async () => {
        try {
            // Ether の存在を確認
            if (!ethereum) {
                console.log('Make sure you have MetaMask!');
                return;
            } else {
                console.log('We have the ethereum object : ', ethereum);
            }

            // ⭐ アカウントが接続されているかどうかを確認
            const accounts = ethereum.request({
                method: 'eth_accounts',
            });

            // 取得できてるかどうか
            if (!Array.isArray(accounts)) return;

            // 取得できてればセッター呼出し
            if (accounts.length !== 0) {
                const account = accounts[0];
                console.log('Found an authorized account:', account);
                setCurrentAccount(account);
            } else {
                // Ether はあるけどアカウントがない。
                console.log('No authorized account found');
            }
        } catch (error) {
            console.log(error);
        }
    };

    // コンポーネントが呼ばれるたびに実行する。
    useEffect(() => {
        checkIfWalletIsConnected;
        //  ↓ NextJS の ESlint という静的ソース解析ツールで引っかかることを防ぐためのコメント
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { currentAccount, connectWallet };
};

/** @format */

import styles from './RequireWallet.module.css';

type Props = {
    children: React.ReactNode;
    currentAccount: string | undefined;
    connectWallet: () => void;
};

export default function RequireWallet({
    children,
    currentAccount,
    connectWallet,
}: Props) {
    return (
        <div>
            {currentAccount ? (
                // アカウントがあれば表示
                <div>
                    <div className={styles.wallet}>
                        <p className={styles.title}>wallet : </p>
                        <p>{currentAccount}</p>
                    </div>
                    {children}
                </div>
            ) : (
                // アカウントがなければ接続ボタンを表示
                // connectWalletButton には独自のCSS を適用
                <button
                    className={styles.connectWalletButton}
                    onClick={connectWallet}
                >
                    Connect Wallet
                </button>
            )}
        </div>
    );
}

<!-- @format -->

# About The Project

`Messenger` is a message dapp that allows text and tokens (AVAX) to be exchanged.

![](/public/images/dapp.gif)

# build & run

```
git clone [this_repository]
cd [this_repository]
npm install
npm run dev
```

After executing the above command, access `localhost:3000` in your browser.

# description

## Chain deployed to: `Avalanche`

## Contract

### Stack description

contract

-   Solidity

test & deploy

-   hardhat
-   typescript

### Directory structure

Root: `package/contract`

-   `Messenger.sol`  
    Implementing Messenger contract core code.
-   `Ownable.sol`  
    Provide owner functionality to Messenger contract.

### Code walk-through

-   Send message  
    The message sender calls the `post` function with the text and the receiver address as arguments.  
    The sender can also attach some AVAX to the message.  
    The contract then holds the message data as an array.

-   Check message  
    The user calls the `getOwnMessage` function.  
    Then the contract finds the message array of which the caller is the receiver and returns it.

-   Accept or deny message  
    The message receiver calls the `accept` or `deny` function with the index number of message array as an argument.  
    if `accept`, the contract send the AVAX to the receiver.  
    if `deny`, the contract send the AVAX to the sender.

## Client

### Stack description

-   typescript
-   React.js
-   Next.js

### Directory structure

Root: `package/client`

-   `components`, `hooks`, `pages`, `styles`  
    Directories containing client side code
-   `utils/Messenger.json`  
    Includes the contract ABI.

### Code walk-through

All pages initially confirm the connection of the user wallet and acquire the contract object.  
And the user calls the function of the contract on each page.

Send message ▶️ `pages/message/SendMessagePage.tsx`  
Check and accept or deny message ▶️ `pages/message/ConfirmMessagePage.tsx`

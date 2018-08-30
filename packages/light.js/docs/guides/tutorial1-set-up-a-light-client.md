# Tutorial Part 1: Set up a Light Client for Development

At Parity Technologies, we believe that Light Clients will [play a big role](https://paritytech.io/what-is-a-light-client/) in the Ethereum network in the future. However, today, Light Clients are still mainly experimental.

For development, there's no big risk in using a Light Client. If anything, it's a small step towards making the network more decentralized.

## Download the Light Client

Please install Parity Ethereum first: https://parity.io. Then run Parity Ethereum with the following flags:

```bash
/path/to/parity --chain kovan --light --ws-origins all
```

We are using the Kovan testnet so that we are not testing our dapp with real Ether. To get some fake Kovan ETH to play with, head to the faucet: https://faucet.kovan.network/.

The Light Client should take a couple of minutes to sync. Head to [our wiki](https://wiki.parity.io/Light-Client) to learn more about the Light Client.
